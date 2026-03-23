import type { NyxSize, NyxVariant, NyxTheme, NyxSelectOption, NyxSelectOptionGroup } from '@/types'

export interface NyxSelectProps {
  theme?: NyxTheme,
  variant?: NyxVariant
  size?: NyxSize,
  disabled?: boolean,
  placeholder?: string,
  options: NyxSelectOption[]|NyxSelectOptionGroup[],
  id?: string,
  multiple?: boolean
}
