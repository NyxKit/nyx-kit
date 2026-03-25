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

**Purpose**: Establish the canonical status-driven node model that all implementation tasks depend on.

- [x] T001 Canonicalize `src/components/NyxTree/NyxTree.types.ts` around `NyxTreeModel = NyxTreeNodeBase[]`, `NyxTreeNodeStatus`, `NyxTreeProps.disabled`, and `NyxTreeEmits.select(node)`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Wire the canonical node contracts into both components so subsequent phases compile correctly.

**⚠️ CRITICAL**: T001 must be complete before any phase below begins.

- [x] T002 Add `withDefaults(defineProps<NyxTreeProps>(), { disabled: false })`, `defineEmits<NyxTreeEmits>()`, root tree semantics, and keydown handling to `src/components/NyxTree/NyxTree.vue`
- [x] T003 Update the top-level `v-for` in `src/components/NyxTree/NyxTree.vue` to render `NyxTreeNodeBase` entries by `node.id` and forward tree-level `disabled`
- [x] T004 Add `defineEmits<{ (e: 'select', node: NyxTreeNodeBase): void }>()` to `src/components/NyxTree/NyxTreeNode.vue` and propagate disabled state through recursive children

**Checkpoint**: Both components compile with updated types. Existing unit tests still pass (`pnpm test:unit`).

---

## Phase 3: User Story 1 — Labelled Tree Display (Priority: P1) 🎯 MVP

**Goal**: Every node label is rendered visibly; depth is communicated by indentation.

**Independent Test**: Mount NyxTree with nested `NyxTreeNodeBase[]` data and assert `Fruits`, `Apple`, `Veggies`, and `Carrot` all appear in the rendered output.

### Implementation

- [x] T005 [US1] Render `node.label` inside a `<span class="nyx-tree-node__label">` in `src/components/NyxTree/NyxTreeNode.vue` for both branch and leaf nodes
- [x] T006 [P] [US1] Add `.nyx-tree-node__label` base styles and `.nyx-tree-node--branch` / `.nyx-tree-node--leaf` modifier classes in `src/components/NyxTree/NyxTree.scss`
- [x] T007 [P] [US1] Add `role="tree"` to the root `<ul>` in `src/components/NyxTree/NyxTree.vue` and `role="treeitem"` to each `<li>` in `src/components/NyxTree/NyxTreeNode.vue`
- [x] T008 [US1] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert labels appear in flat and nested models; assert `role="tree"` on root and `role="treeitem"` on nodes

**Checkpoint**: `pnpm test:unit` — all existing tests pass + T008 tests pass. Tree renders labelled nodes visually in Storybook.

---

## Phase 4: User Story 2 — Status-Driven Branch Expansion (Priority: P2)

**Goal**: Branch expansion is rendered from `node.status`, and sibling branches remain independent.

**Independent Test**: Mount NyxTree with nested model, assert default branch is collapsed, then set one branch to `Open` or `Active` and assert only that branch renders expanded.

### Implementation

- [x] T009 [US2] Add computed `isExpanded` to `src/components/NyxTree/NyxTreeNode.vue` based on `node.status === Open || Active`
- [x] T010 [P] [US2] Add a toggle indicator `<span class="nyx-tree-node__toggle">` inside `.nyx-tree-node__label` in `src/components/NyxTree/NyxTreeNode.vue` showing `▾` when expanded and `▸` when collapsed
- [x] T011 [P] [US2] Apply `.nyx-tree-node--expanded` CSS modifier class and `aria-expanded` ARIA attribute for branch nodes in `src/components/NyxTree/NyxTreeNode.vue`
- [x] T012 [P] [US2] Add nested `<ul role="group" class="nyx-tree-children">` and expanded/collapsed styles in `src/components/NyxTree/NyxTree.scss`
- [x] T013 [US2] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert branches are collapsed by default, `Open` and `Active` branches render expanded, and sibling branch state is unaffected

**Checkpoint**: `pnpm test:unit` — all T008 + T013 tests pass. Branch rendering follows model status.

---

## Phase 5: User Story 3 — Node Selection with Node Emit (Priority: P3)

**Goal**: Clicking any node emits `select` with the full node object; active nodes are visually highlighted from `status: Active`.

**Independent Test**: Mount NyxTree with nested model, click a leaf, and assert `select` was emitted with the correct node object.

### Implementation

- [x] T014 [US3] Add `handleClick()` to `src/components/NyxTree/NyxTreeNode.vue` that emits `select` with `props.node` and respects disabled state
- [x] T015 [P] [US3] Add `isActive` computed from `node.status === Active` and apply `.nyx-tree-node--active` + `aria-selected` in `src/components/NyxTree/NyxTreeNode.vue`
- [x] T016 [P] [US3] Bubble `@select="emit('select', $event)"` from recursive `NyxTreeNode` instances and from the top-level loop in `src/components/NyxTree/NyxTree.vue`
- [x] T017 [P] [US3] Add `.nyx-tree-node--active > .nyx-tree-node__label` active-state styles to `src/components/NyxTree/NyxTree.scss`
- [x] T018 [US3] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert `select` emits the clicked node object for leaf and branch clicks; assert `.nyx-tree-node--active` applies from `status: Active`

