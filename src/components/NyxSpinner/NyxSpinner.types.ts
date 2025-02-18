import type { NyxSize, NyxTheme, NyxVariant } from '@/types'
import type { DurationSpeed } from '@/types/string'

export enum NyxSpinnerVariant {
  Ring = 'ring',
  Dots = 'dots',
  Bars = 'bars',
  Pulse = 'pulse',
  Blocks = 'blocks'
}

export interface NyxSpinnerProps {
  theme?: NyxTheme,
  size?: NyxSize
  speed?: DurationSpeed,
  // variant?: NyxSpinnerVariant
}
