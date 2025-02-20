import { onMounted, onUnmounted } from 'vue'

const useKeyboardShortcuts = (shortcuts: Record<string, (event: KeyboardEvent) => void>) => {
  const pressedKeys: Set<string> = new Set()

  const keydownHandler = (event: KeyboardEvent) => {
    pressedKeys.add(event.key.toLowerCase())
    const combination = Array.from(pressedKeys).sort().join('+')

    if (shortcuts[combination]) {
      event.preventDefault()
      shortcuts[combination](event)
    }
  }

  const keyupHandler = (event: KeyboardEvent) => {
    pressedKeys.delete(event.key.toLowerCase())
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
