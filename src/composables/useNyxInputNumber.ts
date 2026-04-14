import { computed, onBeforeUnmount, ref, type Ref } from 'vue'
import { NyxInputNumberControls, NyxInputType, NyxVariant } from '@/types'

export interface UseNyxInputNumberOptions {
  type?: NyxInputType
  step?: number
  min?: number
  max?: number
  numberControls?: NyxInputNumberControls
  holdDelay?: number
}

export const useNyxInputNumber = (
  options: UseNyxInputNumberOptions,
  model: Ref<string | undefined>,
  nyxVariant: Ref<NyxVariant>
) => {
  const holdStartTimer = ref<number | null>(null)
  const holdRepeatTimer = ref<number | null>(null)
  const holdPressCount = ref(0)
  const suppressNextClick = ref(false)
  const holdDelay = options.holdDelay ?? 400

  const normalizedNumberControls = computed(() => {
    if (options.type !== NyxInputType.Number) return NyxInputNumberControls.None
    return options.numberControls ?? NyxInputNumberControls.Stacked
  })

  const numberButtonVariant = computed(() => {
    const variantsSoft = [NyxVariant.Filled, NyxVariant.Soft]
    const variantsGhost = [NyxVariant.Ghost, NyxVariant.Outline]
    if (variantsSoft.includes(nyxVariant.value)) return NyxVariant.Soft
    if (variantsGhost.includes(nyxVariant.value)) return NyxVariant.Ghost
    return NyxVariant.Ghost
  })

  const clearHoldTimers = () => {
    if (holdStartTimer.value !== null) {
      window.clearTimeout(holdStartTimer.value)
      holdStartTimer.value = null
    }

    if (holdRepeatTimer.value !== null) {
      window.clearInterval(holdRepeatTimer.value)
      holdRepeatTimer.value = null
    }

    holdPressCount.value = 0
  }

  const updateNumberValue = (direction: 1 | -1) => {
    const fallbackValue = direction > 0 ? options.min?.toString() : options.max?.toString()
    const value = model.value?.trim() ? model.value.trim() : fallbackValue ?? '0'
    const currentValue = Number.parseFloat(value)

    if (Number.isNaN(currentValue)) return

    const nextValue = currentValue + ((options.step ?? 1) * direction)
    model.value = nextValue.toString()
  }

  const startHold = (direction: 1 | -1) => {
    clearHoldTimers()
    suppressNextClick.value = true
    holdPressCount.value = 1
    updateNumberValue(direction)

    holdStartTimer.value = window.setTimeout(() => {
      holdRepeatTimer.value = window.setInterval(() => {
        holdPressCount.value += 1
        updateNumberValue(direction)
      }, 120)
    }, holdDelay)
  }

  const stopHold = () => {
    clearHoldTimers()
  }

  const onNumberButtonClick = (direction: 1 | -1, event?: MouseEvent) => {
    if (suppressNextClick.value) {
      suppressNextClick.value = false
      return
    }

    if (event?.detail && event.detail > 0) return
    updateNumberValue(direction)
  }

  const onNumberButtonPointerDown = (direction: 1 | -1, event: PointerEvent) => {
    if (event.button !== 0) return
    startHold(direction)

    const target = event.currentTarget as HTMLButtonElement | null
    target?.setPointerCapture?.(event.pointerId)
  }

  const onNumberButtonPointerUp = () => {
    stopHold()
  }

  const onNumberButtonPointerCancel = () => {
    stopHold()
    suppressNextClick.value = false
  }

  onBeforeUnmount(() => {
    clearHoldTimers()
  })

  return {
    normalizedNumberControls,
    numberButtonVariant,
    onNumberButtonClick,
    onNumberButtonPointerDown,
    onNumberButtonPointerCancel,
    onNumberButtonPointerUp,
  }
}

export default useNyxInputNumber
