import type { NyxTheme } from "./common"

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
  text: string
  context: {
    prefix: string
    suffix: string
  }
  range: {
    from: number
    to: number
  }
}

export interface NyxAnnotation {
  id: string
  anchor: NyxAnnotationAnchor
  interaction: NyxAnnotationInteraction
  status: NyxAnnotationStatus
  attachment: NyxAnnotationAttachment
  tone?: string
}
