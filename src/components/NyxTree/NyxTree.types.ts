export interface NyxTreeModel {
  disabled?: boolean
  [key: string]: string | boolean | NyxTreeModel | undefined
}

export interface NyxTreeProps {
  selected?: string[]
  open?: string[][]
  disabled?: boolean
}

export interface NyxTreeEmits {
  (e: 'select', path: string[]): void
}

export interface NyxTreeNodeProps {
  label: string
  node: string | NyxTreeModel
  path: string[]
  selected?: string[]
  open?: string[][]
  disabled?: boolean
}
