# NyxTable

> Generic data table with projected columns, optional header rendering, and row-scoped slots that receive the full source item.

## Purpose and scope

`NyxTable` renders tabular data from an array of objects and lets consumers control which fields are visible.

Use it when you need:
- a lightweight data table with automatic column derivation
- explicit inclusion or exclusion of fields
- custom row rendering through the default slot
- optional per-row actions through the `actions` slot

Do not use it when:
- you need sorting, pagination, or selection state built in
- your data is not object-based
- you want a fully custom table layout from the first render

## Internal architecture

- Accepts a generic array model via `v-model`.
- Derives visible columns from `columnTitles`, `colInclude`, `colExclude`, or the first row's keys.
- Renders a semantic `<table>` with optional header row.
- Uses the original row object for row keys and slot scope, even when only a subset of fields is rendered by the fallback table body.
- Falls back to `NyxTableCell` cells when the default slot is not provided.
- Appends an optional actions column when the `actions` slot is present.
- Uses `useNyxProps` for shared visual class resolution.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `NyxTheme` | resolved by `useNyxProps` | Visual theme. |
| `size` | `NyxSize` | resolved by `useNyxProps` | Visual size scale. |
| `variant` | `NyxVariant` | resolved by `useNyxProps` | Visual variant. |
| `itemKey` | `keyof T` | — | Property used for the row key when available. |
| `disabled` | `boolean` | `false` | Disabled state styling. |
| `columns` | `number` | — | Explicit column count override. |
| `columnTitles` | `string[]` | — | Explicit column header labels. |
| `gridTemplateColumns` | `string` | — | Explicit CSS grid template override. |
| `header` | `boolean \| 'sticky'` | `true` | Controls header visibility and sticky header styling. |
| `striped` | `boolean` | `false` | Enables striped row styling. |
| `colInclude` | `(keyof T)[]` | `[]` | Limits rendered fields to the listed keys. |
| `colExclude` | `(keyof T)[]` | `[]` | Removes fields from the rendered columns. |

## v-model

`v-model` binds to the full row array: `T[]`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | `{ item: T }` | Replaces the rendered row cells while receiving the original row object. |
| `actions` | `{ item: T }` | Renders the trailing actions cell for each row. |

## Accessibility

- Uses semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, and `<th>` elements.
- Header rendering can be disabled when the table is used as a compact data list.
- Empty cells are only rendered by the fallback layout; custom row slots are responsible for their own markup.

## Known limitations

- The component does not provide sorting, pagination, filtering, or selection state.
- Column headers are still derived from the first row unless explicitly provided.
