# Tasks: NyxSelect External Model Sync

**Input**: Design documents from `/specs/011-fix-select-model-sync/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Include targeted Vitest regression coverage because the plan and constitution require tests for this non-trivial synchronization logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`US1`, `US2`, `US3`)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Update the docs-first contract for `NyxSelect` before touching source code.

- [X] T001 Update the living component spec to document external model synchronization in `docs/specs/components/NyxSelect.spec.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared regression surface and derive the synchronization rules that all user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 Expand the component contract examples for external model synchronization in `specs/011-fix-select-model-sync/contracts/nyx-select.md`
- [X] T003 [P] Add a Storybook scenario that demonstrates parent-driven value updates in `src/components/NyxSelect/NyxSelect.stories.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Reflect external selection changes immediately (Priority: P1) 🎯 MVP

**Goal**: Ensure single-select `NyxSelect` updates its visible label and selected dropdown option when the bound value changes externally.

**Independent Test**: Mount `NyxSelect` with a parent-controlled single value, update that value from outside the component, and verify the closed control text and selected option marker both change immediately.

### Tests for User Story 1

- [X] T004 [US1] Add single-select external model sync regression tests in `src/components/NyxSelect/NyxSelect.spec.ts`

### Implementation for User Story 1

- [X] T005 [US1] Update single-select derived display synchronization for external model changes in `src/components/NyxSelect/NyxSelect.vue`
- [X] T006 [US1] Add a single-select external-sync example in `src/components/NyxSelect/NyxSelect.stories.ts`

**Checkpoint**: User Story 1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Reflect external multi-select changes consistently (Priority: P2)

**Goal**: Ensure multi-select `NyxSelect` updates its displayed labels and selected option markers when the external value array changes.

**Independent Test**: Mount `NyxSelect` in multi-select mode, replace the bound value array from outside the component, and verify the displayed label set and selected dropdown states match the new array.

### Tests for User Story 2

- [X] T007 [US2] Add multi-select external model sync regression tests in `src/components/NyxSelect/NyxSelect.spec.ts`

### Implementation for User Story 2

- [X] T008 [US2] Update multi-select derived display synchronization for external array changes in `src/components/NyxSelect/NyxSelect.vue`
- [X] T009 [US2] Add a multi-select external-sync example in `src/components/NyxSelect/NyxSelect.stories.ts`

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Preserve search and empty-state behavior during sync (Priority: P3)

**Goal**: Ensure the synchronization fix does not regress placeholder, search-reset, invalid-value, or grouped-option behavior.

**Independent Test**: Change the external value while the control is closed, open, cleared, and used with grouped options, then verify the correct selection is shown without stale labels or broken search/placeholder behavior.

### Tests for User Story 3

- [X] T010 [US3] Add grouped-option, cleared-value, and stale-label regression tests in `src/components/NyxSelect/NyxSelect.spec.ts`

### Implementation for User Story 3

- [X] T011 [US3] Preserve placeholder, grouped-option, and search-reset synchronization behavior in `src/components/NyxSelect/NyxSelect.vue`
- [X] T012 [US3] Add grouped and cleared external-sync examples in `src/components/NyxSelect/NyxSelect.stories.ts`

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final sync and validation across docs, tests, and acceptance scenarios.

- [X] T013 [P] Sync final synchronization behavior details in `docs/specs/components/NyxSelect.spec.md`
- [X] T014 [P] Align acceptance scenarios and examples with the final behavior in `specs/011-fix-select-model-sync/quickstart.md`
- [X] T015 Run final NyxSelect regression verification across `src/components/NyxSelect/NyxSelect.spec.ts` and `src/components/NyxSelect/NyxSelect.stories.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup**: No dependencies - starts immediately
- **Phase 2: Foundational**: Depends on Phase 1 completion - blocks all user stories
- **Phase 3: User Story 1**: Depends on Phase 2 completion
- **Phase 4: User Story 2**: Depends on Phase 2 completion and can be delivered after US1 or in parallel once the shared synchronization foundation is stable
- **Phase 5: User Story 3**: Depends on Phase 2 completion and can be delivered after US1/US2 or in parallel once the shared synchronization foundation is stable
- **Phase 6: Polish**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories
- **US2 (P2)**: Depends on the same component-level synchronization path established in Phase 2 but not on US1-specific acceptance scenarios
- **US3 (P3)**: Depends on the same component-level synchronization path and validates edge behavior without requiring new public API

### Within Each User Story

- Expand tests before completing implementation in the same story
- Update component logic before story examples that demonstrate the fixed behavior
- Finish each story at its checkpoint before moving to cross-cutting polish

### Dependency Graph

```text
Phase 1 Setup
  -> Phase 2 Foundational
     -> US1 (MVP)
     -> US2
     -> US3
        -> Phase 6 Polish
```

### Parallel Opportunities

- `T002` and `T003` can run in parallel because they touch different files
- `T013` and `T014` can run in parallel because they touch different docs artifacts
- Story-specific examples can follow component logic work independently once the underlying behavior is stable

---

## Parallel Example: User Story 1

```bash
# After the single-select sync logic is stable, visual docs can be updated separately:
Task: "Update single-select derived display synchronization for external model changes in src/components/NyxSelect/NyxSelect.vue"
Task: "Add a single-select external-sync example in src/components/NyxSelect/NyxSelect.stories.ts"
```

## Parallel Example: User Story 2

```bash
# After the multi-select sync behavior is defined, examples can be completed separately:
Task: "Update multi-select derived display synchronization for external array changes in src/components/NyxSelect/NyxSelect.vue"
Task: "Add a multi-select external-sync example in src/components/NyxSelect/NyxSelect.stories.ts"
```

## Parallel Example: User Story 3

```bash
# Final docs sync can proceed in parallel once the behavior is locked:
Task: "Sync final synchronization behavior details in docs/specs/components/NyxSelect.spec.md"
Task: "Align acceptance scenarios and examples with the final behavior in specs/011-fix-select-model-sync/quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate single-select parent-driven updates independently
5. Stop for review before multi-select and edge-case coverage

### Incremental Delivery

1. Update docs and shared regression scaffolding
2. Deliver US1 for single-select external model synchronization
3. Deliver US2 for multi-select external model synchronization
4. Deliver US3 for grouped, cleared, and stale-label edge cases
5. Finish with docs and quickstart sync

### Suggested MVP Scope

- Phase 1
- Phase 2
- Phase 3 (User Story 1)

---

## Notes

- All tasks use the required checklist format with task ID, optional parallel marker, optional story label, and exact file path
- `src/components/NyxSelect/NyxSelect.vue`, `src/components/NyxSelect/NyxSelect.spec.ts`, and `src/components/NyxSelect/NyxSelect.stories.ts` are shared across stories, so story work should be sequenced carefully within one branch
- The fix should remain localized and avoid introducing new shared composables unless implementation reveals a concrete repeated need
