# Research: NyxSelect External Model Sync

**Branch**: `011-fix-select-model-sync` | **Date**: 2026-04-02

## Decision 1: Treat the external model as the single source of truth

**Decision**: The displayed value and selected option state should always be derived from the current normalized bound value rather than from a separate internal selection cache.

**Rationale**: `NyxSelect` is a controlled form component. If a parent changes the bound value after mount, the component must reflect that change immediately and consistently everywhere it presents selection state.

**Alternatives considered**:
- Keep a second internal selected-value ref and try to synchronize it manually: rejected because it increases the chance of drift.
- Only refresh the visible text when the dropdown closes: rejected because the bug report explicitly calls out stale state after external changes.

## Decision 2: Update derived display state when the normalized model changes externally

**Decision**: Recalculate closed-control text and selected markers whenever the normalized model changes, regardless of whether the change came from inside or outside the component.

**Rationale**: The bug affects both the displayed text and the option list state. The fix must cover all derived surfaces tied to the bound value, not just one of them.

**Alternatives considered**:
- Recalculate only on mount or dropdown open: rejected because it leaves stale state between interactions.
- Force consumers to remount the component after parent-driven changes: rejected because that breaks the expected `v-model` contract.

## Decision 3: Verify all existing selection modes and option shapes

**Decision**: Add regression coverage for single-select, multi-select, flat options, grouped options, and cleared/invalid values.

**Rationale**: `NyxSelect` already supports multiple value modes and option shapes. A fix that only covers the originally reported single-value case risks leaving closely related regressions behind.

**Alternatives considered**:
- Test only the exact reported single-select case: rejected because the same derivation path is shared by other supported modes.
- Rely on manual story review alone: rejected because this is state-sync logic and needs automated regression coverage.

## Decision 4: Keep the fix local to NyxSelect

**Decision**: Implement the synchronization fix inside `NyxSelect` without changing shared composables or the broader component contract.

**Rationale**: The current bug is localized to one component’s state derivation. A focused fix lowers regression risk and follows the constitution’s minimal-diff requirement.

**Alternatives considered**:
- Refactor shared selection behavior into a new composable: rejected because it broadens scope without evidence of repeated need.
- Change the public API to add explicit refresh behavior: rejected because this should work under the existing contract.
