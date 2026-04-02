# Feature Specification: NyxSelect External Model Sync

**Feature Branch**: `011-fix-select-model-sync`  
**Created**: 2026-04-02  
**Status**: Draft  
**Input**: User description: "NyxSelect: when the modelValue changes from outside, the selected option and the value shown should update as well, this is not the case right now"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reflect external selection changes immediately (Priority: P1)

As a consumer using `NyxSelect` with external state, I want the displayed value and selected option state to update when the bound value changes outside the component so that the control always reflects the real application state.

**Why this priority**: External `v-model` synchronization is a core contract for form controls. When it fails, the component shows stale information and becomes unreliable.

**Independent Test**: Mount `NyxSelect` with a bound value, then update the bound value from outside the component and verify the visible label and selected option state both change to match.

**Acceptance Scenarios**:

1. **Given** a single-select control with an initial external value, **When** the external value changes to another valid option, **Then** the displayed text updates to the new option label.
2. **Given** a single-select control with an initial external value, **When** the dropdown is opened after the external value changes, **Then** only the newly selected option is marked as selected.
3. **Given** a single-select control with no internal user interaction after mount, **When** the external value changes, **Then** the control still reflects the new value without requiring the user to reopen or blur the field.

---

### User Story 2 - Reflect external multi-select changes consistently (Priority: P2)

As a consumer using `NyxSelect` in multi-select mode, I want externally controlled value arrays to update both the shown labels and selected option states so that parent-driven changes remain trustworthy in batch-edit and reset flows.

**Why this priority**: Multi-select mode depends on the same reactive contract, and stale labels or option states are especially confusing when several values change at once.

**Independent Test**: Mount `NyxSelect` in multi-select mode, replace the bound array from outside the component, and verify the shown labels and selected option markers match the new array.

**Acceptance Scenarios**:

1. **Given** a multi-select control with an initial external value array, **When** the external array changes to a different set of valid options, **Then** the displayed labels update to match the new set.
2. **Given** a multi-select control with the dropdown open, **When** the external array changes, **Then** the selected states in the option list update to match the new set.

---

### User Story 3 - Preserve search and empty-state behavior during sync (Priority: P3)

As a consumer, I want external value synchronization to work without breaking search, placeholder, or empty-state behavior so that the fix does not introduce regressions in everyday select usage.

**Why this priority**: This change touches how the component derives its visible text, so it must not degrade nearby behaviors that depend on the same display value.

**Independent Test**: Change the external value while the control is closed, open, and filtered, and verify the component still shows the correct selection while preserving its existing search and placeholder rules.

**Acceptance Scenarios**:

1. **Given** a control with a placeholder and no selected value, **When** the external value is cleared, **Then** the displayed text returns to the unselected state.
2. **Given** a control with an active search interaction, **When** the dropdown closes after an external value change, **Then** the closed control shows the current externally selected label set rather than stale text.

### Edge Cases

- When the external value changes to an option that is not present in the current option list, the control must not continue showing the previous selected label.
- When the external value is cleared from outside the component, previously selected options must no longer appear selected.
- When grouped options are used, external value changes must update selection state across groups exactly the same as in flat option lists.
- When the external value changes while the dropdown is open, the list and the closed control must stay in sync rather than diverging.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST update the visible selected label in single-select mode when the bound value changes from outside the component.
- **FR-002**: The system MUST update the visible selected labels in multi-select mode when the bound value array changes from outside the component.
- **FR-003**: The system MUST update the selected option state in the dropdown when the bound value changes from outside the component.
- **FR-004**: The system MUST update the selected option states in the dropdown when the bound value array changes from outside the component in multi-select mode.
- **FR-005**: The system MUST clear stale displayed labels when the externally bound value no longer matches an available option.
- **FR-006**: The system MUST return to the unselected display state when the externally bound value is cleared.
- **FR-007**: The system MUST preserve the same external synchronization behavior for both flat and grouped option lists.
- **FR-008**: The system MUST preserve existing placeholder, search reset, and empty-state behavior while fixing external value synchronization.

### Key Entities *(include if feature involves data)*

- **Select Value**: The externally controlled bound value for the component, represented as a single option value or a list of option values depending on mode.
- **Select Option**: An available selectable item with a visible label and stored value used for display and selection matching.
- **Displayed Selection**: The text shown in the closed control and the selected markers shown in the dropdown, derived from the current bound value and available options.

### Assumptions

- `NyxSelect` continues to support both single-select and multi-select modes through the existing component contract.
- External value changes may come from parent state updates, form resets, or other application events rather than direct user interaction inside the component.
- The fix is intended to preserve current search and dropdown behavior unless required to keep the displayed value in sync with the external state.
- Invalid externally supplied values should not keep showing the last valid selection.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, 100% of externally triggered single-value changes are reflected in the displayed selected label without additional user interaction.
- **SC-002**: In acceptance testing, 100% of externally triggered multi-value changes are reflected in both the displayed label set and the selected option markers.
- **SC-003**: In acceptance testing across flat and grouped options, 0 stale selections remain visible after the externally bound value is changed or cleared.
- **SC-004**: Existing placeholder and search-related behavior continues to work in all updated acceptance scenarios for this feature.
