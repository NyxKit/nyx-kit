# NyxDropdownItem

> A single selectable item rendered inside a dropdown menu.

## Purpose and scope

NyxDropdownItem renders one option as an interactive row in a dropdown menu. It is primarily used by NyxDropdownMenu, but it can also be used in custom panels that need the same item presentation.

**Use when:**
- You need one selectable entry inside a dropdown menu
- You want the same item style and activation behaviour as the default menu

**Do not use when:**
- The content is not selectable
- You need a more complex composite row with multiple nested controls

## Internal architecture

- Renders one option value as an interactive element.
- Reflects disabled state visually and functionally.
- Emits activation data to the parent menu or wrapper.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `option` | `NyxSelectOption` | Required | Option data for the item |

## Emits

| Event | Payload | When |
|---|---|---|
| `click` | `NyxSelectOption` | The item is activated |

## Slots

None.

## Keyboard behaviour

- `Enter` and `Space` activate the item when it has focus.
- Disabled items are skipped by normal keyboard activation.

## Accessibility

- Disabled items remain visible but are not focusable as active choices.
- The item should present a clear text label and state to assistive technologies.

## Known limitations

- The item is intentionally narrow in scope and does not support custom sub-controls inside the row.
