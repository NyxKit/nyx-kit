import type { NyxSize, NyxVariant, NyxTheme } from '@/types'

export interface NyxButtonProps {
  type?: 'button'|'submit'|'reset',
  theme?: NyxTheme,
  variant?: NyxVariant
  size?: NyxSize,
  disabled?: boolean,
  href?: string
}

export interface NyxButtonEmits {
  (event: 'click'): void
}
