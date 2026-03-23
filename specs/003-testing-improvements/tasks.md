# Tasks: Testing Improvements

**Input**: Design documents from `/specs/003-testing-improvements/`
**Prerequisites**: plan.md ✓, research.md ✓, data-model.md ✓, quickstart.md ✓

**User Stories** (derived from data-model.md priority matrix — no spec.md exists):
- **US1**: Core visual component smoke + class tests (NyxButton, NyxProgress)
- **US2**: Interactive component tests — keyboard, ARIA, Teleport (NyxModal, NyxSlider)
- **US3**: Form primitive tests (NyxInput, NyxCheckbox, NyxTextarea, NyxSwitch)
- **US4**: Complex interaction component tests (NyxSelect, NyxTabs)
- **US5**: Composable logic tests (`useTeleportPositionBase`)
- **US6**: Remaining component tests + E2E placeholder removal (NyxTooltip, NyxBadge, NyxSpinner, NyxCard)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on sibling tasks)
- **[Story]**: Which user story this task belongs to

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify test infrastructure and document any gaps before writing new tests.

- [X] T001 Run `pnpm test:unit` to confirm all existing tests pass — baseline before adding new ones
- [X] T002 Read `vitest.config.ts` to confirm `environment: 'jsdom'` and `@vue/test-utils` availability (no action needed if confirmed, document if not)

**Checkpoint**: Existing test suite passes. `@vue/test-utils` is available. Ready to add component specs.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish patterns and shared helpers used by multiple test files.

**⚠️ CRITICAL**: Complete before any US3+ work — establishes jsdom mocking patterns.

- [X] T003 Read `src/components/NyxEditor/NyxEditor.spec.ts` in full to confirm the mount/class-assertion pattern before writing first new spec
- [X] T004 Read `src/composables/useNyxProps.spec.ts` to note how `inject` mocking is handled for `useNyxProps` consumers

**Checkpoint**: Patterns confirmed. Component spec pattern understood. Ready for all user stories.

---

## Phase 3: User Story 1 — Core Visual Component Tests (Priority: P1) 🎯 MVP

**Goal**: Tests for the two highest-ROI components: NyxButton (simplest, establishes pattern) and NyxProgress (verifies the min/max bug fix from audit C2 is regression-protected).

**Independent Test**: `pnpm test:unit src/components/NyxButton/NyxButton.spec.ts src/components/NyxProgress/NyxProgress.spec.ts` — both pass.

- [X] T005 [P] [US1] Create `src/components/NyxButton/NyxButton.spec.ts` — tests: renders `.nyx-button`, `theme='primary'` → `theme-primary` class, `variant='filled'` → `variant-filled` class, `size='lg'` → `size-lg` class, `disabled=true` → disabled attribute, `href` → renders `<a>` not `<button>`, default slot renders, `@click` fires emit, `@click` NOT fired when disabled
- [X] T006 [P] [US1] Create `src/components/NyxProgress/NyxProgress.spec.ts` — tests: renders `.nyx-progress`, `modelValue=50 min=0 max=100` → `--progress: '50%'`, `modelValue=50 min=40 max=60` → `--progress: '50%'` (verifies C2 fix), `modelValue=null` → `--progress: '100%'` (indeterminate), `NyxProgressVariant.Dots` → renders `.nyx-progress__dot` elements, `NyxProgressVariant.Line` → renders `.nyx-progress__bar`, `showValue=true` + `modelValue=75` → label renders `'75'`, `showValue=false` → no label, variant class present (`variant--line`)

**Checkpoint**: NyxButton and NyxProgress specs pass. Min/max regression test in place.

---

## Phase 4: User Story 2 — Interactive Component Tests (Priority: P1)

**Goal**: Tests for the two highest-risk untested behaviours: NyxModal (focus trap, ARIA, ESC) and NyxSlider (pointer drag, step snapping, range mode edge cases).

