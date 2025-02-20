import type { NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxCardProps {
  theme?: NyxTheme,
  size?: NyxSize,
  variant?: NyxVariant,
  gradient?: boolean|NyxTheme,
  backlight?: boolean|NyxTheme,
  title?: string,
  src?: string,
  textAlign?: 'left'|'center'|'right'|'justify',
  layout?: 'header-first'|'media-first',
  blendMedia?: boolean
}

export interface NyxCardEmits {
  (event: 'click'): void
}
