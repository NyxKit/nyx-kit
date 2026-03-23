import { type App } from 'vue'
import { vClickOutside } from './directives'
import type { NyxKitOptions } from './types'

export type { NyxKitPrimitive, NyxKitDefaults, NyxKitOptions } from './types'

export const NyxKit = {
  install: (app: App, options: NyxKitOptions = {}) => {
    app.directive('click-outside', vClickOutside)
    app.provide('libEnv', options)
  }
}
