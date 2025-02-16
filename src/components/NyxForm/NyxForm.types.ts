export interface NyxFormFieldProps {
  label?: string
}

export interface NyxFormEmits {
  (event: 'submit', value: Event): void
}
