import type { KeyDict } from '@/types'

export interface NyxTreeProps {

}

export interface NyxTreeEmits {
  (e: 'select', value: any[]): void
}

export interface NyxTreeNodeProps {
  node: string | KeyDict<string | KeyDict<any>>
  path: string[]
}
