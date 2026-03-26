# Quickstart: NyxGrid

**Branch**: `006-add-nyx-grid` | **Date**: 2026-03-26

---

## Basic usage

```vue
<script setup lang="ts">
import { NyxGrid, NyxCard } from 'nyx-kit/components'
import { NyxGridMode, NyxSize } from 'nyx-kit/types'

const cards = [
  { id: 'alpha', title: 'Alpha' },
  { id: 'beta', title: 'Beta' },
  { id: 'gamma', title: 'Gamma' },
]
</script>

<template>
  <NyxGrid title="Overview" :columns="3" :gap="NyxSize.Medium">
    <NyxCard v-for="card in cards" :key="card.id" :title="card.title">
      Card content
    </NyxCard>
  </NyxGrid>
</template>
```

---

## Custom header and footer

```vue
<script setup lang="ts">
import { NyxButton, NyxGrid, NyxCard } from 'nyx-kit/components'

const cards = [
  { id: 'alpha', title: 'Alpha' },
  { id: 'beta', title: 'Beta' },
]
</script>

<NyxGrid :columns="2">
  <template #header>
    <div class="flex" style="justify-content: space-between; width: 100%;">
      <h2>Gallery</h2>
      <NyxButton>Refresh</NyxButton>
    </div>
  </template>

  <NyxCard v-for="item in cards" :key="item.id" :title="item.title" />

  <template #footer>
    <small>{{ cards.length }} items</small>
  </template>
</NyxGrid>
```

---

## Masonry mode

```vue
<script setup lang="ts">
import { NyxGrid } from 'nyx-kit/components'
import { NyxGridMode, NyxSize } from 'nyx-kit/types'
</script>

<template>
  <NyxGrid :mode="NyxGridMode.Masonry" :columns="4" :gap="NyxSize.Small">
  <article v-for="photo in photos" :key="photo.id">
    <img :src="photo.src" :alt="photo.alt">
  </article>
</NyxGrid>
</template>
```

---

## Numeric gap values

```vue
<NyxGrid :columns="3" :gap="0">
  <NyxCard v-for="card in cards" :key="card.id" :title="card.title" />
</NyxGrid>
```

---

## Notes

- Use stable Vue keys on top-level children for the best insert/remove/reorder transitions.
- `columns` falls back to `3` when omitted or invalid and applies in both grid and masonry modes.
- `gap` defaults to `NyxSize.Medium`; token values are scaled 1.5x and numeric values are interpreted as rem units.
- `title` is ignored when a `header` slot is present.
- `NyxGrid` does not impose item semantics; cards, articles, media, and plain divs are all valid.
