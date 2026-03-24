# Tasks: NyxTree — Tree-Node Navigation System

**Input**: Design documents from `specs/005-nyx-tree/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on sibling [P] tasks)
- **[Story]**: Which user story this task belongs to (US1–US4)
- All paths are absolute from repo root

---

## Phase 1: Setup

**Purpose**: Update shared type definitions that all implementation tasks depend on.

- [x] T001 Update `NyxTreeModel` recursive type alias, `NyxTreeProps` (add `selected`, `disabled`), `NyxTreeNodeProps` (add `label`, `selected`, `disabled`) in `src/components/NyxTree/NyxTree.types.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Wire the updated type contracts into both components so subsequent phases compile correctly.

**⚠️ CRITICAL**: T001 must be complete before any phase below begins.

- [x] T002 Add `withDefaults(defineProps<NyxTreeProps>(), { disabled: false, selected: [] })` and `defineEmits<NyxTreeEmits>()` to `src/components/NyxTree/NyxTree.vue`
- [x] T003 Add `label: string` to `NyxTreeNode`'s `defineProps<NyxTreeNodeProps>()` call and forward it from the `v-for` loop in `src/components/NyxTree/NyxTree.vue` as `:label="String(key)"`
- [x] T004 Add `defineEmits<{ (e: 'select', path: string[]): void }>()` to `src/components/NyxTree/NyxTreeNode.vue` and propagate `disabled` and `selected` props

**Checkpoint**: Both components compile with updated types. Existing unit tests still pass (`pnpm test:unit`).

---

## Phase 3: User Story 1 — Labelled Tree Display (Priority: P1) 🎯 MVP

**Goal**: Every node key is rendered as a visible label; depth is communicated by indentation.

**Independent Test**: Mount NyxTree with `{ Fruits: { Apple: 'apple' }, Veggies: { Carrot: 'carrot' } }` and assert `Fruits`, `Apple`, `Veggies`, `Carrot` all appear in the rendered output.

### Implementation

- [x] T005 [US1] Render `props.label` inside a `<span class="nyx-tree-node__label">` in the `<li>` of `src/components/NyxTree/NyxTreeNode.vue` (both leaf and branch cases must show the label)
- [x] T006 [P] [US1] Add `.nyx-tree-node__label` base styles (flex, padding, cursor, user-select) and `.nyx-tree-node--branch` / `.nyx-tree-node--leaf` modifier classes in `src/components/NyxTree/NyxTree.scss`
- [x] T007 [P] [US1] Add `role="tree"` to the root `<ul>` in `src/components/NyxTree/NyxTree.vue` and `role="treeitem"` to each `<li>` in `src/components/NyxTree/NyxTreeNode.vue`
- [x] T008 [US1] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert that `Alpha`, `Beta`, `Gamma` appear as labels in the flat model; assert `Fruits` and `Apple` appear in the nested model; assert `role="tree"` on root and `role="treeitem"` on nodes

**Checkpoint**: `pnpm test:unit` — all existing tests pass + T008 tests pass. Tree renders labelled nodes visually in Storybook (ad-hoc verification).

---

## Phase 4: User Story 2 — Expand/Collapse Branch Nodes (Priority: P2)

**Goal**: Clicking a branch label toggles its children. Siblings are unaffected.

**Independent Test**: Mount NyxTree with nested model, find a branch node, click its label, assert children collapse; click again, assert children reappear.

### Implementation

- [x] T009 [US2] Add `const expanded = ref(true)` to `src/components/NyxTree/NyxTreeNode.vue`; wrap the nested `<ul>` in `v-if="!isLeaf && expanded"`; add toggle call `expanded.value = !expanded.value` on label click (branch only)
- [x] T010 [P] [US2] Add a toggle indicator `<span class="nyx-tree-node__toggle">` inside `.nyx-tree-node__label` in `src/components/NyxTree/NyxTreeNode.vue` showing `▾` when expanded, `▸` when collapsed
- [x] T011 [P] [US2] Apply `.nyx-tree-node--expanded` CSS modifier class and `aria-expanded` ARIA attribute (branch nodes only) in `src/components/NyxTree/NyxTreeNode.vue`
- [x] T012 [P] [US2] Add nested `<ul role="group" class="nyx-tree-children">` ARIA role and `.nyx-tree-node--expanded` / toggle indicator styles to `src/components/NyxTree/NyxTree.scss`
- [x] T013 [US2] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert branch children are visible by default; assert clicking branch label hides children (`.nyx-tree-children` absent or `display:none`); assert clicking again shows children; assert sibling branch unaffected

