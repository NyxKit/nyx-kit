import type { NyxMediaType } from '@/types'

export interface NyxMediaProps {
  src: string,
  type?: NyxMediaType,
  alt?: string,
  title?: string,
  caption?: string,
  track?: string,
  loading?: 'lazy'|'eager'
}
