import { type App } from 'vue'
import { vClickOutside } from './directives'
import type { NyxKitOptions } from './types'
import { initColourMode } from './composables/useNyxColourMode'
export { NyxGrid } from './components'

export type { NyxKitPrimitive, NyxKitDefaults, NyxKitOptions, NyxColourModeOptions } from './types'

export const NyxKit = {
  install: (app: App, options: NyxKitOptions = {}) => {
    app.directive('click-outside', vClickOutside)
    app.provide('libEnv', options)
    if (typeof document !== 'undefined') {
      initColourMode(options)
    }
  }
}