**Checkpoint**: `pnpm test:unit` — all T008 + T013 tests pass. Branch nodes expand/collapse independently in the browser.

---

## Phase 5: User Story 3 — Node Selection with Path Emit (Priority: P3)

**Goal**: Clicking any node emits `select` with the full root-to-node path; selected node is visually highlighted when the `selected` prop matches.

**Independent Test**: Mount NyxTree with nested model, click a leaf, assert `select` was emitted with the correct `string[]` path.

### Implementation

- [x] T014 [US3] Add `handleClick()` function to `src/components/NyxTree/NyxTreeNode.vue`: call `expanded.value = !expanded.value` if branch, then `emit('select', props.path)` — attach `@click="!disabled && handleClick()"` to `.nyx-tree-node__label`
- [x] T015 [P] [US3] Add `isSelected` computed (`props.selected?.length === props.path.length && props.path.every((s, i) => s === props.selected![i])`) and apply `.nyx-tree-node--selected` class + `aria-selected` in `src/components/NyxTree/NyxTreeNode.vue`
- [x] T016 [P] [US3] Bubble `@select="emit('select', $event)"` from child `NyxTreeNode` instances inside the recursive `v-for` in `src/components/NyxTree/NyxTreeNode.vue`, and from the top-level `NyxTreeNode` loop in `src/components/NyxTree/NyxTree.vue`
- [x] T017 [P] [US3] Add `.nyx-tree-node--selected > .nyx-tree-node__label` selected-state styles (background, colour using CSS variables) to `src/components/NyxTree/NyxTree.scss`
- [x] T018 [US3] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert `select` emitted with `['Alpha']` on flat leaf click; assert `select` emitted with `['Fruits', 'Apple']` on nested leaf click; assert `select` emitted with `['Fruits']` on branch click; assert `.nyx-tree-node--selected` applied to node matching `selected` prop; assert no `select` emitted on second click of already-selected node is NOT expected (select fires every click per spec)

**Checkpoint**: `pnpm test:unit` — T008 + T013 + T018 all pass. Parent can receive selected path and highlight the active node.

---

## Phase 6: User Story 4 — Keyboard Navigation (Priority: P4)

**Goal**: Arrow keys navigate visible nodes; Enter/Space activates selection; all interaction is operable without a pointer.

**Independent Test**: Mount NyxTree, focus the root element, dispatch `ArrowDown` keydown, assert next treeitem received focus.

### Implementation

- [x] T019 [US4] Add `tabindex="-1"` to all `<li role="treeitem">` nodes and `tabindex="0"` to the currently `isSelected` node (or the first node if nothing selected) in `src/components/NyxTree/NyxTreeNode.vue`; ensure the root `<ul>` is focusable via `tabindex="0"` in `src/components/NyxTree/NyxTree.vue`
- [x] T020 [US4] Add `const treeRef = ref<HTMLElement | null>(null)` and `@keydown="handleKeydown"` on the root `<ul>` in `src/components/NyxTree/NyxTree.vue`; implement `handleKeydown` using `querySelectorAll('[role="treeitem"]')` for ArrowDown/ArrowUp focus movement and delegating ArrowLeft/Right/Enter/Space to the focused node's `.nyx-tree-node__label` click
- [x] T021 [US4] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert ArrowDown moves focus to next treeitem; assert ArrowUp moves focus to previous treeitem; assert Enter on focused node triggers `select` emit; assert ArrowRight on collapsed branch expands it

**Checkpoint**: `pnpm test:unit` — all T008 + T013 + T018 + T021 pass. Tree is fully keyboard-navigable.

---

## Phase 7: Disabled State & Storybook (Polish)

**Purpose**: Expose `disabled` prop behaviour and create the Storybook stories required by FR-009.

- [x] T022 Add `aria-disabled` attribute to root `<ul>` in `src/components/NyxTree/NyxTree.vue` when `disabled=true`; guard `handleKeydown` with early return when disabled
- [x] T023 [P] Add `[aria-disabled="true"]` CSS rule (opacity, pointer-events: none) to `src/components/NyxTree/NyxTree.scss`
- [x] T024 [P] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert no `select` emits when clicking any node with `disabled=true`; assert `aria-disabled="true"` present on root
- [x] T025 Create `src/components/NyxTree/NyxTree.stories.ts` with four named exports: `Default` (flat model), `Nested` (two-level model, all expanded), `WithSelection` (nested model with `selected` pre-set to `['Fruits', 'Apple']`), `Disabled` (nested model, `disabled: true`) — follow `NyxButton.stories.ts` `defineComponent` pattern
- [x] T026 [P] Update `docs/specs/components/NyxTree.spec.md` to reflect any final API differences discovered during implementation (verify props table, CSS class list, keyboard behaviour table are accurate)
- [x] T027 [P] Run `pnpm type-check` and `pnpm test:unit` and fix any remaining TypeScript errors or test failures

