# Feature Specification: NyxLogViewer Component

**Feature Branch**: `015-nyx-log-viewer`  
**Created**: 2026-04-07  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Display a Stream of Log Entries (Priority: P1)

A developer embeds `NyxLogViewer` in a dashboard or monitoring panel and binds it to a reactive array of log entries. Every entry shows its timestamp and message in a clean, terminal-style tabular layout.

**Why this priority**: The core value proposition — rendering a list of logs — must work before any optional feature is useful.

**Independent Test**: Bind a `v-model` array of three entries with `timestamp`, `value`, and no `origin`. The component renders three rows, each showing a formatted timestamp and the message text. The layout uses two columns only.

**Acceptance Scenarios**:

1. **Given** an array of log entries with `timestamp` and `value` only, **When** rendered, **Then** each entry appears as a row with the timestamp in the first column and the message in the second column.
2. **Given** an empty array, **When** rendered, **Then** the component renders without errors and shows an empty state (no rows).
3. **Given** a `timestampFormat` prop is provided, **When** rendered, **Then** all timestamps are formatted according to that format string.
4. **Given** no `timestampFormat` is provided, **When** rendered, **Then** timestamps are displayed using a sensible default format (e.g. `HH:mm:ss`).

---

### User Story 2 - Show Origin Column When Present (Priority: P2)

When at least one log entry carries an `origin` value, a middle column appears between timestamp and message, identifying the source of each log line. Entries without an origin show an empty cell in that column.

**Why this priority**: The three-column layout is the distinguishing feature from a plain list; it is required for multi-source log displays.

**Independent Test**: Bind an array where at least one entry has `origin` set. A third column appears; entries with an origin show it, entries without show nothing in that cell.

**Acceptance Scenarios**:

1. **Given** all entries have `origin: undefined`, **When** rendered, **Then** only two columns are shown (timestamp + value).
2. **Given** at least one entry has a non-empty `origin`, **When** rendered, **Then** three columns are shown (timestamp + origin + value).
3. **Given** a mixed array where some entries have `origin` and some do not, **When** rendered in three-column mode, **Then** origin-less entries show an empty cell in the origin column.
4. **Given** the array changes at runtime from all-no-origin to at-least-one-origin, **When** the reactive data updates, **Then** the layout switches to three columns without a full page reload.

---

### User Story 3 - Theme Colouring per Entry (Priority: P3)

Individual log entries carry an optional `theme` property. When present, the entry's value text is coloured with the corresponding theme colour, making severity or category immediately scannable.

**Why this priority**: Colour coding is a secondary affordance; the component is fully usable without it.

**Independent Test**: Bind entries with different `theme` values. Rows with a `theme` render their value text in the matching theme colour; rows without a `theme` render in the default text colour.

**Acceptance Scenarios**:

1. **Given** an entry with `theme: "danger"`, **When** rendered, **Then** the value text is coloured in the danger theme colour.
2. **Given** an entry with no `theme`, **When** rendered, **Then** the value text is rendered in the default muted text colour.
3. **Given** all valid theme values (primary, secondary, success, warning, danger, info), **When** each is bound, **Then** each row adopts the correct colour for that theme.

---

### Edge Cases

- What happens when `timestamp` is missing or invalid? The cell renders as an empty string without crashing.
- What happens when `value` is an empty string? The row still renders; the value cell is empty.
- What happens when the array is replaced entirely (not mutated)? The displayed rows update to match the new array.
- What happens when `timestampFormat` is changed at runtime? All visible timestamps re-render with the new format.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Component MUST accept a `v-model` binding of type `NyxLog[]` where each entry has `timestamp`, `value: string`, and optional `origin?: string` and `theme?: NyxTheme`.
- **FR-002**: Component MUST render entries in a bare, header-less tabular layout using `NyxTable` internally.
- **FR-003**: Component MUST display timestamps in column 1, formatted according to the `timestampFormat` prop; default format is `HH:mm:ss` when no format is provided.
- **FR-004**: Component MUST display value text in the last column.
- **FR-005**: Component MUST use a two-column layout (timestamp + value) when no entry in the bound array has a non-empty `origin`.
- **FR-006**: Component MUST use a three-column layout (timestamp + origin + value) when at least one entry has a non-empty `origin`; origin-less entries show an empty cell.
- **FR-007**: Component MUST apply the entry's `theme` colour to its value text when `theme` is provided.
- **FR-008**: Component MUST reactively switch between two- and three-column layouts when the bound array changes.
- **FR-009**: Component MUST NOT render table headers.
- **FR-010**: Component MUST emit `update:modelValue` to satisfy the `v-model` contract (even though the log list is typically read-only from the consumer's perspective).

### Key Entities

- **NyxLog**: A single log entry — `timestamp` (Date or number or string), `value: string`, `origin?: string`, `theme?: NyxTheme`.
- **NyxLogViewer**: The display component. Read-only presentation; no internal state beyond what is derived from the bound array.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All entries in a bound array of 100 log entries render correctly without visual regression.
- **SC-002**: The two-column ↔ three-column layout switch is verified by automated tests for both directions (all-no-origin → some-origin and reverse).
- **SC-003**: All six `NyxTheme` values produce visually distinct row colours verified in Storybook.
- **SC-004**: The `timestampFormat` prop is exercised with at least two different format strings in tests, confirming correct output.
- **SC-005**: The component passes Storybook visual review with stories for: empty state, two-column, three-column, mixed themes, and live-updating feed.

## Assumptions

- `timestamp` accepts whatever type `date-fns` (or the project's existing date utility) can format; the component is not responsible for parsing exotic formats.
- "Bare" styling means the component inherits font, background, and spacing from the surrounding context — no card/panel wrapper is added by `NyxLogViewer` itself; consumers wrap it as needed.
- The origin column is muted in colour (matching the screenshot), while the value column uses default or theme text colour.
- The timestamp column uses a monospace or tabular-nums style to keep alignment stable.
- Entries are displayed in array order (index 0 first); no internal sorting is applied.
- `NyxTable` is already available internally and supports the bare/headerless configuration needed.
- The component name is `NyxLogViewer` (preferred over `NyxConsole`, which implies interactive input).
