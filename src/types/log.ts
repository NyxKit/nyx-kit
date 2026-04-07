import type { NyxTheme } from './common'

export interface NyxLogEntry {
  timestamp: Date | number | string
  value: string
  origin?: string
  theme?: NyxTheme
}
