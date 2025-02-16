import type { NyxSize, NyxStyleVariant, NyxTheme, NyxSelectOption, NyxSelectType } from '@/types'

export interface NyxSelectProps {
  type?: NyxSelectType
  theme?: NyxTheme,
  variant?: NyxStyleVariant
  size?: NyxSize,
  disabled?: boolean,
  placeholder?: string,
  options: NyxSelectOption[]
}

export interface NyxSelectEmits {
  (event: 'click'): void
}
