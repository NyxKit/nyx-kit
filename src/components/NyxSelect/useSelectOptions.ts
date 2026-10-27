import { computed, type Ref } from 'vue'
import type { NyxSelectOption, NyxSelectOptionGroup } from '@/types'

export function useSelectOptions<T>(
  options: () => NyxSelectOption<T>[] | NyxSelectOptionGroup<T>[],
  searchQuery: Ref<string>
) {
  const isGrouped = computed(() => options().length > 0 && 'options' in options()[0])

  const flatOptions = computed((): NyxSelectOption<T>[] => {
    if (!isGrouped.value) return options() as NyxSelectOption<T>[]
    return (options() as NyxSelectOptionGroup<T>[]).flatMap((group) => group.options)
  })

  const filteredOptions = computed(() => {
    const query = searchQuery.value.toLowerCase()
    if (!query) return options()
    if (isGrouped.value) {
      return (options() as NyxSelectOptionGroup<T>[])
        .map((group) => ({
          ...group,
          options: group.options.filter((opt) => opt.label.toLowerCase().includes(query))
        }))
        .filter((group) => group.options.length > 0)
    }
    return (options() as NyxSelectOption<T>[]).filter((opt) =>
      opt.label.toLowerCase().includes(query)
    )
  })

  const flatFilteredOptions = computed((): NyxSelectOption<T>[] => {
    if (isGrouped.value) {
      return (filteredOptions.value as NyxSelectOptionGroup<T>[]).flatMap((group) => group.options)
    }
    return filteredOptions.value as NyxSelectOption<T>[]
  })

  return { isGrouped, flatOptions, filteredOptions, flatFilteredOptions }
}
