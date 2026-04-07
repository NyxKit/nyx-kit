import type { NyxTheme, NyxVariant } from '@/types'

export interface NyxMetricCardProps {
  title: string
  value: string
  unit?: string
  suffix?: string
  theme?: NyxTheme
  icon?: string
  variant?: NyxVariant
}
