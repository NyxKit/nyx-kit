import type { KeyboardKey } from '@/types'
import { onMounted, onUnmounted } from 'vue'

const useKeyPress = (key: KeyboardKey, callback: (event: KeyboardEvent) => void) => {
  const handler = (event: KeyboardEvent) => {
    if (event.key !== key) return
    callback(event)
  }

  onMounted(() => {
    window.addEventListener('keydown', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handler)
  })
}

export default useKeyPress
