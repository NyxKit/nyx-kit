import type { NyxShape, NyxTheme } from '@/types'

export interface NyxSliderProps {
  min?: number|string
  max?: number|string
  step?: number|string
  tooltip?: 'never'|'always'|'interact'
  theme?: NyxTheme
  shape?: NyxShape
  direction?: 'row'|'column'
}
