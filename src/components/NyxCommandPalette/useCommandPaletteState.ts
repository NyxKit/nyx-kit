import { computed, getCurrentInstance, nextTick, ref, useAttrs, useId, watch, type Ref } from 'vue'
import type {
  NyxCommandPaletteGroup,
  NyxCommandPaletteItem,
  NyxCommandPaletteItemSlotProps,
  NyxCommandPaletteProps,
  NyxCommandPaletteSelectEvent
} from './NyxCommandPalette.types'
import { NyxCommandPaletteViewportMode } from './NyxCommandPalette.types'
import { acceptGroups, filterGroups, queryKey } from './commandPalette'
import { useCommandPaletteShortcut } from './useCommandPaletteShortcut'
import { useCommandPaletteOverlay } from './useCommandPaletteOverlay'

type ResolvedProps<T extends NyxCommandPaletteItem> = NyxCommandPaletteProps<T> & {
  inline: boolean
  disabled: boolean
  autofocus: boolean
}

type PaletteEmit<T extends NyxCommandPaletteItem> = {
  (event: 'select', payload: NyxCommandPaletteSelectEvent<T>): void
  (event: 'close'): void
}

export function useCommandPaletteState<T extends NyxCommandPaletteItem>(
  props: ResolvedProps<T>,
  model: Ref<string | undefined>,
  searchTerm: Ref<string | undefined>,
  open: Ref<boolean>,
  emit: PaletteEmit<T>
) {
  const attrs = useAttrs()

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

  const selected = computed(() => (externallySelected() ? model.value : localSelection.value))

  const query = computed(() => searchTerm.value ?? '')

  const revealed = ref(false)
  const manuallyRevealed = ref(false)

  watch(
    [query, () => props.viewportMode],
    ([value, mode], previous) => {
      if (previous && mode !== previous[1]) revealed.value = false
      manuallyRevealed.value = false
      if (value.trim()) revealed.value = true
    },
    { immediate: true, flush: 'sync' }
  )

  watch(
    open,
    (value) => {
      if (!value && !props.inline) {
        revealed.value = false
        manuallyRevealed.value = false
      } else if (value && !props.inline && query.value.trim()) revealed.value = true
    },
    { flush: 'sync' }
  )

  const resultsVisible = computed(
    () =>
      props.viewportMode === NyxCommandPaletteViewportMode.Always ||
      !!query.value.trim() ||
      manuallyRevealed.value ||
      (props.viewportMode === NyxCommandPaletteViewportMode.AfterInteraction && revealed.value)
  )

  const revealResults = () => {
    if (props.disabled || closing.value) return
    overlay.focus()
    revealed.value = true
    manuallyRevealed.value = true
  }

  const accepted = computed(() => acceptGroups(props.groups))

  const filtered = computed(() => filterGroups(accepted.value, query.value))

  const resultCount = computed(() =>
    resultsVisible.value ? filtered.value.reduce((sum, group) => sum + group.items.length, 0) : 0
  )

  const enabled = computed(() =>
    props.disabled || props.loading || !resultsVisible.value || closing.value
      ? []
      : filtered.value.flatMap(({ items }) => items.filter((item) => !item.disabled))
  )

  const active = ref<string>()

  watch(
    [() => queryKey(query.value), enabled, selected],
    ([key, items, selection], previous) => {
      const first = items[0]?.id
      if (previous?.length && key !== previous[0]) active.value = first
      else if ((!previous?.length || selection !== previous[2]) && items.some((item) => item.id === selection))
        active.value = selection
      else if (!items.some((item) => item.id === active.value)) active.value = first
    },
    { immediate: true }
  )

  watch(accepted, (groups) => {
    if (!externallySelected() && !groups.some(({ items }) => items.some((item) => item.id === localSelection.value)))
      localSelection.value = undefined
  })

  const baseId = useId()

  const domId = (kind: string, id = '') =>
    `${baseId}-${kind}-${Array.from(id, (char) => char.codePointAt(0)!.toString(16)).join('-')}`

  const scope = (item: T, group: NyxCommandPaletteGroup<T>, index: number): NyxCommandPaletteItemSlotProps<T> => ({
    item,
    group,
    index,
    active: active.value === item.id,
    selected: selected.value === item.id,
    disabled: props.disabled || props.loading || closing.value || !resultsVisible.value || !!item.disabled,
    searchTerm: query.value
  })

  const activate = (item: T, group: NyxCommandPaletteGroup<T>, originalEvent: MouseEvent | KeyboardEvent) => {
    if ((!props.inline && !open.value) || !enabled.value.some((candidate) => candidate.id === item.id)) return
    overlay.focus()
    const discardedLocal = !externallySelected() && localSelection.value !== item.id && model.value === item.id
    localSelection.value = item.id
    if (discardedLocal) instance.emit('update:modelValue', item.id)
    else model.value = item.id
    emit('select', { item, group, originalEvent })
  }

  let composing = false

  const composition = (value: boolean) => {
    composing = value
    overlay.onComposition(value)
  }

  const onInputKeydown = (event: KeyboardEvent) => {
    if (composing || event.isComposing || event.keyCode === 229 || paletteShortcut.matches(event)) return
    if (event.key === 'ArrowDown' && !resultsVisible.value) {
      event.preventDefault()
      if (!event.repeat) revealResults()
      return
    }
    const items = enabled.value
    if (event.key === 'Enter') {
      event.preventDefault()
      if (event.repeat) return
      if (!resultsVisible.value) {
        revealResults()
        return
      }
      const group = filtered.value.find((group) => group.items.some((item) => item.id === active.value))
      const item = group?.items.find((item) => item.id === active.value)
      if (item && group) activate(item, group.group, event)
      return
    }
    let index = items.findIndex((item) => item.id === active.value)
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
    while (parent && parent !== container) {
      top += parent.offsetTop
      parent = parent.offsetParent as HTMLElement | null
    }
    if (top < container.scrollTop) container.scrollTop = top
    else if (top + element.offsetHeight > container.scrollTop + container.clientHeight) {
      container.scrollTop = top + element.offsetHeight - container.clientHeight
    }
  }

  watch(
    [active, resultsVisible, () => props.inline || (mounted.value && open.value)],
    async () => {
      await nextTick()
      scrollActiveIntoView()
    },
    { immediate: true }
  )

  watch(viewport, (element, _, cleanup) => {
    if (!element || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(scrollActiveIntoView)
    observer.observe(element)
    cleanup(() => observer.disconnect())
  })

  const rootAttrs = () =>
    Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'))

  return {
    attrs,
    root,
    input,
    viewport,
    overlay,
    mounted,
    closing,
    query,
    resultsVisible,
    revealResults,
    filtered,
    resultCount,
    active,
    domId,
    scope,
    activate,
    composition,
    onInputKeydown,
    rootAttrs
  }
}
