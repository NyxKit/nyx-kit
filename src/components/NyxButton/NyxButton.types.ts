import type { NyxSize, NyxStyleVariant, NyxTheme } from '@/types'

export interface NyxButtonProps {
  type?: 'button'|'submit'|'reset',
  theme?: NyxTheme,
  variant?: NyxStyleVariant
  size?: NyxSize,
  disabled?: boolean,
  href?: string
}

export interface NyxButtonEmits {
  (event: 'click'): void
}
