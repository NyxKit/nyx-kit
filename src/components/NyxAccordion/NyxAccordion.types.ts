import type { NyxSize, NyxTheme } from '@/types/common'

export interface NyxAccordionItem {
  id: string
  label: string
  disabled?: boolean
}

export type NyxAccordionModel = string | string[]

export interface NyxAccordionProps {
  items: NyxAccordionItem[]
  multiple?: boolean
  disabled?: boolean
  headingLevel?: 2 | 3 | 4 | 5 | 6
  theme?: NyxTheme
  size?: NyxSize
}

export interface NyxAccordionSlotProps {
  item: NyxAccordionItem
  index: number
  open: boolean
  disabled: boolean
}
