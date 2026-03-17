import { onMounted, onUnmounted, type Ref } from 'vue'

const getNormalizedKeyName = (key: string) => {
  if (key === ' ') return 'SPACE'
  return key.toUpperCase()
}

const keyModifiers = ['ALT', 'SHIFT', 'CTRL', 'META']

const keySort = (a: string, b: string) => {
  const aIsModifier = keyModifiers.includes(a)
  const bIsModifier = keyModifiers.includes(b)

  if (aIsModifier && !bIsModifier) return -1
  if (!aIsModifier && bIsModifier) return 1
  return 0
}

const expandShortcuts = (
  shortcuts: Record<string, (event: KeyboardEvent) => void>
): Record<string, (event: KeyboardEvent) => void> => {
  const expanded: Record<string, (event: KeyboardEvent) => void> = {}
  for (const [combo, handler] of Object.entries(shortcuts)) {
    if (combo.includes('SUPER')) {
      expanded[combo.replace('SUPER', 'CTRL')] = handler
      expanded[combo.replace('SUPER', 'META')] = handler
    } else {
      expanded[combo] = handler
    }
  }
  return expanded
}

const useKeyboardShortcuts = (
  shortcuts: Record<string, (event: KeyboardEvent) => void>,
  target?: Ref<HTMLElement | null>
) => {
  const expanded = expandShortcuts(shortcuts)
  const keyHistory: Set<string> = new Set()

  const getTarget = () => target?.value ?? window

  const keydownHandler = (event: KeyboardEvent) => {
    const key = getNormalizedKeyName(event.key)
    keyHistory.add(key)
    const combination = Array.from(keyHistory).sort(keySort).join('+')

    if (expanded[combination]) {
      event.preventDefault()
      expanded[combination](event)
    }
  }

  const keyupHandler = (event: KeyboardEvent) => {
    keyHistory.delete(getNormalizedKeyName(event.key))
  }

  onMounted(() => {
    getTarget().addEventListener('keydown', keydownHandler as EventListener)
    getTarget().addEventListener('keyup', keyupHandler as EventListener)
  })

  onUnmounted(() => {
    getTarget().removeEventListener('keydown', keydownHandler as EventListener)
    getTarget().removeEventListener('keyup', keyupHandler as EventListener)
  })
}

export default useKeyboardShortcuts
