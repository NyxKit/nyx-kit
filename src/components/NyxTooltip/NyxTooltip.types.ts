import type { NyxPosition, NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxTooltipProps {
  text?: string|number
  theme?: NyxTheme
  variant?: NyxVariant
  size?: NyxSize
  position?: NyxPosition
  disabled?: boolean,
  /** Automatic opening delay in milliseconds. Defaults to 150. */
  delay?: number
  trigger?: 'click'|'hover'|'manual'
}
