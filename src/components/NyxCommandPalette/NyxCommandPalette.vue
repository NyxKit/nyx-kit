<script setup lang="ts" generic="T extends NyxCommandPaletteItem">
import { computed, getCurrentInstance, nextTick, ref, useAttrs, useId, watch } from 'vue'
import useNyxProps from '@/composables/useNyxProps'
import NyxIcon from '../NyxIcon/NyxIcon.vue'
import type { NyxCommandPaletteGroup, NyxCommandPaletteItem, NyxCommandPaletteItemSlotProps, NyxCommandPaletteProps, NyxCommandPaletteSelectEvent } from './NyxCommandPalette.types'
import { acceptGroups, filterGroups, queryKey } from './commandPalette'
import { useCommandPaletteShortcut } from './useCommandPaletteShortcut'
import { useCommandPaletteOverlay } from './useCommandPaletteOverlay'
import './NyxCommandPalette.scss'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<NyxCommandPaletteProps<T>>(), {
  inline: false, showResultsOnEmpty: true, placeholder: 'Search commands...', label: 'Search commands',
  loading: false, loadingText: 'Loading commands...', emptyText: 'No commands found.',
  disabled: false, autofocus: false, loop: true, closeable: false, closeLabel: 'Close command palette',
})
const model = defineModel<string>()
const searchTerm = defineModel<string>('searchTerm')
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ select: [event: NyxCommandPaletteSelectEvent<T>], close: [] }>()
const slots = defineSlots<{
  item?: (scope: NyxCommandPaletteItemSlotProps<T>) => unknown
  'item-leading'?: (scope: NyxCommandPaletteItemSlotProps<T>) => unknown
  'item-label'?: (scope: NyxCommandPaletteItemSlotProps<T>) => unknown
  'item-trailing'?: (scope: NyxCommandPaletteItemSlotProps<T>) => unknown
  'group-label'?: (scope: { group: NyxCommandPaletteGroup<T>, searchTerm: string }) => unknown
  empty?: (scope: { searchTerm: string }) => unknown
  loading?: (scope: { searchTerm: string }) => unknown
  footer?: (scope: { searchTerm: string, resultCount: number }) => unknown
}>()
const attrs = useAttrs()
const { classList } = useNyxProps(props, { origin: 'NyxCommandPalette' })
const root = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const viewport = ref<HTMLElement | null>(null)
const overlay = useCommandPaletteOverlay(props, open, root, input, () => emit('close'))
const { mounted, closing } = overlay
const paletteShortcut = useCommandPaletteShortcut(props, root, overlay.toggle)
const instance = getCurrentInstance()!
const externallySelected = () => {
  const raw = instance.vnode.props ?? {}
  return 'modelValue' in raw || 'model-value' in raw
}
const localSelection = ref(model.value)
const selected = computed(() => externallySelected() ? model.value : localSelection.value)
const query = computed(() => searchTerm.value ?? '')
const resultsVisible = computed(() => props.showResultsOnEmpty || !!query.value.trim())
const accepted = computed(() => acceptGroups(props.groups))
const filtered = computed(() => filterGroups(accepted.value, query.value))
const resultCount = computed(() => resultsVisible.value ? filtered.value.reduce((sum, group) => sum + group.items.length, 0) : 0)
const enabled = computed(() => props.disabled || props.loading || !resultsVisible.value || closing.value ? [] : filtered.value.flatMap(({ items }) => items.filter(item => !item.disabled)))
const active = ref<string>()
watch([() => queryKey(query.value), enabled, selected], ([key, items, selection], previous) => {
  const first = items[0]?.id
  if (previous?.length && key !== previous[0]) active.value = first
  else if ((!previous?.length || selection !== previous[2]) && items.some(item => item.id === selection)) active.value = selection
  else if (!items.some(item => item.id === active.value)) active.value = first
}, { immediate: true })
watch(accepted, groups => {
  if (!externallySelected() && !groups.some(({ items }) => items.some(item => item.id === localSelection.value))) localSelection.value = undefined
})
const baseId = useId()
const domId = (kind: string, id = '') => `${baseId}-${kind}-${Array.from(id, char => char.codePointAt(0)!.toString(16)).join('-')}`
const scope = (item: T, group: NyxCommandPaletteGroup<T>, index: number): NyxCommandPaletteItemSlotProps<T> => ({
  item, group, index, active: active.value === item.id, selected: selected.value === item.id,
  disabled: props.disabled || props.loading || closing.value || !resultsVisible.value || !!item.disabled, searchTerm: query.value,
})
const activate = (item: T, group: NyxCommandPaletteGroup<T>, originalEvent: MouseEvent | KeyboardEvent) => {
  if ((!props.inline && !open.value) || !enabled.value.some(candidate => candidate.id === item.id)) return
  overlay.focus()
  const discardedLocal = !externallySelected() && localSelection.value !== item.id && model.value === item.id
  localSelection.value = item.id
  if (discardedLocal) instance.emit('update:modelValue', item.id)
  else model.value = item.id
  emit('select', { item, group, originalEvent })
}
let composing = false
const composition = (value: boolean) => { composing = value; overlay.onComposition(value) }
const onInputKeydown = (event: KeyboardEvent) => {
  if (composing || event.isComposing || event.keyCode === 229 || paletteShortcut.matches(event)) return
  const items = enabled.value
  if (event.key === 'Enter') {
    event.preventDefault()
    const group = filtered.value.find(group => group.items.some(item => item.id === active.value))
    const item = group?.items.find(item => item.id === active.value)
    if (item && group) activate(item, group.group, event)
    return
  }
  let index = items.findIndex(item => item.id === active.value)
  if (event.key === 'ArrowDown') index++
  else if (event.key === 'ArrowUp') index = index < 0 ? items.length - 1 : index - 1
  else if (event.altKey && event.key === 'Home') index = 0
  else if (event.altKey && event.key === 'End') index = items.length - 1
  else return
  event.preventDefault()
  if (!items.length) return
  index = props.loop ? (index + items.length) % items.length : Math.max(0, Math.min(index, items.length - 1))
  active.value = items[index]?.id
}
const scrollActiveIntoView = () => {
  if (!resultsVisible.value || (!props.inline && !open.value)) return
  const container = viewport.value
  const element = active.value && container?.ownerDocument.getElementById(domId('option', active.value))
  if (!container?.clientHeight || !element) return
  // Layout offsets are unaffected by the surface's scale animation.
  let top = element.offsetTop
  let parent = element.offsetParent as HTMLElement | null
  while (parent && parent !== container) { top += parent.offsetTop; parent = parent.offsetParent as HTMLElement | null }
  if (top < container.scrollTop) container.scrollTop = top
  else if (top + element.offsetHeight > container.scrollTop + container.clientHeight) {
    container.scrollTop = top + element.offsetHeight - container.clientHeight
  }
}
watch([active, resultsVisible, () => props.inline || (mounted.value && open.value)], async () => {
  await nextTick()
  scrollActiveIntoView()
}, { immediate: true })
watch(viewport, (element, _, cleanup) => {
  if (!element || typeof ResizeObserver === 'undefined') return
  const observer = new ResizeObserver(scrollActiveIntoView)
  observer.observe(element)
  cleanup(() => observer.disconnect())
})
const hideLeavingResult = (element: Element) => { element.setAttribute('aria-hidden', 'true'); element.setAttribute('inert', '') }
const restoreResult = (element: Element) => { element.removeAttribute('aria-hidden'); element.removeAttribute('inert') }
const rootAttrs = () => Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'))
defineExpose({ focus: overlay.focus })
</script>

