# Tasks: NyxMetricCard

**Input**: Design documents from `/specs/014-nyx-metric-card/`
**Branch**: `014-nyx-metric-card`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US4)
- Exact file paths included in every description

---

## Phase 1: Setup

**Purpose**: Create the component directory and empty files so all subsequent tasks have a landing place.

- [x] T001 Create directory `src/components/NyxMetricCard/` and empty placeholder files: `NyxMetricCard.vue`, `NyxMetricCard.types.ts`, `NyxMetricCard.scss`, `NyxMetricCard.stories.ts`, `NyxMetricCard.spec.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types contract and library export registration. Every story depends on these.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T002 Define `NyxMetricCardProps` interface in `src/components/NyxMetricCard/NyxMetricCard.types.ts` — fields: `title: string`, `value: string`, `unit?: string`, `suffix?: string`, `theme?: NyxTheme`, `icon?: string`, `variant?: NyxVariant` (import types from `@/types`)
- [x] T003 [P] Register the component export in `src/components/index.ts`: add `import NyxMetricCard from './NyxMetricCard/NyxMetricCard.vue'` and add `NyxMetricCard` to the export list (alphabetical order)

**Checkpoint**: Types defined and export registered — implementation can begin.

---

## Phase 3: User Story 1 — Display a Basic Metric (Priority: P1) 🎯 MVP

**Goal**: A card that renders `title` (uppercase, muted) and `value` (large, bright) is fully functional with only the two required props.

**Independent Test**: Mount `<NyxMetricCard title="ACTIVE NODES" value="12/12" />` — root element renders, title is present, value is present, no unit/suffix/icon/indicator visible.

### Implementation

- [x] T004 [US1] Write the script block of `src/components/NyxMetricCard/NyxMetricCard.vue`: import SCSS, import `NyxMetricCardProps` from `./NyxMetricCard.types`, import `useNyxProps` from `@/composables`, call `const props = defineProps<NyxMetricCardProps>()` and `const { classList } = useNyxProps(props, { origin: 'NyxMetricCard' })`
- [x] T005 [US1] Write the template block of `src/components/NyxMetricCard/NyxMetricCard.vue` for US1 (title + value only): root `<div class="nyx-metric-card" :class="classList">` containing `<span class="nyx-metric-card__indicator" aria-hidden="true" />` and `<div class="nyx-metric-card__body">` with `<div class="nyx-metric-card__title">{{ title }}</div>` and `<div class="nyx-metric-card__row"><span class="nyx-metric-card__value">{{ value }}</span></div>`
- [x] T006 [US1] Write the base SCSS in `src/components/NyxMetricCard/NyxMetricCard.scss`: component CSS variable declarations (`--nyx-c-metric-card-indicator`), base layout (flex, border-radius, background, padding), and styles for `__indicator` (hidden by default), `__body`, `__title` (`color: var(--nyx-c-text-2)`, `text-transform: uppercase`, `font-size: var(--nyx-font-size-xs)`), `__row` (flex, align-items baseline, gap), and `__value` (`color: var(--nyx-c-text-1)`, large font-size, font-weight 600). Read `src/styles/variables.css` to confirm exact token names before writing.
- [x] T007 [US1] Write unit tests in `src/components/NyxMetricCard/NyxMetricCard.spec.ts` for US1: (1) renders `.nyx-metric-card` root element, (2) renders `title` text content, (3) renders `value` text content, (4) does NOT render `.nyx-metric-card__unit` when `unit` is absent, (5) does NOT render `.nyx-metric-card__suffix` when `suffix` is absent, (6) does NOT render `.nyx-metric-card__icon` when `icon` is absent. Follow `src/components/NyxBadge/NyxBadge.spec.ts` for boilerplate.

**Checkpoint**: US1 fully functional — `pnpm test:unit` passes for the six US1 test cases. ✅

---

## Phase 4: User Story 2 — Unit, Suffix, and Icon (Priority: P2)

**Goal**: The optional `unit`, `suffix`, and `icon` props all render correctly alongside the value.

**Independent Test**: Mount with `value="64"`, `unit="%"`, `suffix="STABLE"`, `theme="success"`, `icon="trending-up"` — all five elements render; unit and suffix are visually distinct from the value.

### Implementation

- [x] T008 [P] [US2] Extend the template in `src/components/NyxMetricCard/NyxMetricCard.vue`: add to `__row` — `<span v-if="unit" class="nyx-metric-card__unit">{{ unit }}</span>`, `<span v-if="suffix" class="nyx-metric-card__suffix">{{ suffix }}</span>`, `<span v-if="icon" class="nyx-metric-card__icon"><NyxIcon :name="icon" :theme="props.theme" :size="NyxSize.Small" aria-hidden="true" /></span>`. Add `import NyxIcon from '../NyxIcon/NyxIcon.vue'` and `import { NyxSize } from '@/types'` to the script block. Confirm correct `NyxSize` enum key in `src/types/common.ts`.
- [x] T009 [P] [US2] Extend `src/components/NyxMetricCard/NyxMetricCard.scss` with styles for `__unit` (`color: var(--nyx-c-text-2)`, `font-size: var(--nyx-font-size-sm)`), `__suffix` (`color: var(--nyx-c-metric-card-indicator)`, `font-size: var(--nyx-font-size-sm)`, `font-weight: 600`), and `__icon` (`display: inline-flex`, `align-items: center`, `color: var(--nyx-c-metric-card-indicator)`). Also add theme override rules using `@each $theme in primary, secondary, success, warning, danger, info` that set `--nyx-c-metric-card-indicator` and `--nyx-rgb-metric-card`. Compare with the `@each` loop pattern in `src/components/NyxBadge/NyxBadge.scss`.
- [x] T010 [US2] Extend unit tests in `src/components/NyxMetricCard/NyxMetricCard.spec.ts` for US2: (7) renders `.nyx-metric-card__unit` text when `unit` is provided, (8) renders `.nyx-metric-card__suffix` text when `suffix` is provided, (9) renders `.nyx-metric-card__icon` wrapper when `icon` is provided, (10) applies `theme-success` class to root when `theme="success"`. Run `pnpm type-check` and `pnpm test:unit` after this task.

**Checkpoint**: US2 fully functional — title, value, unit, suffix, icon all render correctly with appropriate theming. ✅

---

## Phase 5: User Story 3 — Visual Variants (Priority: P2)

**Goal**: All six variant values produce the correct indicator-border and card-fill behaviour as specified.

**Independent Test**: Mount the component with each of the six variants and verify: Text = no indicator; Soft/Subtle = indicator always visible; Ghost/Outline = indicator appears only on hover; Filled = card background filled, no indicator.

### Implementation

- [x] T011 [US3] Add variant SCSS rules to `src/components/NyxMetricCard/NyxMetricCard.scss` after the theme overrides: `&.variant-soft, &.variant-subtle { .nyx-metric-card__indicator { opacity: 1; } }`, `&.variant-ghost, &.variant-outline { &:hover .nyx-metric-card__indicator { opacity: 1; } }`, `&.variant-filled { background: var(--nyx-c-metric-card-indicator); .nyx-metric-card__indicator { display: none; } }`. (US4's colour overrides will be added in the next phase — do not add them here.)
- [x] T012 [US3] Extend unit tests in `src/components/NyxMetricCard/NyxMetricCard.spec.ts` for US3: (11) applies `variant-soft` class when `variant="soft"`, (12) applies `variant-subtle` class when `variant="subtle"`, (13) applies `variant-ghost` class when `variant="ghost"`, (14) applies `variant-outline` class when `variant="outline"`, (15) applies `variant-filled` class when `variant="filled"`, (16) no variant class applied when `variant` is omitted (or `variant-text` class applied — verify against `useNyxProps` behaviour at `src/composables/useNyxProps.ts`).

**Checkpoint**: US3 fully functional — all variant classes applied correctly per `useNyxProps`. ✅

---

## Phase 6: User Story 4 — Filled Variant Colour Overrides (Priority: P3)

**Goal**: When `variant="filled"`, the `suffix` and `icon` use `var(--nyx-c-text-1)` instead of the theme colour.

**Independent Test**: Mount with `variant="filled"`, `theme="success"`, `icon="check"`, `suffix="OK"` — the suffix and icon wrapper do not carry a green-tinted colour; they inherit default text colour from the CSS override.

### Implementation

- [x] T013 [US4] Add colour-override rules inside the `&.variant-filled` block in `src/components/NyxMetricCard/NyxMetricCard.scss`: `.nyx-metric-card__suffix { color: var(--nyx-c-text-1); }` and `.nyx-metric-card__icon { color: var(--nyx-c-text-1); }`. Check whether `NyxIcon` uses `color` or a custom property (e.g. `--nyx-icon-color`) by reading `src/components/NyxIcon/NyxIcon.vue` — add the appropriate override.
- [x] T014 [US4] Extend unit tests in `src/components/NyxMetricCard/NyxMetricCard.spec.ts` for US4: (17) with `variant="filled"` the `__suffix` element does not carry a theme-colour inline style, (18) with a non-filled variant and `theme="success"` the `__suffix` has the themed `color` class or inherited CSS variable (verify what is testable with `@vue/test-utils` class/style assertions).

**Checkpoint**: US4 complete — filled variant correctly overrides icon and suffix colour to default text. ✅

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Storybook stories, visual review readiness, docs sync check.

- [x] T015 [P] Write Storybook stories in `src/components/NyxMetricCard/NyxMetricCard.stories.ts`: export `Default` (title+value only), `WithUnit` (+ unit), `WithSuffix` (+ themed suffix), `WithIcon` (+ icon), `AllVariants` (all 6 variants in a row), `AllThemes` (all 6 themes). Follow the Template factory pattern from `src/components/NyxBadge/NyxBadge.stories.ts`.
- [x] T016 [P] Verify `docs/specs/components/NyxMetricCard.spec.md` reflects the final implementation: confirm prop table, variant table, DOM shape, and known-limitations sections are accurate against the delivered code.
- [x] T017 Run `pnpm type-check` and `pnpm test:unit` to confirm zero errors and all tests pass before marking the feature complete.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — **BLOCKS all user stories**
- **US1 (Phase 3)**: Depends on Phase 2 completion
- **US2 (Phase 4)**: Depends on Phase 3 completion (needs base template to extend)
- **US3 (Phase 5)**: Depends on Phase 2 completion (variant classes are CSS-only; can start in parallel with US2)
- **US4 (Phase 6)**: Depends on Phase 5 completion (extends the `variant-filled` block)
- **Polish (Phase 7)**: Depends on all US phases complete

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — no story dependencies
- **US2 (P2)**: After US1 — extends the template and SCSS
- **US3 (P2)**: After Phase 2 — independent of US2 (pure CSS, different selectors)
- **US4 (P3)**: After US3 — adds rules inside the `variant-filled` block

### Parallel Opportunities

- T002 and T003 (Phase 2) are in different files — run in parallel
- T008 and T009 (US2 template + SCSS) are in different files — run in parallel
- T015 and T016 (Polish) are in different files — run in parallel
- US2 (T008–T010) and US3 (T011–T012) can be worked in parallel by different agents

---

## Parallel Example: US2 + US3 simultaneously

```
Agent A — US2:
  T008: Extend template with unit/suffix/icon
  T009: Extend SCSS with __unit, __suffix, __icon, theme @each loop
  T010: Unit tests for US2 props

Agent B — US3 (can start after Phase 2, independently of US2):
  T011: Add variant SCSS rules
  T012: Unit tests for variant classes
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup
2. Phase 2: Foundational — types + export
3. Phase 3: US1 — base component renders title and value
4. **STOP and VALIDATE**: `pnpm test:unit` passes; component visible in Storybook
5. Ship MVP

### Incremental Delivery

1. Phases 1–3 → MVP (title + value card)
2. Phase 4 (US2) → unit + suffix + icon
3. Phases 5–6 (US3 + US4) → all variant and fill behaviour
4. Phase 7 → stories, docs check, final type-check

---

## Notes

- Read `src/styles/variables.css` before writing any SCSS token references
- Read `src/composables/useNyxProps.ts` to confirm `variant-text` class emission for default variant
- Read `src/components/NyxIcon/NyxIcon.vue` to confirm whether colour is driven by CSS `color` or a custom property before writing the Filled override in T013
- Run `pnpm type-check` after T008 (adding `NyxIcon` import) to catch any type issues early
- Commit after each checkpoint to keep work recoverable
