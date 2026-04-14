import type { NyxDirection, NyxSize, NyxVariant } from '@/types'

export interface NyxButtonGroupProps {
  direction?: NyxDirection
  gap?: NyxSize | number
  variant?: NyxVariant.Soft | NyxVariant.Ghost
}
