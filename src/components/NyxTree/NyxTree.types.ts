import type { KeyDict } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NyxTreeProps {}

export interface NyxTreeEmits {
  (e: 'select', value: unknown[]): void
}

export interface NyxTreeNodeProps {
  node: string | KeyDict<string | KeyDict<unknown>>
  path: string[]
}
