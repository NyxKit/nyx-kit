import type { NyxMediaType, NyxShape } from '@/types'

export interface NyxMediaProps {
  src: string,
  type?: NyxMediaType,
  shape?: NyxShape,
  alt?: string,
  title?: string,
  caption?: string,
  track?: string,
  loading?: 'lazy'|'eager'
}
