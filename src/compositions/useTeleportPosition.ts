import { clamp, type CssVariablesDict, NyxPosition, NyxSize } from '@/types'
import { computed, onBeforeUnmount, onMounted, type Ref, ref, watch } from 'vue'

interface TeleportPositionOptions {
  position?: Ref<NyxPosition>
  isEqualWidth?: boolean
  isUpdateAllowed?: Ref<boolean>
  gap?: Ref<NyxSize>
}

const useTeleportPosition = (
  elRelative: Ref<HTMLElement | null>,
  elAbsolute: Ref<HTMLElement | null>,
  options?: TeleportPositionOptions
) => {
  const position = options?.position ?? ref(NyxPosition.BottomCenter)
  const isEqualWidth = !!options?.isEqualWidth
  const isUpdateAllowed = computed(() => options?.isUpdateAllowed?.value !== false)

  // Compute gap as a pixel value
  const gap = computed(() => {
    if (!options?.gap?.value) return 0
    const gapValue = window
      .getComputedStyle(document.body)
      .getPropertyValue(`--nyx-gap-${ options.gap.value }`) ?? '0'
    console.log('gapValue', gapValue)
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

    const { top, bottom, left, right, width: relWidth, height: relHeight } = elRelative.value.getBoundingClientRect()
    const { width: absWidth, height: absHeight } = elAbsolute.value.getBoundingClientRect()

    console.log('>>', { top, bottom, left, right, relWidth, relHeight })

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
        case NyxPosition.BottomCenter:
          return hasSpaceBelow ? pos : NyxPosition.TopCenter
        case NyxPosition.TopLeft:
          return hasSpaceAbove ? pos : NyxPosition.BottomLeft
        case NyxPosition.TopRight:
          return hasSpaceAbove ? pos : NyxPosition.BottomRight
        case NyxPosition.TopCenter:
          return hasSpaceAbove ? pos : NyxPosition.BottomCenter
        case NyxPosition.LeftMiddle:
          return hasSpaceLeft ? pos : NyxPosition.RightMiddle
        case NyxPosition.RightMiddle:
          return hasSpaceRight ? pos : NyxPosition.LeftMiddle
        default:
          return pos
      }
    }

    computedPosition.value = getMirroredPosition(position.value)

    // Apply final positioning and factor in gap
    switch (computedPosition.value) {
      case NyxPosition.BottomLeft:
        computedTop = bottom + gap.value
        computedLeft = left
        break
      case NyxPosition.BottomRight:
        computedTop = bottom + gap.value
        computedLeft = right - computedWidth
        break
      case NyxPosition.BottomCenter:
        computedTop = bottom + gap.value
        computedLeft = left + (relWidth - computedWidth) / 2
        break
      case NyxPosition.TopLeft:
        computedTop = top - absHeight - gap.value
        computedLeft = left
        break
      case NyxPosition.TopRight:
        computedTop = top - absHeight - gap.value
        computedLeft = right - computedWidth
        break
      case NyxPosition.TopCenter:
        computedTop = top - absHeight - gap.value
        computedLeft = left + (relWidth - computedWidth) / 2
        break
      case NyxPosition.LeftMiddle:
        computedTop = top + (relHeight - absHeight) / 2
        computedLeft = left - absWidth - gap.value
        break
      case NyxPosition.RightMiddle:
        computedTop = top + (relHeight - absHeight) / 2
        computedLeft = right + gap.value
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
