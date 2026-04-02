# Data Model: NyxSelect External Model Sync

**Branch**: `011-fix-select-model-sync` | **Date**: 2026-04-02

## Entities

### Select Value

The current bound value controlled by the parent.

**Fields**:
- `mode`: single or multiple
- `value`: one option value or a list of option values

**Validation rules**:
- single mode uses one option value
- multiple mode uses an ordered list of option values
- clearing the value must return the control to the unselected display state

### Select Option

One selectable option available in the control.

**Fields**:
- `label`: visible option text
- `value`: stored value used for matching
- `disabled`: optional disabled state

**Validation rules**:
- matching is based on option value
- disabled options may still exist in the data set but are not interactable

### Displayed Selection

The user-visible representation of the current selection.

**Fields**:
- `closedText`: text shown in the closed control
- `selectedMarkers`: selected state shown in the dropdown list

**Validation rules**:
- must always be derived from the current bound value and available options
- must clear stale labels when no current option match exists
- must stay consistent between the closed control and the open dropdown

### Option Collection

The set of options passed into the component, either flat or grouped.

**Fields**:
- `shape`: flat or grouped
- `options`: selectable options used for value lookup and filtering

**Validation rules**:
- grouped and flat modes must produce the same synchronization outcome for equivalent values
- invalid bound values must not preserve stale selection text regardless of option shape

## Relationships

| From | Relationship | To |
|------|--------------|----|
| `Select Value` | determines | `Displayed Selection` |
| `Select Option` | contributes to | `Displayed Selection` |
| `Option Collection` | contains many | `Select Option` |

## State Transitions

### External synchronization flow

```text
Parent updates bound value
-> normalized model changes
-> displayed selection is recalculated
-> closed-control text updates
-> dropdown selected markers update
```

## Edge Rules

| Case | Expected model behavior |
|------|-------------------------|
| External single-value change | Closed text and selected marker switch to the new option |
| External multi-value change | Closed text and selected markers switch to the new set |
| External value cleared | Closed text returns to unselected state and markers clear |
| External invalid value | No stale prior label remains visible |
| Grouped options | Synchronization behavior matches flat options |
