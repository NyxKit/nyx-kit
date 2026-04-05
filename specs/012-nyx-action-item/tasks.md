---

description: "Task list for NyxActionItem component implementation"
---

# Tasks: NyxActionItem Component

**Input**: Design documents from `/specs/012-nyx-action-item/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Unit tests included for emit behaviour and slot precedence logic (requested in constitution check — non-trivial logic).

**Organization**: Tasks are organized by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Component files: `src/components/NyxActionItem/`
- Doc files: `docs/specs/components/`

---

## Phase 1: Setup

**Purpose**: No setup needed — project infrastructure already exists (Vite, TypeScript, SCSS, Vitest, Storybook all configured).

_No tasks — proceed to Foundational phase._

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Type definitions and styles that ALL user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T001 [P] Create `NyxActionItemProps` and `NyxActionItemEmits` interfaces in `src/components/NyxActionItem/NyxActionItem.types.ts` — props: `title: string`, `theme?: NyxTheme`, `action: string`; emit: `click`
- [X] T002 [P] Create `NyxActionItem.scss` in `src/components/NyxActionItem/NyxActionItem.scss` — root `.nyx-action-item` with `--nyx-c-bg-mute` background, theme-blended border using `rgba(var(--nyx-rgb-{theme}), 0.3)`, CSS Grid layout (`.nyx-action-item__content` with `grid-template-columns: 1fr auto`), left column flex-col (`.nyx-action-item__left`), right column centered (`.nyx-action-item__right`), theme class scoping for all 6 `NyxTheme` values

**Checkpoint**: Types and styles ready — component implementation can begin.

---

## Phase 3: User Story 1 — Display an action item with a themed button (Priority: P1) 🎯 MVP

**Goal**: Render a two-column card with title (top-left), description via default slot (bottom-left), and a themed `NyxButton` (right-center) that emits `click` on interaction.

**Independent Test**: Mount component with `title`, `action`, and default slot content. Verify title text renders, description slot content renders, a NyxButton with the action label is present, clicking the button emits `click`.

### Implementation for User Story 1

- [X] T003 [US1] Create `NyxActionItem.vue` in `src/components/NyxActionItem/NyxActionItem.vue` — `<script setup>` with props from `NyxActionItem.types.ts`, `useNyxProps({ origin: 'NyxActionItem' })`, emit `click`, template with root div using `classList` and `@import './NyxActionItem.scss'`, grid layout with `.nyx-action-item__content`, left column with `.nyx-action-item__title` (renders `{{ title }}`) and `.nyx-action-item__description` (renders `<slot />`), right column with `<NyxButton>` (renders when `action` prop is non-empty) passing `theme`, `size: NyxSize.Small`, `variant: NyxVariant.Outline`, and `action` string as slot content, `@click="emit('click')"` on the button
- [X] T004 [US1] Register `NyxActionItem` export in `src/components/index.ts` — add direct import `import NyxActionItem from './NyxActionItem/NyxActionItem.vue'` and add to export block
- [X] T005 [US1] Create living component spec at `docs/specs/components/NyxActionItem.spec.md` — document props (title, theme, action), emits (click), slots (default, action), internal architecture (grid layout, useNyxProps, NyxButton integration), known limitations

**Checkpoint**: At this point, NyxActionItem renders with title, description, and themed action button. Clicking the button emits `click`. Independently testable MVP.

---

## Phase 4: User Story 2 — Override the action button with custom content via the action slot (Priority: P2)

**Goal**: When the `action` named slot is provided, replace the default `NyxButton` with slot content. The `click` emit fires only from the internal button, not from slot content.

**Independent Test**: Mount component with content in the `action` slot. Verify the default button is NOT rendered and slot content IS rendered in the right-center position. Verify clicking slot content does not emit `click` from the component.

### Implementation for User Story 2

- [X] T006 [US2] Update `NyxActionItem.vue` — add `v-if="$slots.action"` guard for `<slot name="action" />` in the right column, change NyxButton render condition to `v-else-if="props.action"` (renders only when action prop is non-empty AND no action slot is provided), ensure no `@click` handler on the slot wrapper

### Tests for User Story 2

- [X] T007 [US2] Create unit test in `src/components/NyxActionItem/NyxActionItem.spec.ts` — test that action slot content replaces default button, test that clicking slot content does not emit `click`, test that clicking internal button still emits `click`

**Checkpoint**: User Stories 1 AND 2 both work. Action slot fully overrides default button.

---

## Phase 5: User Story 3 — Visual theming with border blending (Priority: P3)

**Goal**: The component border visually blends the resolved theme colour with the muted background, providing distinct visual signals for each theme value.

**Independent Test**: Render NyxActionItem with each of the 6 `NyxTheme` values. Verify border colour changes per theme. Verify default theme (no prop) produces a border using the resolved default theme.

### Implementation for User Story 3

- [X] T008 [US3] Update `NyxActionItem.scss` — add theme-scoped border colour rules under `.theme-primary`, `.theme-secondary`, `.theme-success`, `.theme-warning`, `.theme-danger`, `.theme-info` classes, each setting `border-color: rgba(var(--nyx-rgb-{theme}), 0.3)`, add `border-radius: var(--nyx-radius-md)`, add `padding: var(--nyx-pad-md)`, add responsive text overflow handling (`overflow: hidden`, `text-overflow: ellipsis` for title)

### Tests for User Story 3

- [X] T009 [US3] Add unit test in `src/components/NyxActionItem/NyxActionItem.spec.ts` — test that each theme value produces the correct border colour CSS variable, test that empty title does not break layout, test that empty action with no slot hides the action area

**Checkpoint**: All user stories are independently functional. Component is visually complete.

---

## Phase 6: Stories & Polish

**Purpose**: Storybook stories, final validation, and cross-cutting concerns.

- [X] T010 [P] Create `NyxActionItem.stories.ts` in `src/components/NyxActionItem/NyxActionItem.stories.ts` — stories: `Default` (basic usage), `Themes` (all 6 themes side by side), `WithActionSlot` (custom slot content), `EmptyAction` (no action prop, no slot), `LongText` (long title/description for overflow testing)
- [X] T011 Run `pnpm type-check` — verify no TypeScript errors
- [X] T012 Verify story renders in Storybook — all 5 stories compile and render correctly
- [X] T013 Run `pnpm test:unit` — all unit tests pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: No dependencies — can start immediately. BLOCKS all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational (T001, T002).
- **User Story 2 (Phase 4)**: Depends on User Story 1 (T003 component must exist to modify).
- **User Story 3 (Phase 5)**: Depends on Foundational (T002 SCSS must exist to extend). Can run in parallel with US1 if T002 is complete.
- **Stories & Polish (Phase 6)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational phase. No dependencies on other stories.
- **User Story 2 (P2)**: Depends on US1 (component must exist). Builds on T003.
- **User Story 3 (P3)**: Depends on Foundational (T002). Can proceed in parallel with US1 after T002.

### Within Each User Story

- Types (T001) and SCSS (T002) must complete before component (T003)
- Component (T003) must exist before export registration (T004)
- Component spec (T005) can be written in parallel with T003/T004
- Tests (T007, T009) written after implementation they test

### Parallel Opportunities

- T001 (types) and T002 (SCSS) can run in parallel — different files, no dependencies
- T005 (component spec) can run in parallel with T003/T004 — docs, not code
- T008 (theme SCSS) can run in parallel with T003 (component) — different files
- T010 (stories) can run in parallel with T011/T012/T013 — independent validation

### Parallel Example: Foundational Phase

```bash
# Launch types and SCSS together:
Task: "Create NyxActionItemProps and NyxActionItemEmits in src/components/NyxActionItem/NyxActionItem.types.ts"
Task: "Create NyxActionItem.scss in src/components/NyxActionItem/NyxActionItem.scss"
```

### Parallel Example: Polish Phase

```bash
# Launch stories and validation together:
Task: "Create NyxActionItem.stories.ts in src/components/NyxActionItem/NyxActionItem.stories.ts"
Task: "Run pnpm type-check"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (T001, T002)
2. Complete Phase 3: User Story 1 (T003, T004, T005)
3. **STOP and VALIDATE**: Mount NyxActionItem in a test or Storybook story. Verify title, description, button render correctly. Verify click emit fires.
4. Demo if ready.

### Incremental Delivery

1. Foundational (T001, T002) → types and styles ready
2. US1 (T003, T004, T005) → Basic action item with button → Test → Demo (MVP!)
3. US2 (T006, T007) → Action slot override → Test → Demo
4. US3 (T008, T009) → Theme border blending → Test → Demo
5. Polish (T010–T013) → Stories, type-check, tests → Final validation

### Single Developer Sequence

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- AGENTS.md constraint: NyxActionItem.vue must stay under 300 lines
