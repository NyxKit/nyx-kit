# Data Model: NyxEditor Footer Info

**Branch**: `008-editor-footer-info` | **Date**: 2026-03-28

## Entities

### NyxEditorMeta

The complete footer state used by the default footer UI and exposed to the `footer` slot.

**Fields**:
- `segments`: ordered structural path segments from heading context to the current block
- `pathText`: display-ready footer text for the left side
- `wordCount`: total word count for the editable document
- `selection`: current caret/selection metadata relevant to footer updates

**Validation rules**:
- Must always be derivable from current editor state
- Must update when content changes or caret position changes
- Must remain available whether or not a custom footer slot is provided

### NyxEditorMetaPathSegment

One segment in the structural path shown in the footer.

**Fields**:
- `type`: segment category such as heading, paragraph, list, or list item
- `label`: human-readable text for display
- `index`: optional positional index when relevant
- `level`: optional heading depth when relevant

**Validation rules**:
- Segment order follows document hierarchy from outer context to active block
- List and paragraph segments include index data when the spec requires it

### NyxEditorMetaSelection

Selection metadata used to describe the current caret or selection state.

**Fields**:
- `from`: current selection start position
- `to`: current selection end position
- `empty`: whether the selection is collapsed to a caret

**Validation rules**:
- Must reflect the live editor selection
- Must support collapsed caret positions, not only non-empty selections

## Relationships

| From | Relationship | To |
|------|--------------|----|
| `NyxEditorMeta` | contains many | `NyxEditorMetaPathSegment` |
| `NyxEditorMeta` | contains one | `NyxEditorMetaSelection` |

## State Transitions

### Footer refresh flow

```text
Editor creates or updates
-> current selection/caret changes or content changes
-> footer info is recomputed from editor state
-> default footer and footer slot receive the updated footer info
```

## Edge Rules

| Case | Expected model behavior |
|------|-------------------------|
| Caret inside heading | Footer path reflects the heading as the active block |
| Caret inside paragraph below headings | Footer path includes heading context plus paragraph index |
| Caret inside list item | Footer path includes heading context, list type, and list item index |
| Empty document | Footer info still exists with empty or minimal path and zero word count |
| Custom footer slot | Receives the same `NyxEditorMeta` used by the default footer |
