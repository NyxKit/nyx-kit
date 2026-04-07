# Implementation Plan: NyxMetricCard

**Branch**: `014-nyx-metric-card` | **Date**: 2026-04-07 | **Spec**: [spec.md](./spec.md)

## Summary

Create a display-only `NyxMetricCard` Vue 3 component that renders a titled metric value with optional unit, suffix, and icon. The component supports six visual variants (Text, Filled, Soft, Subtle, Ghost, Outline) that control a left-side coloured indicator and card fill, using the established `useNyxProps` theming pipeline.

## Technical Context

**Language/Version**: TypeScript 5.7 / Vue 3.5  
**Primary Dependencies**: Vue 3, `useNyxProps`, `NyxIcon`, `NyxVariant`, `NyxTheme`, `NyxSize` — all already in scope  
**Storage**: N/A — display-only, no state  
**Testing**: Vitest + `@vue/test-utils`; Storybook 8 for visual review  
**Target Platform**: Published npm library (`nyx-kit`)  
**Project Type**: Library component  
**Performance Goals**: No special requirements — static display component  
**Constraints**: No new dependencies; CSS variables only; no hard-coded colours  
**Scale/Scope**: Single component, five files

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| §I Docs are source of truth | ✅ | `docs/specs/components/NyxMetricCard.spec.md` created before implementation |
| §II Spec before code | ✅ | spec.md and docs spec written first |
| §III Minimal diff | ✅ | No existing code touched; additive only |
| §IV Consumer-library contract | ✅ | Only additive changes; export added to `src/components/index.ts` |
| §IV-b Dark-first colour | ✅ | Uses `--nyx-c-*` tokens; no hardcoded colours |
| §V Test-first | ✅ | Unit tests planned alongside implementation |
| §VI Design token discipline | ✅ | All colours via CSS variables |
| §VII Consistency | ✅ | Follows NyxBadge/NyxActionItem patterns exactly |

No violations — no Complexity Tracking table needed.

## Project Structure

### Documentation (this feature)

```text
specs/014-nyx-metric-card/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── NyxMetricCard.contract.md  # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code

```text
src/components/NyxMetricCard/
├── NyxMetricCard.vue          # SFC: script setup, template
├── NyxMetricCard.types.ts     # NyxMetricCardProps interface
├── NyxMetricCard.scss         # Component styles (variants, themes)
├── NyxMetricCard.stories.ts   # Storybook stories
└── NyxMetricCard.spec.ts      # Vitest unit tests

src/components/index.ts        # Add NyxMetricCard export (1 line)

docs/specs/components/
└── NyxMetricCard.spec.md      # Already created in /speckit.specify
```

## Implementation Steps

### Step 1 — Types (`NyxMetricCard.types.ts`)

Define `NyxMetricCardProps`:

```typescript
import type { NyxTheme, NyxVariant } from '@/types'

export interface NyxMetricCardProps {
  title: string
  value: string
  unit?: string
  suffix?: string
  theme?: NyxTheme
  icon?: string
  variant?: NyxVariant
}
```

No emits interface needed (component is read-only).

---

### Step 2 — Template (`NyxMetricCard.vue`)

```vue
<script setup lang="ts">
import './NyxMetricCard.scss'
import { NyxSize } from '@/types'
import type { NyxMetricCardProps } from './NyxMetricCard.types'
import NyxIcon from '../NyxIcon/NyxIcon.vue'
import { useNyxProps } from '@/composables'

const props = defineProps<NyxMetricCardProps>()
const { classList } = useNyxProps(props, { origin: 'NyxMetricCard' })
</script>

<template>
  <div class="nyx-metric-card" :class="classList">
    <span class="nyx-metric-card__indicator" aria-hidden="true" />

    <div class="nyx-metric-card__body">
      <div class="nyx-metric-card__title">{{ title }}</div>

      <div class="nyx-metric-card__row">
        <span class="nyx-metric-card__value">{{ value }}</span>
        <span v-if="unit" class="nyx-metric-card__unit">{{ unit }}</span>
        <span v-if="suffix" class="nyx-metric-card__suffix">{{ suffix }}</span>
        <span v-if="icon" class="nyx-metric-card__icon">
          <NyxIcon :name="icon" :theme="props.theme" :size="NyxSize.Small" aria-hidden="true" />
        </span>
      </div>
    </div>
  </div>
