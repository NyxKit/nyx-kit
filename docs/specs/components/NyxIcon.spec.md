# NyxIcon

> A wrapper component for Lucide Vue icons with support for name-based rendering, variant switching (line/filled), optional theme coloring, and size control.

## Purpose and scope

NyxIcon provides a unified interface for rendering Lucide icons by their kebab-case name strings. It abstracts away direct Lucide imports and provides consistent theming and sizing across the library.

**Use when:**
- You need to render an icon from the Lucide icon set
- You want consistent sizing using NyxSize tokens
- You want theme-aware coloring using NyxTheme

**Do not use when:**
- You need icons not available in Lucide
- You need custom icon components (use Lucide directly)

## Internal architecture

- Uses dynamic component resolution via `resolvedIcon` computed property
- Converts kebab-case icon names to PascalCase for Lucide lookup
- Applies `Filled` suffix for filled variant icons
- Falls back gracefully when icon name is not found
- Applies CSS custom property colors via `iconStyles` computed

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Icon name in kebab-case (e.g., "chevron-right") |
| `variant` | `NyxIconVariant` | `'line'` | Icon style variant (line/filled) |
| `theme` | `NyxTheme` | — | Theme color for icon fill/stroke |
| `size` | `NyxSize` | — | Size token (xs, sm, md, lg, xl) |
| `customSize` | `number` | — | Custom pixel size override |

## Emits

None.

## Slots

None.

## v-model

Not applicable — NyxIcon is not a form component.

## Keyboard behaviour

None — NyxIcon renders a static icon.

## Accessibility

- Does not add ARIA attributes (consumer must provide if icon is interactive)
- Passes through `aria-hidden="true"` if provided via attrs

## Known limitations

- Only supports Lucide icons; non-Lucide names render nothing
- Variant "filled" requires the icon to have a Filled variant in Lucide
- Does not support icon rotation, flip, or animation (use Lucide directly)