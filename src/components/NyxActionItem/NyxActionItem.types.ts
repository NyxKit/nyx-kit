import type { NyxTheme } from '@/types'

export interface NyxActionItemProps {
  title: string
  theme?: NyxTheme
  description?: string
  action?: string
}

export interface NyxActionItemEmits {
  (event: 'click'): void
}
