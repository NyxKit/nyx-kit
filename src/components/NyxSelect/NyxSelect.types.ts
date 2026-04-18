import type { NyxSize, NyxVariant, NyxTheme, NyxSelectOption, NyxSelectType, NyxSelectOptionGroup } from '@/types'

export interface NyxSelectProps<T = string> {
  type?: NyxSelectType
  theme?: NyxTheme,
  variant?: NyxVariant
  size?: NyxSize,
  disabled?: boolean,
  placeholder?: string,
  options: NyxSelectOption<T>[] | NyxSelectOptionGroup<T>[],
  id?: string
}

export interface NyxSelectEmits<T = string> {
  (event: 'select', option: NyxSelectOption<T>): void
}
