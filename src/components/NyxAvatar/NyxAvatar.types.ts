import type { NyxShape, NyxSize } from '@/types'
import type { HexCode } from '@/types/string'

export interface NyxAvatarProps {
  src?: string
  name?: string
  showName?: boolean
  placeholder?: string
  color?: HexCode
  size?: NyxSize
  shape?: NyxShape
  pixel?: boolean
}
