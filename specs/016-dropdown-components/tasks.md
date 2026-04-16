---

description: "Task list for NyxDropdown Components"
---

# Tasks: NyxDropdown Components

**Input**: Design documents from `/specs/016-dropdown-components/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and component-family scaffold

- [X] T001 [P] Create the NyxDropdown component folder and source files in `src/components/NyxDropdown/NyxDropdown.vue`, `src/components/NyxDropdown/NyxDropdownMenu.vue`, and `src/components/NyxDropdown/NyxDropdownItem.vue`
- [X] T002 [P] Create the initial Storybook story files in `src/components/NyxDropdown/NyxDropdown.stories.ts`, `src/components/NyxDropdown/NyxDropdownMenu.stories.ts`, and `src/components/NyxDropdown/NyxDropdownItem.stories.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared contracts and exports required before any user story can be completed

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Define the shared dropdown props and emitted selection shape in `src/components/NyxDropdown/NyxDropdown.types.ts`
- [X] T004 [P] Add the shared dropdown styling scaffold in `src/components/NyxDropdown/NyxDropdown.scss`
- [X] T005 Update `src/components/index.ts` to export `NyxDropdown`, `NyxDropdownMenu`, and `NyxDropdownItem`

**Checkpoint**: Dropdown family is scaffolded and publicly exported; story work can now begin

---

## Phase 3: User Story 1 - Triggered Dropdown (Priority: P1) 🎯 MVP

**Goal**: Let consumers wrap any trigger content and toggle the floating dropdown panel.

**Independent Test**: Render `NyxDropdown` with a custom trigger and verify the panel opens, closes, and stays anchored to the trigger.

### Implementation for User Story 1

- [X] T006 [US1] Implement trigger-slot rendering and open/close state in `src/components/NyxDropdown/NyxDropdown.vue`
- [X] T007 [P] [US1] Add teleported panel positioning and outside-dismiss behavior in `src/components/NyxDropdown/NyxDropdown.vue` using `useTeleportPosition`
- [X] T008 [US1] Add the trigger-driven dropdown usage example in `src/components/NyxDropdown/NyxDropdown.stories.ts`

**Checkpoint**: Trigger-driven dropdown interaction works on its own

---

## Phase 4: User Story 2 - Default Menu Options (Priority: P2)

**Goal**: Render a default option-based menu when no custom dropdown slot is provided.

**Independent Test**: Render `NyxDropdown` with an `options` array and confirm each option appears as a selectable menu item with disabled states preserved.

### Implementation for User Story 2

- [X] T009 [P] [US2] Implement option-to-item rendering in `src/components/NyxDropdown/NyxDropdownMenu.vue`
- [X] T010 [P] [US2] Implement the individual item rendering and disabled presentation in `src/components/NyxDropdown/NyxDropdownItem.vue`
- [X] T011 [US2] Wire `src/components/NyxDropdown/NyxDropdown.vue` to render `NyxDropdownMenu` when no `#dropdown` slot is supplied
- [X] T012 [US2] Add the default option-menu examples in `src/components/NyxDropdown/NyxDropdown.stories.ts` and `src/components/NyxDropdown/NyxDropdownMenu.stories.ts`

**Checkpoint**: Default option-driven dropdown works independently of custom panel content

---

## Phase 5: User Story 3 - Custom Dropdown Content (Priority: P3)

**Goal**: Allow consumers to replace the default menu with arbitrary panel content while still reusing the same wrapper.

**Independent Test**: Render `NyxDropdown` with a custom `#dropdown` slot and confirm the custom panel replaces the default menu while the trigger behavior remains unchanged.

### Implementation for User Story 3

- [X] T013 [P] [US3] Implement the `#dropdown` slot override path in `src/components/NyxDropdown/NyxDropdown.vue`
- [X] T014 [P] [US3] Keep `NyxDropdownMenu` and `NyxDropdownItem` usable as standalone building blocks in `src/components/NyxDropdown/NyxDropdownMenu.vue` and `src/components/NyxDropdown/NyxDropdownItem.vue`
- [X] T015 [US3] Add the custom-panel and standalone-building-block examples in `src/components/NyxDropdown/NyxDropdownMenu.stories.ts` and `src/components/NyxDropdown/NyxDropdownItem.stories.ts`

**Checkpoint**: Custom panel composition works independently from the default menu path

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency and documentation alignment

- [X] T016 [P] Update `docs/specs/components/NyxDropdown.spec.md`, `docs/specs/components/NyxDropdownMenu.spec.md`, and `docs/specs/components/NyxDropdownItem.spec.md` if implementation changes any documented contract details
- [X] T017 Confirm the public component surface is aligned in `src/components/index.ts` and the shared option type remains available through `src/types/index.ts`
- [X] T018 Verify the feature compiles cleanly with `pnpm type-check` and fix any typing issues introduced by the dropdown family in `src/components/NyxDropdown/*.vue` and `src/components/NyxDropdown/*.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - no dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - may build on US1 wrapper, but remains independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - reuses the same wrapper but remains independently testable

### Within Each User Story

- Shared scaffolding before story-specific implementation
- Wrapper behavior before menu composition
- Default menu before custom panel override
- Story complete before moving to the next priority

### Parallel Opportunities

- T001 and T002 can run in parallel during setup
- T003 and T004 can run in parallel during foundation work
- T007 can run in parallel with T006 after the wrapper exists
- T009 and T010 can run in parallel during default menu work
- T013 and T014 can run in parallel during custom panel work

---

## Parallel Example: User Story 1

```bash
Task: "Implement trigger-slot rendering and open/close state in src/components/NyxDropdown/NyxDropdown.vue"
Task: "Add teleported panel positioning and outside-dismiss behavior in src/components/NyxDropdown/NyxDropdown.vue using useTeleportPosition"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate the trigger-driven dropdown on its own

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 for the core wrapper interaction
3. Add User Story 2 for the default menu path
4. Add User Story 3 for custom dropdown composition
5. Finish with polish and contract alignment

### Parallel Team Strategy

With multiple developers:

1. One developer can scaffold the component files while another prepares the shared props and styles
2. After foundation work, one developer can finish the wrapper interaction while another builds the default menu pieces
3. Custom panel support can proceed once the wrapper and menu building blocks are stable
