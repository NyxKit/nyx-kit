import type { NyxSize } from "@/types"

export interface NyxModalProps {
  title?: string,
  confirmText?: string
  cancelText?: string
  size?: NyxSize
}

export interface NyxModalEmits {
  (event: 'close'): void
  (event: 'cancel'): void
  (event: 'confirm'): void
  (event: 'open'): void
}
