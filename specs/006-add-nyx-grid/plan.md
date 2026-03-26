# Implementation Plan: NyxGrid Layout Primitive

**Branch**: `006-add-nyx-grid` | **Date**: 2026-03-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/006-add-nyx-grid/spec.md`

## Summary

Implement `NyxGrid` as a layout primitive with optional header and footer regions, a slotted content stage, configurable columns and gap sizing, and two layout modes: standard grid and masonry. To satisfy the smooth reflow requirement without adding dependencies, the component should normalize top-level slot children into internally wrapped items and drive their positions with measured layout calculations plus transform-based transitions.

## Technical Context

**Language/Version**: TypeScript 5.7 / Vue 3.5
**Primary Dependencies**: Vue 3 (`computed`, `ref`, `useSlots`, `watch`, `nextTick`, lifecycle hooks), SCSS
**Storage**: N/A - layout state is ephemeral DOM measurement only
**Testing**: Vitest + `@vue/test-utils` (unit), Storybook 8 for API verification, Playwright optional if Storybook interaction coverage is insufficient
**Target Platform**: Browser - published as `nyx-kit` npm library
**Project Type**: UI component library
**Performance Goals**: Smooth visual reflow for typical dashboard/gallery counts without external animation libraries; layout recomputation bounded to rendered child count
**Constraints**: No new npm dependencies; must preserve arbitrary slot content; must use design tokens for spacing/typography; must keep DOM order predictable; must support graceful fallback for invalid props
**Scale/Scope**: Single exported component plus local types/styles/stories/tests and synced docs/spec artifacts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Docs-first (Constitution I) | PASS | Relevant architecture docs were read; `docs/specs/components/NyxGrid.spec.md` is added as the living component spec |
| Spec before code (Constitution II) | PASS | Product-level feature spec exists in `specs/006-add-nyx-grid/spec.md` |
| Minimal diff (Constitution III) | PASS | Scope is isolated to the new component, exports, docs, and README naming sync |
| Consumer-library contract (Constitution IV) | PASS | Public API is additive: new exported component with documented props/slots/CSS hooks |
| Test-first for non-trivial logic (Constitution V) | PASS | Plan includes unit tests for layout sanitization and animated reflow behavior |
| Design tokens (Constitution VI) | PASS | Gap, typography, spacing, borders, and transitions are token-backed |
| Consistency (Constitution VII) | PASS | Header/footer slot conventions and prop naming align with existing component model |

*Post-design re-check: All gates still pass. No exceptions required.*

## Project Structure

### Documentation (this feature)

```text
specs/006-add-nyx-grid/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── component-api.md ← Phase 1 output
└── tasks.md             ← Phase 2 output
```

### Source Code

```text
src/components/NyxGrid/
├── NyxGrid.vue          ← root structure, slot normalization, measurement, layout switching
├── NyxGrid.scss         ← structural, token-driven styles, item transitions
├── NyxGrid.types.ts     ← props, mode union, internal layout item types
├── NyxGrid.spec.ts      ← prop fallback, slot precedence, layout mode, animation hooks
├── NyxGrid.stories.ts   ← title/header/footer combinations, grid mode, masonry mode, dynamic reflow
└── index.ts             ← export { default as NyxGrid } from './NyxGrid.vue'

src/components/index.ts  ← public component export
src/main.ts              ← package root export surface if needed by current project structure

docs/specs/components/
└── NyxGrid.spec.md      ← living source-of-truth component contract
```

**Structure Decision**: Single-project component-library layout. The feature lives in a dedicated `src/components/NyxGrid/` folder plus export wiring and synchronized docs. No new packages, utilities, or cross-cutting style-token changes are planned.

---

## Phase 0 Findings Applied

1. Keep the public name `NyxGrid`; the feature is still primarily a grid container even though one mode uses masonry-style compaction.
2. Use semantic structure: root `<section>`, optional `<header>`, content stage, optional `<footer>`.
3. Prefer transform-based FLIP-style movement on internally wrapped items over pure CSS masonry so the component can animate insert/remove/reflow predictably.
4. Require no component-specific item data model; consumers provide arbitrary keyed slot children.

## Implementation Outline

### Step 1 - Define the public contract

Create `NyxGrid.types.ts` and codify:
- `title?: string`
- `mode?: 'grid' | 'masonry'`
- `columns?: number`
- `gap?: NyxSize`

Also define sanitized internal values for `resolvedColumns`, `resolvedGapToken`, and measured item metadata.

### Step 2 - Build the semantic shell

`NyxGrid.vue` should render:
- Root `<section class="nyx-grid">`
- Optional `<header class="nyx-grid__header">` with header slot first, then `title` fallback
- Required content stage container
- Optional `<footer class="nyx-grid__footer">`

Header/footer wrappers render only when content exists, following the component-model slot convention.

### Step 3 - Normalize slot children into layout items

Use `useSlots()` to collect top-level default-slot VNodes, discard empty/comment nodes, and wrap each item in an internal shell with a stable key. Implementation should preserve consumer order and document that keyed children produce the best reorder animation fidelity.

### Step 4 - Compute layout positions for both modes

Use a single measurement pipeline so both modes share animation behavior:
- `grid` mode: place items row-by-row into fixed columns
- `masonry` mode: place each next item into the shortest current column
- Container height is the max column bottom
- Invalid `columns` resolves to the documented default before layout

### Step 5 - Animate reflow without snapping

Track previous and next item positions, then animate item wrappers via CSS `transform` / `transition`. Recompute after mount, slot changes, resize, and observed item height changes. The implementation can use `ResizeObserver` and `requestAnimationFrame`; no external package is needed.

### Step 6 - Add token-driven styles

`NyxGrid.scss` should provide:
- layout spacing tokens mapped from `gap`
- surface spacing between header/content/footer
- wrapper styles for moving items
- reduced-motion fallback that keeps layout functional while shortening or disabling movement

### Step 7 - Add docs, stories, and tests

- `docs/specs/components/NyxGrid.spec.md`
- `NyxGrid.stories.ts` with title-only, custom-header, footer, masonry, and live add/remove stories
- `NyxGrid.spec.ts` covering wrapper omission, header precedence, prop sanitization, mode switching, and motion class/transform updates

---

## Complexity Tracking

No Constitution violations. No complexity exceptions required.
