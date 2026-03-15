import { computed, type DefineComponent, onBeforeUnmount, onMounted, type Ref, ref, watch } from 'vue'
import { type CssVariablesDict, NyxPosition, NyxSize } from '@/types'
import { clamp } from '@/utils'

interface TeleportPositionOptions {
  position?: Ref<NyxPosition>
  isEqualWidth?: boolean
  isUpdateAllowed?: Ref<boolean>
  gap?: Ref<NyxSize>
  offsetX?: number
  offsetY?: number
}

const useTeleportPosition = (
  elRelative: Ref<HTMLElement | DefineComponent | null>,
  elAbsolute: Ref<HTMLElement | DefineComponent | null>,
  options?: TeleportPositionOptions
) => {
  const position = options?.position ?? ref(NyxPosition.Bottom)
  const isEqualWidth = !!options?.isEqualWidth
  const isUpdateAllowed = computed(() => options?.isUpdateAllowed?.value !== false)
  const offsetX = options?.offsetX ?? 0
  const offsetY = options?.offsetY ?? 0

  // Compute gap as a pixel value
  const gap = computed(() => {
    if (!options?.gap?.value) return 0
    const gapValue = window
      .getComputedStyle(document.body)
      .getPropertyValue(`--nyx-gap-${ options.gap.value }`) ?? '0'
    if (gapValue.endsWith('rem')) {
      return parseFloat(gapValue) * 16 // Convert rem to pixels
    }
    return parseFloat(gapValue) // If it's 0 or other units, keep it as is
  })

  const cssVariables = ref<CssVariablesDict>({
    '--top': '0px',
    '--left': '0px',
    '--width': 'auto'
  })

  // Reactive computed position to expose externally
  const computedPosition = ref<NyxPosition>(position.value)

  const updateCssVariables = () => {
    if (!elRelative.value || !elAbsolute.value || !isUpdateAllowed.value) return

    const elRelativeRect = ('getBoundingClientRect' in elRelative.value )
      ? elRelative.value.getBoundingClientRect()
      : (elRelative.value as DefineComponent).$el.getBoundingClientRect()
    const elAbsoluteRect = ('getBoundingClientRect' in elAbsolute.value)
      ? elAbsolute.value.getBoundingClientRect()
      : (elAbsolute.value as DefineComponent).$el.getBoundingClientRect()

    const { top, bottom, left, right, width: relWidth, height: relHeight } = elRelativeRect
    const { width: absWidth, height: absHeight } = elAbsoluteRect

    const computedWidth = isEqualWidth ? relWidth : absWidth
    let computedTop = bottom
    let computedLeft = left

    // Determine if there's enough space for the absolute element
    const hasSpaceBelow = bottom + absHeight <= window.innerHeight
    const hasSpaceAbove = top - absHeight >= 0
    const hasSpaceLeft = left - absWidth >= 0
    const hasSpaceRight = right + absWidth <= window.innerWidth

    // Mirror position if there's not enough space
    const getMirroredPosition = (pos: NyxPosition) => {
      switch (pos) {
        case NyxPosition.BottomLeft:
          return hasSpaceBelow ? pos : NyxPosition.TopLeft
        case NyxPosition.BottomRight:
          return hasSpaceBelow ? pos : NyxPosition.TopRight
        case NyxPosition.Bottom:
          return hasSpaceBelow ? pos : NyxPosition.Top
        case NyxPosition.TopLeft:
          return hasSpaceAbove ? pos : NyxPosition.BottomLeft
        case NyxPosition.TopRight:
          return hasSpaceAbove ? pos : NyxPosition.BottomRight
        case NyxPosition.Top:
          return hasSpaceAbove ? pos : NyxPosition.Bottom
        case NyxPosition.Left:
          return hasSpaceLeft ? pos : NyxPosition.Right
        case NyxPosition.Right:
          return hasSpaceRight ? pos : NyxPosition.Left
        default:
          return pos
      }
    }

    computedPosition.value = getMirroredPosition(position.value)

    // Apply final positioning and factor in gap
    switch (computedPosition.value) {
      case NyxPosition.BottomLeft:
        computedTop = bottom + gap.value + offsetY
        computedLeft = left + offsetX
        break
      case NyxPosition.BottomRight:
        computedTop = bottom + gap.value + offsetY
        computedLeft = right - computedWidth + offsetX
        break
      case NyxPosition.Bottom:
        computedTop = bottom + gap.value + offsetY
        computedLeft = left + (relWidth - computedWidth) / 2 + offsetX
        break
      case NyxPosition.TopLeft:
        computedTop = top - absHeight - gap.value + offsetY
        computedLeft = left + offsetX
        break
      case NyxPosition.TopRight:
        computedTop = top - absHeight - gap.value + offsetY
        computedLeft = right - computedWidth + offsetX
        break
      case NyxPosition.Top:
        computedTop = top - absHeight - gap.value + offsetY
        computedLeft = left + (relWidth - computedWidth) / 2 + offsetX
        break
      case NyxPosition.Left:
        computedTop = top + (relHeight - absHeight) / 2 + offsetY
        computedLeft = left - absWidth - gap.value + offsetX
        break
      case NyxPosition.Right:
        computedTop = top + (relHeight - absHeight) / 2 + offsetY
        computedLeft = right + gap.value + offsetX
        break
    }

    // Ensure element stays within viewport bounds
    computedTop = clamp(computedTop, 0, window.innerHeight - absHeight)
    computedLeft = clamp(computedLeft, 0, window.innerWidth - computedWidth)

    cssVariables.value = {
      ...cssVariables.value,
      '--top': `${computedTop}px`,
      '--left': `${computedLeft}px`,
      '--width': isEqualWidth ? `${relWidth}px` : 'auto'
    }
  }

  watch([isUpdateAllowed, elRelative, elAbsolute, position], updateCssVariables, { immediate: true })

  onMounted(() => {
    window.addEventListener('resize', updateCssVariables)
    window.addEventListener('scroll', updateCssVariables, true)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCssVariables)
    window.removeEventListener('scroll', updateCssVariables, true)
  })

  return {
    cssVariables,
    updateCssVariables,
    computedPosition
  }
}

export default useTeleportPosition
