import { type App } from 'vue'
import { vClickOutside } from './directives'

export * from './classes'
export * from './components'
export * from './compositions'
export * from './directives'
export * from './types'
export * from './utils'

export type NyxKitOptions = {}

/**
 * Generic Components explained
 * The generic="T" in KisweDraggable makes it a bit special, as it's not a plain DefineComponent.
 * Vue doesn’t infer the type automatically for generics, hence why we have to cast it to DefineComponent
 * => KisweComponent as unknown as DefineComponent
 */

const NyxKit = {
  install: (app: App, options?: NyxKitOptions) => {
    app.directive('click-outside', vClickOutside)
    app.provide('nyxkit', options)
  }
}

export default NyxKit
