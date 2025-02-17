import type { NyxSize } from '@/types'
import type { HexCode } from '@/types/string'

export interface NyxAvatarProps {
  src?: string,
  name?: string,
  initials?: string,
  color?: HexCode,
  size?: NyxSize
}
