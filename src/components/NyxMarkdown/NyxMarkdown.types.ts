import type { NyxSize, NyxTheme } from '@/types/common'

export interface NyxMarkdownInlineMatch<T = unknown> {
  length: number
  value: T
}

/** Trusted synchronous recognizer. Offsets and lengths use UTF-16 code units. */
export interface NyxMarkdownInlineRule<T = unknown> {
  name: string
  match: (source: string, offset: number) => NyxMarkdownInlineMatch<T> | null
}

export interface NyxMarkdownInlineSlotProps<T = unknown> {
  name: string
  value: T
  raw: string
}

export interface NyxMarkdownProps<T = unknown> {
  content?: string
  inlineRules?: readonly NyxMarkdownInlineRule<T>[]
  headingOffset?: number
  theme?: NyxTheme
  size?: NyxSize
}