</template>
```

**Note on `NyxSize.Small`**: Verify the correct enum value key against `NyxSize` in `src/types/common.ts` at implementation time (likely `NyxSize.Small` or `NyxSize.Medium`).

---

### Step 3 — Styles (`NyxMetricCard.scss`)

Structure:

```scss
.nyx-metric-card {
  // ── Component-level CSS variables ──────────────────────────
  --nyx-c-metric-card-indicator: var(--nyx-c-default);
  --nyx-rgb-metric-card: var(--nyx-rgb-default);

  // ── Base layout ─────────────────────────────────────────────
  position: relative;
  display: flex;
  align-items: stretch;
  border-radius: var(--nyx-radius-md);
  background: var(--nyx-c-bg-1);       // verify variable name at impl time
  padding: var(--nyx-pad-md);
  overflow: hidden;

  // ── Indicator element ────────────────────────────────────────
  &__indicator {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--nyx-c-metric-card-indicator);
    border-radius: var(--nyx-radius-sm) 0 0 var(--nyx-radius-sm);
    opacity: 0;                         // hidden by default
    transition: opacity 0.2s ease;
  }

  // ── Body ─────────────────────────────────────────────────────
  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--nyx-gap-xs);
  }

  &__title {
    color: var(--nyx-c-text-2);
    font-size: var(--nyx-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__row {
    display: flex;
    align-items: baseline;
    gap: var(--nyx-gap-xs);
  }

  &__value {
    color: var(--nyx-c-text-1);
    font-size: var(--nyx-font-size-2xl);   // verify token at impl time
    font-weight: 600;
    line-height: 1;
  }

  &__unit {
    color: var(--nyx-c-text-2);
    font-size: var(--nyx-font-size-sm);
  }

  &__suffix {
    color: var(--nyx-c-metric-card-indicator);   // theme colour
    font-size: var(--nyx-font-size-sm);
    font-weight: 600;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    color: var(--nyx-c-metric-card-indicator);   // theme colour
  }

  // ── Theme overrides ──────────────────────────────────────────
  @each $theme in primary, secondary, success, warning, danger, info {
    &.theme-#{$theme} {
      --nyx-c-metric-card-indicator: var(--nyx-c-#{$theme});
      --nyx-rgb-metric-card: var(--nyx-rgb-#{$theme});
    }
  }

  // ── Variant: Soft / Subtle — indicator always visible ───────
  &.variant-soft,
  &.variant-subtle {
    .nyx-metric-card__indicator { opacity: 1; }
  }

  // ── Variant: Ghost / Outline — indicator on hover ────────────
  &.variant-ghost,
  &.variant-outline {
    &:hover .nyx-metric-card__indicator { opacity: 1; }
  }

  // ── Variant: Filled — full background, default text for icon+suffix
  &.variant-filled {
    background: var(--nyx-c-metric-card-indicator);

    .nyx-metric-card__indicator { display: none; }

    .nyx-metric-card__suffix,
    .nyx-metric-card__icon {
      color: var(--nyx-c-text-1);
    }
  }

  // ── Variant: Text (default) — no indicator, no fill ─────────
  // (base styles already handle this — nothing additional needed)
}
```

**Notes for implementation time**:
- Verify `--nyx-c-bg-1` vs `--nyx-c-surface` vs `--nyx-c-bg-soft` in `src/styles/variables.css`
- Verify `--nyx-font-size-2xl` token name (may be `--nyx-font-size-xl` or `--nyx-font-size-3xl`)
- Verify `--nyx-gap-xs` token name
- The `@each` SCSS loop must be validated against the existing pattern in NyxBadge.scss

---

### Step 4 — Stories (`NyxMetricCard.stories.ts`)

Export stories covering:
- `Default` — title + value only
- `WithUnit` — + unit
- `WithSuffix` — + themed suffix
- `WithIcon` — + icon
- `AllVariants` — grid of all 6 variants with the same props
- `AllThemes` — grid of all themes

Follow the existing `Template` factory pattern from NyxBadge.stories.ts.

---

### Step 5 — Unit Tests (`NyxMetricCard.spec.ts`)

Tests to write:

1. Renders root `.nyx-metric-card` element
2. Renders `title` text
3. Renders `value` text
4. Does not render `.nyx-metric-card__unit` when `unit` is absent
5. Renders `.nyx-metric-card__unit` when `unit` is provided
6. Does not render `.nyx-metric-card__suffix` when `suffix` is absent
7. Renders `.nyx-metric-card__suffix` when `suffix` is provided
8. Does not render `.nyx-metric-card__icon` when `icon` is absent
9. Renders `NyxIcon` when `icon` is provided
10. Applies `theme-success` class when `theme="success"`
11. Applies `variant-soft` class when `variant="soft"`
12. Applies `variant-filled` class when `variant="filled"`
13. Default variant class is `variant-text` (or no variant class when variant is Text)

---

### Step 6 — Export (`src/components/index.ts`)

Add one import and one export line, following the existing alphabetical order:

```typescript
import NyxMetricCard from './NyxMetricCard/NyxMetricCard.vue'
// ...
export { NyxMetricCard, /* ... */ }
```

---

## Dependency Map

```
NyxMetricCard.vue
  ├── useNyxProps            (already in src/composables)
  ├── NyxIcon.vue            (already in src/components)
  ├── NyxSize, NyxVariant,
  │   NyxTheme               (already in src/types)
  └── NyxMetricCard.scss
```

No new dependencies.

## Risk Register

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| CSS variable names differ from assumed | Medium | Read `src/styles/variables.css` before writing SCSS |
| `NyxSize` token key name differs | Low | Read `src/types/common.ts` to confirm enum keys |
| Icon colour in Filled variant not overridden by CSS `color` (SVG stroke vs fill) | Medium | Check NyxIcon.vue implementation; may need to override `--nyx-icon-color` CSS variable instead of `color` |
| `useNyxProps` does not apply `variant-text` class for default | Low | Verify in useNyxProps.ts before relying on it in tests |
