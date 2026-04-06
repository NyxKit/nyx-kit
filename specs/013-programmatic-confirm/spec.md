# Feature Specification: Programmatic Confirmation Dialog

**Feature Branch**: `013-programmatic-confirm`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "i want to create a confirmation that spawns a model programmatically. Consumers can call it through TS like so: const resultConfirmation = await NyxKit.confirm({ theme: NyxTheme.Danger, title: 'Model title', message: 'Lorem ipsum dolor sit amet' }) if (resultConfirmation.isSuccess) { // do something when user confirms } else { // do something when user cancels/aborts the confirmation } Make sure to use the NyxModal component to spawn the model. Later we can extend this to add toast functionality, but first let's focus on the confirmation."

**Additional Input**: "make sure to use NyxResult, a new class I just added for result handling (this explains the isSuccess etc)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Trigger Confirmation Dialog (Priority: P1)

A developer needs to show a confirmation dialog to the user and await their response before proceeding with an action.

**Why this priority**: This is the core use case - without this, the feature doesn't exist.

**Independent Test**: Can be tested by calling the Nyx.confirm() API with various options and verifying a modal appears with correct content.

**Acceptance Scenarios**:

1. **Given** the library is installed and Nyx plugin is registered, **When** a developer calls `Nyx.confirm({ title: 'Confirm', message: 'Are you sure?' })`, **Then** a modal dialog appears with the title "Confirm" and message "Are you sure?" and two action buttons.

2. **Given** a confirmation dialog is open, **When** the user clicks the confirm/accept button, **Then** the dialog closes and the promise resolves with a `NyxResult` where `isSuccess` is `true`.

3. **Given** a confirmation dialog is open, **When** the user clicks the cancel button or presses Escape or clicks the backdrop, **Then** the dialog closes and the promise resolves with a `NyxResult` where `isSuccess` is `false`.

---

### User Story 2 - Custom Theme and Styling (Priority: P2)

A developer needs to visually communicate the severity or type of the confirmation using theme colors.

**Why this priority**: Common UX pattern - destructive actions should look dangerous, warnings should look warning-like.

**Independent Test**: Can be tested by passing different theme options and verifying the modal's visual appearance changes accordingly.

**Acceptance Scenarios**:

1. **Given** `theme: NyxTheme.Danger` is passed, **When** the modal renders, **Then** the confirmation button should use the Danger theme styling.

2. **Given** `theme: NyxTheme.Warning` is passed, **When** the modal renders, **Then** the confirmation button should use the Warning theme styling.

---

### User Story 3 - Custom Button Labels (Priority: P3)

A developer needs to customize the button text for the confirmation dialog.

**Why this priority**: Provides flexibility for different contexts (e.g., "Delete" vs "Confirm").

**Independent Test**: Can be tested by passing custom confirmText and cancelText options and verifying they appear on the buttons.

**Acceptance Scenarios**:

1. **Given** `confirmText: 'Delete'` and `cancelText: 'Keep'` are passed, **When** the modal renders, **Then** the buttons show "Delete" and "Keep" respectively.

---

### Edge Cases

- What happens when no theme is passed? (default to Primary)
- What happens when title or message are empty/undefined?
- Can multiple confirm dialogs be open at once? (should queue or reject)
- What happens if the component is unmounted while dialog is open?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The library MUST expose a `Nyx.confirm()` method that accepts an options object and returns a Promise.
- **FR-002**: The confirmation dialog MUST use the existing NyxModal component internally.
- **FR-003**: The method MUST accept a `theme` option that applies the specified NyxTheme to the confirmation button.
- **FR-004**: The method MUST accept a `title` option to display as the modal header.
- **FR-005**: The method MUST accept a `message` option to display as the modal body content.
- **FR-006**: The method MUST accept an optional `confirmText` option to customize the confirm button label (default: "Confirm").
- **FR-007**: The method MUST accept an optional `cancelText` option to customize the cancel button label (default: "Cancel").
- **FR-008**: On user confirmation, the promise MUST resolve with a `NyxResult` where `isSuccess` is `true` (using `NyxSuccess`).
- **FR-009**: On user cancellation (cancel button, Escape key, or backdrop click), the promise MUST resolve with a `NyxResult` where `isSuccess` is `false` (using `NyxFail` or `NyxSuccess` with `undefined` value).
- **FR-010**: The confirmation button MUST use the theme color passed in the options.
- **FR-011**: The cancel button MUST use the outline variant (no theme).

### Key Entities *(include if feature involves data)*

- **ConfirmOptions**: The input configuration object containing theme, title, message, confirmText, and cancelText.
- **ConfirmResult**: A `NyxResult` type where `isSuccess` is `true` for user confirmation and `false` for cancellation. Uses the `NyxResult` class from `src/classes/NyxResult.ts`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can call `await Nyx.confirm(options)` and receive a result within 100ms of user interaction.
- **SC-002**: 100% of theme options (Primary, Secondary, Success, Warning, Danger, Info) render correctly on the confirm button.
- **SC-003**: All three dismissal methods (cancel button, Escape key, backdrop click) result in a `NyxResult` with `isSuccess: false`.
- **SC-004**: The implementation reuses the existing NyxModal component without duplicating its functionality.

---

*Assumptions: The Nyx plugin is already registered in the consumer's Vue app. The NyxModal component is already available in the library. No toast functionality is needed for this spec - it's explicitly out of scope for now.*