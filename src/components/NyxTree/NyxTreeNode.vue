<script setup lang="ts">
import { computed, ref } from 'vue'
import type { NyxTreeNodeProps, NyxTreeModel } from './NyxTree.types'

defineOptions({
  name: 'NyxTreeNode'
})

const props = defineProps<NyxTreeNodeProps>()
const emit = defineEmits<{ (e: 'select', path: string[]): void }>()

const isLeaf = computed(() => typeof props.node === 'string')

function pathMatches(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((seg, i) => seg === b[i])
}

function isAncestorOf(path: string[], selected: string[]): boolean {
  return selected.length > path.length && path.every((seg, i) => seg === selected[i])
}

const manualExpanded = ref<boolean | null>(null)

const expanded = computed({
  get: () => {
    if (isAncestorOf(props.path, props.selected ?? [])) return true
    if (manualExpanded.value !== null) return manualExpanded.value
    return props.open?.some(openPath => pathMatches(openPath, props.path)) ?? false
  },
  set: (val) => { manualExpanded.value = val },
})

const isSelected = computed(() =>
  Array.isArray(props.selected) && pathMatches(props.path, props.selected)
)

const isDisabled = computed(() =>
  props.disabled || (!isLeaf.value && !!(props.node as NyxTreeModel).disabled)
)

// Children entries with the reserved 'disabled' key filtered out
const childEntries = computed(() => {
  if (isLeaf.value) return []
  return Object.entries(props.node as NyxTreeModel).filter(([key]) => key !== 'disabled')
})

function handleClick() {
  if (isDisabled.value) return
  if (!isLeaf.value) {
    expanded.value = !expanded.value
  }
  emit('select', props.path)
}
</script>

<template>
  <li
    class="nyx-tree-node"
    :class="{
      'nyx-tree-node--branch': !isLeaf,
      'nyx-tree-node--leaf': isLeaf,
      'nyx-tree-node--expanded': !isLeaf && expanded,
      'nyx-tree-node--selected': isSelected,
      'nyx-tree-node--disabled': isDisabled,
    }"
    role="treeitem"
    :aria-expanded="!isLeaf ? expanded : undefined"
    :aria-selected="isSelected"
    :aria-disabled="isDisabled || undefined"
    :tabindex="isSelected ? 0 : -1"
  >
    <span class="nyx-tree-node__label" @click="handleClick">
      <span v-if="!isLeaf" class="nyx-tree-node__toggle">{{ expanded ? '▾' : '▸' }}</span>
      {{ label }}
      <span v-if="isLeaf && node" class="nyx-tree-node__value">{{ node }}</span>
    </span>
    <ul
      v-if="!isLeaf"
      class="nyx-tree-children"
      role="group"
      :inert="!expanded || undefined"
    >
      <NyxTreeNode
        v-for="[key, value] in childEntries"
        :key="key"
        :label="key"
        :node="value as string | NyxTreeModel"
        :path="[...path, key]"
        :selected="selected"
        :open="open"
        :disabled="disabled"
        @select="emit('select', $event)"
      />
    </ul>
  </li>
</template>
