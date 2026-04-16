import type { NyxAnimationState, NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxStatusDotProps {
  theme?: NyxTheme,
  size?: NyxSize,
  variant?: NyxVariant,
  backlight?: boolean,
  animation?: NyxAnimationState,
  label?: string
}
