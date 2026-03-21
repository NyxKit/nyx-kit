import { type App } from 'vue'
import { vClickOutside } from './directives'
import type { NyxSize, NyxTheme, NyxVariant } from './types'

export type NyxKitOptions = {
  pixel?: boolean
  defaults?: {
    theme?: NyxTheme
    size?: NyxSize
    variant?: NyxVariant
  }
}

export const NyxKit = {
  install: (app: App, options: NyxKitOptions = {}) => {
    app.directive('click-outside', vClickOutside)
    app.provide('libEnv', options)
  }
}
