import type { NyxTheme } from "./common"

export interface NyxEditorSelection {
  text: string
  range: { from: number, to: number }
}

export enum NyxAnnotationInteraction {
  Default = 'default',
  Hover = 'hover',
  Focus = 'focus',
}

export enum NyxAnnotationStatus {
  Unresolved = 'unresolved',
  Resolved = 'resolved',
}

export enum NyxAnnotationAttachment {
  Attached = 'attached',
  Detached = 'detached',
}

export type NyxAnnotationStatusTheme = Record<NyxAnnotationStatus, NyxTheme>

export interface NyxAnnotationAnchor {
  content: string
  prefixContext: string
  suffixContext: string
  startOffset: number
  endOffset: number
}

export interface NyxAnnotation {
  id: string
  anchor: NyxAnnotationAnchor
  interaction: NyxAnnotationInteraction
  status: NyxAnnotationStatus
  attachment: NyxAnnotationAttachment
  tone?: string
}
