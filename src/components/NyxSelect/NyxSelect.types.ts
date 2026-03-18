import type { NyxSize, NyxVariant, NyxTheme, NyxSelectOption, NyxSelectType, NyxSelectOptionGroup } from '@/types'

export interface NyxSelectProps {
  type?: NyxSelectType
  theme?: NyxTheme,
  variant?: NyxVariant
  size?: NyxSize,
  disabled?: boolean,
  placeholder?: string,
  options: NyxSelectOption[]|NyxSelectOptionGroup[],
  id?: string,
  multiple?: boolean
}
