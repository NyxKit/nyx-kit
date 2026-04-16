# Feature Specification: NyxDropdown Components

**Feature Branch**: `016-dropdown-components`  
**Created**: 2026-04-16  
**Status**: Draft  
**Input**: User description: "Add a NyxDropdown with a trigger slot, an optional custom dropdown slot, and a default option-based menu exposed through NyxDropdown, NyxDropdownMenu, and NyxDropdownItem."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Triggered Dropdown (Priority: P1)

A developer can wrap any trigger content in a dropdown so users can open the panel from a visible control.

**Why this priority**: The trigger is the entry point for the entire component and delivers the core value of the feature.

**Independent Test**: Render the component with trigger content and verify that activating the trigger opens and closes the panel.

**Acceptance Scenarios**:

1. **Given** trigger content is provided, **When** the trigger is activated, **Then** the dropdown panel becomes visible beside the trigger.
2. **Given** the dropdown is open, **When** the trigger is activated again, **Then** the dropdown panel closes.

---

### User Story 2 - Default Menu Options (Priority: P2)

A developer can supply a list of select-style options and get a ready-made menu without building item markup manually.

**Why this priority**: Most dropdowns need a standard menu, so the built-in option rendering should be available immediately after the trigger behavior.

**Independent Test**: Render the component with an options array and verify that each option appears as an item in the default panel.

**Acceptance Scenarios**:

1. **Given** an options array is provided and no custom dropdown content is supplied, **When** the dropdown opens, **Then** each option is rendered as a menu item.
2. **Given** an option is marked as disabled, **When** the dropdown opens, **Then** the option is shown but cannot be selected.

---

### User Story 3 - Custom Dropdown Content (Priority: P3)

A developer can replace the default menu with arbitrary content while keeping the same trigger and positioning behavior.

**Why this priority**: Custom content is important for advanced use cases, but the default menu is the primary path.

**Independent Test**: Render the component with custom dropdown content and verify that the custom content appears instead of the default menu.

**Acceptance Scenarios**:

1. **Given** custom dropdown content is provided, **When** the dropdown opens, **Then** the custom content is shown in the panel.
2. **Given** custom dropdown content is provided, **When** the panel is rendered, **Then** the default option-based menu is not rendered.

---

### Edge Cases

- An empty options array still opens a panel, but no menu items are shown.
- Disabled options remain visible but do not respond to selection.
- Long labels remain readable without forcing the panel off-screen.
- A custom dropdown panel can be larger than the trigger and still remain anchored to it.
- Trigger content can be any valid interactive or non-interactive element.

## Assumptions

- Opening and closing the dropdown is handled by the component itself when the trigger is activated.
- The default dropdown panel closes after an option is chosen.
- `NyxDropdownMenu` and `NyxDropdownItem` are publicly usable building blocks, but they are primarily intended to support the default dropdown panel.
- Each option provides a visible label, a stable value, and an optional disabled state.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The library MUST expose `NyxDropdown`, `NyxDropdownMenu`, and `NyxDropdownItem` as public components.
- **FR-002**: `NyxDropdown` MUST render its default slot as the trigger region.
- **FR-003**: `NyxDropdown` MUST render the `dropdown` slot when it is provided.
- **FR-004**: When no `dropdown` slot is provided, `NyxDropdown` MUST render a default panel built from the provided options data.
- **FR-005**: `NyxDropdown` MUST accept theme, size, and variant props and forward them to the default menu.
- **FR-006**: The default panel MUST render one `NyxDropdownItem` per provided option.
- **FR-007**: Each option MUST preserve its visible label, value, and disabled state in the rendered menu.
- **FR-008**: Disabled options MUST be visible but not selectable.
- **FR-009**: The dropdown panel MUST stay anchored to the trigger and remain within the visible screen area during common viewport changes.
- **FR-010**: Developers MUST be able to replace the default menu with custom dropdown content without changing the trigger markup.
- **FR-011**: `NyxDropdownMenu` and `NyxDropdownItem` MUST be usable independently for custom dropdown compositions.

### Key Entities *(include if feature involves data)*

- **Dropdown Trigger**: The content shown in the default slot that opens and closes the panel.
- **Dropdown Panel**: The floating content area shown beside the trigger.
- **Dropdown Option**: A selectable entry defined by label, value, and disabled state.
- **Dropdown Menu**: The default option-rendering panel used when custom dropdown content is not supplied.
- **Dropdown Item**: The visual representation of one option inside the menu.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can build a dropdown with a custom trigger and default option list without creating separate positioning logic.
- **SC-002**: In representative testing, 100% of supplied options appear in the default menu with the correct labels and disabled state.
- **SC-003**: In representative desktop and mobile viewport tests, the dropdown remains attached to its trigger and stays visible at the screen edges.
- **SC-004**: A developer can replace the default menu with custom dropdown content and still reuse the same trigger wrapper in a single component.

## Keyboard Behaviour

- `Esc` closes an open dropdown.
- `ArrowDown` and `ArrowUp` move through visible dropdown items when the menu is open.
- `Enter` and `Space` activate the focused item or toggle the dropdown when the trigger is focused.
- Keyboard interaction must not prevent custom trigger content from handling its own semantics.

## Accessibility

- The trigger must remain a real interactive control or contain one.
- The dropdown panel must expose its expanded/collapsed state to assistive technologies.
- Disabled menu items must remain discoverable but should not be focusable as active choices.
- Custom dropdown content must still be reachable by keyboard if the consumer makes it interactive.
