# NyxGrid

> A structural layout primitive for arranging arbitrary slotted content in either a standard grid or masonry-style layout, with optional header and footer regions.

## Purpose and scope

`NyxGrid` gives consumers a reusable shell for grouped content layouts such as dashboards, galleries, and card collections. It combines a semantic section wrapper, optional header and footer regions, token-driven item spacing, and switchable layout behavior.

**Use when:**
- You need a reusable content section with optional header and footer wrappers
- You want to lay out arbitrary child components in equal-width columns
- You need a masonry-style arrangement for variable-height content without introducing a separate layout component

**Do not use when:**
- You need full application-shell layout (`sidebar`, `main`, `aside`, split panes)
- You need item-level spanning, drag-and-drop, or virtualization
- You need a data-driven collection component with built-in filtering, sorting, or pagination

## Internal architecture

- `NyxGrid` renders a semantic root `<section>`
- Header resolution follows the standard slot-first rule: `header` slot first, then `title` fallback
- Footer is slot-only and omitted entirely when absent
- The default slot is normalized into internal item wrappers so the component can measure each top-level child and animate reflow
- A shared layout engine computes positions for both `grid` and `masonry` modes and applies masonry placement through CSS custom properties rather than broad inline style rules
- Reflow animation is transform-based and driven by item position deltas rather than external animation libraries

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Plain-text header fallback rendered only when no `header` slot is provided |
| `mode` | `NyxGridMode` | `NyxGridMode.Grid` | Chooses standard row/column placement or masonry compaction |
| `columns` | `number` | `3` | Positive integer column count used by both modes; invalid values fall back to `3` |
| `gap` | `NyxSize \| number` | `NyxSize.Medium` | Shared spacing between items; size tokens are scaled up by 1.5x and numeric values are treated as rem units, including `0` for no gap |

## Emits

None.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | — | Content items to lay out inside the content region |
| `header` | — | Custom header content; takes precedence over `title` |
| `footer` | — | Optional footer content rendered after the content region |

## Keyboard behaviour

No component-specific keyboard handling. `NyxGrid` preserves the native keyboard behavior of the slotted child content.

## Accessibility

- Root element is a semantic `<section>`
- Optional header and footer use semantic `<header>` and `<footer>` elements
- The component does not override the semantics of slotted children with list or grid ARIA roles
- Visual item movement must preserve DOM order so assistive technologies continue to read content in source order
- Motion should respect reduced-motion preferences by minimizing or disabling transform animation where appropriate

## CSS classes

| Class | Applied to | Notes |
|---|---|---|
| `.nyx-grid` | root `<section>` | |
| `.nyx-grid--grid` | root | Applied in standard grid mode |
| `.nyx-grid--masonry` | root | Applied in masonry mode |
| `.nyx-grid__header` | optional header wrapper | |
| `.nyx-grid__title` | fallback title element | |
| `.nyx-grid__content` | layout stage container | |
| `.nyx-grid__item` | internal wrapper per top-level child | Enables layout transforms |
| `.nyx-grid__footer` | optional footer wrapper | |

## Known limitations

- Responsive column presets are out of scope for v1; consumers pass a single column count
- Item spanning (`grid-column`, `grid-row`) is not supported in v1
- Virtualization is not supported
- Reorder animation quality depends on stable keys on top-level slot children
- Masonry mode preserves DOM order but may not match browser-native masonry implementations exactly
