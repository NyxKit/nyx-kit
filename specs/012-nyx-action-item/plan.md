# Implementation Plan: NyxActionItem Component

**Branch**: `012-nyx-action-item` | **Date**: 2026-04-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/012-nyx-action-item/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Create `NyxActionItem`, a card-like display component that presents a title, description (via default slot), and an action button in a two-column layout. The component uses `--nyx-c-bg-mute` as its background, renders a theme-blended border, and delegates theming to `useNyxProps`. The action area renders a default `NyxButton` from the `action` prop or yields to an `action` named slot for custom content. A `click` emit fires only from the internal button.

## Technical Context

**Language/Version**: TypeScript 5.x, Vue 3.4+ (Composition API, `<script setup>`)  
**Primary Dependencies**: `useNyxProps` composable (prop resolution), `NyxButton` (internal action button), SCSS mixins from `src/styles/mixins.scss`  
**Storage**: N/A  
**Testing**: Vitest (unit), Storybook 8 (API contract), Playwright (E2E if interactive behaviour warrants)  
**Target Platform**: Browser (Vue 3 SPA/SSR consumer apps)  
**Project Type**: Component library (npm package `nyx-kit`)  
**Performance Goals**: Single component render < 5ms, no layout shifts on slot toggle  
**Constraints**: Max 300 lines per `.vue` file (per AGENTS.md), must use design tokens only, must follow `component-model.md` conventions  
**Scale/Scope**: Single new component, 1 new types file, 1 SCSS file, 1 story file, optional unit test

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| I. Docs Are the Source of Truth | PASS | `docs/specs/components/NyxActionItem.spec.md` will be created before implementation |
| II. Spec Before Code | PASS | Spec exists at `specs/012-nyx-action-item/spec.md`; component spec will be written to `docs/specs/` before code |
| III. Minimal Diff | PASS | Single component addition, no refactoring of existing code |
| IV. Consumer-Library Contract | PASS | New additive component, no breaking changes to existing exports |
| IV-a. Opinionated Global Stylesheet | PASS | No changes to reset or global styles |
| IV-b. Dark-First Colour System | PASS | Uses existing semantic tokens (`--nyx-c-bg-mute`, theme colours), no `prefers-color-scheme` added |
| V. Test-First for Non-Trivial Logic | PASS | Component has minimal logic; unit test written for emit behaviour and slot precedence |
| VI. Design Token Discipline | PASS | All colours and spacing use CSS custom properties, no hard-coded values |
| VII. Consistency Over Local Optimisation | PASS | Prop names (`theme`, `title`, `action`), emit name (`click`), slot names (`default`, `action`) follow existing conventions |

**All gates passed. Proceeding to Phase 0.**

## Project Structure

### Documentation (this feature)

```text
specs/012-nyx-action-item/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── index.ts                          # Add NyxActionItem export
│   └── NyxActionItem/
│       ├── NyxActionItem.vue             # Component implementation
│       ├── NyxActionItem.types.ts        # Props and emits type definitions
│       ├── NyxActionItem.scss            # Component-scoped styles
│       ├── NyxActionItem.stories.ts      # Storybook stories
│       └── NyxActionItem.spec.ts         # Unit tests (optional, for emit/slot logic)

docs/
└── specs/
    └── components/
        └── NyxActionItem.spec.md         # Living component spec (created before code)
```

**Structure Decision**: Single component addition following the established `NyxButton` pattern. One folder under `src/components/NyxActionItem/` with `.vue`, `.types.ts`, `.scss`, `.stories.ts`, and `.spec.ts` files. Export registered in `src/components/index.ts` via direct import. Component spec written to `docs/specs/components/NyxActionItem.spec.md`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. All gates passed.

## Phase 0: Outline & Research

### Unknowns Resolved

| Unknown | Decision | Rationale | Alternatives Considered |
|---------|----------|-----------|------------------------|
| Border colour blending formula | Use `rgba(var(--nyx-rgb-{theme}), 0.3)` for border colour | Consistent with `NyxButton` outline variant which uses `rgba(var(--nyx-rgb-button), 0.4)` for borders. Slightly softer (0.3) since this is a container, not a button. | CSS `color-mix()`, SCSS `mix()`, hard-coded opacity |
| Default button size | `NyxSize.Small` | Action items are typically secondary UI elements; a smaller button keeps visual hierarchy clear. | `NyxSize.Medium` (too prominent), `NyxSize.XSmall` (too small for readability) |
| Default button variant | `NyxVariant.Outline` | Outline buttons provide clear action affordance without competing with primary page actions. | `NyxVariant.Filled` (too heavy), `NyxVariant.Ghost` (too subtle) |
| Layout approach | CSS Grid with 2 columns (`1fr auto`) | Clean two-column layout with left content taking available space and action area auto-sizing to content. | Flexbox (less precise for the "right-center" alignment), absolute positioning (fragile) |
| `action` prop vs slot precedence | Slot takes precedence over prop | Standard Vue pattern: if a slot is provided, it overrides the default rendering. | Prop takes precedence (non-standard), both render (confusing) |
| Component spec location | `docs/specs/components/NyxActionItem.spec.md` | Follows the established convention from AGENTS.md and existing component specs. | Inline in plan.md (not a living document), separate docs folder (inconsistent) |

