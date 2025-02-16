import type { NyxSize, NyxButtonVariant, NyxTheme } from '@/types'

export interface NyxButtonProps {
  type?: 'button'|'submit'|'reset',
  theme?: NyxTheme,
  variant?: NyxButtonVariant
  size?: NyxSize,
  disabled?: boolean,
  href?: string
}

export interface NyxButtonEmits {
  (event: 'click'): void
}
