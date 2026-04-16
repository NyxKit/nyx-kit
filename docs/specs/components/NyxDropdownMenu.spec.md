# NyxDropdownMenu

> The default option-rendering panel used by NyxDropdown.

## Purpose and scope

NyxDropdownMenu renders a list of selectable items from a simple option array. It is useful both as the default dropdown panel and as a standalone building block for custom dropdown content.

**Use when:**
- You want the standard dropdown menu generated from options
- You want to assemble a custom dropdown panel but still reuse the library’s menu item presentation

**Do not use when:**
- You need a custom panel that does not resemble a menu

## Internal architecture

- Renders one `NyxDropdownItem` per provided option.
- Preserves option order and disabled state.
- Forwards item activation as a menu-level selection event.
- Passes through optional option icons so items can show a visual marker next to the label.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `NyxTheme` | inherited from library defaults | Visual theme for the menu |
| `size` | `NyxSize` | inherited from library defaults | Size token for the menu |
| `variant` | `NyxVariant` | inherited from library defaults | Visual variant for the menu |
| `options` | `NyxSelectOption[]` | `[]` | Options rendered as menu items; each option may include an optional icon |

## Emits

| Event | Payload | When |
|---|---|---|
| `select` | `NyxSelectOption` | A rendered item is activated |

## Slots

None.

## Keyboard behaviour

- Menu items rely on standard interactive element keyboard semantics.
- Arrow-key navigation is handled at the dropdown wrapper level when used inside `NyxDropdown`.

## Accessibility

- Disabled options remain exposed but are not interactive.
- The rendered menu should be announced as a grouped list of choices when used inside the dropdown panel.

## Known limitations

- The menu is intentionally option-driven; it does not support grouped data or async loading in v1.
