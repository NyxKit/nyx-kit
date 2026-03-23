import type { NyxSize, NyxTheme, NyxVariant } from './common'

export type NyxKitPrimitive = 'all'|'button'|'input'|'select'|'textarea'|'checkbox'|'radio'|'switch'

export interface NyxKitDefaults {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
}

export type NyxKitOptions = {
  pixel?: boolean
  defaults?: Partial<Record<NyxKitPrimitive, NyxKitDefaults>>
}
