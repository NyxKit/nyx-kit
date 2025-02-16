import { clamp, type CssVariablesDict, NyxPosition } from '@/types'
import { computed, onBeforeUnmount, onMounted, type Ref, ref, watch } from 'vue'

interface TeleportPositionOptions {
  position?: Ref<NyxPosition>
  isEqualWidth?: boolean,
  isUpdateAllowed?: Ref<boolean>
}

const useTeleportPosition = (
  elRelative: Ref<HTMLElement | null>,
  elAbsolute: Ref<HTMLElement | null>,
  options?: TeleportPositionOptions
) => {
  const position = options?.position ?? ref(NyxPosition.BottomRight)
  const isEqualWidth = !!options?.isEqualWidth
  const isUpdateAllowed = computed(() => options?.isUpdateAllowed?.value !== false)

  const cssVariables = ref<CssVariablesDict>({
    '--top': '0px',
    '--left': '0px',
    '--width': 'auto'
  })

  const updateCssVariables = () => {
    if (!elRelative.value || !elAbsolute.value) return
    if (!isUpdateAllowed.value) return

    const { top, bottom, left, right, width: relWidth, height: relHeight } = elRelative.value.getBoundingClientRect()
    const { width: absWidth, height: absHeight } = elAbsolute.value.getBoundingClientRect()

    const computedWidth = isEqualWidth ? relWidth : absWidth

    let computedTop = bottom
    let computedLeft = left

    switch (position.value) {
      case NyxPosition.BottomLeft:
        computedTop = bottom
        computedLeft = left
        break
      case NyxPosition.BottomRight:
        computedTop = bottom
        computedLeft = right - computedWidth
        break
      case NyxPosition.BottomCenter:
        computedTop = bottom
        computedLeft = left + (relWidth - computedWidth) / 2
        break
      case NyxPosition.TopLeft:
        computedTop = top - absHeight
        computedLeft = left
        break
      case NyxPosition.TopRight:
        computedTop = top - absHeight
        computedLeft = right - computedWidth
        break
      case NyxPosition.TopCenter:
        computedTop = top - absHeight
        computedLeft = left + (relWidth - computedWidth) / 2
        break
      case NyxPosition.LeftCenter:
        computedTop = top + (relHeight - absHeight) / 2
        computedLeft = left - absWidth
        break
      case NyxPosition.RightCenter:
        computedTop = top + (relHeight - absHeight) / 2
        computedLeft = right
        break
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    computedTop = clamp(computedTop, 0, viewportHeight - absHeight)
    computedLeft = clamp(computedLeft, 0, viewportWidth - computedWidth)

    cssVariables.value['--top'] = `${computedTop}px`
    cssVariables.value['--left'] = `${computedLeft}px`
    cssVariables.value['--width'] = isEqualWidth ? `${relWidth}px` : 'auto'
  }

  watch([isUpdateAllowed, elRelative, elAbsolute, position], () => updateCssVariables(), { immediate: true })

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
    updateCssVariables
  }
}

export default useTeleportPosition
