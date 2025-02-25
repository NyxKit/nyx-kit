import type { NyxInputType, NyxSize, NyxVariant, NyxTheme } from '@/types'

export interface NyxInputProps {
  type?: NyxInputType
  theme?: NyxTheme,
  variant?: NyxVariant
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
  id?: string,
  pixel?: boolean
}

export interface NyxInputEmits {
  (event: 'click'): void,
  (event: 'focus'): void,
  (event: 'blur'): void
}
