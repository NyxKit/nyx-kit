import type {
  NyxEditorMode,
  NyxEditorFormat,
  NyxSize,
  NyxVariant,
  NyxTheme,
  NyxEditorToolbar,
} from '@/types'
import type {
  NyxAnnotationAnchor,
  NyxEditorMeta,
  NyxAnnotationStatusTheme,
} from '@/types/editor'

export interface NyxEditorProps {
  mode?: NyxEditorMode
  format?: NyxEditorFormat
  toolbar?: NyxEditorToolbar
  theme?: NyxTheme
  variant?: NyxVariant
  size?: NyxSize
  pixel?: boolean
  disabled?: boolean
  placeholder?: string
  hasSourceToggle?: boolean
  hasFooter?: boolean
  annotationStatusTheme?: NyxAnnotationStatusTheme
}

export interface NyxEditorEmits {
  (event: 'change', content: string): void
  (event: 'focus', e: FocusEvent): void
  (event: 'blur', e: FocusEvent): void
  (event: 'selection', selection: NyxAnnotationAnchor): void
  (event: 'annotation:create', anchor: NyxAnnotationAnchor): void
  (event: 'annotation:focus', id: string): void
  (event: 'annotation:blur', id: string): void
}

export interface NyxEditorSlots {
  footer(props: { meta: NyxEditorMeta }): unknown
}
