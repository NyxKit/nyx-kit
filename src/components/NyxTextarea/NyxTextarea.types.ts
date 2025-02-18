import type { NyxSize, NyxVariant, NyxTheme } from '@/types'

export interface NyxTextareaProps {
  theme?: NyxTheme,
  variant?: NyxVariant
  size?: NyxSize
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  autofocus?: boolean
  placeholder?: string
  autocomplete?: string
  minlength?: number
  maxlength?: number
  pattern?: string
  id?: string
}

export interface NyxTextareaEmits {
  (event: 'click'): void
  (event: 'focus'): void
  (event: 'blur'): void
}
