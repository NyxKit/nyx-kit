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
  header?: 'sticky'|boolean,
  striped?: boolean,
  colWhitelist?: (keyof T)[],
  colBlacklist?: (keyof T)[]
}
