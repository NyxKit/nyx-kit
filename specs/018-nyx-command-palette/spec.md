# Feature Specification: NyxCommandPalette

**Feature Branch**: `018-nyx-command-palette`
**Created**: 2026-10-08
**Status**: Implemented for 2.3.0
**Input**: Create a branch from main and specify a command palette with grouped results, fuzzy search, and proper Storybook integration. The palette must own its centered overlay and distinct styling, with no NyxModal dependency.

The authoritative API and implementation acceptance contract is [NyxCommandPalette.spec.md](../../docs/specs/components/NyxCommandPalette.spec.md). Keep both documents consistent. The implementation delivers the component, stories, tests, and minor release.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find and run a command (Priority: P1)

As an application user, I can search grouped commands and activate a result without navigating a large menu.

**Why this priority**: Search and activation provide the component's primary value.

**Independent Test**: Present two command groups and a visible action log. Search for a command, activate it, and verify exactly one matching log entry.

**Acceptance Scenarios**:

1. **Given** grouped commands and an empty search, **When** the palette appears, **Then** commands and groups retain their supplied order and empty groups have no headings.
2. **Given** labels, descriptions, and search keywords, **When** a user enters mixed-case or accented text, **Then** matches ignore case and combining diacritics.
3. **Given** `Open settings`, **When** the user searches `opst`, **Then** the abbreviated command is discoverable; exact-label and label-prefix matches rank ahead of weaker matches within the same group.
4. **Given** a query containing several words, **When** results are filtered, **Then** every word must match a searchable field and groups retain their original order.
5. **Given** an enabled result, **When** it is clicked or activated with Enter, **Then** the application receives that command exactly once and can display a visible outcome.
6. **Given** the same command was just executed, **When** the user activates it again, **Then** it executes once again without requiring another command to be selected first.
7. **Given** no matching commands, **When** filtering completes, **Then** the user sees an understandable empty state and cannot activate an invisible command.

### User Story 2 - Operate entirely with the keyboard (Priority: P1)

As a keyboard or assistive-technology user, I can discover, navigate, and activate commands while continuing to edit my search.

**Why this priority**: Keyboard access is essential to the primary command-palette workflow.

**Independent Test**: Use a grouped fixture with disabled entries and enough results to scroll. Complete search and activation using only the keyboard, then test dismissal and normal tab navigation.

**Acceptance Scenarios**:

1. **Given** focus in the search field, **When** arrow keys navigate results, **Then** enabled commands are highlighted across groups, disabled commands/headings are skipped, and focus remains in the field.
2. **Given** a boundary result, **When** navigation reaches the edge, **Then** it wraps by default and stops at the edge when wrapping is disabled.
3. **Given** a highlighted result, **When** Enter is pressed, **Then** exactly that command activates without submitting a surrounding form.
4. **Given** an empty, loading, or all-disabled result set, **When** Enter is pressed, **Then** no command runs and a surrounding form is not submitted.
5. **Given** focus inside the palette, **When** Escape is pressed outside text composition, **Then** one dismissal request occurs without clearing query or selection.
6. **Given** composition of non-Latin text, **When** Enter or navigation keys confirm/edit that text, **Then** no command activation or dismissal occurs.
7. **Given** an inline palette, **When** Tab or Shift+Tab is pressed, **Then** normal page focus order continues without trapping focus or activating a result.

### User Story 3 - Compose an application launcher (Priority: P2)

As an application developer, I can open a standalone centered command palette, control its visibility, query, and last selection, and choose what each command does. An optional inline mode supports embedded search.

**Why this priority**: The command palette needs its own search-first layout and overlay behavior, independently of the general-purpose modal component.

**Independent Test**: Build an example that opens from a button and platform shortcut, shows a selected action, closes, and restores focus to its trigger.

**Acceptance Scenarios**:

1. **Given** a controlled query and selection, **When** the parent changes either, **Then** the display updates without executing a command or echoing a user change.
2. **Given** no external state bindings, **When** the user searches and activates, **Then** the palette retains local state and reports the activation.
3. **Given** a closed standalone overlay example, **When** its trigger or Ctrl+K/Meta+K is used, **Then** it opens and the search field receives focus.
4. **Given** an open overlay example whose selection handler closes it, **When** a result is activated, Escape is pressed, or the backdrop is clicked, **Then** the example closes and focus returns to its trigger.
5. **Given** two inline palettes on a page, **When** one is used, **Then** the other palette's query, highlight, selection, and focus remain unchanged.
6. **Given** the default overlay is open, **When** the user presses Tab/Shift+Tab, **Then** focus stays inside and the background remains noninteractive and does not scroll.
7. **Given** an open overlay, **When** its parent closes it or it unmounts, **Then** background scroll state is restored and focus returns to a still-available opener without a duplicate dismissal event.
8. **Given** a 320px viewport or a long result list, **When** the overlay opens, **Then** its dedicated surface is horizontally centered with viewport gutters and anchored at `15dvh`, the search remains visible, and results scroll within it.
9. **Given** a closed palette with retained query and selection, **When** it reopens, **Then** those values remain and focus returns to search; inline mode ignores the overlay open state.
10. **Given** an open overlay, **When** a pointer gesture starts inside its surface and ends outside, **Then** it stays open; only a backdrop press and release dismiss it.

