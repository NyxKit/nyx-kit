# Quickstart: NyxLogViewer

**Date**: 2026-04-07

---

## Install

```bash
pnpm add nyx-kit
```

```typescript
import 'nyx-kit/style.css'
```

---

## Register

```typescript
import { createApp } from 'vue'
import NyxKit from 'nyx-kit'
createApp(App).use(NyxKit).mount('#app')
```

---

## Minimal example

```vue
<template>
  <NyxLogViewer v-model="logs" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NyxLogEntry } from 'nyx-kit'

const logs = ref<NyxLogEntry[]>([
  { timestamp: new Date('2026-04-07T14:02:44'), value: 'Environmental recalibration successful.' },
  { timestamp: new Date('2026-04-07T14:01:12'), value: 'Heartbeat received.' },
])
</script>
```

---

## With origins and themes

```vue
<template>
  <NyxLogViewer v-model="logs" timestampFormat="HH:mm:ss" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NyxTheme } from 'nyx-kit'
import type { NyxLogEntry } from 'nyx-kit'

const logs = ref<NyxLogEntry[]>([
  {
    timestamp: new Date('2026-04-07T14:02:44'),
    origin: 'NODE_0xFF-4412',
    value: 'Environmental recalibration successful. Sensor drift < 0.02%',
  },
  {
    timestamp: new Date('2026-04-07T14:01:12'),
    origin: 'SYS_ALERT',
    value: 'Node [Monstera-1] reporting sub-optimal soil moisture (12%).',
    theme: NyxTheme.Warning,
  },
  {
    timestamp: new Date('2026-04-07T13:55:04'),
    origin: 'SYS_CORE',
    value: 'Main gateway ping 24ms. Anthos laboratory mesh secure.',
    theme: NyxTheme.Success,
  },
])
</script>
```

---

## Live-updating feed

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { NyxLogEntry } from 'nyx-kit'

const logs = ref<NyxLogEntry[]>([])
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    logs.value = [
      { timestamp: new Date(), origin: 'SENSOR', value: `Reading: ${Math.random().toFixed(3)}` },
      ...logs.value.slice(0, 49),   // keep last 50
    ]
  }, 1000)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <NyxLogViewer v-model="logs" />
</template>
```
