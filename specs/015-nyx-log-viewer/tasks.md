# Tasks: NyxLogViewer

**Input**: Design documents from `/specs/015-nyx-log-viewer/`
**Branch**: `015-nyx-log-viewer`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US3)
- Exact file paths included in every description

---

## Phase 1: Setup

**Purpose**: Create the component directory and empty files.

- [ ] T001 Create directory `src/components/NyxLogViewer/` and empty files: `NyxLogViewer.vue`, `NyxLogViewer.types.ts`, `NyxLogViewer.scss`, `NyxLogViewer.stories.ts`, `NyxLogViewer.spec.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, export registrations, and docs spec — everything all stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T002 Define `NyxLogEntry` interface and `NyxLogViewerProps` in `src/components/NyxLogViewer/NyxLogViewer.types.ts`: `NyxLogEntry { timestamp: Date|number|string, value: string, origin?: string, theme?: NyxTheme }` and `NyxLogViewerProps { timestampFormat?: string }` (import `NyxTheme` from `@/types`)
- [ ] T003 [P] Add `NyxLogViewer` import and export to `src/components/index.ts` (alphabetical order after `NyxGrid`)
- [ ] T004 [P] Export `NyxLogEntry` type from `src/main.ts` — add `export type { NyxLogEntry } from './components/NyxLogViewer/NyxLogViewer.types'` alongside the existing `export type` lines

**Checkpoint**: Types exported, component registered — implementation can begin.

---

## Phase 3: User Story 1 — Display a Stream of Log Entries (Priority: P1) 🎯 MVP

**Goal**: A component that renders a `NyxLogEntry[]` v-model as a bare, header-less two-column table (timestamp + value) with correct default timestamp formatting.

**Independent Test**: Bind three entries with `timestamp` (Date) and `value` only. Three rows render, timestamps formatted as `HH:mm:ss`, no origin column, no crash on empty array.

### Implementation

- [ ] T005 [US1] Write the `formatTimestamp` utility function and the script block of `src/components/NyxLogViewer/NyxLogViewer.vue`: import SCSS, import `NyxLogViewerProps` and `NyxLogEntry` from `./NyxLogViewer.types`, import `NyxTable` from `../NyxTable/NyxTable.vue`, import `NyxTableCell` from `../NyxTable/NyxTableCell.vue`, import `NyxVariant` from `@/types`, import `computed` from `vue`. Add `withDefaults(defineProps<NyxLogViewerProps>(), { timestampFormat: 'HH:mm:ss' })`, `defineModel<NyxLogEntry[]>({ default: () => [] })`, and `hasOrigin` + `gridTemplateColumns` computeds. Include `formatTimestamp(ts, fmt)` function that: returns `ts` unchanged if string, constructs `new Date(ts)` if number, then replaces tokens YYYY/MM/DD/HH/mm/ss in that order using `padStart(2,'0')`.
- [ ] T006 [US1] Write the template block of `src/components/NyxLogViewer/NyxLogViewer.vue`: root `<div class="nyx-log-viewer">` wrapping `<NyxTable v-model="model" :header="false" :variant="NyxVariant.Ghost" :gridTemplateColumns="gridTemplateColumns">` with `<template #default="{ item }">` slot rendering `<NyxTableCell class="nyx-log-viewer__timestamp">{{ formatTimestamp((item as NyxLogEntry).timestamp, props.timestampFormat) }}</NyxTableCell>`, a `v-if="hasOrigin"` origin cell, and a value cell with conditional theme class.
- [ ] T007 [US1] Write base SCSS in `src/components/NyxLogViewer/NyxLogViewer.scss`: `__timestamp` rule with `font-family: var(--nyx-font-family-mono)`, `font-variant-numeric: tabular-nums`, `color: var(--nyx-c-text-1)`, `white-space: nowrap`. Add `__origin` rule with `color: var(--nyx-c-text-2)`, `white-space: nowrap`. Add `__value` rule with `color: var(--nyx-c-text-2)` and nested theme overrides `.theme-primary` through `.theme-info` each setting `color: var(--nyx-c-{theme})`.
- [ ] T008 [US1] Write unit tests in `src/components/NyxLogViewer/NyxLogViewer.spec.ts` for US1: (1) renders `.nyx-log-viewer` root, (2) renders timestamp cell for each entry, (3) renders value cell for each entry, (4) default format is `HH:mm:ss` (mount with a `Date`, check cell contains `HH:mm:ss`-shaped string), (5) `timestampFormat` prop formats correctly (mount with `YYYY-MM-DD`, check output), (6) string timestamps are displayed as-is without reformatting, (7) empty array renders without errors. Follow `src/components/NyxBadge/NyxBadge.spec.ts` for boilerplate.

**Checkpoint**: US1 complete — `pnpm test:unit` passes for all seven US1 cases. Basic log feed renders in Storybook.

---

## Phase 4: User Story 2 — Origin Column (Priority: P2)

**Goal**: When at least one entry has a non-empty `origin`, the component switches to a three-column layout. Entries without an origin show an empty cell. The switch is reactive.

