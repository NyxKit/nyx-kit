<script setup lang="ts">
import './NyxTree.scss'
import { ref } from 'vue'
import NyxTreeNode from './NyxTreeNode.vue'
import { NyxTreeNodeStatus } from './NyxTree.types'
import type { NyxTreeProps, NyxTreeEmits, NyxTreeModel, NyxTreeNodeBase } from './NyxTree.types'

const props = withDefaults(defineProps<NyxTreeProps>(), {
  disabled: false,
})

const model = defineModel<NyxTreeModel>({ required: true })

const emit = defineEmits<NyxTreeEmits>()

const treeRef = ref<HTMLElement | null>(null)

function getVisibleItems(): HTMLElement[] {
  if (!treeRef.value) return []
  return Array
    .from(treeRef.value.querySelectorAll<HTMLElement>('[role="treeitem"]'))
    .filter(el => !el.closest('[inert]'))
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return

  const items = getVisibleItems()
  const focused = document.activeElement as HTMLElement
  const currentIndex = items.indexOf(focused)

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    const next = items[currentIndex + 1]
    if (next) next.focus()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    const prev = items[currentIndex - 1]
    if (prev) prev.focus()
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    const label = focused?.querySelector<HTMLElement>('.nyx-tree-node__label')
    label?.click()
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    const label = focused?.querySelector<HTMLElement>('.nyx-tree-node__label')
    label?.click()
  }
}

function clearActive(nodes: NyxTreeModel) {
  for (const node of nodes) {
    if (node.status === NyxTreeNodeStatus.Active) node.status = NyxTreeNodeStatus.Closed
    if (node.children.length) clearActive(node.children)
  }
}

function handleSelect(node: NyxTreeNodeBase) {
  if (node.children.length === 0) {
    clearActive(model.value)
    node.status = NyxTreeNodeStatus.Active
  } else {
    node.status =
      node.status === NyxTreeNodeStatus.Open || node.status === NyxTreeNodeStatus.Active
        ? NyxTreeNodeStatus.Closed
        : NyxTreeNodeStatus.Open
  }
  emit('select', node)
}
</script>

<template>
  <ul
    ref="treeRef"
    class="nyx-tree"
    role="tree"
    :aria-disabled="props.disabled || undefined"
    :tabindex="0"
    @keydown="handleKeydown"
  >
    <NyxTreeNode
      v-for="node in model"
      :key="node.id"
      :node="node"
      :disabled="props.disabled"
      @select="handleSelect"
    />
  </ul>
</template>
