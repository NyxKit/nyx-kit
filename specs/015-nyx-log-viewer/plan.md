# Implementation Plan: NyxLogViewer

**Branch**: `015-nyx-log-viewer` | **Date**: 2026-04-07 | **Spec**: [spec.md](./spec.md)

## Summary

Create a read-only `NyxLogViewer` Vue 3 component that renders a `NyxLogEntry[]` v-model as a bare, header-less table using `NyxTable` internally. Automatically switches between two-column (timestamp + value) and three-column (timestamp + origin + value) layouts based on whether any entry carries an `origin`. Per-entry theme colouring is applied to the value cell via CSS class. Timestamp formatting uses a lightweight internal utility with no new dependencies.

## Technical Context

**Language/Version**: TypeScript 5.7 / Vue 3.5  
**Primary Dependencies**: Vue 3, `NyxTable`, `NyxTableCell`, `NyxTheme` — all already in scope  
**Storage**: N/A — display only, no state  
**Testing**: Vitest + `@vue/test-utils`; Storybook 8  
**Target Platform**: Published npm library (`nyx-kit`)  
**Project Type**: Library component  
**Performance Goals**: No special requirements — reactive display component  
**Constraints**: No new npm dependencies; timestamp formatting handled internally  
**Scale/Scope**: Single component + exported `NyxLogEntry` interface, five files

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| §I Docs are source of truth | ✅ | `docs/specs/components/NyxLogViewer.spec.md` created before implementation |
| §II Spec before code | ✅ | spec.md written first |
| §III Minimal diff | ✅ | Additive only; no existing files rewritten |
| §IV Consumer-library contract | ✅ | `NyxLogEntry` exported; no breaking changes |
| §IV-b Dark-first colour | ✅ | Uses `--nyx-c-{theme}` tokens; no hardcoded colours |
| §V Test-first | ✅ | Unit tests planned for layout switching and formatting |
| §VI Design token discipline | ✅ | `--nyx-font-family-mono`, `--nyx-c-text-2`, `--nyx-c-{theme}` |
| §VII Consistency | ✅ | Follows `NyxBadge`/`NyxActionItem` component patterns |

No violations.

## Project Structure

### Documentation (this feature)

```text
specs/015-nyx-log-viewer/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── NyxLogViewer.contract.md
└── tasks.md             ← /speckit.tasks output
```

### Source Code

```text
src/components/NyxLogViewer/
├── NyxLogViewer.vue          # SFC: defineModel, computed hasOrigin, NyxTable slot
├── NyxLogViewer.types.ts     # NyxLogEntry interface + NyxLogViewerProps
├── NyxLogViewer.scss         # Timestamp, origin, value cell styles + theme classes
├── NyxLogViewer.stories.ts   # Storybook stories
└── NyxLogViewer.spec.ts      # Vitest unit tests

src/components/index.ts       # Add NyxLogViewer export
src/main.ts (or types index)  # Export NyxLogEntry type
```

## Implementation Steps

### Step 1 — Types (`NyxLogViewer.types.ts`)

```typescript
import type { NyxTheme } from '@/types'

export interface NyxLogEntry {
  timestamp: Date | number | string
  value: string
  origin?: string
  theme?: NyxTheme
}

export interface NyxLogViewerProps {
  timestampFormat?: string
}
```

`NyxLogEntry` is named to avoid collision with the existing `NyxLog` class in `src/classes/NyxLog.ts`.

---

### Step 2 — Timestamp formatter (internal, within the `.vue` file)

```typescript
function formatTimestamp(ts: Date | number | string, fmt = 'HH:mm:ss'): string {
  if (typeof ts === 'string') return ts
  const d = typeof ts === 'number' ? new Date(ts) : ts
  const pad = (n: number) => String(n).padStart(2, '0')
  return fmt
    .replace('YYYY', String(d.getFullYear()))
    .replace('MM',   pad(d.getMonth() + 1))
    .replace('DD',   pad(d.getDate()))
    .replace('HH',   pad(d.getHours()))
    .replace('mm',   pad(d.getMinutes()))
    .replace('ss',   pad(d.getSeconds()))
}
```

No import needed — pure function. Token replacement order: YYYY → MM → DD → HH → mm → ss (uppercase before lowercase prevents `mm` from accidentally matching inside `MM`).

---

### Step 3 — Component (`NyxLogViewer.vue`)

Key structure:
- `withDefaults(defineProps<NyxLogViewerProps>(), { timestampFormat: 'HH:mm:ss' })`
- `defineModel<NyxLogEntry[]>({ default: () => [] })`
- `hasOrigin = computed(() => model.value.some(e => !!e.origin))`
- `gridTemplateColumns = computed(() => hasOrigin.value ? 'auto auto 1fr' : 'auto 1fr')`
- Pass `:header="false"`, `:variant="NyxVariant.Ghost"`, `:gridTemplateColumns` to `NyxTable`
- Default slot renders three cells conditionally

---

### Step 4 — Styles (`NyxLogViewer.scss`)

```scss
.nyx-log-viewer {
  &__timestamp {
    font-family: var(--nyx-font-family-mono);
    font-variant-numeric: tabular-nums;
    color: var(--nyx-c-text-1);
    white-space: nowrap;
  }

  &__origin {
    color: var(--nyx-c-text-2);
    white-space: nowrap;
  }

  &__value {
    color: var(--nyx-c-text-2);

    &.theme-primary   { color: var(--nyx-c-primary); }
    &.theme-secondary { color: var(--nyx-c-secondary); }
    &.theme-success   { color: var(--nyx-c-success); }
    &.theme-warning   { color: var(--nyx-c-warning); }
    &.theme-danger    { color: var(--nyx-c-danger); }
    &.theme-info      { color: var(--nyx-c-info); }
  }
}
```

---

### Step 5 — Stories (`NyxLogViewer.stories.ts`)

Stories: `Empty`, `TwoColumn`, `ThreeColumn` (matching screenshot), `WithThemes`, `LiveFeed`.

---

### Step 6 — Unit Tests (`NyxLogViewer.spec.ts`)

10 tests covering: root render, two-col layout, three-col layout, mixed origin, theme class, no theme class, timestampFormat, default format, string timestamp pass-through, empty array.

---

### Step 7 — Export

```typescript
// src/components/index.ts
import NyxLogViewer from './NyxLogViewer/NyxLogViewer.vue'
export { NyxLogViewer }

// NyxLogEntry — export from component types file and re-export from main.ts barrel
```

---

## Dependency Map

```
NyxLogViewer.vue
  ├── NyxTable.vue           (already in src/components)
  ├── NyxTableCell.vue       (already in src/components)
  ├── NyxVariant, NyxTheme   (already in src/types)
  └── NyxLogViewer.scss
```

No new dependencies.

## Risk Register

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| NyxTable slot `item` typed as `Partial<T>` — `theme`/`origin` may need cast | Medium | Cast `item` as `NyxLogEntry` inside the slot; verified by `pnpm type-check` |
| `formatTimestamp` token collision (`MM` vs `mm`) | Medium | Replace uppercase tokens first; unit test covers both |
| NyxTable `variant="ghost"` adds unexpected padding | Low | Check NyxTable.scss at implementation time; override in NyxLogViewer.scss if needed |
| `NyxLogEntry` not reachable from consumer import | Low | Export via `src/main.ts` barrel; verify with `pnpm type-check` |