**Independent Test**: `pnpm test:unit src/components/NyxModal/NyxModal.spec.ts src/components/NyxSlider/NyxSlider.spec.ts` — both pass.

- [X] T007 [US2] Create `src/components/NyxModal/NyxModal.spec.ts` — tests:
  - `modelValue=false` → `.nyx-modal--open` absent
  - `modelValue=true` → `.nyx-modal--open` present
  - `article[role="dialog"]` present in DOM when open (use `attachTo: document.body`)
  - `article[aria-modal="true"]` present when open
  - `title='Test'` → `aria-labelledby` attribute on `<article>` is non-empty; its value matches `<h1>` `id`
  - ESC keydown → emits `'close'`, `modelValue` becomes false
  - `static=true` + ESC → does NOT close (emit NOT fired)
  - backdrop `.nyx-modal` click triggers `'close'` emit
  - close button `×` click fires `'cancel'` emit
  - `confirmText='OK'` → confirm button renders; click fires `'confirm'` emit
  - default slot content renders inside `.nyx-modal__body`
  - header slot renders inside `.nyx-modal__header`
  - (Note: use `attachTo: document.body` for all tests; call `wrapper.unmount()` in `afterEach`)
- [X] T008 [US2] Create `src/components/NyxSlider/NyxSlider.spec.ts` — tests:
  - `modelValue=50 min=0 max=100` → thumb position CSS reflects 50%
  - `modelValue=25 min=0 max=100` → thumb position reflects 25%
  - `modelValue=50 min=40 max=60` → thumb position reflects 50% (correct range calc)
  - `modelValue=[10, 90]` → two thumbs rendered (`.nyx-slider__thumb` count = 2)
  - `modelValue=[0, 50]` → second thumb renders (guard against falsy-zero bug M5)
  - step snapping: mock `getBoundingClientRect` on track; trigger `pointerdown` at ~15% of width with `step=10` → value snaps to nearest step
  - `direction='column'` + pointerdown/move with `clientY` → value changes (mock `getBoundingClientRect` to return height-based rect)
  - ArrowRight keydown on thumb → value increases by 1 (or step)
  - ArrowLeft keydown on thumb → value decreases

**Checkpoint**: NyxModal and NyxSlider specs pass. Drag logic, focus trap, and ARIA coverage in place.

---

## Phase 5: User Story 3 — Form Primitive Tests (Priority: P2)

**Goal**: Smoke + v-model + disabled tests for the four core form primitives.

**Independent Test**: `pnpm test:unit src/components/NyxInput/NyxInput.spec.ts src/components/NyxCheckbox/NyxCheckbox.spec.ts src/components/NyxTextarea/NyxTextarea.spec.ts src/components/NyxSwitch/NyxSwitch.spec.ts` — all pass.

- [X] T009 [P] [US3] Create `src/components/NyxInput/NyxInput.spec.ts` — tests: renders `.nyx-input`, `disabled=true` → disabled attr on `<input>`, `readonly=true` → readonly attr, `modelValue='hello'` → `<input>` value is `'hello'`, update:modelValue emitted on input, prefix/suffix slots render when provided
- [X] T010 [P] [US3] Create `src/components/NyxCheckbox/NyxCheckbox.spec.ts` — tests: renders `.nyx-checkbox`, `modelValue=true` → `<input>` is checked, `modelValue=false` → not checked, `disabled=true` → input disabled, label text renders via slot, update:modelValue fires on change
- [X] T011 [P] [US3] Create `src/components/NyxTextarea/NyxTextarea.spec.ts` — tests: renders `.nyx-textarea`, `modelValue='text'` → textarea value is `'text'`, `disabled=true` → textarea disabled, `rows=5` → rows attr on textarea, update:modelValue emitted on input
- [X] T012 [P] [US3] Create `src/components/NyxSwitch/NyxSwitch.spec.ts` — tests: renders `.nyx-switch`, `modelValue=true` → active class present (or checked state), `modelValue=false` → inactive, `disabled=true` → click does not emit, update:modelValue fires on toggle

