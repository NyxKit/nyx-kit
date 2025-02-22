import type { NyxShape, NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxProgressProps {
  max?: number
  theme?: NyxTheme
  variant?: NyxVariant
  shape?: NyxShape
  gradient?: NyxTheme|boolean
  size?: NyxSize
}
