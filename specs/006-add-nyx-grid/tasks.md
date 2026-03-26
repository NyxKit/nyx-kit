# Tasks: NyxGrid Layout Primitive

**Input**: Design documents from `/specs/006-add-nyx-grid/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/component-api.md`, `quickstart.md`

**Tests**: Include unit tests because the plan explicitly calls for test coverage of non-trivial layout, sanitization, and animated reflow behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. `US1`, `US2`, `US3`)
- Every task includes exact file path references

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the component workspace and wire the new export surface.

- [X] T001 Create the `NyxGrid` component scaffold in `src/components/NyxGrid/NyxGrid.vue`, `src/components/NyxGrid/NyxGrid.scss`, `src/components/NyxGrid/NyxGrid.types.ts`, `src/components/NyxGrid/NyxGrid.spec.ts`, `src/components/NyxGrid/NyxGrid.stories.ts`, and `src/components/NyxGrid/index.ts`
- [X] T002 Register `NyxGrid` exports in `src/components/index.ts` and `src/main.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the shared contract and layout engine pieces required by all user stories.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T003 Define public props and internal layout types in `src/components/NyxGrid/NyxGrid.types.ts`
- [X] T004 Implement default-slot normalization and stable item wrapper key handling in `src/components/NyxGrid/NyxGrid.vue`
- [X] T005 Implement `mode`, `columns`, and `gap` sanitization plus token resolution in `src/components/NyxGrid/NyxGrid.vue`
- [X] T006 Implement the shared layout snapshot, measurement lifecycle, and container sizing pipeline in `src/components/NyxGrid/NyxGrid.vue`
- [X] T007 Implement base structural styles and token-driven spacing hooks in `src/components/NyxGrid/NyxGrid.scss`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Compose a reusable content grid (Priority: P1) 🎯 MVP

**Goal**: Deliver the semantic section shell, default grid layout, configurable columns, gap handling, and optional title/footer output.

**Independent Test**: Render `NyxGrid` with a `title`, several keyed children, `columns`, and a `footer` slot in `src/components/NyxGrid/NyxGrid.stories.ts`, then verify the header/content/footer order and standard grid arrangement in `src/components/NyxGrid/NyxGrid.spec.ts`.

### Tests for User Story 1

- [X] T008 [P] [US1] Add unit tests for title rendering, footer rendering, default `columns`, invalid `columns` fallback, and `gap` resolution in `src/components/NyxGrid/NyxGrid.spec.ts`

### Implementation for User Story 1

- [X] T009 [US1] Implement the semantic root `<section>`, fallback title header, content stage, and footer slot rendering in `src/components/NyxGrid/NyxGrid.vue`
- [X] T010 [US1] Implement standard grid item positioning and content container sizing in `src/components/NyxGrid/NyxGrid.vue`
- [X] T011 [P] [US1] Add title, columns, gap, and footer stories in `src/components/NyxGrid/NyxGrid.stories.ts`

**Checkpoint**: User Story 1 should be fully functional and testable as the MVP.

---

## Phase 4: User Story 2 - Customize structural regions (Priority: P2)

**Goal**: Allow custom header content and clean omission of unused header/footer wrappers.

**Independent Test**: Render `NyxGrid` with both `title` and `header` slot content, then render it again with no header/footer inputs in `src/components/NyxGrid/NyxGrid.stories.ts`; verify slot precedence and wrapper omission in `src/components/NyxGrid/NyxGrid.spec.ts`.

### Tests for User Story 2

- [X] T012 [P] [US2] Add unit tests for header-slot precedence over `title` and omission of empty header/footer wrappers in `src/components/NyxGrid/NyxGrid.spec.ts`

### Implementation for User Story 2

- [X] T013 [US2] Implement slot-first header resolution and conditional header/footer wrapper suppression in `src/components/NyxGrid/NyxGrid.vue`
- [X] T014 [P] [US2] Add custom-header, footer-slot, and content-only stories in `src/components/NyxGrid/NyxGrid.stories.ts`

**Checkpoint**: User Story 2 should work independently without relying on masonry mode.

---

## Phase 5: User Story 3 - Switch between standard and masonry layouts (Priority: P3)

**Goal**: Support masonry layout mode and smooth animated reflow for insert, remove, reorder, and column-count changes.

**Independent Test**: Render one `NyxGrid` story in `grid` mode and one in `masonry` mode with variable-height children in `src/components/NyxGrid/NyxGrid.stories.ts`, then verify mode fallback and reflow-trigger behavior in `src/components/NyxGrid/NyxGrid.spec.ts`.

### Tests for User Story 3

- [X] T015 [P] [US3] Add unit tests for `mode='masonry'`, invalid `mode` fallback, and animated reflow triggers on item and column changes in `src/components/NyxGrid/NyxGrid.spec.ts`

### Implementation for User Story 3

- [X] T016 [US3] Implement masonry shortest-column placement and invalid-mode fallback behavior in `src/components/NyxGrid/NyxGrid.vue`
- [X] T017 [US3] Implement FLIP-style transform transitions, resize and item-size observation, and reduced-motion behavior in `src/components/NyxGrid/NyxGrid.vue` and `src/components/NyxGrid/NyxGrid.scss`
- [X] T018 [P] [US3] Add masonry and dynamic add/remove/reflow stories in `src/components/NyxGrid/NyxGrid.stories.ts`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Align docs and usage guidance with the final implementation.

- [X] T019 Update the living component contract in `docs/specs/components/NyxGrid.spec.md` and `specs/006-add-nyx-grid/contracts/component-api.md` to match the shipped implementation
- [X] T020 Validate and refine usage examples in `specs/006-add-nyx-grid/quickstart.md` and `README.md` to match the final `NyxGrid` API

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion and can reuse the semantic shell from User Story 1
- **User Story 3 (Phase 5)**: Depends on Foundational completion and builds on the shared layout pipeline from User Story 1
- **Polish (Phase 6)**: Depends on completion of the desired user stories

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 - no dependency on later stories
- **User Story 2 (P2)**: Can start after Phase 2, but is simplest after User Story 1 establishes the semantic shell
- **User Story 3 (P3)**: Can start after Phase 2, but is simplest after User Story 1 establishes the shared layout stage

### Within Each User Story

- Unit tests should be written before the matching implementation tasks in the same story
- `src/components/NyxGrid/NyxGrid.types.ts` should be complete before expanding `src/components/NyxGrid/NyxGrid.vue`
- `src/components/NyxGrid/NyxGrid.vue` behavior should be in place before story coverage in `src/components/NyxGrid/NyxGrid.stories.ts`
- Cross-cutting docs should be updated only after the implementation details are stable

### Parallel Opportunities

- `T001` and `T002` can be split across teammates once the component name is fixed
- After Phase 2, test-writing tasks `T008`, `T012`, and `T015` can be prepared independently from story-writing tasks
- Story tasks `T011`, `T014`, and `T018` are parallelizable once their corresponding `src/components/NyxGrid/NyxGrid.vue` behavior exists
- Documentation tasks `T019` and `T020` can run in parallel after implementation stabilizes

---

## Parallel Example: User Story 1

```bash
# Parallelizable work after foundational tasks are complete:
Task: "Add unit tests for title rendering, footer rendering, default columns, invalid columns fallback, and gap resolution in src/components/NyxGrid/NyxGrid.spec.ts"
Task: "Add title, columns, gap, and footer stories in src/components/NyxGrid/NyxGrid.stories.ts"
```

## Parallel Example: User Story 2

```bash
# Parallelizable work after the semantic shell exists:
Task: "Add unit tests for header-slot precedence over title and omission of empty wrappers in src/components/NyxGrid/NyxGrid.spec.ts"
Task: "Add custom-header, footer-slot, and content-only stories in src/components/NyxGrid/NyxGrid.stories.ts"
```

## Parallel Example: User Story 3

```bash
# Parallelizable work after masonry behavior lands in NyxGrid.vue:
Task: "Add unit tests for masonry mode, invalid mode fallback, and animated reflow triggers in src/components/NyxGrid/NyxGrid.spec.ts"
Task: "Add masonry and dynamic add/remove/reflow stories in src/components/NyxGrid/NyxGrid.stories.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate `src/components/NyxGrid/NyxGrid.spec.ts` and `src/components/NyxGrid/NyxGrid.stories.ts`
5. Stop for review before extending into header customization or masonry behavior

### Incremental Delivery

1. Ship the core grid shell in User Story 1
2. Add slot-first structural customization in User Story 2
3. Add masonry mode and animated reflow in User Story 3
4. Finish with docs and usage polish in Phase 6

### Parallel Team Strategy

1. One developer completes Phase 1 and Phase 2
2. A second developer can prepare tests and stories while core implementation proceeds in `src/components/NyxGrid/NyxGrid.vue`
3. After MVP, masonry behavior and docs/story expansion can be split across teammates without file collisions except in `src/components/NyxGrid/NyxGrid.vue`

---

## Notes

- All tasks follow the required `- [ ] T### [P] [US#] Description with file path` checklist format
- `[P]` markers only appear on tasks that can proceed independently without editing the same file at the same time as a prerequisite task
- User stories remain independently testable even though later stories build on the same component files
- No new npm dependencies are included in this plan
