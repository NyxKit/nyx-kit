---

description: "Task list for NyxIcon component implementation"
---

# Tasks: NyxIcon Component

**Input**: Design documents from `/specs/009-add-lucide-icon/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Type definitions and component folder structure

- [x] T001 Add `NyxIconVariant` enum to src/types/common.ts
- [x] T002 Create NyxIcon component folder src/components/NyxIcon/

---

## Phase 2: Foundational (Export Registration)

**Purpose**: Ensure NyxIcon is properly exported from the library

- [x] T003 [P] Register NyxIcon export in src/components/index.ts
- [x] T004 [P] Register NyxIcon export in src/index.ts (TBD - no src/index.ts exists)
- [x] T005 [P] [US1] Create NyxIcon types in src/components/NyxIcon/NyxIcon.types.ts
- [x] T006 [P] [US1] Create NyxIcon.vue component in src/components/NyxIcon/NyxIcon.vue
- [x] T007 [US1] Implement dynamic icon resolution (kebab-case name to PascalCase component)
- [x] T008 [US1] Handle invalid icon names gracefully (no crash)
- [x] T009 [US1] Create Storybook story in src/components/NyxIcon/NyxIcon.stories.ts with curated icon subset and link to Lucide
- [x] T010 [P] [US2] Implement variant prop handling in NyxIcon.vue
- [x] T011 [US2] Configure Lucide to use both line and filled icon sets
- [x] T012 [US2] Update NyxIcon.stories.ts with variant showcase
- [x] T013 [P] [US3] Add theme color application in NyxIcon.vue
- [x] T014 [US3] Implement fallback to CSS variable text color when no theme
- [x] T015 [US3] Update NyxIcon.stories.ts with theme examples
- [x] T016 [P] [US4] Add size prop handling in NyxIcon.vue
- [x] T017 [US4] Map NyxSize tokens to pixel dimensions
- [x] T018 [US4] Add pixel prop support for custom sizing
- [x] T019 [US4] Update NyxIcon.stories.ts with size examples

**Checkpoint**: User Stories 1-4 should all work independently

---

## Phase 7: User Story 5 - Internal Migration (Priority: P2)

**Goal**: Migrate all internal icon usage to flow through NyxIcon

**Independent Test**: Verify no direct lucide-vue-next imports in components (except NyxIcon)

### Implementation for User Story 5

- [x] T020 [P] [US5] Identify all lucide-vue-next imports in src/components/
- [x] T021 [US5] Migrate NyxEditor.vue to use NyxIcon
- [x] T022 [US5] Migrate NyxEditorToolbarContent.vue to use NyxIcon
- [x] T023 [US5] Verify no direct lucide-vue-next imports remain (except in NyxIcon)

**Checkpoint**: All user stories complete

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation

- [x] T024 [P] Create docs/specs/components/NyxIcon.spec.md (living spec)
- [x] T025 [P] Run pnpm type-check and fix any errors
- [x] T026 Run pnpm test:unit to verify no regressions
- [x] T027 Verify Storybook renders NyxIcon correctly
- [x] T028 Update README.md if needed for structural changes (N/A - no structural changes)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - exports must be registered before component can be used
- **User Stories (Phase 3-7)**: All depend on Foundational phase - can proceed sequentially or in parallel
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories (MVP)
- **User Story 2 (P1)**: Can start after Foundational - Builds on US1 core component
- **User Story 3 (P2)**: Can start after Foundational - Adds theme feature
- **User Story 4 (P2)**: Can start after Foundational - Adds size feature
- **User Story 5 (P2)**: Can start after Foundational - Internal migration (depends on NyxIcon being complete)

### Within Each User Story

- Types before component implementation
- Core implementation before stories
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- User Stories 3-7 can be worked on in parallel (once Foundational complete)
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch both type and component creation together:
Task: "Create NyxIcon types in src/components/NyxIcon/NyxIcon.types.ts"
Task: "Create NyxIcon.vue component in src/components/NyxIcon/NyxIcon.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test basic icon rendering works
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Polish → Final release

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Tasks** | 28 |
| **Phase 1 (Setup)** | 2 |
| **Phase 2 (Foundational)** | 2 |
| **Phase 3 (US1 - MVP)** | 5 |
| **Phase 4 (US2)** | 3 |
| **Phase 5 (US3)** | 3 |
| **Phase 6 (US4)** | 4 |
| **Phase 7 (US5)** | 4 |
| **Phase 8 (Polish)** | 5 |

### Parallel Opportunities

- 8 tasks marked [P] can run in parallel
- User stories can be worked on in parallel (once foundational ready)

### Suggested MVP Scope

User Story 1 alone constitutes the MVP: basic NyxIcon rendering by name string.

### Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
