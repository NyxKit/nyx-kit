import type { NyxTheme } from '@/types'

export interface NyxCarouselProps<T> {
  slides: T[]
  theme: NyxTheme
  autoplay?: boolean
  interval?: number
  controls?: boolean
  dots?: boolean
}
