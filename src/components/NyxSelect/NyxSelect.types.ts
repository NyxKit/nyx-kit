import type { NyxSize, NyxVariant, NyxTheme, NyxSelectOption, NyxSelectType } from '@/types'

export interface NyxSelectProps {
  type?: NyxSelectType
  theme?: NyxTheme,
  variant?: NyxVariant
  size?: NyxSize,
  disabled?: boolean,
  placeholder?: string,
  options: NyxSelectOption[],
  id?: string
}
