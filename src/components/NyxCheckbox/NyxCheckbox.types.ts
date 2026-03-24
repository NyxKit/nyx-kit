import type { NyxSize, NyxTheme } from '@/types'

export interface NyxCheckboxProps {
  label?: string
  disabled?: boolean
  size?: NyxSize
  theme?: NyxTheme
  // variant?: NyxVariant
  id?: string
  checkmark?: string
  pixel?: boolean
}
