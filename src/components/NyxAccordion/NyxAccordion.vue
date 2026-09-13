<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, ref, useId, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import useNyxProps from '@/composables/useNyxProps'
import type { NyxAccordionModel, NyxAccordionProps, NyxAccordionSlotProps } from './NyxAccordion.types'
import './NyxAccordion.scss'

const props = withDefaults(defineProps<NyxAccordionProps>(), {
  multiple: false,
  disabled: false,
  headingLevel: 3,
})
const model = defineModel<string | string[]>()
const slots = defineSlots<{
  header?: (scope: NyxAccordionSlotProps) => unknown
  default?: (scope: NyxAccordionSlotProps) => unknown
  empty?: () => unknown
  [name: `item-${string}` | `header-${string}`]: ((scope: NyxAccordionSlotProps) => unknown) | undefined
}>()
const { classList } = useNyxProps(props, { origin: 'NyxAccordion' })
const instance = getCurrentInstance()!
// Match defineModel's two-way binding detection, while keeping silent local
// normalization separate from model writes (which always emit).
const hasModelBinding = () => {
  const raw = instance.vnode.props ?? {}
  return ('modelValue' in raw || 'model-value' in raw)
    && ('onUpdate:modelValue' in raw || 'onUpdate:model-value' in raw)
}
const localModel = ref<NyxAccordionModel | undefined>(model.value)
const acceptedItems = computed(() => {
  const seen = new Set<string>()
  return props.items.filter(item => {
    if (typeof item.id !== 'string' || !item.id.trim() || seen.has(item.id)) {
      if (import.meta.env.DEV) console.warn('[NyxAccordion] Skipping blank or duplicate item ID:', item.id)
      return false
    }
    seen.add(item.id)
    return true
  })
})
const validIds = computed(() => new Set(acceptedItems.value.map(item => item.id)))
const normalizeModel = (value: NyxAccordionModel | undefined): NyxAccordionModel => {
  const values = Array.isArray(value) ? value : value ? [value] : []
  const ids = [...new Set(values)].filter(id => validIds.value.has(id))
  return props.multiple ? ids : ids[0] ?? ''
}
const normalisedModel = computed({
  get: () => normalizeModel(hasModelBinding() ? model.value : localModel.value),
  set: value => {
    const normalized = normalizeModel(value)
    if (!hasModelBinding()) localModel.value = normalized
    // defineModel may retain a scalar discarded by silent local normalization.
    if (!hasModelBinding() && Object.is(model.value, normalized)) instance.emit('update:modelValue', normalized)
    else model.value = normalized
  },
})
watch(model, value => { if (!hasModelBinding()) localModel.value = normalizeModel(value) })
watch([() => props.multiple, validIds], () => {
  if (!hasModelBinding()) localModel.value = normalizeModel(localModel.value)
})
const openIds = computed(() => new Set(Array.isArray(normalisedModel.value)
  ? normalisedModel.value : normalisedModel.value ? [normalisedModel.value] : []))
