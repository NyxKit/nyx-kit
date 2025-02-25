import type { NyxPosition, NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxTooltipProps {
  text?: string|number
  theme?: NyxTheme
  variant?: NyxVariant
  size?: NyxSize
  position?: NyxPosition
  disabled?: boolean,
  trigger?: 'click'|'hover'|'manual',
  forceUpdate?: boolean|number
}
