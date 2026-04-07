# Public Contract: NyxLogViewer

**Type**: Vue 3 component (published npm library)  
**Date**: 2026-04-07

---

## Exports

```typescript
import { NyxLogViewer } from 'nyx-kit'
import type { NyxLogEntry } from 'nyx-kit'
```

---

## NyxLogEntry

```typescript
interface NyxLogEntry {
  timestamp: Date | number | string
  value: string
  origin?: string
  theme?: NyxTheme
}
```

---

## Props

```typescript
interface NyxLogViewerProps {
  /** Format string for timestamps. Tokens: YYYY MM DD HH mm ss. Default: 'HH:mm:ss' */
  timestampFormat?: string
}
```

---

## v-model

```typescript
// modelValue: NyxLogEntry[]
<NyxLogViewer v-model="entries" />
```

The component treats the array as read-only and never mutates it.

---

## Emits

None beyond the `update:modelValue` implied by `v-model`.

---

## Slots

None.

---

## Layout behaviour

| Condition | Columns |
|-----------|---------|
| No entry has `origin` | 2: timestamp · value |
| ≥1 entry has `origin` | 3: timestamp · origin · value |

---

## Usage Examples

```vue
<!-- Minimal: two columns -->
<NyxLogViewer v-model="logs" />

<!-- Custom timestamp format -->
<NyxLogViewer v-model="logs" timestampFormat="HH:mm:ss" />

<!-- With origins → three columns auto-detected -->
<script setup lang="ts">
import { ref } from 'vue'
import { NyxLogViewer, NyxTheme } from 'nyx-kit'
import type { NyxLogEntry } from 'nyx-kit'

const logs = ref<NyxLogEntry[]>([
  { timestamp: new Date(), origin: 'SYS_CORE', value: 'Gateway online.', theme: NyxTheme.Success },
  { timestamp: new Date(), origin: 'NODE_0xAB', value: 'Heartbeat received.' },
  { timestamp: new Date(), value: 'Unattributed event.' },
])
</script>
```