<template>
  <Teleport to="body" :disabled="inline || !mounted">
    <component
      :is="inline ? 'div' : 'dialog'" ref="root" v-bind="rootAttrs()"
      class="nyx-command-palette" :class="[classList, attrs.class]" :style="attrs.style" :data-closing="closing" :data-results-visible="resultsVisible"
      :aria-label="inline ? undefined : label" :aria-modal="inline ? undefined : true" tabindex="-1"
      @keydown="overlay.onKeydown" @cancel="overlay.onCancel"
      @pointerdown="overlay.onPointerDown" @pointerup="overlay.onPointerUp" @pointercancel="overlay.onPointerCancel"
    >
      <div class="nyx-command-palette__search">
        <NyxIcon name="search" aria-hidden="true" />
        <input
          :id="domId('input')" ref="input" class="nyx-command-palette__input" type="text"
          role="combobox" :aria-label="label" aria-autocomplete="list" :aria-controls="domId('list')"
          :aria-expanded="(inline || (mounted && open)) && !disabled && resultsVisible && !closing"
          :aria-activedescendant="active ? domId('option', active) : undefined"
          :placeholder="placeholder" :value="query" :disabled="disabled" autocomplete="off"
          @input="searchTerm = ($event.target as HTMLInputElement).value" @keydown="onInputKeydown"
          @compositionstart="composition(true)" @compositionend="composition(false)"
        >
        <button v-if="closeable" class="nyx-command-palette__close" type="button" :aria-label="closeLabel" @click="overlay.dismiss">
          <NyxIcon name="x" aria-hidden="true" />
        </button>
      </div>
      <div class="nyx-command-palette__results" :data-visible="resultsVisible" :inert="!resultsVisible" :aria-hidden="!resultsVisible">
      <div ref="viewport" class="nyx-command-palette__viewport">
        <div class="nyx-command-palette__results-content">
        <div :id="domId('list')" role="listbox" :aria-label="label" :aria-busy="loading">
          <TransitionGroup v-for="{ group, items } in filtered" :key="group.id" tag="div" role="group" appear name="nyx-command-palette-result" @before-leave="hideLeavingResult" @before-enter="restoreResult" @leave-cancelled="restoreResult"
            :aria-labelledby="group.label?.trim() || slots['group-label'] ? domId('group', group.id) : undefined"
            class="nyx-command-palette__group">
            <div v-if="group.label?.trim() || slots['group-label']" key="heading" :id="domId('group', group.id)" class="nyx-command-palette__heading">
              <slot name="group-label" :group="group" :search-term="query">{{ group.label }}</slot>
            </div>
            <button v-for="(item, index) in items" :id="domId('option', item.id)" :key="`item:${item.id}`"
              type="button" role="option" tabindex="-1" class="nyx-command-palette__option"
              :data-active="active === item.id" :aria-selected="selected === item.id"
              :aria-disabled="scope(item, group, index).disabled" :aria-label="item.label"
              :aria-describedby="!slots.item && !slots['item-label'] && item.description ? domId('description', item.id) : undefined"
              @pointermove="!scope(item, group, index).disabled && (active = item.id)"
              @mousedown.prevent @click="activate(item, group, $event)">
              <slot v-if="slots.item" name="item" v-bind="scope(item, group, index)" />
              <template v-else>
                <span v-if="slots['item-leading'] || item.icon" class="nyx-command-palette__leading">
                  <slot name="item-leading" v-bind="scope(item, group, index)"><NyxIcon :name="item.icon" aria-hidden="true" /></slot>
                </span>
                <span class="nyx-command-palette__label">
                  <slot name="item-label" v-bind="scope(item, group, index)">
                    <span>{{ item.label }}</span>
                    <span v-if="item.description" :id="domId('description', item.id)" class="nyx-command-palette__description">{{ item.description }}</span>
                  </slot>
                </span>
                <span v-if="slots['item-trailing'] || item.shortcuts?.length" class="nyx-command-palette__trailing">
                  <slot name="item-trailing" v-bind="scope(item, group, index)">
                    <kbd v-for="(key, keyIndex) in item.shortcuts" :key="keyIndex" aria-hidden="true">{{ key }}</kbd>
                  </slot>
                </span>
              </template>
            </button>
          </TransitionGroup>
        </div>
        <Transition name="nyx-command-palette-state" mode="out-in" @before-leave="hideLeavingResult">
        <div v-if="loading || !resultCount" :key="loading ? 'loading' : 'empty'" class="nyx-command-palette__state">
          <slot v-if="loading" name="loading" :search-term="query"><NyxIcon name="loader-circle" aria-hidden="true" />{{ loadingText }}</slot>
          <slot v-else name="empty" :search-term="query">{{ emptyText }}</slot>
        </div>
        </Transition>
        </div>
      </div>
      </div>
      <span class="nyx-command-palette__status" role="status">{{ !resultsVisible ? '' : loading ? loadingText : !resultCount ? emptyText : '' }}</span>
      <div v-if="slots.footer" class="nyx-command-palette__footer"><slot name="footer" :search-term="query" :result-count="resultCount" /></div>
    </component>
  </Teleport>
</template>
