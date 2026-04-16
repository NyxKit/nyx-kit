# Quickstart: NyxDropdown Components

## Import

Import the dropdown family from the library’s component exports.

## Default dropdown

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NyxDropdown } from 'nyx-kit'
import type { NyxSelectOption } from 'nyx-kit'

const options: NyxSelectOption[] = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Delete', value: 'delete', disabled: true },
]
</script>

<template>
  <NyxDropdown :options="options">
    <button type="button">Actions</button>
  </NyxDropdown>
</template>
```

## Custom dropdown content

```vue
<NyxDropdown>
  <button type="button">Open menu</button>

  <template #dropdown>
    <div class="custom-panel">
      Custom content goes here.
    </div>
  </template>
</NyxDropdown>
```

## Standalone menu building blocks

Use `NyxDropdownMenu` and `NyxDropdownItem` when you want to build a custom panel while keeping the library’s item styling and selection affordances.
