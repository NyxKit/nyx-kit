import type { NyxPosition, NyxSelectOption, NyxSize, NyxTheme, NyxTrigger, NyxVariant } from '@/types'

export interface NyxDropdownProps {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
  trigger?: NyxTrigger
  position?: NyxPosition
  options?: NyxSelectOption[]
}

export interface NyxDropdownEmits {
  (event: 'select', option: NyxSelectOption): void
}

export interface NyxDropdownMenuProps {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
  options?: NyxSelectOption[]
}

export interface NyxDropdownMenuEmits {
  (event: 'select', option: NyxSelectOption): void
}

export interface NyxDropdownItemProps {
  option: NyxSelectOption
  size?: NyxSize
}

export interface NyxDropdownItemEmits {
  (event: 'click', option: NyxSelectOption): void
}
