import type { NyxSize } from '@/types'

export interface NyxFormProps {
  size?: NyxSize
}

export interface NyxFormFieldProps {
  label?: string
}

export interface NyxFormEmits {
  (event: 'submit', value: Event): void
}