const rows = computed<NyxAccordionSlotProps[]>(() => acceptedItems.value.map((item, index) => ({
  item, index, open: openIds.value.has(item.id), disabled: props.disabled || !!item.disabled,
})))
const baseId = useId()
// Code-point encoding is injective, selector-safe, and deterministic for SSR.
const getItemDomId = (id: string) => `${baseId}-${Array.from(id, char => char.codePointAt(0)!.toString(16)).join('-')}`
const getTriggerId = (id: string) => `${getItemDomId(id)}-trigger`
const getPanelId = (id: string) => `${getItemDomId(id)}-panel`
const getHeaderSlotName = (id: string): `header-${string}` | 'header' => slots[`header-${id}`] ? `header-${id}` : 'header'
const getBodySlotName = (id: string): `item-${string}` | 'default' => slots[`item-${id}`] ? `item-${id}` : 'default'
const root = ref<HTMLElement | null>(null)
const triggers = new Map<string, HTMLElement>()
const panels = new Map<string, HTMLElement>()
const setElementRef = (map: Map<string, HTMLElement>, id: string, element: Element | ComponentPublicInstance | null) => {
  if (element instanceof HTMLElement) map.set(id, element)
  else map.delete(id)
}
const toggleItem = (row: NyxAccordionSlotProps) => {
  if (row.disabled) return
  triggers.get(row.item.id)?.focus()
  normalisedModel.value = props.multiple
    ? row.open ? [...openIds.value].filter(id => id !== row.item.id) : [...openIds.value, row.item.id]
    : row.open ? '' : row.item.id
}
const handleHeaderKeydown = (event: KeyboardEvent, row: NyxAccordionSlotProps) => {
  if (event.target !== event.currentTarget || row.disabled) return
  const enabled = rows.value.filter(item => !item.disabled)
  const index = enabled.findIndex(item => item.item.id === row.item.id)
  let target: number
  switch (event.key) {
    case 'ArrowDown': target = (index + 1) % enabled.length; break
    case 'ArrowUp': target = (index - 1 + enabled.length) % enabled.length; break
    case 'Home': target = 0; break
    case 'End': target = enabled.length - 1; break
    default: return
  }
  event.preventDefault()
  triggers.get(enabled[target].item.id)?.focus()
}

// Capture focus before Vue removes/hides a body; recover after the DOM update.
watch(rows, (current, previous) => {
  const active = root.value?.ownerDocument.activeElement
  if (!active) return
  const affected = previous.find(row => {
    const next = current.find(candidate => candidate.item.id === row.item.id)
    return (panels.get(row.item.id)?.contains(active) && (!next || !next.open))
      || (triggers.get(row.item.id) === active && (!next || next.disabled))
  })
  if (!affected) return
  void nextTick(() => {
    const document = root.value?.ownerDocument
    if (!document || (document.activeElement !== active && document.activeElement !== document.body)) return
    const currentRows = rows.value
    const sameIndex = currentRows.findIndex(row => row.item.id === affected.item.id)
    const same = currentRows[sameIndex]
    const start = sameIndex < 0 ? affected.index : sameIndex + 1
    const target = same && !same.disabled ? same
      : currentRows.slice(start).find(row => !row.disabled)
        ?? currentRows.slice(0, start).reverse().find(row => !row.disabled)
    if (target) triggers.get(target.item.id)?.focus()
    else root.value?.focus()
  })
})
</script>

<template>
  <div ref="root" class="nyx-accordion" :class="classList" tabindex="-1">
    <div v-for="row in rows" :key="row.item.id" class="nyx-accordion__item">
      <component :is="`h${headingLevel}`" class="nyx-accordion__heading">
        <button
          :ref="element => setElementRef(triggers, row.item.id, element)"
          :id="getTriggerId(row.item.id)"
          class="nyx-accordion__trigger"
          type="button"
          :disabled="row.disabled"
          :aria-expanded="row.open"
          :aria-controls="getPanelId(row.item.id)"
          @click="toggleItem(row)"
          @keydown="handleHeaderKeydown($event, row)"
        >
          <span class="nyx-accordion__label">
            <slot
              v-if="slots[`header-${row.item.id}`] || slots.header"
              :name="getHeaderSlotName(row.item.id)"
              v-bind="row"
            />
            <template v-else>{{ row.item.label }}</template>
          </span>
          <svg class="nyx-accordion__indicator" aria-hidden="true" viewBox="0 0 16 16" fill="none">
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </button>
      </component>
      <Transition name="nyx-accordion-panel">
        <div
          v-show="row.open"
          :ref="element => setElementRef(panels, row.item.id, element)"
          :id="getPanelId(row.item.id)"
          class="nyx-accordion__panel"
          :aria-hidden="!row.open"
          :inert="!row.open"
        >
          <div class="nyx-accordion__clip">
            <div class="nyx-accordion__body">
              <slot :name="getBodySlotName(row.item.id)" v-bind="row" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <slot v-if="!rows.length" name="empty" />
  </div>
</template>
