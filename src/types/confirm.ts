import type { NyxTheme } from './common'
import type { NyxResultVoid } from '../classes/NyxResult'

export interface ConfirmOptions {
  theme?: NyxTheme
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
}

export type ConfirmResult = NyxResultVoid<'cancelled'>