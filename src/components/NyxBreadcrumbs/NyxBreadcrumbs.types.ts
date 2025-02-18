import type { NyxBreadcrumb, NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxBreadcrumbsProps {
  items: string[]|NyxBreadcrumb[]
  separator?: string
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant.Solid|NyxVariant.Text
}

export interface NyxBreadcrumbsEmits {
  (event: 'click', item: NyxBreadcrumb): void
}
