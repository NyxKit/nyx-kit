# Quickstart: NyxSelect External Model Sync

**Branch**: `011-fix-select-model-sync` | **Date**: 2026-04-02

## Single-select external updates

Use `NyxSelect` in a parent-controlled setup where the selected value can change after mount.

```vue
<NyxSelect v-model="selectedTheme" :options="options" />
```

Expected behavior:
- when `selectedTheme` changes externally, the closed control updates to the matching option label
- opening the dropdown after that change shows the new option as selected
- the control also shows the correct selected label on initial render when the bound value is already set

## Multi-select external updates

Use `NyxSelect` with a parent-controlled value array.

```vue
<NyxSelect v-model="selectedThemes" :options="options" type="multiple" />
```

Expected behavior:
- when `selectedThemes` changes externally, the closed control updates its displayed labels
- opening the dropdown shows the updated selected option set

## Clearing the external value

Clear the bound value from the parent.

```vue
selectedTheme = ''
selectedThemes = []
```

Expected behavior:
- the control returns to its unselected display state
- previously selected options no longer appear selected
- invalid externally supplied values do not leave stale labels visible

## Validation scenarios

1. Mount `NyxSelect` with one selected value, update that value externally, and verify both the control text and selected option marker update.
2. Mount `NyxSelect` in multi-select mode, replace the external value array, and verify both the displayed labels and selected markers update.
3. Repeat the same checks with grouped options.
4. Clear the external value and verify the control does not keep showing stale labels.
