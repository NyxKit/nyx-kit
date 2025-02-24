import type { NyxPosition, NyxSize, NyxTabsVariant, NyxTheme } from '@/types'

export interface NyxTabsProps {
  tabs: string[]
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxTabsVariant,
  position?: NyxPosition,
  floating?: boolean,
  border?: boolean,
  tabTransition?: 'none'|'fade'|'slide-fade'|'slide-full'
}
