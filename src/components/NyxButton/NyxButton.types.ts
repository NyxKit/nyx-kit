import type { NyxSize, NyxVariant, NyxTheme, NyxShape } from '@/types'

export interface NyxButtonProps {
  type?: 'button'|'submit'|'reset',
  theme?: NyxTheme,
  variant?: NyxVariant
  size?: NyxSize,
  shape?: NyxShape,
  disabled?: boolean,
  href?: string
}

export interface NyxButtonEmits {
  (event: 'click'): void
}
