import { type DefineComponent, type Ref } from 'vue'
import useTeleportPositionBase, { type TeleportPositionOptions } from './useTeleportPositionBase'

const useSelectionPosition = (
  elAbsolute: Ref<HTMLElement | DefineComponent | null>,
  options?: TeleportPositionOptions
) => {
  const getAnchorRect = (): DOMRect | null => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return null
    return sel.getRangeAt(0).getBoundingClientRect()
  }

  return useTeleportPositionBase(getAnchorRect, elAbsolute, options)
}

export default useSelectionPosition
