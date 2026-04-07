import { type App } from 'vue'
import { vClickOutside } from './directives'
import type { NyxKitOptions } from './types'
import type { ConfirmOptions, ConfirmResult } from './types/confirm'
import { initColourMode } from './composables/useNyxColourMode'
import { useNyxConfirm } from './composables/useNyxConfirm'

export type { NyxKitPrimitive, NyxKitDefaults, NyxKitOptions, NyxColourModeOptions } from './types'
export type { ConfirmOptions, ConfirmResult } from './types/confirm'

let confirmFn: ((options: ConfirmOptions) => Promise<ConfirmResult>) | null = null

export const NyxKit = {
  install: (app: App, options: NyxKitOptions = {}) => {
    app.directive('click-outside', vClickOutside)
    app.provide('libEnv', options)
    if (typeof document !== 'undefined') {
      initColourMode(options)
    }

    const { confirm } = useNyxConfirm(app)
    confirmFn = confirm

    app.config.globalProperties.$confirm = confirm
  },

  confirm: async (options: ConfirmOptions): Promise<ConfirmResult> => {
    if (!confirmFn) {
      throw new Error('NyxKit plugin not installed. Call app.use(NyxKit) first.')
    }
    return confirmFn(options)
  }
}
