import type { NyxProgressVariant, NyxShape, NyxSize, NyxTheme } from '@/types'

export interface NyxProgressProps {
  min?: number
  max?: number
  theme?: NyxTheme
  variant?: NyxProgressVariant
  shape?: NyxShape
  gradient?: NyxTheme|boolean
  size?: NyxSize
  showValue?: 'start' | 'end' | 'center'
}
