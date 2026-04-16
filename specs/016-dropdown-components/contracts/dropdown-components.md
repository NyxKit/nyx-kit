# Dropdown Component Contract

## NyxDropdown

### Purpose
Wraps any trigger content and shows a floating dropdown panel.

### Props
- `theme`: forwarded visual theme for the trigger and default menu
- `size`: forwarded size token for the trigger and default menu
- `variant`: forwarded visual variant for the trigger and default menu
- `options`: optional list used to render the default panel

### Slots
- `default`: trigger content
- `dropdown`: optional custom panel content

## NyxDropdownMenu

### Purpose
Renders the default option-based panel.

### Props
- `theme`: visual theme for the menu
- `size`: size token for the menu
- `variant`: visual variant for the menu
- `options`: option list used to render menu items

## NyxDropdownItem

### Purpose
Renders one option entry inside a dropdown menu.

### Props
- `option`: one option entry

### Option shape
- `label`: visible text
- `value`: stable selection value
- `disabled`: optional disabled state
