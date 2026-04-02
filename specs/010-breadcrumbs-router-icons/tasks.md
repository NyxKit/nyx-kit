# Tasks: NyxBreadcrumbs Routing and Visual Enhancements

**Input**: Design documents from `/specs/010-breadcrumbs-router-icons/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Include targeted Vitest coverage because the constitution and plan require tests for non-trivial component logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`US1`, `US2`, `US3`)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the missing docs-first contract for `NyxBreadcrumbs` before implementation.

- [X] T001 Create the living component spec for the updated breadcrumb API in `docs/specs/components/NyxBreadcrumbs.spec.md`
- [X] T002 [P] Review and update shared component API guidance for breadcrumb routing and separator conventions in `docs/architecture/component-model.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared public types and local prop contracts that all user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T003 Extend the shared breadcrumb data contract with additive `icon` and library-owned `route` fields in `src/types/common.ts`
- [X] T004 [P] Expand the local breadcrumb prop contract for route-aware items and text-or-icon separators in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.types.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Navigate with URL or app route targets (Priority: P1) 🎯 MVP

**Goal**: Support breadcrumb items that render as URL links, route-driven links, or readable static labels while preserving existing click behavior.

**Independent Test**: Render a breadcrumb trail with plain items, `href` items, and `route` items and verify each item uses the expected navigation mode, with `route` taking precedence over `href`.

### Tests for User Story 1

- [X] T005 [US1] Add navigation-mode, precedence, and non-link rendering coverage in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.spec.ts`

### Implementation for User Story 1

- [X] T006 [US1] Implement breadcrumb item normalization and navigation-mode resolution in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue`
- [X] T007 [US1] Render route-driven, URL-driven, and static breadcrumb states while preserving `click` emissions in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue`
- [X] T008 [US1] Add mixed-navigation examples for route-backed and URL-backed items in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.stories.ts`

**Checkpoint**: User Story 1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Show icons on selected breadcrumb items (Priority: P2)

**Goal**: Allow individual breadcrumb items to show an icon without forcing icons onto every breadcrumb item.

**Independent Test**: Render a breadcrumb trail where only some items define `icon` and verify those items show both icon and label while unconfigured items remain unchanged.

### Tests for User Story 2

- [X] T009 [US2] Add per-item icon rendering coverage for mixed breadcrumb items in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.spec.ts`

### Implementation for User Story 2

- [X] T010 [US2] Render optional per-item breadcrumb icons using existing icon conventions in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue`
- [X] T011 [US2] Add per-item icon examples for breadcrumb consumers in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.stories.ts`

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Reuse a custom separator across the trail (Priority: P3)

**Goal**: Support one shared separator customization surface that handles text, icon-by-name, or custom slot content across the full breadcrumb trail.

**Independent Test**: Render the breadcrumb trail with a text separator prop, an icon separator prop, and a `separator` slot and verify reuse, precedence, and absence of a trailing separator.

### Tests for User Story 3

- [X] T012 [US3] Add separator text, icon, slot-precedence, and trailing-separator coverage in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.spec.ts`

### Implementation for User Story 3

- [X] T013 [US3] Implement shared separator rendering precedence for prop and slot customization in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue`
- [X] T014 [US3] Adjust separator layout and icon spacing for text, icon, and custom slot states in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.scss`
- [X] T015 [US3] Add text-separator, icon-separator, and custom-slot examples in `src/components/NyxBreadcrumbs/NyxBreadcrumbs.stories.ts`

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final sync, validation, and consumer-facing cleanup across all stories.

- [X] T016 [P] Sync final props, slots, emits, accessibility notes, and known limitations in `docs/specs/components/NyxBreadcrumbs.spec.md`
- [X] T017 [P] Align consumer examples and acceptance scenarios with the implemented API in `specs/010-breadcrumbs-router-icons/quickstart.md`
- [X] T018 Run final breadcrumb regression verification across `src/components/NyxBreadcrumbs/NyxBreadcrumbs.spec.ts` and `src/components/NyxBreadcrumbs/NyxBreadcrumbs.stories.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup**: No dependencies - starts immediately
- **Phase 2: Foundational**: Depends on Phase 1 completion - blocks all user stories
- **Phase 3: User Story 1**: Depends on Phase 2 completion
- **Phase 4: User Story 2**: Depends on Phase 2 completion and can be delivered after US1 or in parallel once the shared foundation is stable
- **Phase 5: User Story 3**: Depends on Phase 2 completion and can be delivered after US1 or in parallel once the shared foundation is stable
- **Phase 6: Polish**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories
- **US2 (P2)**: Depends on the shared breadcrumb contract from Phase 2 but not on US1 behavior beyond the same component file
- **US3 (P3)**: Depends on the shared prop contract from Phase 2 but not on US1 or US2 behavior beyond the same component file

### Within Each User Story

- Add or expand tests before completing implementation in the same story
- Update the component logic before story examples that rely on the new API
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

- `T001` and `T002` can run in parallel because they touch different docs files
- `T003` and `T004` can run in parallel because they touch different type-definition files
- After implementation stabilizes, `T016` and `T017` can run in parallel because they touch different spec artifacts

---

## Parallel Example: User Story 1

```bash
# After Phase 2 completes, examples and route contract review can be split:
Task: "Implement breadcrumb item normalization and navigation-mode resolution in src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue"
Task: "Add mixed-navigation examples for route-backed and URL-backed items in src/components/NyxBreadcrumbs/NyxBreadcrumbs.stories.ts"
```

## Parallel Example: User Story 2

```bash
# Once per-item icon rendering is implemented, visual docs can proceed separately:
Task: "Render optional per-item breadcrumb icons using existing icon conventions in src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue"
Task: "Add per-item icon examples for breadcrumb consumers in src/components/NyxBreadcrumbs/NyxBreadcrumbs.stories.ts"
```

## Parallel Example: User Story 3

```bash
# After separator behavior is settled, styles and examples can be finished independently:
Task: "Adjust separator layout and icon spacing for text, icon, and custom slot states in src/components/NyxBreadcrumbs/NyxBreadcrumbs.scss"
Task: "Add text-separator, icon-separator, and custom-slot examples in src/components/NyxBreadcrumbs/NyxBreadcrumbs.stories.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate mixed `href` and `route` breadcrumb rendering independently
5. Stop for review before icons and separator customization

### Incremental Delivery

1. Finish docs and shared contract groundwork
2. Deliver US1 for mixed navigation support
3. Deliver US2 for optional per-item icons
4. Deliver US3 for reusable separator customization
5. Finish with spec and quickstart sync

### Suggested MVP Scope

- Phase 1
- Phase 2
- Phase 3 (User Story 1)

---

## Notes

- All tasks use the required checklist format with task ID, optional parallel marker, optional story label, and exact file path
- Tasks are intentionally small and file-scoped to support minimal diffs in a shared workspace
- `src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue` is shared across all three user stories, so story phases should be implemented sequentially in one branch unless explicitly split across collaborators
