import type { NyxTheme } from "./common"

export enum NyxAnnotationInteraction {
  Default = 'default',
  Hover = 'hover',
  Focus = 'focus',
}

export const NyxAnnotationStatus = {
  Unresolved: 'unresolved',
  Draft: 'draft',
  InReview: 'in-review',
  Approved: 'approved',
  Resolved: 'resolved',
  Archived: 'archived',
} as const

export type NyxAnnotationStatus = typeof NyxAnnotationStatus[keyof typeof NyxAnnotationStatus]
export type NyxAnnotationStatusLike = NyxAnnotationStatus | (string & {})

export enum NyxAnnotationAttachment {
  Attached = 'attached',
  Detached = 'detached',
}

export type NyxAnnotationStatusTheme = Partial<Record<NyxAnnotationStatusLike, NyxTheme>>

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
  status: NyxAnnotationStatusLike
  attachment: NyxAnnotationAttachment
  tone?: string
}
