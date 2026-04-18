import { computed, type Ref } from 'vue'
import type { NyxSelectOption } from '@/types'

export interface UseSelectKeyboardControlsOptions<T = string> {
  options: Ref<NyxSelectOption<T>[]>
  focusedValue: Ref<T | null>
  isOpen: Ref<boolean>
  onSelect: (option: NyxSelectOption<T>) => void
  isOptionDisabled: (option: NyxSelectOption<T>) => boolean
  scrollToOption: (value: T) => void
}

export const useSelectKeyboardControls = <T = string>({
  options,
  focusedValue,
  isOpen,
  onSelect,
  isOptionDisabled,
  scrollToOption
}: UseSelectKeyboardControlsOptions<T>) => {
  const focusedIndex = computed(() => {
    if (!focusedValue.value) return -1
    return options.value.findIndex((opt) => opt.value === focusedValue.value)
  })

  const getNextEnabledIndex = (startIdx: number, direction: 1 | -1): number => {
    const opts = options.value
    let idx = startIdx
    for (let i = 0; i < opts.length; i++) {
      idx = (startIdx + direction * i + opts.length) % opts.length
      if (!isOptionDisabled(opts[idx])) {
        return idx
      }
    }
    return -1
  }

  const onInputKeydown = (e: KeyboardEvent) => {
    const opts = options.value
    if (opts.length === 0) return

    const currentIdx = focusedIndex.value

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        isOpen.value = true
        const startIdx = currentIdx < 0 ? 0 : currentIdx + 1
        const nextIdx = getNextEnabledIndex(startIdx, 1)
        if (nextIdx >= 0) {
          focusedValue.value = opts[nextIdx].value
          scrollToOption(opts[nextIdx].value)
        }
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        isOpen.value = true
        const startIdx = currentIdx < 0 ? opts.length - 1 : currentIdx - 1
        const nextIdx = getNextEnabledIndex(startIdx, -1)
        if (nextIdx >= 0) {
          focusedValue.value = opts[nextIdx].value
          scrollToOption(opts[nextIdx].value)
        }
        break
      }
      case 'Enter': {
        if (focusedValue.value) {
          e.preventDefault()
          const option = opts.find((opt) => opt.value === focusedValue.value)
          if (option && !isOptionDisabled(option)) {
            onSelect(option)
          }
        }
        break
      }
      case 'Home': {
        e.preventDefault()
        isOpen.value = true
        const firstIdx = getNextEnabledIndex(0, 1)
        if (firstIdx >= 0) {
          focusedValue.value = opts[firstIdx].value
          scrollToOption(opts[firstIdx].value)
        }
        break
      }
      case 'End': {
        e.preventDefault()
        isOpen.value = true
        const lastIdx = getNextEnabledIndex(opts.length - 1, -1)
        if (lastIdx >= 0) {
          focusedValue.value = opts[lastIdx].value
          scrollToOption(opts[lastIdx].value)
        }
        break
      }
    }
  }

  return {
    onInputKeydown
  }
}
