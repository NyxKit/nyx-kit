# Quickstart: NyxTree

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24

---

## Basic usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NyxTree } from 'nyx-kit/components'

const model = ref([
  {
    id: 'fruits',
    label: 'Fruits',
    status: 'open',
    children: [
      { id: 'apple', label: 'Apple', children: [] },
      { id: 'banana', label: 'Banana', children: [] },
    ],
  },
  {
    id: 'veggies',
    label: 'Veggies',
    children: [
      { id: 'carrot', label: 'Carrot', children: [] },
    ],
  },
])

function clearActive(nodes: typeof model.value) {
  for (const node of nodes) {
    if (node.status === 'active') {
      node.status = 'closed'
    }
    clearActive(node.children)
  }
}

function onSelect(node: (typeof model.value)[number]) {
  if (!node.children.length) {
    clearActive(model.value)
    node.status = 'active'
    return
  }

  node.status = node.status === 'open' || node.status === 'active'
    ? 'closed'
    : 'open'
}
</script>

<template>
  <NyxTree v-model="model" @select="onSelect" />
</template>
```

---

## Flat data

```vue
<NyxTree
  v-model="[
    { id: 'alpha', label: 'Alpha', children: [] },
    { id: 'beta', label: 'Beta', children: [] },
    { id: 'gamma', label: 'Gamma', children: [] },
  ]"
  @select="(node) => console.log(node.id)"
/>
```

---

## Disabled state

```vue
<NyxTree v-model="model" :disabled="true" />
```

---

## Reading the selected node

The `select` event emits a `NyxTreeNodeBase`. Use the emitted node to drive routing, detail panels, or parent-managed `status` updates.

---

## Known limitations (v1)

- Single selection only; multi-select is not supported.
- Slots for custom node content are not available yet.
- Drag-and-drop reordering is not supported.
- If no node is active, treeitem focus is programmatic rather than full roving-tabindex fallback.