### Integration Patterns

| Integration | Pattern |
|-------------|---------|
| `useNyxProps` | Pass props with `{ origin: 'NyxActionItem' }` for logging context. No `primitive` needed (not a primitive element). |
| `NyxButton` | Import directly: `import NyxButton from '@/components/NyxButton/NyxButton.vue'`. Pass `theme`, `size` (Small), `variant` (Outline), and `action` string as slot content. |
| Theme CSS variables | Component-scoped SCSS sets `--nyx-c-action-item-border: rgba(var(--nyx-rgb-{theme}), 0.3)` under theme classes. |
| Slot content detection | Use `$slots.action` to determine whether to render default button or slot content. |

## Phase 1: Design & Contracts

### Data Model

NyxActionItem has no data model — it is a pure display component. The entities are its props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Title text rendered at top-left |
| `theme` | `NyxTheme` | Resolved by `useNyxProps` (default: `Primary`) | Colour theme for border and internal button |
| `action` | `string` | `''` | Label for the default action button |

| Emit | Payload | When |
|------|---------|------|
| `click` | — | User clicks the internal NyxButton |

| Slot | Scope | Purpose |
|------|-------|---------|
| `default` | — | Description content (text or rich HTML), rendered at bottom-left |
| `action` | — | Custom action content, replaces default NyxButton |

### Component Architecture

```
NyxActionItem (root div)
├── .nyx-action-item__content (grid: 1fr auto)
│   ├── .nyx-action-item__left (flex-col)
│   │   ├── .nyx-action-item__title → {{ title }}
│   │   └── .nyx-action-item__description → <slot />
│   └── .nyx-action-item__right (centered)
│       ├── <slot name="action" /> (if provided)
│       └── <NyxButton> (if action prop && no action slot)
```

### Contracts

**Public API Contract** (consumer-facing):

```vue
<!-- Minimal usage -->
<nyx-action-item title="Save" action="Save">
  Save your changes to the database.
</nyx-action-item>

<!-- With theme -->
<nyx-action-item title="Delete" action="Delete" theme="danger">
  Permanently remove this item.
</nyx-action-item>

<!-- With custom action slot -->
<nyx-action-item title="Export">
  Export data in various formats.
  <template #action>
    <nyx-dropdown trigger="Export">
      <!-- dropdown items -->
    </nyx-dropdown>
  </template>
</nyx-action-item>

<!-- Event handling -->
<nyx-action-item title="Save" action="Save" @click="handleSave">
  Save changes.
</nyx-action-item>
```

### Quickstart

1. Create `src/components/NyxActionItem/NyxActionItem.types.ts` — define `NyxActionItemProps` and `NyxActionItemEmits`
2. Create `src/components/NyxActionItem/NyxActionItem.scss` — grid layout, theme border, muted background
3. Create `src/components/NyxActionItem/NyxActionItem.vue` — component implementation using `useNyxProps`
4. Create `src/components/NyxActionItem/NyxActionItem.stories.ts` — Default, Themes, WithActionSlot stories
5. Create `docs/specs/components/NyxActionItem.spec.md` — living component spec
6. Register export in `src/components/index.ts`
7. Run `pnpm type-check`, `pnpm storybook`, `pnpm test:unit`

### Agent Context Update

No new technology introduced — uses existing Vue 3, TypeScript, SCSS, `useNyxProps`, and `NyxButton` patterns already established in the codebase. No agent context update needed.

### Constitution Check (Post-Design)

| Gate | Status | Notes |
|------|--------|-------|
| All gates from pre-design check | PASS | No changes to assessment |
| Spec file created before code | PASS | `docs/specs/components/NyxActionItem.spec.md` will be created in implementation |
| Max 300 lines per .vue file | PASS | Component is simple layout + slot logic, well under limit |

**All gates passed. Ready for `/speckit.tasks`.**
