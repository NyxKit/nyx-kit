# Contract: NyxSelect External Model Synchronization

**Branch**: `011-fix-select-model-sync` | **Date**: 2026-04-02

## Purpose

Define the user-facing behavior of `NyxSelect` when its bound value changes from outside the component.

## Controlled Value Contract

1. `NyxSelect` remains controlled through `v-model`.
2. In single-select mode, the bound value identifies one selected option.
3. In multi-select mode, the bound value identifies zero or more selected options.
4. Parent-driven changes to the bound value must be reflected immediately in the component’s visible state.

## Display Contract

When the bound value changes externally, `NyxSelect` must update:
- the text shown in the closed control
- the selected state shown in the dropdown list
- the shown label set in multi-select mode without waiting for the dropdown to close

This behavior applies to:
- single-select mode
- multi-select mode
- flat option lists
- grouped option lists

## Reset Contract

1. Clearing the external value returns the control to the unselected display state.
2. Values that no longer match available options must not leave stale labels visible.
3. The same reset behavior applies whether the dropdown is currently open or closed.

## Compatibility Notes

- No public API changes are required for this fix.
- Existing placeholder, search, and empty-state behavior remains part of the contract.
