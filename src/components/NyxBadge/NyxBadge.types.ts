import type { NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxBadgeProps {
  disabled?: boolean,
  theme?: NyxTheme,
  variant?: NyxVariant,
  size?: NyxSize,
  hasClose?: boolean
}

export interface NyxBadgeEmits {
  (event: 'click'): void
  (event: 'close'): void
}
