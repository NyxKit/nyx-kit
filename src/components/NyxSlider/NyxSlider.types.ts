import type { NyxShape, NyxTheme } from '@/types'

export interface NyxSliderProps {
  min?: number
  max?: number
  step?: number
  // marks?: number|number[]
  // snap?: boolean
  tooltip?: 'never'|'always'|'interact'
  theme?: NyxTheme
  shape?: NyxShape
  direction?: 'row'|'column'
}
