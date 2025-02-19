import type { NyxSize, NyxVariant, NyxTheme } from '@/types'

export interface NyxTableProps<T> {
  theme?: NyxTheme,
  size?: NyxSize,
  variant?: NyxVariant,
  itemKey?: keyof T,
  disabled?: boolean,
  columns?: number,
  columnTitles?: string[],
  gridTemplateColumns?: string,
  hasHeader?: boolean,
  striped?: boolean
}
