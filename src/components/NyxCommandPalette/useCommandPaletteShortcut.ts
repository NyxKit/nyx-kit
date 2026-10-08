import { computed, onBeforeUnmount, onMounted, watch, type Ref } from 'vue'

const aliases: Record<string, string> = { CONTROL: 'CTRL', COMMAND: 'META', CMD: 'META', OPTION: 'ALT', MOD: 'SUPER', ' ': 'SPACE', '+': 'PLUS', ESC: 'ESCAPE' }
const normalizeKey = (key: string) => aliases[key.toUpperCase()] ?? key.toUpperCase()
const modifiers = new Set(['CTRL', 'META', 'ALT', 'SHIFT', 'SUPER'])
export function parseShortcut(value?: string) {
  if (!value?.trim()) return undefined
  const parts = value.split('+').map(part => normalizeKey(part.trim()))
  const keys = parts.filter(part => !modifiers.has(part))
  if (keys.length !== 1 || !keys[0] || new Set(parts).size !== parts.length
    || (parts.includes('SUPER') && (parts.includes('CTRL') || parts.includes('META')))) return undefined
  return { key: keys[0], modifiers: new Set(parts.filter(part => modifiers.has(part))) }
}
export function matchesShortcut(chord: NonNullable<ReturnType<typeof parseShortcut>>, event: KeyboardEvent) {
  const mods = chord.modifiers
  return normalizeKey(event.key) === chord.key && event.altKey === mods.has('ALT') && event.shiftKey === mods.has('SHIFT')
    && (mods.has('SUPER') ? event.ctrlKey !== event.metaKey : event.ctrlKey === mods.has('CTRL') && event.metaKey === mods.has('META'))
}
interface Registration { accepts: (event: KeyboardEvent) => boolean; root: Ref<HTMLElement | null>; toggle: () => void }
const registrations = new WeakMap<Document, Set<Registration>>()

export function useCommandPaletteShortcut(
  props: { shortcut?: string, inline: boolean, disabled: boolean },
  root: Ref<HTMLElement | null>, toggle: () => void,
) {
  const chord = computed(() => {
    const result = parseShortcut(props.shortcut)
    if (props.shortcut?.trim() && !result && import.meta.env.DEV) console.warn('[NyxCommandPalette] Invalid shortcut:', props.shortcut)
    return result
  })
  let document: Document | undefined
  let stopWatching: (() => void) | undefined
  const registration: Registration = {
    root, toggle,
    accepts: event => !props.inline && !props.disabled && !!chord.value && matchesShortcut(chord.value, event),
  }
  const handle = (event: KeyboardEvent) => {
    if (!document || event.defaultPrevented || event.repeat || event.isComposing || event.keyCode === 229) return
    const target = event.composedPath()[0]
    if (!(target instanceof HTMLElement)) return
    const modal = (document.activeElement as HTMLElement | null)?.closest('dialog[open]')
    const entries = [...(registrations.get(document) ?? [])].reverse()
    const candidates = entries.filter(entry => entry.accepts(event) && (!modal || entry.root.value === modal))
    const winner = candidates.find(entry => entry.root.value?.contains(target)) ?? candidates[0]
    if (winner !== registration) return
    const editable = target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]')
    if (editable && !root.value?.contains(target)) return
    event.preventDefault()
    toggle()
  }
  onMounted(() => {
    document = root.value?.ownerDocument
    if (!document) return
    const entries = registrations.get(document) ?? new Set<Registration>()
    entries.add(registration)
    registrations.set(document, entries)
    stopWatching = watch(() => !props.inline && !props.disabled && !!chord.value, enabled => {
      if (enabled) document?.addEventListener('keydown', handle)
      else document?.removeEventListener('keydown', handle)
    }, { immediate: true })
  })
  onBeforeUnmount(() => {
    stopWatching?.()
    document?.removeEventListener('keydown', handle)
    if (document) {
      const entries = registrations.get(document)
      entries?.delete(registration)
      if (!entries?.size) registrations.delete(document)
    }
  })
  return { matches: registration.accepts }
}
