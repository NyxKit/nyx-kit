# Feature Specification: NyxMetricCard Component

**Feature Branch**: `014-nyx-metric-card`  
**Created**: 2026-04-07  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Display a Basic Metric (Priority: P1)

A developer embeds a `NyxMetricCard` in a dashboard to display a key metric with a title and value. The card immediately communicates the metric name and its current measurement.

**Why this priority**: `title` and `value` are the only required props; every other story builds on this foundation.

**Independent Test**: Mount the component with only `title="ACTIVE NODES"` and `value="12/12"` — the card renders correctly and delivers readable metric information.

**Acceptance Scenarios**:

1. **Given** a card with `title="SYSTEM UPTIME"` and `value="182"`, **When** rendered, **Then** the title is visible in muted, uppercase style and the value is displayed prominently in a large, white/bright style.
2. **Given** a card with only the two required props, **When** rendered, **Then** no unit, suffix, icon, or indicator border appears.

---

### User Story 2 - Enrich a Metric with Unit, Suffix and Icon (Priority: P2)

A developer adds optional `unit`, `suffix`, and `icon` props to provide richer context — e.g., "182 h  99.9%" or "64% ↑".

**Why this priority**: These props are the most commonly combined embellishments shown in the design reference.

**Independent Test**: Each optional prop can be added individually and verified in isolation.

**Acceptance Scenarios**:

1. **Given** `value="64"` and `unit="%"`, **When** rendered, **Then** the unit "%" appears immediately after the value in a smaller, muted style.
2. **Given** `suffix="STABLE"` and `theme="success"`, **When** rendered, **Then** the suffix text is coloured using the theme colour (green for success).
3. **Given** `icon="wifi"` and `theme="primary"`, **When** rendered, **Then** a wifi icon from NyxIcon is rendered with the `theme` prop applied to it.
4. **Given** all four optional props are provided together, **When** rendered, **Then** they all appear in the correct positions without overlap or layout breakage.

---

### User Story 3 - Apply Visual Variants (Priority: P2)

A developer uses the `variant` prop to control whether and how a coloured indicator is displayed on the card.

**Why this priority**: Variants are the primary visual differentiator between cards in a dashboard; incorrect behaviour is immediately visible.

**Independent Test**: Each variant value can be tested independently by mounting a card and checking the presence/absence of the indicator element and its CSS state.

**Acceptance Scenarios**:

1. **Given** `variant` is omitted (default), **When** rendered, **Then** no indicator border is visible (equivalent to `NyxVariant.Text`).
2. **Given** `variant="soft"` or `variant="subtle"`, **When** rendered, **Then** a coloured left-side indicator border is always visible.
3. **Given** `variant="ghost"` or `variant="outline"`, **When** rendered, **Then** no indicator border is visible until the card is hovered, at which point the indicator appears.
4. **Given** `variant="filled"`, **When** rendered, **Then** the entire card background is filled with the theme colour and no indicator border is shown.

---

### User Story 4 - Filled Variant Colour Overrides (Priority: P3)

When a developer uses `NyxVariant.Filled`, the icon and suffix must use the default (non-theme) text colour so they remain legible against the filled background.

**Why this priority**: This is a specific visual rule that only activates in one variant; it is lower priority but must be correct when `Filled` is used.

**Independent Test**: Mount a card with `variant="filled"`, `icon="wifi"`, `suffix="OK"`, and a theme — verify icon and suffix do not inherit the theme colour.

**Acceptance Scenarios**:

1. **Given** `variant="filled"`, `theme="success"`, `icon="check"`, and `suffix="OK"`, **When** rendered, **Then** the icon and suffix text use the default CSS text colour (not green).
2. **Given** any variant other than `filled`, **When** rendered with `theme="success"` and `suffix="STABLE"`, **Then** the suffix adopts the theme colour (green).

---

### Edge Cases

- What happens when `value` is an empty string? The card renders with an empty value slot without crashing.
- What happens when `icon` is an unrecognised Lucide name? NyxIcon falls back gracefully; the metric card should not crash or display broken markup.
- What happens when both `unit` and `suffix` are provided? Both render simultaneously, each in their respective styles.
- What happens when `variant="filled"` but no `theme` is provided? The card fills with the resolved default theme colour from `useNyxProps`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Component MUST render `title` as uppercase, muted text.
- **FR-002**: Component MUST render `value` as large, high-contrast (white/bright) text.
- **FR-003**: Component MUST render `unit` (when provided) immediately after the value in a smaller, muted style.
- **FR-004**: Component MUST render `suffix` (when provided) using the resolved theme colour for text.
- **FR-005**: Component MUST render `icon` (when provided) via the internal `NyxIcon` component, forwarding the `theme` prop.
- **FR-006**: Component MUST support `theme` prop resolved through `useNyxProps`; all theme-sensitive children inherit from it.
- **FR-007**: Component MUST support a `variant` prop constrained to the subset: `Text` (default), `Filled`, `Soft`, `Subtle`, `Ghost`, `Outline`.
- **FR-008**: Variants `Soft` and `Subtle` MUST display a coloured left-side indicator border at all times.
- **FR-009**: Variants `Ghost` and `Outline` MUST display a coloured left-side indicator border only on hover.
- **FR-010**: Variant `Filled` MUST fill the entire card background with the theme colour and MUST NOT show an indicator border.
- **FR-011**: Variant `Text` (default) MUST display neither a filled background nor an indicator border.
- **FR-012**: When `variant="filled"`, `icon` and `suffix` MUST use the default CSS text/fill colour instead of the theme colour.
- **FR-013**: When `variant` is not `filled`, `icon` and `suffix` MUST adopt the theme colour.

### Key Entities

- **NyxMetricCard**: The component itself. It is a display-only card; it emits no events and holds no internal mutable state.
- **Indicator**: The left-side coloured border element whose visibility is governed by the `variant` prop.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All five prop combinations shown in the design reference (title+value, +unit, +suffix, +icon, +all) render correctly without visual regression.
- **SC-002**: All six supported variant values produce visually distinct, correct indicator and background states as described in FR-008 through FR-011.
- **SC-003**: The `Filled` colour-override rule (FR-012) is verified by automated tests covering both the positive case (filled, override active) and the negative case (non-filled, theme colour active).
- **SC-004**: The component passes Storybook visual review with representative stories for each variant and prop combination.
- **SC-005**: Consumers can integrate `NyxMetricCard` into a dashboard grid without additional wrapper styling.

## Assumptions

- The left-side indicator shares the same theme colour as the one resolved by `useNyxProps`.
- "Default CSS text colour" in the Filled variant means the `--nyx-text` (or equivalent) CSS custom property, not a hardcoded colour.
- Icon sizing within the card is governed by a fixed internal `NyxSize` token (e.g., `sm`) and is not exposed as a prop.
- The component is read-only; no click events, focus handling, or keyboard interactions are needed.
- `NyxVariant` values are kebab-cased strings at the prop level (e.g., `"filled"`, `"soft"`) consistent with how other Nyx Kit components use the enum.
- The `suffix` and `icon` share the same horizontal row as `value` and `unit`, per the design reference screenshot.
