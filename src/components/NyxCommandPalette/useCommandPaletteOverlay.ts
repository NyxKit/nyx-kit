import { createPaletteMotion } from './useCommandPaletteMotion'
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
  const closing = ref(false)
  const motion = createPaletteMotion()
  let revision = 0
  let reducedMotion: MediaQueryList | undefined
  const onReducedMotion = () => { if (reducedMotion?.matches) motion.finish() }
  let dialog: HTMLDialogElement | null = null
  let opener: HTMLElement | null = null
  let backdropPress = false
  let composing = false
  const visible = () => props.inline || !!dialog?.open
  const focus = () => { if (mounted.value && visible() && !closing.value && !props.disabled) input.value?.focus() }
  const cleanup = () => {
    revision++
    motion.cancel()
    closing.value = false
    const previous = dialog
    if (!previous) return
    const document = previous.ownerDocument
    const state = locks.get(document)
    const wasTop = state && [...state.owners].slice(-1)[0] === previous
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
  const closeAnimated = async () => {
    if (!dialog || closing.value) return
    const current = ++revision
    closing.value = true
    await motion.play(dialog, false)
    if (current === revision && !open.value) cleanup()
  }
  watch(() => props.inline, cleanup, { flush: 'pre' })
  watch([mounted, open, () => props.inline, root], async () => {
    if (!mounted.value || props.inline) { cleanup(); return }
    if (!open.value) { void closeAnimated(); return }
    const element = root.value
    if (!element || element.tagName !== 'DIALOG') return
    if (dialog === element && !closing.value) return
    const current = ++revision
    const fresh = dialog !== element
    closing.value = false
    dialog = element as HTMLDialogElement
    const document = element.ownerDocument
    if (fresh) {
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
      dialog.showModal()
    }
    let state = locks.get(document)
    if (!state) {
      state = { owners: new Set(), value: document.body.style.getPropertyValue('overflow'), priority: document.body.style.getPropertyPriority('overflow') }
      locks.set(document, state)
      document.body.style.setProperty('overflow', 'hidden')
    }
    state.owners.add(dialog)
    const finished = motion.play(dialog, true, fresh)
    await nextTick()
    if (dialog !== element || !open.value || props.inline) return
    if (props.disabled) (focusable(element)[0] ?? element).focus()
    else focus()
    await finished
    if (current === revision) motion.cancel()
  }, { flush: 'post' })
  const dismiss = () => {
    if (props.inline) { emitClose(); return }
    if (!dialog?.open || !open.value) return
    if ([...(locks.get(dialog.ownerDocument)?.owners ?? [])].slice(-1)[0] !== dialog) return
    open.value = false
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
        event.preventDefault(); elements[elements.length - 1]?.focus()
      } else if (!event.shiftKey && (active === elements[elements.length - 1] || !elements.includes(active as HTMLElement))) {
        event.preventDefault(); elements[0].focus()
      }
    }
  }
  const outside = (event: PointerEvent) => {
    if (!dialog || event.target !== dialog) return false
    const rect = dialog.getBoundingClientRect()
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
  }
  onMounted(() => {
    mounted.value = true
    reducedMotion = root.value?.ownerDocument.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')
    reducedMotion?.addEventListener('change', onReducedMotion)
    if (props.inline && props.autofocus) focus()
  })
  onBeforeUnmount(() => { reducedMotion?.removeEventListener('change', onReducedMotion); cleanup() })
  return {
    mounted, closing, focus, dismiss, onKeydown,
    toggle: () => { if (open.value) dismiss(); else open.value = true },
    onCancel: (event: Event) => { event.preventDefault(); if (!composing) dismiss() },
    onComposition: (value: boolean) => { composing = value },
    onPointerDown: (event: PointerEvent) => { backdropPress = event.button === 0 && outside(event) },
    onPointerUp: (event: PointerEvent) => { const close = backdropPress && outside(event); backdropPress = false; if (close) dismiss() },
    onPointerCancel: () => { backdropPress = false },
  }
}
