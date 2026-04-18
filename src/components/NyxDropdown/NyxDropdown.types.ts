import type { NyxPosition, NyxSelectOption, NyxSize, NyxTheme, NyxTrigger, NyxVariant } from '@/types'

export interface NyxDropdownProps<T = string> {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
  trigger?: NyxTrigger
  position?: NyxPosition
  options?: NyxSelectOption<T>[]
}

export interface NyxDropdownEmits<T = string> {
  (event: 'select', option: NyxSelectOption<T>): void
}

export interface NyxDropdownMenuProps<T = string> {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
  options?: NyxSelectOption<T>[]
}

export interface NyxDropdownMenuEmits<T = string> {
  (event: 'select', option: NyxSelectOption<T>): void
}

export interface NyxDropdownItemProps<T = string> {
  option: NyxSelectOption<T>
  size?: NyxSize
}

export interface NyxDropdownItemEmits<T = string> {
  (event: 'click', option: NyxSelectOption<T>): void
}
