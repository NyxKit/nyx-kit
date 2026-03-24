<script setup lang="ts">
import './NyxTree.scss'
import { ref } from 'vue'
import type { NyxTreeProps, NyxTreeEmits, NyxTreeModel, NyxTreeNodeBase } from './NyxTree.types'
import { NyxTreeNodeStatus } from './NyxTree.types'
import NyxTreeNode from './NyxTreeNode.vue'

const model = defineModel<NyxTreeModel>({ required: true })

const props = withDefaults(defineProps<NyxTreeProps>(), {
  disabled: false,
})

const emit = defineEmits<NyxTreeEmits>()

const treeRef = ref<HTMLElement | null>(null)

function findNode(nodes: NyxTreeNodeBase[], nodeId: string): NyxTreeNodeBase | undefined {
  for (const node of nodes) {
    if (node.id === nodeId) return node
    if (node.children.length > 0) {
      const found = findNode(node.children, nodeId)
      if (found) return found
    }
  }
  return undefined
}

function applySelection(nodes: NyxTreeNodeBase[], targetId: string): NyxTreeNodeBase[] {
  return nodes.map(node => {
    const newStatus = node.id === targetId
      ? NyxTreeNodeStatus.Active
      : node.status === NyxTreeNodeStatus.Active ? undefined : node.status
    return {
      ...node,
      status: newStatus,
      children: node.children.length > 0 ? applySelection(node.children, targetId) : node.children,
    }
  })
}

function handleNodeSelect(node: NyxTreeNodeBase) {
  if (props.disabled) return

  const target = findNode(model.value, node.id)
  if (!target) return

  model.value = applySelection(model.value, node.id)

  emit('select', node)
}

function getVisibleItems(): HTMLElement[] {
  return Array.from(treeRef.value?.querySelectorAll('[role="treeitem"]') ?? [])
    .filter(el => !el.closest('[inert]')) as HTMLElement[]
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  const items = getVisibleItems()
  const focused = document.activeElement as HTMLElement
  const idx = items.indexOf(focused)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      items[Math.min(idx + 1, items.length - 1)]?.focus()
      break
    case 'ArrowUp':
      event.preventDefault()
      items[Math.max(idx - 1, 0)]?.focus()
      break
    case 'ArrowRight':
    case 'ArrowLeft':
    case 'Enter':
    case ' ':
      event.preventDefault()
      focused?.querySelector<HTMLElement>('.nyx-tree-node__label')?.click()
      break
  }
}
</script>

<template>
  <ul
    ref="treeRef"
    class="nyx-tree"
    role="tree"
    :aria-disabled="disabled || undefined"
    :tabindex="0"
    @keydown="handleKeydown"
  >
    <NyxTreeNode
      v-for="node in model"
      :key="node.id"
      :node="node"
      :disabled="disabled"
      @select="handleNodeSelect"
    />
  </ul>
</template>