---

## Phase 8: Post-Implementation Spec Sync (added after /speckit.analyze)

**Purpose**: Capture three features shipped during implementation that were absent from all prior artifacts. No code changes — documentation and test coverage only.

- [x] T028 [P] Update `spec.md`: correct FR-004 to "collapsed by default", add FR-011 (`open` prop), FR-012 (model-embedded `disabled`), FR-013 (auto-expand on `selected`); fix US2 scenario ordering; clarify US4-S3/S4 v1 simplification; update SC-003 wording
- [x] T029 [P] Update `docs/specs/components/NyxTree.spec.md`: remove stale `disabledNodes` prop row, fix `NyxTreeModel` type to include `disabled?: boolean`, add auto-expand note to `selected` prop description, update internal architecture note, expand known-limitations section
- [x] T030 [P] Update `plan.md`: fix circular `type` alias to `interface` with `disabled` key, add `open` to `NyxTreeProps` example, correct SCSS token names, replace `v-if` children snippet with `inert` approach + explanatory comment, update ArrowLeft/Right design note
- [x] T031 [P] Fix `NyxTree.scss`: replace hardcoded `border-radius: 4px` with `var(--nyx-radius-sm)` (Constitution VI)
- [x] T032 [P] Add `AutoExpandOnSelect` Storybook story demonstrating reactive ancestor expansion without an `open` prop

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (T001)**: No dependencies — start immediately
- **Phase 2 (T002–T004)**: Depends on T001 — BLOCKS all user stories
- **Phase 3 (T005–T008)**: Depends on Phase 2 completion
- **Phase 4 (T009–T013)**: Depends on Phase 3 completion (expand/collapse is part of the click handler that also fires select)
- **Phase 5 (T014–T018)**: Depends on Phase 4 completion (click handler must already exist from T009)
- **Phase 6 (T019–T021)**: Depends on Phase 5 (keyboard nav delegates to the click handler from T014)
- **Phase 7 (T022–T027)**: Depends on Phase 6 completion

### User Story Dependencies

- **US1 (P1)**: Start after Phase 2
- **US2 (P2)**: Start after US1 complete (label must exist before toggle indicator is added to it)
- **US3 (P3)**: Start after US2 complete (click handler is shared with expand/collapse toggle)
- **US4 (P4)**: Start after US3 complete (keyboard nav delegates to the established click handler)

### Within Each Phase — Parallel Opportunities

- T006, T007 can run in parallel with T005 (different concerns: styles + ARIA vs template)
- T010, T011, T012 can run in parallel (different aspects of expand/collapse)
- T015, T016, T017 can run in parallel with each other (after T014 is complete)
- T022, T023, T025, T026 can run in parallel in Phase 7

---

## Parallel Execution Example: Phase 3 (US1)

```text
# After T005 (label rendered in template):
[P] T006 — NyxTree.scss label styles
[P] T007 — ARIA role attributes

# Then:
T008 — extend NyxTree.spec.ts (depends on T005 + T007)
```

## Parallel Execution Example: Phase 5 (US3)

```text
# After T014 (handleClick wired):
[P] T015 — isSelected computed + class + aria-selected
[P] T016 — bubble select emit through recursive tree
[P] T017 — selected-state SCSS

# Then:
T018 — extend spec.ts (depends on T014–T017)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: T001
2. Complete Phase 2: T002–T004
3. Complete Phase 3: T005–T008
4. **STOP and VALIDATE**: run `pnpm test:unit`, confirm labels render in Storybook
5. Merge or demo — tree is functional and readable

### Incremental Delivery

1. Phase 1 + 2 → Types wired up
2. Phase 3 → Labels visible (MVP)
3. Phase 4 → Expand/collapse working
4. Phase 5 → Selection + path emit working
5. Phase 6 → Keyboard navigation working
6. Phase 7 → Storybook stories + disabled state complete

---

## Notes

- [P] tasks operate on different files or orthogonal concerns — safe to run in parallel
- Story labels map tasks to spec.md user stories for traceability
- US2 and US3 share the click handler on `.nyx-tree-node__label` — keep T009 and T014 coordinated
- The ArrowLeft/Right keyboard behaviour (T020) delegates to label click, which has a combined expand+select side-effect; this is acceptable for v1 per research.md Finding 2
- Run `pnpm type-check` after every phase to catch type regressions early
- Commit after each phase checkpoint is confirmed green
