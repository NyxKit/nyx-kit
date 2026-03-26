import type { VNode } from 'vue'
import type { NyxSize } from '@/types'

export enum NyxGridMode {
  Grid = 'grid',
  Masonry = 'masonry',
}

export interface NyxGridProps {
  title?: string
  mode?: NyxGridMode
  columns?: number
  gap?: NyxSize | number
}

export interface NyxGridItem {
  key: string | number
  order: number
  vnode: VNode
}

export interface NyxGridLayoutItem {
  key: string | number
  order: number
  width: number
  height: number
  x: number
  y: number
}
