import type { NyxInputType, NyxSize, NyxVariant, NyxTheme, NyxInputNumberControls } from '@/types'

export interface NyxInputProps {
  // props
  type?: NyxInputType
  theme?: NyxTheme
  variant?: NyxVariant
  size?: NyxSize
  pixel?: boolean
  prefix?: string
  suffix?: string
  numberControls?: NyxInputNumberControls

  // native
  id?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  autofocus?: boolean
  placeholder?: string
  autocomplete?: string
  minlength?: number
  maxlength?: number
  pattern?: string
  tabindex?: number
  min?: number
  max?: number
  step?: number
}

export interface NyxInputEmits {
  (event: 'click'): void
  (event: 'focus'): void
  (event: 'blur'): void
}
