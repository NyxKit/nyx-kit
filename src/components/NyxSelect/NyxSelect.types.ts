import type { NyxSize, NyxVariant, NyxTheme, NyxSelectOption, NyxSelectType, NyxSelectOptionGroup } from '@/types'
import type { VNode } from 'vue'

export interface NyxSelectSlots<T = string> {
  option?: (props: { option: NyxSelectOption<T> }) => VNode[]
  empty?: () => VNode[]
}

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
