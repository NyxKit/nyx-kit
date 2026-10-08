import type { NyxSize, NyxTheme } from '@/types/common'

export interface NyxCommandPaletteItem {
  id: string
  label: string
  description?: string
  icon?: string
  keywords?: readonly string[]
  shortcuts?: readonly string[]
  disabled?: boolean
}
export interface NyxCommandPaletteGroup<T extends NyxCommandPaletteItem = NyxCommandPaletteItem> {
  id: string
  label?: string
  items: readonly T[]
  ignoreFilter?: boolean
}
export interface NyxCommandPaletteSelectEvent<T extends NyxCommandPaletteItem = NyxCommandPaletteItem> {
  item: T
  group: NyxCommandPaletteGroup<T>
  originalEvent: MouseEvent | KeyboardEvent
}
export interface NyxCommandPaletteItemSlotProps<T extends NyxCommandPaletteItem = NyxCommandPaletteItem> {
  item: T
  group: NyxCommandPaletteGroup<T>
  index: number
  active: boolean
  selected: boolean
  disabled: boolean
  searchTerm: string
}
export interface NyxCommandPaletteProps<T extends NyxCommandPaletteItem = NyxCommandPaletteItem> {
  groups: readonly NyxCommandPaletteGroup<T>[]
  inline?: boolean
  placeholder?: string
  label?: string
  loading?: boolean
  loadingText?: string
  emptyText?: string
  disabled?: boolean
  autofocus?: boolean
  loop?: boolean
  closeable?: boolean
  closeLabel?: string
  theme?: NyxTheme
  size?: NyxSize
}
