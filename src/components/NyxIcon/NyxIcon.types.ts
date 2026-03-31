import type { NyxTheme, NyxSize } from '@/types'

export interface NyxIconProps {
  name: string
  theme?: NyxTheme
  color?: string
  size?: NyxSize | number
  stroke?: NyxSize | number
}