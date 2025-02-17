import type { NyxInputType, NyxSize, NyxStyleVariant, NyxTheme } from '@/types'

export interface NyxInputProps {
  type?: NyxInputType
  theme?: NyxTheme,
  variant?: NyxStyleVariant
  size?: NyxSize,
  disabled?: boolean,
  readonly?: boolean,
  required?: boolean,
  autofocus?: boolean,
  placeholder?: string,
  autocomplete?: string,
  minlength?: number,
  maxlength?: number,
  pattern?: string,
  id?: string
}

export interface NyxInputEmits {
  (event: 'click'): void,
  (event: 'focus'): void,
  (event: 'blur'): void
}
