---

description: "Task list for programmatic confirmation dialog feature"
---

# Tasks: Programmatic Confirmation Dialog

**Input**: Design documents from `/specs/013-programmatic-confirm/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested in spec - skip test tasks

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Library: `src/composables/`, `src/main.ts`, `src/index.ts`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

This is a library extension - project structure already exists.

- [x] T001 Verify project builds successfully with `pnpm build`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 [P] Create ConfirmOptions type in src/types/confirm.ts
- [x] T003 [P] Create confirm type exports in src/index.ts
- [x] T004 Create useNyxConfirm composable in src/composables/useNyxConfirm.ts (depends on T002, T003)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Trigger Confirmation Dialog (Priority: P1) 🎯 MVP

**Goal**: Implement NyxKit.confirm() method that spawns a modal and returns NyxResult

**Independent Test**: Call `NyxKit.confirm({ title: 'Test', message: 'Test message' })` and verify modal appears with correct content, resolves with NyxResult on confirm/cancel

### Implementation for User Story 1

- [x] T005 [P] [US1] Extend NyxKit plugin in src/main.ts to add confirm() method
- [x] T006 [US1] Export ConfirmOptions and NyxResult types from src/index.ts (depends on T002, T005)
- [x] T007 [US1] Verify NyxModal can be rendered programmatically (via useNyxConfirm composable)
- [x] T008 [US1] Implement promise resolution with NyxResult.ok() on confirm
- [x] T009 [US1] Implement promise resolution with NyxResult.fail('cancelled') on cancel
- [x] T010 [US1] Handle edge case: reject if dialog already open (research.md Decision 2)
- [x] T011 [US1] Handle edge case: resolve as cancelled if component unmounts

**Checkpoint**: User Story 1 fully functional - NyxKit.confirm() works with basic options

---

## Phase 4: User Story 2 - Custom Theme and Styling (Priority: P2)

**Goal**: Allow passing theme option to style the confirm button

**Independent Test**: Call with different NyxTheme values and verify button styling changes

### Implementation for User Story 2

- [x] T012 [P] [US2] Update ConfirmOptions type to include theme: NyxTheme
- [x] T013 [US2] Pass theme to NyxModal confirm button (NyxButton with theme prop)
- [x] T014 [US2] Verify all NyxTheme values (Primary, Secondary, Success, Warning, Danger, Info) render correctly

**Checkpoint**: User Story 2 functional - theme option works on confirm button

---

## Phase 5: User Story 3 - Custom Button Labels (Priority: P3)

**Goal**: Allow customizing confirmText and cancelText labels

**Independent Test**: Pass confirmText: 'Delete' and verify button shows 'Delete'

### Implementation for User Story 3

- [x] T015 [P] [US3] Update ConfirmOptions type to include confirmText and cancelText
- [x] T016 [US3] Pass confirmText and cancelText to NyxModal props

**Checkpoint**: All user stories functional - feature complete

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T017 [P] Update README.md with NyxKit.confirm() usage example
- [x] T018 Create docs/specs/composables/useNyxConfirm.spec.md (living spec per Constitution II)
- [x] T019 Run `pnpm type-check` to verify no TypeScript errors
- [x] T020 Run `pnpm test:unit` to ensure no regressions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories proceed in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Uses US1 implementation
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Uses US1 implementation

### Within Each User Story

- Types before composable
- Composable before plugin extension
- Core implementation before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

- T002, T003 can run in parallel
- T005, T006 can run in parallel
- T012, T015 can run in parallel (type updates)
- T017, T018 can run in parallel (documentation)

---

## Parallel Example: User Story 1

```bash
# Parallel type definition work:
Task: "Create ConfirmOptions type in src/types/confirm.ts"
Task: "Create confirm type exports in src/index.ts"

# Then implementation:
Task: "Create useNyxConfirm composable in src/composables/useNyxConfirm.ts"
Task: "Extend NyxKit plugin in src/main.ts to add confirm() method"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify build)
2. Complete Phase 2: Foundational (types + composable)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test NyxKit.confirm() works
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Polish → Final release

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Feature uses existing NyxModal - no new component needed
- NyxResult already exists in src/classes/NyxResult.ts