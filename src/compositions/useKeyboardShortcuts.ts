import type { KeyDict } from '@/types'
import { onMounted, onUnmounted } from 'vue'

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

const useKeyboardShortcuts = (shortcuts: Record<string, (event: KeyboardEvent) => void>) => {
  const keyHistory: Set<string> = new Set()

  const keydownHandler = (event: KeyboardEvent) => {
    const key = getNormalizedKeyName(event.key)
    keyHistory.add(key)
    const combination = Array.from(keyHistory).sort(keySort).join('+')
    console.log('event', { key: event.key, keyHistory, combination })

    if (shortcuts[combination]) {
      event.preventDefault()
      shortcuts[combination](event)
    }
  }

  const keyupHandler = (event: KeyboardEvent) => {
    keyHistory.delete(getNormalizedKeyName(event.key))
  }

  onMounted(() => {
    window.addEventListener('keydown', keydownHandler)
    window.addEventListener('keyup', keyupHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', keydownHandler)
    window.removeEventListener('keyup', keyupHandler)
  })
}

export default useKeyboardShortcuts
