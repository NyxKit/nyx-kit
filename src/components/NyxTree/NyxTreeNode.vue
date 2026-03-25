<script setup lang="ts">
import { computed } from 'vue'
import { NyxTreeNodeStatus } from './NyxTree.types'
import type { NyxTreeNodeBase } from './NyxTree.types'

defineOptions({
  name: 'NyxTreeNode'
})

const props = defineProps<{
  node: NyxTreeNodeBase
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', node: NyxTreeNodeBase): void
}>()

const isBranch = computed(() => props.node.children.length > 0)
const isExpanded = computed(() =>
  props.node.status === NyxTreeNodeStatus.Open ||
  props.node.status === NyxTreeNodeStatus.Active
)
const isActive = computed(() => props.node.status === NyxTreeNodeStatus.Active)
const isDisabled = computed(() => props.disabled || props.node.disabled)

function handleClick() {
  if (isDisabled.value) return
  emit('select', props.node)
}
</script>

<template>
  <li
    class="nyx-tree-node"
    :class="{
      'nyx-tree-node--branch': isBranch,
      'nyx-tree-node--leaf': !isBranch,
      'nyx-tree-node--expanded': isBranch && isExpanded,
      'nyx-tree-node--active': isActive,
      'nyx-tree-node--disabled': isDisabled,
    }"
    role="treeitem"
    :aria-expanded="isBranch ? isExpanded : undefined"
    :aria-selected="isActive"
    :aria-disabled="isDisabled || undefined"
    :tabindex="isActive ? 0 : -1"
  >
    <span class="nyx-tree-node__label" @click="handleClick">
      <span v-if="isBranch" class="nyx-tree-node__toggle">{{ isExpanded ? '▾' : '▸' }}</span>
      {{ node.label }}
    </span>
    <ul
      v-if="isBranch"
      class="nyx-tree-children"
      role="group"
      :inert="!isExpanded || undefined"
    >
      <NyxTreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :disabled="isDisabled"
        @select="emit('select', $event)"
      />
    </ul>
  </li>
</template>
