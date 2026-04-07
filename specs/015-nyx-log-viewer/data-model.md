# Data Model: NyxLogViewer

**Phase**: 1 — Design & Contracts  
**Date**: 2026-04-07

---

## NyxLogEntry Interface

> Renamed from `NyxLog` to avoid collision with the existing `NyxLog` class in `src/classes/NyxLog.ts`.

```typescript
interface NyxLogEntry {
  timestamp: Date | number | string
  value: string
  origin?: string
  theme?: NyxTheme
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timestamp` | `Date \| number \| string` | Yes | Point in time for this entry. Formatted by `formatTimestamp()`. If already a string, displayed as-is. |
| `value` | `string` | Yes | The log message text. |
| `origin` | `string` | No | Source tag (e.g. `NODE_0xFF-4412`, `SYS_CORE`). Drives three-column layout when at least one entry has it. |
| `theme` | `NyxTheme` | No | Colours the value text. Applies `theme-{value}` CSS class to the value cell. |

---

## Component Props

```typescript
interface NyxLogViewerProps {
  timestampFormat?: string   // default: 'HH:mm:ss'
}
```

---

## v-model

```typescript
defineModel<NyxLogEntry[]>({ default: () => [] })
```

Read-only from the component's perspective — it never mutates the array.

---

## Computed State

| Name | Type | Logic |
|------|------|-------|
| `hasOrigin` | `boolean` | `modelValue.some(e => !!e.origin)` |
| `gridTemplateColumns` | `string` | `hasOrigin ? 'auto auto 1fr' : 'auto 1fr'` |

---

## DOM Shape

```html
<div class="nyx-log-viewer">
  <NyxTable
    v-model="model"
    :header="false"
    variant="ghost"
    :gridTemplateColumns="gridTemplateColumns"
  >
    <template #default="{ item }">
      <NyxTableCell class="nyx-log-viewer__timestamp">
        {{ formatTimestamp(item.timestamp, timestampFormat) }}
      </NyxTableCell>
      <NyxTableCell v-if="hasOrigin" class="nyx-log-viewer__origin">
        {{ item.origin }}
      </NyxTableCell>
      <NyxTableCell
        class="nyx-log-viewer__value"
        :class="item.theme ? `theme-${item.theme}` : ''"
      >
        {{ item.value }}
      </NyxTableCell>
    </template>
  </NyxTable>
</div>
```

---

## formatTimestamp utility

Internal helper (not exported). Handles tokens:

| Token | Output |
|-------|--------|
| `YYYY` | 4-digit year |
| `MM` | 2-digit month (01–12) |
| `DD` | 2-digit day (01–31) |
| `HH` | 2-digit hour 24h (00–23) |
| `mm` | 2-digit minute (00–59) |
| `ss` | 2-digit second (00–59) |

If `timestamp` is already a string, return it unchanged. If it is a `number`, treat as Unix milliseconds and construct a `Date`.

---

## Emits

None beyond the implicit `update:modelValue` from `defineModel`.

---

## State Transitions

None — the component is stateless; all display state is derived from `modelValue`.
