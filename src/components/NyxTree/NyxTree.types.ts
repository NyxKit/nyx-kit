import { NyxLoader } from "@/classes"

export type NyxTreeModel = NyxTreeNodeBase[]

export interface NyxTreeProps {
  disabled?: boolean
}

export interface NyxTreeEmits {
  (e: 'select', node: NyxTreeNodeBase): void
}

export enum NyxTreeNodeStatus {
  Active = 'active',
  Open = 'open',
  Closed = 'closed'
}

export interface NyxTreeNodeBase {
  id: string,
  label: string,
  children: NyxTreeNodeBase[],
  status?: NyxTreeNodeStatus,
  disabled?: boolean
}

export class NyxTreeNode implements NyxTreeNodeBase {
  id: string
  label: string
  children: NyxTreeNode[]
  status: NyxTreeNodeStatus = NyxTreeNodeStatus.Closed
  disabled: boolean = false

  constructor(base: NyxTreeNodeBase) {
    this.id = NyxLoader.loadString(base, 'id')
    this.label = NyxLoader.loadString(base, 'label')
    this.children = NyxLoader.loadArray<NyxTreeNode>(base, 'children', [])
    this.status = NyxLoader.loadEnum(base, 'status', NyxTreeNodeStatus.Closed, Object.values(NyxTreeNodeStatus))
    this.disabled = NyxLoader.loadBoolean(base, 'disabled')
  }
}
