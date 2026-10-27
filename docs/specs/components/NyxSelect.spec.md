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
- The teleport target is `body` by default, but switches to the nearest ancestor `<dialog>` when the select is rendered inside one so the dropdown stays above native modal chrome
- A hidden native `<select>` (`.sr-only`) stays in sync with `v-model` for accessibility and form submission
- `isGrouped` detects at runtime whether `options` is `NyxSelectOption<T>[]` or `NyxSelectOptionGroup<T>[]` by checking for an `options` key on the first element
- `flatOptions` flattens grouped options for value-to-label lookups (used in `selectedLabels` and `isSelected`)
- `filteredOptions` returns the same shape as the input (`NyxSelectOption<T>[]` or `NyxSelectOptionGroup<T>[]`), filtering by `searchQuery` and pruning empty groups
- Private `useSelectOptions` owns grouping, flattening, and label-based filtering to keep the SFC within 300 lines
- Both option loops render the optional typed `option` slot inside the component-owned option element; absent content falls back to `<span>{{ option.label }}</span>`
- Generic value type `T` defaults to `string`; keyboard focus uses `shallowRef<T | null>` so option values that are objects are not deep-unwrapped by Vue
- The externally bound `v-model` value remains the source of truth for both the closed-control text and the selected option state shown in the dropdown
- Group labels are rendered as non-interactive `<li class="nyx-select__group-label">` — they cannot be selected and have `pointer-events: none`
- `v-click-outside` directive closes the dropdown when clicking outside
- `useTeleportPosition` determines whether the dropdown opens below (`bottom`) or above (`top`) the control

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `NyxSelectOption<T>[] \| NyxSelectOptionGroup<T>[]` | — | Flat or grouped option list (same `T` as `v-model`) |
| `type` | `NyxSelectType` | `'single'` | Single vs multiple selection |
| `theme` | `NyxTheme` | Omitted | Inherits select/global defaults through `useNyxProps` |
| `variant` | `NyxVariant` | Omitted | Inherits select/global defaults through `useNyxProps` |
| `size` | `NyxSize` | Omitted | Inherits select/global defaults through `useNyxProps` |
| `disabled` | `boolean` | `false` | Disables the entire control |
| `placeholder` | `string` | — | Placeholder shown in the input when nothing is selected |
| `id` | `string` | — | Forwarded to the hidden `<select>` for label association |
## Emits

| Event | Payload | When |
|---|---|---|
| `update:modelValue` | `T \| T[]` | Selection changes (via `defineModel`) |
| `select` | `NyxSelectOption<T>` | An enabled option is activated by pointer or keyboard |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `option` | `{ option: NyxSelectOption<T> }` | Optional option content, used for both flat and grouped lists; defaults to `<span>{{ option.label }}</span>` |
| `empty` | — | Content shown in the dropdown when no options match the search query |

The slot receives the complete option with the same generic value type `T` as `options` and `v-model`. It customizes content only: NyxSelect owns the surrounding option, IDs, selection, disabled state, ARIA attributes, keyboard navigation, and focus. Use non-interactive slot content; nested buttons, links, or inputs are outside this contract.

Slot content can fill the option's available width. For a title/trailing-metadata row, the consumer can use a full-width flex wrapper, `min-width: 0` and ellipsis on the title, and `flex-shrink: 0` on the trailing content. NyxSelect contains no date formatting or layout logic specific to dates.

The closed control, hidden native options, and search always use `option.label`, regardless of slot content. The closed input grows to use all space between the control padding and the nonshrinking arrow, and shrinks within narrow containers; it truncates only when that available space is exhausted.

## v-model

Binds to `T` (single mode) or `T[]` (multiple mode), where `T` defaults to `string`. The value corresponds to `NyxSelectOption<T>.value`. When the model is unset in single mode, the component normalises to an internal empty placeholder compatible with the default `T` (`string` uses `''`).

When the bound value changes externally after mount, `NyxSelect` must immediately update:
- the text shown in the closed control
- the selected option state shown in the dropdown
- the unselected display state when the bound value is cleared

Selection is keyed by `option.value`, independent of order and label. Replacing or reordering options, moving options between groups, or editing a selected label must preserve the bound value without emitting a selection change. The closed control reflects the current label, including in-place reactive label edits. Updates while searching must preserve the query; closing restores the latest selected label.

## Storybook

`CustomOptionContent` and `CustomGroupedOptionContent` reuse the private `storybook/NyxSelectOptionContentDemo.vue` demo. It shows numeric values, a truncated title with a nonshrinking trailing date, a wide closed control, and consumer actions to reorder options or rename the selected option. Browser fixtures may explicitly reuse this demo.

## Types

```ts
interface NyxSelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
  icon?: string
}

interface NyxSelectOptionGroup<T = string> {
  label: string
  options: NyxSelectOption<T>[]
}
```

Options may be passed as a flat array (`NyxSelectOption<T>[]`) or a grouped array (`NyxSelectOptionGroup<T>[]`). Mixing flat options and groups in the same array is not supported.

List keys, `data-option-value`, and scroll syncing use `String(option.value)` so non-primitive values should stringify uniquely; object values are only as reliable as `String(obj)` (typically `[object Object]` unless you use primitives or custom `toString`).

## Keyboard behaviour

| Key | Behaviour |
|---|---|
| `Esc` | Closes the dropdown |
| `ArrowDown` | Opens dropdown (if closed) and moves focus to next enabled option |
| `ArrowUp` | Opens dropdown (if closed) and moves focus to previous enabled option |
| `Enter` | Selects the currently focused option |
| `Home` | Moves focus to the first enabled option |
| `End` | Moves focus to the last enabled option |
| Type in input | Filters visible options in real time |

Disabled options are skipped during arrow key navigation.
Pointer activation of a disabled option is ignored by the shared selection handler, including clicks on slot descendants.

## Accessibility

- A hidden native `<select>` (`.sr-only`) mirrors the selected value(s) and is associated with a `<label>` via the `id` prop
- The teleported dropdown has `role="listbox"`
- Group labels use `pointer-events: none` and are not focusable or selectable

## Known limitations

- Async option loading is not supported
- Mixing flat and grouped options in the same array is not supported and results in undefined behaviour
