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

const emit = defineEmits<{ (e: 'select', node: NyxTreeNodeBase): void }>()

const isLeaf = computed(() => !props.node.children.length)
const isActive = computed(() => props.node.status === NyxTreeNodeStatus.Active)
const isExpanded = computed(() =>
  props.node.status === NyxTreeNodeStatus.Active || props.node.status === NyxTreeNodeStatus.Open
)
const isDisabled = computed(() => props.disabled || !!props.node.disabled)

function handleClick() {
  if (isDisabled.value) return
  emit('select', props.node)
}
</script>

<template>
  <li
    class="nyx-tree-node"
    :class="{
      'nyx-tree-node--branch': !isLeaf,
      'nyx-tree-node--leaf': isLeaf,
      'nyx-tree-node--expanded': !isLeaf && isExpanded,
      'nyx-tree-node--active': isActive,
      'nyx-tree-node--disabled': isDisabled,
    }"
    role="treeitem"
    :aria-expanded="!isLeaf ? isExpanded : undefined"
    :aria-selected="isActive || undefined"
    :aria-disabled="isDisabled || undefined"
    :tabindex="isActive ? 0 : -1"
  >
    <span class="nyx-tree-node__label" @click="handleClick">
      <span v-if="!isLeaf" class="nyx-tree-node__toggle">{{ isExpanded ? '▾' : '▸' }}</span>
      {{ node.label }}
    </span>
    <ul
      v-if="!isLeaf"
      class="nyx-tree-children"
      role="group"
      :inert="!isExpanded || undefined"
    >
      <NyxTreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :disabled="disabled"
        @select="emit('select', $event)"
      />
    </ul>
  </li>
</template>
