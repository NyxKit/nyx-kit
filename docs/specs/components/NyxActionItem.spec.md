# NyxActionItem

> A card-like display component that presents a title, description (via default slot), and an action button in a two-column layout.

## Purpose and scope

NyxActionItem is a display component used to present a titled action item with a description and a thematic action button. It is commonly used in action lists, settings panels, and task queues where users need to see contextual information alongside a primary action.

The component is NOT a form input or interactive control beyond its action button. It does not manage state, accept model bindings, or handle complex interactions.

## Internal architecture

The component uses CSS Grid for the two-column layout:
- Left column (`nyx-action-item__left`): Contains the title (top) and description via default slot (bottom)
- Right column (`nyx-action-item__right`): Contains either the action slot content or a default NyxButton

Theming is handled via `useNyxProps` which resolves the `theme` prop and produces a `classList` that includes theme-specific classes (e.g., `theme-primary`, `theme-secondary`). The component's SCSS uses these classes to set the border colour to a blend of the theme colour with the muted background.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Title text rendered at the top-left position |
| `theme` | `NyxTheme` | Resolved by `useNyxProps` (default: `Primary`) | Colour theme applied to the border and internal button |
| `action` | `string` | `''` | Label for the default action button. If empty, no button is rendered |

## Emits

| Event | Payload | When |
|-------|---------|------|
| `click` | — | User clicks the internal NyxButton |

## Slots

| Slot | Scope | Purpose |
|------|-------|---------|
| `default` | — | Description content, rendered at the bottom-left position |
| `action` | — | Custom action content, replaces the default NyxButton in the right-center position |

## v-model

NyxActionItem does not use v-model.

## Keyboard behaviour

No keyboard handling is implemented — the component relies on standard button focus semantics.

## Accessibility

- The title uses a `<div>` with no semantic role — consumers may wrap with heading tags if needed
- The internal NyxButton is a semantic `<button>` element with proper focus and aria support
- The component does not provide additional ARIA attributes beyond what NyxButton supplies

## Known limitations

- Empty `title` renders an empty area without a placeholder
- Long `title` text truncates with ellipsis — no wrapping
- The `action` slot takes precedence over the `action` prop — both cannot be used simultaneously
- The component does not support disabled states for the action button (pass through to NyxButton not implemented)