# Feature Specification: NyxActionItem Component

**Feature Branch**: `012-nyx-action-item`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "I need a new component NyxActionItem that takes the following props: title (string), theme (NyxTheme) - optional, action (string). It has two slots: default (for text or rich html), action (in case consumers prefer to render their action manually). This renders in the following: top-left: title, bottom-left: description (default slot), right-center: (action slot) NyxButton with the theme from the props. Has the following emits: click (only fires when the internal button in the action slot gets clicked). The whole component has a mute bg (--nyx-c-bg-mute) and a border that blends the theme (from props) with the background."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Display an action item with a themed button (Priority: P1)

A developer places a NyxActionItem component to show a titled action card with a description and a themed action button. The component renders the title at the top-left, the description at the bottom-left, and a themed NyxButton on the right-center. When the button is clicked, a `click` event is emitted.

**Why this priority**: This is the core use case — the component must render its layout and emit click events to be useful at all.

**Independent Test**: Can be fully tested by mounting the component with title, action, and default slot content, verifying the layout positions and that clicking the button emits `click`.

**Acceptance Scenarios**:

1. **Given** a NyxActionItem with `title`, `action`, and default slot content, **When** the component renders, **Then** the title appears at the top-left, the description at the bottom-left, and a NyxButton with the action label appears on the right-center.
2. **Given** a NyxActionItem with `theme="primary"`, **When** the button renders, **Then** it uses the primary theme colour.
3. **Given** a NyxActionItem with no `theme` prop, **When** the button renders, **Then** it uses the default theme resolved by `useNyxProps`.
4. **Given** a NyxActionItem with a rendered button, **When** the user clicks the button, **Then** a `click` event is emitted.

---

### User Story 2 - Override the action button with custom content via the action slot (Priority: P2)

A developer wants to render custom action content instead of the default NyxButton — for example, an icon-only button, a dropdown trigger, or a custom-styled element. They use the `action` named slot to provide their own markup.

**Why this priority**: Enables flexibility for consumers who need non-standard action UI while keeping the same card layout.

**Independent Test**: Can be fully tested by providing content to the `action` slot and verifying the default button is replaced.

**Acceptance Scenarios**:

1. **Given** a NyxActionItem with content in the `action` slot, **When** the component renders, **Then** the custom slot content appears in the right-center position instead of the default NyxButton.
2. **Given** a NyxActionItem with content in the `action` slot, **When** the user clicks an interactive element inside the slot, **Then** the component does not emit its own `click` event (the slot content handles its own events).

---

### User Story 3 - Visual theming with border blending (Priority: P3)

A developer uses the `theme` prop to colour-code action items by category (e.g. danger for destructive actions, success for confirmations). The component's border visually blends the theme colour with the muted background, providing a subtle but distinct visual signal.

**Why this priority**: Visual differentiation is important for usability but is a refinement on top of the core layout and interaction.

**Independent Test**: Can be tested by rendering components with different themes and verifying the border colour changes accordingly.

**Acceptance Scenarios**:

1. **Given** a NyxActionItem with `theme="danger"`, **When** the component renders, **Then** the border colour reflects a blend of the danger theme and the muted background.
2. **Given** a NyxActionItem with no `theme` prop, **When** the component renders, **Then** the border uses the default theme blended with the muted background.

---

### Edge Cases

- What happens when `title` is an empty string? The title area should render but be empty (no layout breakage).
- What happens when `action` is an empty string and no `action` slot is provided? The right-center area should not render (no empty button).
- How does the component handle long title or description text? Text should wrap or truncate gracefully without breaking the layout.
- What happens when both the `action` prop and `action` slot are provided? The slot takes precedence (standard Vue slot override behaviour).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The component MUST accept a `title` prop of type string and render it at the top-left position.
- **FR-002**: The component MUST accept an optional `theme` prop of type `NyxTheme` and pass it to the internal NyxButton for theming.
- **FR-003**: The component MUST accept an `action` prop of type string to use as the label for the default action button.
- **FR-004**: The component MUST expose a `default` slot for rendering the description content at the bottom-left position.
- **FR-005**: The component MUST expose an `action` named slot that, when provided, replaces the default NyxButton in the right-center position.
- **FR-006**: The component MUST emit a `click` event only when the internal NyxButton (rendered from the `action` prop) is clicked — not when the action slot content is clicked.
- **FR-007**: The component MUST use `--nyx-c-bg-mute` as its background colour.
- **FR-008**: The component MUST render a border that blends the resolved theme colour with the muted background.
- **FR-009**: The component MUST process visual props through `useNyxProps` to respect library-level defaults.
- **FR-010**: When the `action` slot is provided, the default NyxButton MUST NOT be rendered.
- **FR-011**: When the `action` prop is empty and no `action` slot is provided, the right-center action area MUST NOT render.

### Key Entities

- **NyxActionItem**: A card-like display component that presents a title, description, and an action button in a structured two-column layout. It serves as a building block for action lists, settings panels, and task queues.
- **Action**: A string label that drives the text of the default action button, or a placeholder indicating that custom action content should be rendered via the action slot.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can integrate NyxActionItem with fewer than 5 lines of template code for the common case (title + action + description).
- **SC-002**: The component renders correctly across all six NyxTheme values with visually distinct border colours.
- **SC-003**: The `click` event fires exclusively from the internal button and never from clicks elsewhere in the component.
- **SC-004**: The action slot fully replaces the default button without layout shifts or visual artifacts.
- **SC-005**: The component maintains its two-column layout integrity with title/description text up to 200 characters without overflow or wrapping issues.
