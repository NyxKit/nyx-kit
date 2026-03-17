import { type DefineComponent, type Ref, watch } from 'vue'
import useTeleportPositionBase, { type TeleportPositionOptions } from './useTeleportPositionBase'

const useTeleportPosition = (
  elRelative: Ref<HTMLElement | DefineComponent | null>,
  elAbsolute: Ref<HTMLElement | DefineComponent | null>,
  options?: TeleportPositionOptions
) => {
  const getAnchorRect = (): DOMRect | null => {
    if (!elRelative.value) return null
    return ('getBoundingClientRect' in elRelative.value)
      ? elRelative.value.getBoundingClientRect()
      : (elRelative.value as DefineComponent).$el.getBoundingClientRect()
  }

  const result = useTeleportPositionBase(getAnchorRect, elAbsolute, options)

  // Re-position when the anchor element itself changes
  watch(elRelative, result.updateCssVariables)

  return result
}

export default useTeleportPosition
