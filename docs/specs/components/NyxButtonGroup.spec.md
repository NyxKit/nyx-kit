# NyxButtonGroup

> A simple wrapper that visually joins adjacent `NyxButton` children into a horizontal or vertical group.

## Purpose and scope

`NyxButtonGroup` is a light structural component for presenting related buttons as one control cluster.

**Use when:**
- You want adjacent buttons to share borders and radii
- You need a compact horizontal or vertical action group

**Do not use when:**
- You need spacing between unrelated controls
- You need segmented selection state or button toggle logic

## Internal architecture

- Renders a single `<div>` root with the `nyx-button-group` class
- Applies direction and variant classes directly from props
- Relies on child `.nyx-button` elements for the visible joining effect
- Does not manage focus, selection, or active state itself

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `direction` | `NyxDirection` | `NyxDirection.Horizontal` | Chooses horizontal or vertical stacking |
| `gap` | `NyxSize \| number` | — | Declared in the public props type, but currently not consumed by the component |
| `variant` | `NyxVariant.Soft \| NyxVariant.Ghost` | `NyxVariant.Ghost` | Controls the group visual treatment |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | — | Button content, typically `NyxButton` children |

## Accessibility

- The component itself is non-interactive and uses a neutral `<div>` root
- Keyboard and focus behavior are delegated to the slotted buttons
- Consumers remain responsible for choosing meaningful button labels and disabled states

## Known limitations

- `gap` is present in the props type but not currently applied in the implementation
- The component does not provide toggle-group semantics or selection state
