import { type App } from 'vue'
import { vClickOutside } from './directives'

export type NyxKitOptions = {
  pixel?: boolean
}

export const NyxKit = {
  install: (app: App, options: NyxKitOptions = {}) => {
    app.directive('click-outside', vClickOutside)
    app.provide('libEnv', options)
  }
}
