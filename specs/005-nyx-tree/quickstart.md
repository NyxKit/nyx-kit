# Quickstart: NyxTree

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24

---

## Basic usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NyxTree } from 'nyx-kit/components'

const model = ref({
  Fruits: {
    Apple: 'apple',
    Banana: 'banana',
  },
  Veggies: {
    Carrot: 'carrot',
  },
})

const selectedPath = ref<string[]>([])

function onSelect(path: string[]) {
  selectedPath.value = path
}
</script>

<template>
  <NyxTree
    v-model="model"
    :selected="selectedPath"
    @select="onSelect"
  />
</template>
```

---

## Flat data

```vue
<NyxTree
  v-model="{ Alpha: 'a', Beta: 'b', Gamma: 'c' }"
  @select="(path) => console.log(path)"
/>
```

---

## Disabled state

```vue
<NyxTree v-model="model" :disabled="true" />
```

---

## Reading the selected path

The `select` event emits a `string[]` path. For example, clicking `Apple` inside `Fruits` emits `['Fruits', 'Apple']`. Use this to drive routing, detail panels, or any downstream logic.

---

## Known limitations (v1)

- Single selection only; multi-select is not supported.
- Leaf values are not displayed (only labels/keys are rendered).
- Slots for custom node content are not available yet.
- Drag-and-drop reordering is not supported.