**Checkpoint**: All four form primitive specs pass.

---

## Phase 6: User Story 4 — Complex Interaction Component Tests (Priority: P2)

**Goal**: Tests for NyxSelect (open/close, option selection, multiple) and NyxTabs (tab switching, ARIA).

**Independent Test**: `pnpm test:unit src/components/NyxSelect/NyxSelect.spec.ts src/components/NyxTabs/NyxTabs.spec.ts` — both pass.

- [X] T013 [US4] Read `src/components/NyxSelect/NyxSelect.vue` fully before writing spec — note internal open/close state, how options are passed, teleport usage
- [X] T014 [US4] Create `src/components/NyxSelect/NyxSelect.spec.ts` — tests: renders `.nyx-select`, clicking control opens dropdown, `options` array → option elements render, clicking option sets modelValue and closes dropdown, `multiple=true` → multiple options can be selected, `disabled=true` → control click does not open dropdown, keyboard navigation (ArrowDown, Enter) works (if implemented)
- [X] T015 [US4] Read `src/components/NyxTabs/NyxTabs.vue` fully before writing spec — note how tabs/panels are structured, how active tab is tracked
- [X] T016 [US4] Create `src/components/NyxTabs/NyxTabs.spec.ts` — tests: renders `.nyx-tabs`, first tab is active by default, clicking second tab activates it and deactivates first, correct panel content renders per active tab, `role="tablist"` on list (if implemented), `role="tab"` + `aria-selected` on buttons (if implemented), `role="tabpanel"` on panels (if implemented) — assert what exists; note any missing ARIA

**Checkpoint**: NyxSelect and NyxTabs specs pass.

---

## Phase 7: User Story 5 — Composable Logic Tests (Priority: P2)

**Goal**: Unit tests for `useTeleportPositionBase` — the most complex untested code in the codebase.

**Independent Test**: `pnpm test:unit src/composables/useTeleportPositionBase.spec.ts` — passes.

- [X] T017 [US5] Read `src/composables/useTeleportPositionBase.ts` fully before writing spec
- [X] T018 [US5] Create `src/composables/useTeleportPositionBase.spec.ts` — tests:
  - SSR guard: call composable in a context where `typeof window === 'undefined'` is simulated → returns without throwing (use `vi.stubGlobal('window', undefined)` / restore after)
  - Position bottom: mock anchor rect `{left:0, top:50, bottom:70, width:100, height:20}`, mock absolute rect `{width:100, height:80}`; with space below → `--top` ≈ `70px`, `--left` ≈ `0px`
  - Mirror to top: mock anchor `bottom=700` on a 768px-height viewport (`vi.stubGlobal`) with element height 200 → no space below → mirrors to top; `--top` < anchor top
  - isUpdateAllowed: when `isUpdateAllowed.value = false` → `updateCssVariables` does not update values
  - (Note: requires mounting a minimal Vue component to get proper composable lifecycle)

**Checkpoint**: `useTeleportPositionBase` spec passes. Positioning logic is regression-protected.

---

## Phase 8: User Story 6 — Remaining Components + E2E Cleanup (Priority: P3)

**Goal**: Smoke tests for lower-priority components; remove the Playwright scaffolding placeholder.

**Independent Test**: `pnpm test:unit src/components/NyxTooltip/NyxTooltip.spec.ts src/components/NyxBadge/NyxBadge.spec.ts src/components/NyxSpinner/NyxSpinner.spec.ts src/components/NyxCard/NyxCard.spec.ts` — all pass. `e2e/vue.spec.ts` no longer references scaffolding text.

