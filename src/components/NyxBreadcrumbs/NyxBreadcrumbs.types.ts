import type { NyxBreadcrumb, NyxSize, NyxTheme, NyxVariant } from '@/types'

export interface NyxBreadcrumbsIconSeparator {
  icon: string
}

export type NyxBreadcrumbsSeparator = string | NyxBreadcrumbsIconSeparator

export interface NyxBreadcrumbsProps {
  items: string[]|NyxBreadcrumb[]
  separator?: NyxBreadcrumbsSeparator
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant.Filled|NyxVariant.Text
}

export interface NyxBreadcrumbsEmits {
  (event: 'click', item: NyxBreadcrumb): void
}
