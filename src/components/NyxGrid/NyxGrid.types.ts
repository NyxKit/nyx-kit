import type { VNode } from 'vue'
import type { NyxGridMode, NyxSize } from '@/types'

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
