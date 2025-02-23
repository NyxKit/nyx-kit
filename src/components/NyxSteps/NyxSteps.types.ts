import type { NyxShape, NyxSize, NyxTheme } from '@/types'

export interface NyxStepsProps {
  steps: number|string[]
  theme?: NyxTheme
  shape?: NyxShape
  size?: NyxSize
  themeComplete?: NyxTheme
  themeIncomplete?: NyxTheme
  readonly?: boolean,
  direction?: 'row'|'column'
}
