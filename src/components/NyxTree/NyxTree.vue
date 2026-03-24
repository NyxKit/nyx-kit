<script setup lang="ts">
import './NyxTree.scss'
import { ref } from 'vue'
import type { NyxTreeProps, NyxTreeEmits, NyxTreeModel } from './NyxTree.types'
import NyxTreeNode from './NyxTreeNode.vue'

const model = defineModel<NyxTreeModel>({ required: true })

const props = withDefaults(defineProps<NyxTreeProps>(), {
  disabled: false,
  selected: () => [],
  open: () => [],
})

const emit = defineEmits<NyxTreeEmits>()

const treeRef = ref<HTMLElement | null>(null)

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
      v-for="(value, key) in model"
      :key="key"
      :label="String(key)"
      :node="value as string | NyxTreeModel"
      :path="[String(key)]"
      :selected="selected"
      :open="open"
      :disabled="disabled"
      @select="emit('select', $event)"
    />
  </ul>
</template>