### User Story 4 - Customize results and provide remote search (Priority: P2)

As an application developer, I can present richer content and supply externally searched results without losing the built-in keyboard workflow.

**Why this priority**: Custom results and asynchronous discovery make the component useful beyond fixed command lists.

**Independent Test**: Demonstrate customized content and mock remote search that intentionally resolves two requests out of order.

**Acceptance Scenarios**:

1. **Given** custom result decorations and footer content, **When** results are navigated and activated, **Then** item identity, accessible names, and keyboard behavior remain intact.
2. **Given** supplied remote results, **When** local filtering is bypassed for their group, **Then** results retain the parent's order even when their labels do not match the query.
3. **Given** an in-flight query, **When** loading is active, **Then** loading is visible and announced, stale results cannot activate, and search remains editable.
4. **Given** a slow older request and a faster newer request, **When** both resolve, **Then** the example displays only the newest query's results.
5. **Given** no results after loading completes, **When** a custom empty state is supplied, **Then** it replaces the default empty content.

### User Story 5 - Learn and verify the component in Storybook (Priority: P1)

As a library consumer, I can find the component in Storybook, understand its API, and try realistic examples before integrating it.

**Why this priority**: The user explicitly requires proper Storybook integration; working examples are part of feature completion.

**Independent Test**: Open the Navigation group, try the default overlay and inline examples, change controls, and inspect documented models, slots, and events.

**Acceptance Scenarios**:

1. **Given** the built Storybook, **When** a consumer opens `Components/Navigation/NyxCommandPalette`, **Then** a working Default story and Docs page are available with accurate controls and defaults.
2. **Given** the stories, **When** commands activate, **Then** visible feedback and event logging make the outcome clear.
3. **Given** the example collection, **When** explored, **Then** it covers controlled state, search, keyboard navigation, custom slots, empty/loading/disabled states, remote results, standalone overlay and inline use, themes, sizes, and multiple instances.
4. **Given** light/dark modes or a narrow container, **When** inspected, **Then** search, command text, focus, and navigation remain usable without horizontal page overflow.
5. **Given** a story is unmounted or revisited, **When** it contained delayed results or shortcuts, **Then** no stale timers, requests, handlers, or mutated fixtures affect another story.

### Edge Cases

- Invalid/duplicate group or command identities: skip invalid descriptors, retain the first valid occurrence, and report the issue during development.
- Duplicate labels: distinct IDs keep commands independently selectable.
- Empty query, whitespace-only query, empty groups, and all-disabled results: predictable display and no phantom activation.
- Highlighted command removed or disabled: highlight the first enabled visible result without running anything.
- Selected command removed: remove its selected appearance without silently rewriting a parent's state.
- Selected command filtered out: preserve selection separately from current visible highlight.
- Query/data updates during loading: block stale activation; recover a valid highlight when loading ends.
- Long labels/descriptions: preserve usability at 320 CSS pixels and allow vertical result scrolling.
- Closing/unmounting an overlay or switching to inline mode: release owned scroll/focus resources; a removed opener must not receive focus.
- IME composition, repeated activation, and surrounding forms: preserve text entry and prevent duplicate actions or accidental submission.
- Multiple instances and server-rendered initial markup: maintain unique stable input/list/group/option relationships.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Accept ordered groups with stable command identities, labels, optional descriptions/icons/keywords/shortcut hints, and disabled states.
- **FR-002**: Search labels, descriptions, and keywords with case/diacritic normalization and ordered-subsequence matching; rank exact and prefix label matches ahead of weaker matches within groups, preserving input order for ties.
- **FR-003**: Support empty-query discovery, stable group order, hidden empty groups, and independently bypassed filtering for externally ranked groups.
- **FR-004**: Keep search text, highlight, and last selection separate; optional external control must not execute commands.
- **FR-005**: Report each successful activation exactly once, including repeated activation; never activate disabled, hidden, or loading results.
- **FR-006**: Provide cross-group keyboard navigation, optional wrapping, native text editing, composition guards, local dismissal, normal tab order, and active-result scrolling.
- **FR-007**: Provide accessible input/list/group/option names and states, loading/empty announcements, and no inline focus trap.
- **FR-008**: Own a centered overlay with dedicated layout/styling, parent-controlled visibility, backdrop dismissal, focus containment/restoration, and background scroll cleanup. Do not depend on NyxModal. Support an opt-in configurable overlay toggle shortcut; keep command side effects and navigation consumer-owned; support optional inline rendering without overlay behavior.
- **FR-009**: Support parent-managed remote results/loading; demonstrate debounce and rejection of stale responses without real network access.
- **FR-010**: Provide result-content, group-label, loading, empty, and footer customization while retaining component-owned interaction semantics.
- **FR-011**: Never mutate supplied data; define invalid IDs, duplicates, reordered/removed items, and dynamic disabled-state behavior.
- **FR-012**: Follow Nyx themes, sizes, inherited defaults, colour modes, and visual tokens; fit 320px width without horizontal page overflow.
- **FR-013**: Deliver Storybook documentation and every example in the living contract, with real controls, event feedback, isolated fixtures, and meaningful interaction assertions.
- **FR-014**: Validate search/selection, browser keyboard/overlay flows, public types/exports, story rendering, and server-rendered instance identity before marking implementation complete.

