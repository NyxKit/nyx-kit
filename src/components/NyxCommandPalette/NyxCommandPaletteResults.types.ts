import type {
  NyxCommandPaletteGroup,
  NyxCommandPaletteItem,
  NyxCommandPaletteItemSlotProps
} from './NyxCommandPalette.types'

export interface NyxCommandPaletteResultsProps<T extends NyxCommandPaletteItem> {
  filtered: { group: NyxCommandPaletteGroup<T>; items: T[] }[]
  loading: boolean
  loadingText: string
  emptyText: string
  resultCount: number
  label: string
  query: string
  active?: string
  domId: (kind: string, id?: string) => string
  scope: (item: T, group: NyxCommandPaletteGroup<T>, index: number) => NyxCommandPaletteItemSlotProps<T>
}

