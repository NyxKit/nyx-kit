# Tasks: NyxEditor Footer Info

**Input**: Design documents from `/specs/008-editor-footer-info/`
**Prerequisites**: plan.md, spec.md

**Tests**: No additional test tasks are generated because the specification does not explicitly require a test-first workflow. Validation remains part of implementation and polish tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US2], [US3])
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the documentation and source locations for the new NyxEditor footer feature.

- [x] T001 Review the current editor implementation and footer spec in `src/components/NyxEditor/NyxEditor.vue`, `docs/specs/components/NyxEditor.spec.md`, and `specs/008-editor-footer-info/spec.md`
- [x] T002 Create or update the feature planning artifacts in `specs/008-editor-footer-info/` so implementation decisions stay aligned with the footer spec

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared footer data model and editor wiring required by all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Define typed footer data structures for NyxEditor in `src/types/editor.ts`
- [x] T004 Update the NyxEditor public contract for footer data, slots, and any new internal props or models in `src/components/NyxEditor/NyxEditor.types.ts`
- [x] T005 Implement shared footer-state calculation helpers or an internal composition for caret path and word count in `src/components/NyxEditor/`
- [x] T006 Wire footer-state updates into editor lifecycle events in `src/components/NyxEditor/NyxEditor.vue` so content and caret changes both refresh footer info
- [x] T007 Update the living NyxEditor component spec in `docs/specs/components/NyxEditor.spec.md` to describe the footer architecture, slot payload, and default footer behavior

**Checkpoint**: Footer data model and update path are ready for story-by-story UI work

---

## Phase 3: User Story 1 - Read document context at the caret (Priority: P1) 🎯 MVP

**Goal**: Show the current caret-aware structural path in the default footer.

**Independent Test**: Move the caret through headings, paragraphs, and list items and verify the footer updates to the correct structure path each time.

### Implementation for User Story 1

- [x] T008 [US1] Implement default footer shell markup in `src/components/NyxEditor/NyxEditor.vue`
- [x] T009 [US1] Render the left-side structural path from footer data in `src/components/NyxEditor/NyxEditor.vue`
- [x] T010 [US1] Add footer styling for structure-path presentation in `src/components/NyxEditor/NyxEditor.scss`
- [x] T011 [US1] Add or update editor unit coverage for caret-path calculation across headings, paragraphs, and list items in `src/components/NyxEditor/NyxEditor.spec.ts`
- [x] T012 [US1] Add a Storybook example demonstrating default structural-path updates in `src/components/NyxEditor/NyxEditor.stories.ts`

**Checkpoint**: User Story 1 should be independently functional and show the current document path in the footer

---

## Phase 4: User Story 2 - See document length at a glance (Priority: P2)

**Goal**: Show a live word count in the default footer.

**Independent Test**: Edit text content and verify that the footer word count updates to match the current document.

### Implementation for User Story 2

- [x] T013 [US2] Extend the shared footer data model with document word count in `src/types/editor.ts` and `src/components/NyxEditor/`
- [x] T014 [US2] Render the right-side word count in the default footer in `src/components/NyxEditor/NyxEditor.vue`
- [x] T015 [US2] Update footer styling for left/right footer layout in `src/components/NyxEditor/NyxEditor.scss`
- [x] T016 [US2] Add or update editor unit coverage for word-count updates in `src/components/NyxEditor/NyxEditor.spec.ts`
- [x] T017 [US2] Update Storybook coverage so the default footer also demonstrates the live word count in `src/components/NyxEditor/NyxEditor.stories.ts`

**Checkpoint**: User Stories 1 and 2 should both work independently, with structure path and word count visible in the default footer

---

## Phase 5: User Story 3 - Customize footer presentation with slot data (Priority: P3)

**Goal**: Expose footer data through a scoped slot for consumer customization.

**Independent Test**: Render `NyxEditor` with a footer slot and verify the slot receives the same path and word-count data shown by the default footer.

### Implementation for User Story 3

- [x] T018 [US3] Add the `footer` scoped slot API to `src/components/NyxEditor/NyxEditor.vue`
- [x] T019 [US3] Pass the complete footer payload to the slot while preserving the default footer fallback in `src/components/NyxEditor/NyxEditor.vue`
- [x] T020 [US3] Document the footer slot scope and payload in `docs/specs/components/NyxEditor.spec.md`
- [x] T021 [US3] Add a Storybook example of a custom footer slot consuming the footer payload in `src/components/NyxEditor/NyxEditor.stories.ts`
- [x] T022 [US3] Add or update unit coverage for footer slot payload consistency in `src/components/NyxEditor/NyxEditor.spec.ts`

**Checkpoint**: All user stories should now be independently functional, including custom footer rendering via slot data

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, docs sync, and validation across the full feature.

- [x] T023 [P] Sync feature artifacts with the final design in `specs/008-editor-footer-info/spec.md`, `specs/008-editor-footer-info/plan.md`, and `specs/008-editor-footer-info/tasks.md`
- [x] T024 Update the NyxEditor showcase/default story to demonstrate the footer feature in `src/components/NyxEditor/NyxEditor.stories.ts`
- [x] T025 Run implementation validation with `pnpm exec vue-tsc --build`, `pnpm exec vitest run src/components/NyxEditor/NyxEditor.spec.ts`, and `pnpm exec vite build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion and can build on the same footer shell from US1
- **User Story 3 (Phase 5)**: Depends on Foundational completion and should be implemented after the default footer payload is available
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on other stories
- **User Story 2 (P2)**: Can start after Foundational - may reuse US1 footer shell but remains independently testable
- **User Story 3 (P3)**: Can start after Foundational - depends conceptually on the footer payload defined earlier but remains independently testable once payload exists

### Within Each User Story

- Shared data/model work before rendering work
- Component rendering before story/demo updates
- Story updates before final validation

### Parallel Opportunities

- T003 and T004 can run in parallel once the footer payload shape is agreed
- T011 and T012 can run in parallel after the default footer structure-path implementation is in place
- T016 and T017 can run in parallel after the word-count implementation is in place
- T020 and T021 can run in parallel after the footer slot is wired
- T023 and T024 can run in parallel before final validation

---

## Parallel Example: User Story 1

```bash
# After the default footer structure path is implemented:
Task: "Add or update editor unit coverage for caret-path calculation in src/components/NyxEditor/NyxEditor.spec.ts"
Task: "Add a Storybook example demonstrating default structural-path updates in src/components/NyxEditor/NyxEditor.stories.ts"
```

## Parallel Example: User Story 3

```bash
# After the footer slot payload is wired:
Task: "Document the footer slot scope and payload in docs/specs/components/NyxEditor.spec.md"
Task: "Add a Storybook example of a custom footer slot in src/components/NyxEditor/NyxEditor.stories.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify the footer path updates correctly across headings, paragraphs, and list items

### Incremental Delivery

1. Complete Setup + Foundational to establish footer data calculation
2. Add User Story 1 for structural path visibility
3. Add User Story 2 for word count
4. Add User Story 3 for custom footer slot rendering
5. Finish with polish and full validation

### Suggested MVP Scope

- **MVP**: User Story 1 only
- Rationale: The structural path is the core new footer capability; word count and slot customization extend it but are not required to prove the footer concept

---

## Notes

- All tasks follow the required checklist format with IDs, story labels where needed, and file paths.
- Total tasks: 25
- Task count by user story:
  - **US1**: 5
  - **US2**: 5
  - **US3**: 5
- Parallel opportunities identified in foundational and story-specific follow-up tasks.