**Checkpoint**: `pnpm test:unit` — T008 + T013 + T018 all pass. Parent can receive a clicked node and update model state.

---

## Phase 6: User Story 4 — Keyboard Navigation (Priority: P4)

**Goal**: Arrow keys navigate visible nodes; Enter/Space activates selection; all interaction is operable without a pointer.

**Independent Test**: Mount NyxTree, focus a tree item, dispatch `ArrowDown`, and assert the next treeitem receives focus.

### Implementation

- [x] T019 [US4] Add `tabindex="-1"` to `<li role="treeitem">` nodes and `tabindex="0"` to the currently active node in `src/components/NyxTree/NyxTreeNode.vue`; ensure the root `<ul>` is focusable via `tabindex="0"` in `src/components/NyxTree/NyxTree.vue`
- [x] T020 [US4] Add `const treeRef = ref<HTMLElement | null>(null)` and `@keydown="handleKeydown"` on the root `<ul>` in `src/components/NyxTree/NyxTree.vue`; implement `handleKeydown` using visible `querySelectorAll('[role="treeitem"]')` results for ArrowDown/ArrowUp focus movement and delegating ArrowLeft/Right/Enter/Space to the focused node's `.nyx-tree-node__label` click
- [x] T021 [US4] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert ArrowDown moves focus to next treeitem; assert ArrowUp moves focus to previous treeitem; assert Enter on focused node triggers `select` emit

**Checkpoint**: `pnpm test:unit` — all T008 + T013 + T018 + T021 pass. Tree is keyboard-navigable.

---

## Phase 7: Disabled State & Storybook (Polish)

**Purpose**: Expose disabled behaviour and create the Storybook stories required by FR-009.

- [x] T022 Add `aria-disabled` attribute to root `<ul>` in `src/components/NyxTree/NyxTree.vue` when `disabled=true`; guard `handleKeydown` with early return when disabled
- [x] T023 [P] Add `[aria-disabled="true"]` root rule and `.nyx-tree-node--disabled` styles to `src/components/NyxTree/NyxTree.scss`
- [x] T024 [P] Extend `src/components/NyxTree/NyxTree.spec.ts`: assert no `select` emits when tree-level or node-level disabled is true; assert `aria-disabled="true"` is present where expected
- [x] T025 Create `src/components/NyxTree/NyxTree.stories.ts` with `Default`, `Nested`, `WithStatus`, `Interactive`, `NodeDisabled`, and `Disabled` stories following the existing Storybook pattern
- [x] T026 [P] Update `docs/specs/components/NyxTree.spec.md` to reflect final props, emits, CSS class list, keyboard behaviour, and limitations
- [x] T027 [P] Run `pnpm type-check` and `pnpm test:unit` and fix any remaining TypeScript errors or test failures

---

## Phase 8: Post-Implementation Spec Sync

**Purpose**: Align planning artifacts and component docs with the finished status-driven implementation. No code changes.

- [x] T028 [P] Update `spec.md` to describe the shipped `NyxTreeNodeBase[]` model, status-driven expand/collapse, and `select(node)` contract
- [x] T029 [P] Update `docs/specs/components/NyxTree.spec.md` to match the finished props, emits, CSS classes, and keyboard behavior
- [x] T030 [P] Update `plan.md` to reflect the actual architecture and stories that shipped
- [x] T031 [P] Keep `NyxTree.scss` on design tokens, including `var(--nyx-radius-sm)`
- [x] T032 [P] Verify Storybook coverage matches the shipped stories and remove stale references to unimplemented APIs

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (T001)**: No dependencies — start immediately
- **Phase 2 (T002–T004)**: Depends on T001 — blocks all user stories
- **Phase 3 (T005–T008)**: Depends on Phase 2 completion
- **Phase 4 (T009–T013)**: Depends on Phase 3 completion
- **Phase 5 (T014–T018)**: Depends on Phase 4 completion
- **Phase 6 (T019–T021)**: Depends on Phase 5 completion
- **Phase 7 (T022–T027)**: Depends on Phase 6 completion
- **Phase 8 (T028–T032)**: Documentation and verification sync after implementation

### User Story Dependencies

- **US1 (P1)**: Start after Phase 2
- **US2 (P2)**: Start after US1 complete
- **US3 (P3)**: Start after US2 complete
- **US4 (P4)**: Start after US3 complete

### Within Each Phase — Parallel Opportunities

- T006, T007 can run in parallel with T005
- T010, T011, T012 can run in parallel with T009
- T015, T016, T017 can run in parallel after T014
- T023, T024, T025, T026 can run in parallel in Phase 7

---

## Notes

- [P] tasks operate on different files or orthogonal concerns — safe to run in parallel
- Story labels map tasks to `spec.md` user stories for traceability
- Branch expansion is controlled by `node.status`, not local component state
- ArrowLeft/Right delegates to label click, which only emits `select`; parent code decides whether that changes node status
- Run `pnpm type-check` after each major phase to catch type regressions early