### Key Entities *(include if feature involves data)*

- **Command**: An identifiable action/destination with searchable text and optional presentation/disabled metadata.
- **Command group**: An ordered collection with an optional heading and local or externally supplied filtering.
- **Search term**: User-controlled discovery text independent of selection.
- **Highlighted command**: The current keyboard/pointer target, which does not execute until activated.
- **Selection**: The last activated command identity, optionally controlled by the parent.
- **Activation**: A deliberate user action identifying the original command and group for application handling.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every primary search/activation scenario is completable with keyboard only and produces exactly one action per activation.
- **SC-002**: No disabled, hidden, or loading command executes in any acceptance scenario; highlighting alone executes zero commands.
- **SC-003**: At least 100 commands across five groups remain searchable/navigable, with the highlighted result brought into view when needed.
- **SC-004**: The standalone overlay example opens from both trigger and platform shortcut, focuses search, and restores trigger focus on each documented dismissal route.
- **SC-005**: Every required Storybook example renders without component-related runtime errors, documents the delivered API, and works in both colour modes and at 320px width.
- **SC-006**: Two simultaneous instances behave independently, and mock remote search displays the latest query's results under out-of-order responses.

## Assumptions and scope boundaries

- The follow-up request authorizes implementation, a minor version bump, and creating a pull request. npm publishing remains a separate maintainer action.
- First-version decisions: single-command activation, optional ID selection, default standalone overlay with a separate open model, optional inline rendering, no automatic dismissal on selection or query reset, and lightweight subsequence search.
- Edit-distance fuzzy search, nested pages, multiple selection, virtualization, persistent recents, automatic routing, and a global command registry are outside the first version.
- Existing Nyx primitives/tokens are the baseline. No new dependency is assumed; flag one before adding it if later implementation requires it.
- The user explicitly requires independent overlay styling and rejects NyxModal composition. Use a search-first surface with its own sizing, backdrop, and motion. Existing unrelated discrepancies remain recorded in [AGENTS.md](../../AGENTS.md).

## Follow-up: shortcuts, viewport discovery, and motion

- `shortcut` optionally toggles the overlay; recommend `SUPER+K` and support custom chords. Default registration remains off. Shortcuts apply within the component document; Storybook requires preview focus. Browser/OS-reserved combinations are not guaranteed to be overridable; demonstrate custom chords with `Ctrl+Enter`, not Firefox’s private-window binding. Ignore repeats, IME and unrelated editable inputs; prevent duplicate instance toggles.
- `viewportMode` uses exported `NyxCommandPaletteViewportMode`: Always, WhileSearching, AfterInteraction (default). AfterInteraction preserves reveal after clearing within the current open session; overlay closure resets reveal history; WhileSearching hides on clear. Footer reveal button and empty-search Enter/ArrowDown reveal without selecting; hide the button when results show. Place the small reveal icon at the footer’s right edge with no hover rotation. Mode changes reset disclosure history. Hidden results cannot activate or announce empty/loading text.
- Animate entry and exit, backdrop, viewport reveal/collapse, result changes, hover and press feedback. Rapid reversals, unmount, inline switching and reduced motion must preserve focus/scroll cleanup and single dismissal events.

- Keep the search stationary as results appear, disappear, or change count: anchor the overlay top at `15dvh`, grow downward, and use a top-center surface transform origin.
