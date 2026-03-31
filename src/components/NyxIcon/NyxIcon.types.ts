import type { NyxTheme, NyxSize, NyxIconVariant } from '@/types'

export interface NyxIconProps {
  name: string
  variant?: NyxIconVariant
  theme?: NyxTheme
  size?: NyxSize | number
}