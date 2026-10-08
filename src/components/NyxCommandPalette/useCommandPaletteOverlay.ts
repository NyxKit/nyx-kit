import { nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

const locks = new WeakMap<Document, { owners: Set<HTMLDialogElement>, value: string, priority: string }>()
const focusable = (root: HTMLElement) => Array.from(root.querySelectorAll<HTMLElement>(
  'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
)).filter(el => el.tabIndex >= 0 && !el.closest('[inert]') && el.getClientRects().length > 0)

export function useCommandPaletteOverlay(
  props: { inline: boolean, disabled: boolean, autofocus: boolean },
  open: Ref<boolean>, root: Ref<HTMLElement | null>, input: Ref<HTMLInputElement | null>,
  emitClose: () => void,
) {
  const mounted = ref(false)
  let dialog: HTMLDialogElement | null = null
  let opener: HTMLElement | null = null
  let backdropPress = false
  let composing = false
  const visible = () => props.inline || !!dialog?.open
  const focus = () => { if (mounted.value && visible() && !props.disabled) input.value?.focus() }
  const cleanup = () => {
    const previous = dialog
    if (!previous) return
    const document = previous.ownerDocument
    const state = locks.get(document)
    const wasTop = state && [...state.owners].at(-1) === previous
    const shouldRestore = wasTop && (previous.contains(document.activeElement) || document.activeElement === document.body)
    dialog = null
    if (previous.open) previous.close()
    state?.owners.delete(previous)
    if (state && !state.owners.size) {
      if (document.body.style.getPropertyValue('overflow') === 'hidden') {
        if (state.value) document.body.style.setProperty('overflow', state.value, state.priority)
        else document.body.style.removeProperty('overflow')
      }
      locks.delete(document)
    }
    if (shouldRestore && opener?.isConnected && !opener.closest('[inert]')
      && !opener.matches(':disabled') && opener.getClientRects().length) opener.focus()
    opener = null
    backdropPress = false
  }
  watch(() => props.inline, cleanup, { flush: 'pre' })
  watch([mounted, open, () => props.inline, root], async () => {
    if (!mounted.value || props.inline || !open.value) { cleanup(); return }
    const element = root.value
    if (!element || element.tagName !== 'DIALOG' || dialog === element) return
    dialog = element as HTMLDialogElement
    const document = element.ownerDocument
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog.showModal()
    let state = locks.get(document)
    if (!state) {
      state = { owners: new Set(), value: document.body.style.getPropertyValue('overflow'), priority: document.body.style.getPropertyPriority('overflow') }
      locks.set(document, state)
      document.body.style.setProperty('overflow', 'hidden')
    }
    state.owners.add(dialog)
    await nextTick()
    if (dialog !== element || !open.value || props.inline) return
    if (props.disabled) (focusable(element)[0] ?? element).focus()
    else focus()
  }, { flush: 'post' })
  const dismiss = () => {
    if (props.inline) { emitClose(); return }
    if (!dialog?.open || !open.value) return
    if ([...(locks.get(dialog.ownerDocument)?.owners ?? [])].at(-1) !== dialog) return
    open.value = false
    cleanup()
    emitClose()
  }
  const onKeydown = (event: KeyboardEvent) => {
    if (event.isComposing || composing || event.keyCode === 229) return
    if (event.key === 'Escape') {
      event.preventDefault(); event.stopPropagation(); dismiss()
    } else if (event.key === 'Tab' && dialog?.open) {
      const elements = focusable(dialog)
      const active = dialog.ownerDocument.activeElement
      if (!elements.length) { event.preventDefault(); dialog.focus(); return }
      if (event.shiftKey && (active === elements[0] || !elements.includes(active as HTMLElement))) {
        event.preventDefault(); elements.at(-1)?.focus()
      } else if (!event.shiftKey && (active === elements.at(-1) || !elements.includes(active as HTMLElement))) {
        event.preventDefault(); elements[0].focus()
      }
    }
  }
  const outside = (event: PointerEvent) => {
    if (!dialog || event.target !== dialog) return false
    const rect = dialog.getBoundingClientRect()
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
  }
  onMounted(() => { mounted.value = true; if (props.inline && props.autofocus) focus() })
  onBeforeUnmount(cleanup)
  return {
    mounted, focus, dismiss, onKeydown,
    onCancel: (event: Event) => { event.preventDefault(); if (!composing) dismiss() },
    onComposition: (value: boolean) => { composing = value },
    onPointerDown: (event: PointerEvent) => { backdropPress = event.button === 0 && outside(event) },
    onPointerUp: (event: PointerEvent) => { const close = backdropPress && outside(event); backdropPress = false; if (close) dismiss() },
    onPointerCancel: () => { backdropPress = false },
  }
}
