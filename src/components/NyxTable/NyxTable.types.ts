import type { NyxSize, NyxStyleVariant, NyxTheme } from '@/types'

export interface NyxTableProps<T> {
  theme?: NyxTheme,
  size?: NyxSize,
  variant?: NyxStyleVariant,
  itemKey?: keyof T,
  disabled?: boolean,
  columns?: number,
  columnTitles?: string[],
  gridTemplateColumns?: string,
  hasHeader?: boolean
}
