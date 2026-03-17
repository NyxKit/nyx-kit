import type { NyxEditorMode, NyxEditorFormat, NyxSize, NyxVariant, NyxTheme } from '@/types'

export interface NyxEditorProps {
  mode?: NyxEditorMode
  format?: NyxEditorFormat
  theme?: NyxTheme
  variant?: NyxVariant
  size?: NyxSize
  pixel?: boolean
  disabled?: boolean
  placeholder?: string
  hasSourceToggle?: boolean
}

export interface NyxEditorEmits {
  (event: 'change', content: string): void
  (event: 'focus', e: FocusEvent): void
  (event: 'blur', e: FocusEvent): void
}
