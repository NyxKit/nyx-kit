import type { NyxPosition, NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxTooltipProps {
  text?: string
  theme?: NyxTheme
  variant?: NyxVariant
  size?: NyxSize
  position?: NyxPosition
  disabled?: boolean
}
