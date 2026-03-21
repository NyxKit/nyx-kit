import { type App } from 'vue'
import { vClickOutside } from './directives'
import type { NyxSize, NyxTheme, NyxVariant } from './types'

export type NyxKitPrimitive = 'all'|'button'|'input'|'select'|'textarea'|'checkbox'|'radio'|'switch'
export interface NyxKitDefaults {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
}

export type NyxKitOptions = {
  pixel?: boolean
  defaults?: Record<NyxKitPrimitive, NyxKitDefaults>
}

export const NyxKit = {
  install: (app: App, options: NyxKitOptions = {}) => {
    app.directive('click-outside', vClickOutside)
    app.provide('libEnv', options)
  }
}
