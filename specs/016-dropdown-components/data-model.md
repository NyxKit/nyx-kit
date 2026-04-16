# Data Model: NyxDropdown Components

## Entities

### Dropdown
- Represents the public wrapper that binds trigger content to a floating panel.
- Fields:
  - `triggerContent`: user-provided default slot content
  - `dropdownContent`: custom dropdown slot content, if provided
  - `options`: optional list of menu options used by the default panel
  - `isOpen`: current open/closed state

### DropdownOption
- Represents one selectable entry in the default menu.
- Fields:
  - `label`: visible text
  - `value`: stable option value
  - `disabled`: optional flag that prevents selection

### DropdownMenu
- Represents the rendered menu panel shown when no custom dropdown content is supplied.
- Relationships:
  - Contains zero or more `DropdownOption` entries
  - Renders one `DropdownItem` per option

### DropdownItem
- Represents a single rendered option in the menu.
- Relationships:
  - Belongs to one `DropdownMenu`
  - Reflects a single `DropdownOption`

## Validation Rules

- The default menu only renders when custom dropdown content is absent.
- Options are rendered in the order provided.
- Disabled options remain visible but cannot be selected.
- Empty option lists produce an empty menu state rather than an error.

## State Transitions

- Closed -> Open when the trigger is activated.
- Open -> Closed when the trigger is activated again, an option is chosen, or the user dismisses the panel.
