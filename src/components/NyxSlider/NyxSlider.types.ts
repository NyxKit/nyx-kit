import type { NyxTheme } from '@/types'

export interface NyxSliderProps {
  min?: number|string
  max?: number|string
  step?: number|string
  tooltip?: 'never'|'always'|'interact'
  theme?: NyxTheme
}
