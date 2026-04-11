import type { NyxTheme, NyxSort, NyxSize } from '@/types'

export interface NyxLogViewerProps {
  timestampFormat?: string
  sort?: NyxSort
  theme?: NyxTheme
  size?: NyxSize
}
