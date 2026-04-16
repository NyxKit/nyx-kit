# NyxDropdown

> A trigger-driven dropdown wrapper with an optional custom panel slot and a default option-based menu.

## Purpose and scope

NyxDropdown provides a compact way to pair any trigger content with a floating panel. It is intended for action menus, compact command lists, and other small contextual popovers.

**Use when:**
- You need a custom trigger that opens a floating menu or panel
- You want a default option-driven menu without building item markup yourself
- You need to replace the default menu with custom content while keeping the same trigger wrapper

**Do not use when:**
- The content should always stay visible without a trigger
- You need a full-page navigation pattern rather than a contextual panel

## Internal architecture

- The default slot acts as the trigger region.
- The wrapper supports `hover` and `click` trigger modes, with click behavior used automatically on devices that do not support hover.
- The wrapper accepts an initial panel position and allows the teleport-position logic to mirror it when viewport space is tight.
- The dropdown content is teleported and positioned relative to the trigger with `useTeleportPosition`.
- When no `dropdown` slot is provided, the component renders `NyxDropdownMenu` using the provided options.
- The wrapper forwards its visual theme, size, and variant to the default menu so the panel matches the trigger styling.
- When a `dropdown` slot is provided, it replaces the default option-rendered panel.
- The panel is dismissed through outside interaction and keyboard escape handling.
- Menu options may include an optional icon that is shown alongside the label.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `NyxTheme` | inherited from library defaults | Visual theme applied to the trigger and default menu |
| `size` | `NyxSize` | inherited from library defaults | Size token applied to the trigger and default menu |
| `variant` | `NyxVariant` | inherited from library defaults | Visual variant applied to the trigger and default menu |
| `position` | `NyxPosition` | `bottom` | Preferred initial position for the floating panel |
| `trigger` | `NyxTrigger` | `click` | Interaction mode used to open the dropdown |
| `options` | `NyxSelectOption[]` | `[]` | Option list used by the default dropdown menu; options may include an optional icon |

## Emits

| Event | Payload | When |
|---|---|---|
| `select` | `NyxSelectOption` | A default menu item is chosen |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | — | Trigger content |
| `dropdown` | — | Optional custom dropdown panel |

## Keyboard behaviour

| Key | Behaviour |
|---|---|
| `Esc` | Closes the open panel |
| `Enter` / `Space` | Activates the trigger or the focused item |
| `ArrowDown` / `ArrowUp` | Moves through visible menu items when the default menu is open |

## Accessibility

- The trigger must remain a semantic interactive element or contain one.
- The floating panel must be discoverable by assistive technologies when opened.
- Disabled options remain visible but cannot be activated.

## Known limitations

- The component does not manage route navigation or command execution itself.
- Custom dropdown content is responsible for its own internal accessibility semantics.