**Independent Test**: Bind a two-entry array where one entry has `origin` and one does not. Three columns render; the origin-less row has an empty origin cell. Then remove all origins from the array and verify the layout collapses to two columns.

### Implementation

- [ ] T009 [US2] Verify the `v-if="hasOrigin"` origin cell is already in the template from T006. Add a specific unit test block in `src/components/NyxLogViewer/NyxLogViewer.spec.ts` for US2: (8) no origin cell rendered when no entry has origin, (9) origin cell rendered when ≥1 entry has origin, (10) origin-less entry renders empty origin cell in three-column mode, (11) layout switches reactively from two-col to three-col when an origin is added to the array (use `wrapper.setProps` or direct reactive ref mutation).

**Checkpoint**: US2 complete — two/three-col switching works and is tested.

---

## Phase 5: User Story 3 — Per-Entry Theme Colouring (Priority: P3)

**Goal**: Entries with a `theme` property render their value text in the corresponding theme colour. Entries without a theme use the default muted text colour.

**Independent Test**: Bind entries covering all six `NyxTheme` values plus one entry with no theme. Each themed entry's value cell carries `theme-{value}` class; the unthemed entry does not.

### Implementation

- [ ] T010 [US3] Verify the `:class="item.theme ? 'theme-' + item.theme : undefined"` binding is on the value `<NyxTableCell>` in the template from T006. Add unit tests in `src/components/NyxLogViewer/NyxLogViewer.spec.ts` for US3: (12) value cell has `theme-success` class when `theme: NyxTheme.Success`, (13) value cell has no theme class when `theme` is absent, (14) all six NyxTheme values each produce the correct `theme-{value}` class.

**Checkpoint**: US3 complete — all themed entries render with correct CSS classes.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T011 [P] Write Storybook stories in `src/components/NyxLogViewer/NyxLogViewer.stories.ts`: export `Empty` (empty array), `TwoColumn` (three entries, no origin), `ThreeColumn` (four entries matching screenshot: NODE_0xFF-4412, SYS_ALERT, NODE_0xAB-1109, SYS_CORE), `WithThemes` (one entry per NyxTheme), `LiveFeed` (setInterval pushing entries every second, sliced to last 20). Follow the `() => defineComponent({...})` pattern from `src/components/NyxActionItem/NyxActionItem.stories.ts`.
- [ ] T012 [P] Verify `docs/specs/components/NyxLogViewer.spec.md` is accurate against the delivered implementation — confirm the `NyxLogEntry` interface, column layout table, and known limitations match the code.
- [ ] T013 Run `pnpm type-check` and `pnpm test:unit` and confirm zero errors and all tests pass.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1 — **BLOCKS all stories**
- **US1 (Phase 3)**: Depends on Phase 2
- **US2 (Phase 4)**: Depends on Phase 3 (template already has origin cell from T006; T009 adds tests only)
- **US3 (Phase 5)**: Depends on Phase 3 (template already has theme class from T006; T010 adds tests only)
- **Polish (Phase 6)**: Depends on all story phases

### User Story Dependencies

- **US1**: After Phase 2 — foundational
- **US2**: After US1 — the origin cell is written in T006; T009 is verification + tests only
- **US3**: After US1 — the theme class is written in T006; T010 is verification + tests only
- **US2 and US3**: Can run in parallel (T009 and T010 touch different test blocks in the same file — run sequentially to avoid conflicts)

### Parallel Opportunities

- T003 + T004 (Phase 2): different files — run in parallel
- T005 + T007 (script block and SCSS): different files — run in parallel after T002
- T011 + T012 (Polish): different files — run in parallel

---

## Parallel Example: Phase 2

```
Agent A: T003 — export NyxLogViewer from src/components/index.ts
Agent B: T004 — export NyxLogEntry from src/main.ts
(both depend on T002 being done first)
```

---

## Implementation Strategy

### MVP (User Story 1 Only)

1. Phase 1: Setup
2. Phase 2: Foundational (T002–T004)
3. Phase 3: US1 (T005–T008)
4. **STOP and VALIDATE**: `pnpm test:unit` passes; component visible in Storybook `TwoColumn` story
5. Ship MVP — basic timestamped log feed

### Incremental Delivery

1. Phases 1–3 → MVP (two-column log display)
2. Phase 4 (US2) → origin column + three-col layout
3. Phase 5 (US3) → per-entry theme colouring
4. Phase 6 → stories, docs check, type-check

---

## Notes

- The `item` in NyxTable's default slot is typed as `Partial<NyxLogEntry>` — cast to `NyxLogEntry` when accessing fields (or use optional chaining)
- Token replacement order in `formatTimestamp` must be: YYYY → MM → DD → HH → mm → ss (uppercase before lowercase to prevent `MM` matching the `mm` in an already-replaced `HH:mm:ss` output)
- `NyxTable` with `variant="ghost"` — verify in `src/components/NyxTable/NyxTable.scss` that ghost does not add unwanted padding; override in `NyxLogViewer.scss` if needed
- `defineModel` with an array default must use a factory: `{ default: () => [] }` to avoid shared reference across instances
