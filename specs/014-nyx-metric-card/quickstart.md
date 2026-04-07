# Quickstart: NyxMetricCard

**Date**: 2026-04-07

---

## Install

```bash
pnpm add nyx-kit
```

Import the global stylesheet (if not already done):

```typescript
import 'nyx-kit/style.css'
```

---

## Register

### Via NyxKit plugin (recommended)

```typescript
import { createApp } from 'vue'
import NyxKit from 'nyx-kit'
import 'nyx-kit/style.css'

createApp(App).use(NyxKit).mount('#app')
```

### Direct import

```typescript
import { NyxMetricCard } from 'nyx-kit'
```

---

## Minimal example

```vue
<template>
  <NyxMetricCard title="ACTIVE NODES" value="12/12" />
</template>
```

---

## With all optional props

```vue
<template>
  <NyxMetricCard
    title="ACTIVE NODES"
    value="12/12"
    suffix="STABLE"
    theme="success"
    icon="server"
    :variant="NyxVariant.Soft"
  />
</template>

<script setup lang="ts">
import { NyxVariant } from 'nyx-kit'
</script>
```

---

## Variant quick reference

```vue
<!-- No indicator (default) -->
<NyxMetricCard title="X" value="0" :variant="NyxVariant.Text" />

<!-- Always-visible indicator -->
<NyxMetricCard title="X" value="0" :variant="NyxVariant.Soft" />
<NyxMetricCard title="X" value="0" :variant="NyxVariant.Subtle" />

<!-- Hover-only indicator -->
<NyxMetricCard title="X" value="0" :variant="NyxVariant.Ghost" />
<NyxMetricCard title="X" value="0" :variant="NyxVariant.Outline" />

<!-- Filled card (no indicator; icon/suffix use default text colour) -->
<NyxMetricCard title="X" value="0" :variant="NyxVariant.Filled" />
```

---

## Dashboard grid example

```vue
<template>
  <div class="metric-grid">
    <NyxMetricCard
      v-for="metric in metrics"
      :key="metric.title"
      :title="metric.title"
      :value="metric.value"
      :unit="metric.unit"
      :suffix="metric.suffix"
      :icon="metric.icon"
      :theme="metric.theme"
      :variant="NyxVariant.Soft"
    />
  </div>
</template>

<style scoped>
.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
```
