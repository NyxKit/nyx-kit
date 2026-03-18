# NyxSelect

> A searchable, single or multi-select dropdown with optional option grouping, teleported to `<body>` for correct stacking context.

## Purpose and scope

NyxSelect is a custom select control that replaces the native `<select>` element with a searchable, styled dropdown. It supports both flat option lists and grouped option lists via `NyxSelectOptionGroup`.

**Use when:**
- You need a styled, searchable replacement for `<select>`
- You need single or multiple selection with live filtering
- You need options organised into named groups (e.g. Brand / Status)

**Do not use when:**
- A native `<select>` suffices and styling is not required
- Options are loaded asynchronously (not yet supported)

## Internal architecture

- Custom control div + teleported dropdown; position managed by `useTeleportPosition`
- A hidden native `<select>` (`.sr-only`) stays in sync with `v-model` for accessibility and form submission
- `isGrouped` detects at runtime whether `options` is `NyxSelectOption[]` or `NyxSelectOptionGroup[]` by checking for an `options` key on the first element
- `flatOptions` flattens grouped options for value-to-label lookups (used in `selectedLabels` and `isSelected`)
- `filteredOptions` returns the same shape as the input (`NyxSelectOption[]` or `NyxSelectOptionGroup[]`), filtering by `searchQuery` and pruning empty groups
- Group labels are rendered as non-interactive `<li class="nyx-select__group-label">` — they cannot be selected and have `pointer-events: none`
- `v-click-outside` directive closes the dropdown when clicking outside
- `useTeleportPosition` determines whether the dropdown opens below (`bottom`) or above (`top`) the control

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `NyxSelectOption[] \| NyxSelectOptionGroup[]` | — | Flat or grouped option list |
| `type` | `NyxSelectType` | `'single'` | Reserved for future single/multiple type distinction |
| `theme` | `NyxTheme` | `'default'` | Colour theme |
| `variant` | `NyxVariant` | `'outline'` | Visual variant (outline, ghost, text) |
| `size` | `NyxSize` | `'md'` | Size token |
| `disabled` | `boolean` | `false` | Disables the entire control |
| `placeholder` | `string` | — | Placeholder shown in the input when nothing is selected |
| `id` | `string` | — | Forwarded to the hidden `<select>` for label association |
| `multiple` | `boolean` | `false` | Enables multi-select mode |

## Emits

None — selection is communicated exclusively through `v-model`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `empty` | — | Content shown in the dropdown when no options match the search query |

## v-model

Binds to `string` (single mode) or `string[]` (multiple mode). The value corresponds to `NyxSelectOption.value`.

## Types

```ts
interface NyxSelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface NyxSelectOptionGroup {
  label: string
  options: NyxSelectOption[]
}
```

Options may be passed as a flat array (`NyxSelectOption[]`) or a grouped array (`NyxSelectOptionGroup[]`). Mixing flat options and groups in the same array is not supported.

## Keyboard behaviour

| Key | Behaviour |
|---|---|
| `Esc` | Closes the dropdown |
| Type in input | Filters visible options in real time |

## Accessibility

- A hidden native `<select>` (`.sr-only`) mirrors the selected value(s) and is associated with a `<label>` via the `id` prop
- The teleported dropdown has `role="listbox"`
- Group labels use `pointer-events: none` and are not focusable or selectable

## Known limitations

- Keyboard navigation (arrow keys, Enter to select) is not yet implemented
- Async option loading is not supported
- Mixing flat and grouped options in the same array is not supported and results in undefined behaviour
