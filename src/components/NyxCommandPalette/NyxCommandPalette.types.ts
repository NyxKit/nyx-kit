import type { NyxSize, NyxTheme } from '@/types/common'

export enum NyxCommandPaletteViewportMode {
  Always = 'always',
  WhileSearching = 'while-searching',
  AfterInteraction = 'after-interaction'
}

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
  shortcut?: string
  viewportMode?: NyxCommandPaletteViewportMode
  showResultsLabel?: string
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

export type NyxCommandPaletteSlots<T extends NyxCommandPaletteItem> = {
  item?: (scope: NyxCommandPaletteItemSlotProps<T>) => unknown
  'item-leading'?: (scope: NyxCommandPaletteItemSlotProps<T>) => unknown
  'item-label'?: (scope: NyxCommandPaletteItemSlotProps<T>) => unknown
  'item-trailing'?: (scope: NyxCommandPaletteItemSlotProps<T>) => unknown
  'group-label'?: (scope: { group: NyxCommandPaletteGroup<T>; searchTerm: string }) => unknown
  empty?: (scope: { searchTerm: string }) => unknown
  loading?: (scope: { searchTerm: string }) => unknown
  footer?: (scope: { searchTerm: string; resultCount: number }) => unknown
}
