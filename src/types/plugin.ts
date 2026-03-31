import type { NyxSize, NyxTheme, NyxVariant } from './common'
import type { NyxColourMode } from './colour-mode'

export type NyxKitPrimitive = 'all'|'button'|'input'|'select'|'textarea'|'checkbox'|'radio'|'switch'|'icon'

export interface NyxKitDefaults {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
  stroke?: NyxSize
}

export type NyxColourModeOptions = {
  mode?: NyxColourMode
  adaptiveDayStart?: number
  adaptiveDayEnd?: number
}

export type NyxKitOptions = {
  pixel?: boolean
  colourMode?: NyxColourModeOptions
  defaults?: Partial<Record<NyxKitPrimitive, NyxKitDefaults>>
}