- [X] T019 [P] [US6] Create `src/components/NyxTooltip/NyxTooltip.spec.ts` — tests: renders `.nyx-tooltip`, visible state toggled by trigger interaction, `aria-describedby` on trigger references tooltip content (if implemented), theme/variant/size classes applied
- [X] T020 [P] [US6] Create `src/components/NyxBadge/NyxBadge.spec.ts` — tests: renders `.nyx-badge`, default slot content renders, theme/variant/size classes applied
- [X] T021 [P] [US6] Create `src/components/NyxSpinner/NyxSpinner.spec.ts` — tests: renders `.nyx-spinner`, `role="progressbar"` present, `aria-label` present, size class applied
- [X] T022 [P] [US6] Create `src/components/NyxCard/NyxCard.spec.ts` — tests: renders `.nyx-card`, default slot content renders, click event emits (if `@click` is defined on root element)
- [X] T023 [US6] Update `e2e/vue.spec.ts` — remove the `'You did it!'` scaffolding test; replace with a placeholder comment block explaining that E2E tests should target the dev app or Storybook once a CI server is configured

**Checkpoint**: All component specs in place. E2E placeholder removed.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Run full suite, confirm coverage increase, update docs.

- [X] T024 Run full test suite `pnpm test:unit` — all specs pass, no regressions in existing tests
- [X] T025 [P] Update `docs/audits/20260323-1042.md` Divergence Log — add entries for each spec file added, marking Testing dimension improvements
- [X] T026 [P] Verify `pnpm type-check` still passes — no TypeScript errors introduced in spec files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1
- **US1 (Phase 3)**: Depends on Phase 2 — **can start immediately after**
- **US2 (Phase 4)**: Depends on Phase 2 — **can run in parallel with US1**
- **US3 (Phase 5)**: Depends on Phase 2 — **can run in parallel with US1, US2**
- **US4 (Phase 6)**: Depends on Phase 2 — **can run in parallel with any above; T013/T015 reads required before T014/T016**
- **US5 (Phase 7)**: Depends on Phase 2 — **T017 read required before T018**
- **US6 (Phase 8)**: Independent of all user stories
- **Polish (Phase 9)**: Depends on all user story phases complete

### User Story Dependencies

All user stories depend only on Phase 2 completion. No cross-story dependencies.

### Parallel Opportunities

Within US1: T005 and T006 are fully parallel (different files).
Within US3: T009, T010, T011, T012 are fully parallel (different files).
Within US6: T019, T020, T021, T022 are fully parallel (different files).
Across stories: US1, US2, US3, US4, US5, US6 can all proceed in parallel after Phase 2.

---

## Parallel Example: User Story 3

```bash
# These four tasks can be dispatched simultaneously:
Task: "Create NyxInput.spec.ts in src/components/NyxInput/"     # T009
Task: "Create NyxCheckbox.spec.ts in src/components/NyxCheckbox/" # T010
Task: "Create NyxTextarea.spec.ts in src/components/NyxTextarea/" # T011
Task: "Create NyxSwitch.spec.ts in src/components/NyxSwitch/"    # T012
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1–2: Setup + baseline check
2. Complete Phase 3 (US1): NyxButton + NyxProgress — **stop and run tests**
3. Complete Phase 4 (US2): NyxModal + NyxSlider — **stop and run tests**
4. **VALIDATE**: `pnpm test:unit` — confirm 20+ new tests pass
5. This alone raises testing score from 4/10 to approximately 6/10

### Full Delivery

1. Continue with US3 (form primitives) — adds 4 more spec files in parallel
2. US4 (NyxSelect, NyxTabs) — reads required before writing
3. US5 (useTeleportPositionBase) — most complex; read first
4. US6 (remaining components + E2E cleanup) — parallel, fast
5. Phase 9: full suite run + docs update

---

## Notes

- All tasks produce `*.spec.ts` files only — no source changes
- Read the component source before writing its spec (confirm class names, prop names, emit names)
- `attachTo: document.body` required for any component using `<Teleport>`; always call `wrapper.unmount()` in `afterEach`
- Mock `getBoundingClientRect` for drag/position tests — jsdom has no layout engine
- Assert what the component *currently does*; note missing ARIA but don't block on it
- Commit after each phase checkpoint
