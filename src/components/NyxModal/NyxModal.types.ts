import type { NyxSize, NyxTheme } from "@/types"

export interface NyxModalProps {
  title?: string,
  confirmText?: string
  cancelText?: string
  size?: NyxSize
  static?: boolean
  backdrop?: boolean
  customClass?: string
  pixel?: boolean
  theme?: NyxTheme
}

export interface NyxModalEmits {
  (event: 'close'): void
  (event: 'cancel'): void
  (event: 'confirm'): void
  (event: 'open'): void
}
