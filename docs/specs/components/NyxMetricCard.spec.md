# NyxMetricCard

> A display-only card component that presents a single key metric with a title, value, optional unit, optional suffix, and an optional icon. Supports themed colouring and five visual variants that control the presence and behaviour of a left-side indicator border.

## Purpose and scope

NyxMetricCard is used in dashboards and data-dense interfaces to surface a single metric at a glance. The card is intentionally minimal and read-only: it emits no events, holds no mutable internal state, and delegates all theming to `useNyxProps`.

**Use when:**
- You need to display a labelled numeric or textual measurement (e.g., "182 h", "64%", "12/12")
- You want consistent theming and variant behaviour across a grid of metric cards

**Do not use when:**
- The card needs to be interactive (clickable, togglable) — add a wrapper or use a different component
- You need to display a list of values rather than a single metric

## Internal architecture

- Theming is resolved via `useNyxProps`, which accepts `theme` and `variant` and produces a `classList`.
- The `variant` prop controls an `indicator` element (left-side border) via CSS classes and the `:hover` pseudo-class.
- When `variant === NyxVariant.Filled` the card receives a `variant-filled` modifier class; a CSS rule inside that class overrides `color` and `fill` for `.nyx-metric-card__suffix` and the nested `NyxIcon` to use `var(--nyx-text)` (or equivalent default colour variable).
- `NyxIcon` is rendered with the forwarded `theme` prop; the Filled override is purely CSS-based so no extra logic is needed in the template.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Metric label rendered in muted, uppercase style |
| `value` | `string` | Required | Primary metric value rendered large and bright |
| `unit` | `string` | `undefined` | Unit suffix appended to value in a smaller, muted style (e.g., `%`, `h`, `ms`) |
| `suffix` | `string` | `undefined` | Secondary text after value+unit, coloured with the resolved theme colour (e.g., `STABLE`) |
| `theme` | `NyxTheme` | Resolved by `useNyxProps` | Colour theme applied to the indicator, suffix, and icon |
| `icon` | `string` | `undefined` | Lucide icon name (kebab-case) rendered via `NyxIcon` with the resolved theme |
| `variant` | `NyxVariant` | `NyxVariant.Text` | Controls indicator border visibility and card fill. Supported values: `Text`, `Filled`, `Soft`, `Subtle`, `Ghost`, `Outline` |

## Emits

None — NyxMetricCard is a display-only component.

## Slots

None.

## v-model

Not applicable.

## Keyboard behaviour

None — the component is read-only with no interactive elements.

## Accessibility

- The component renders as a `<div>` with no implicit role; consumers should wrap in a `<section>` or provide `aria-label` if the card conveys standalone meaning.
- `title` and `value` are rendered as visible text; no ARIA labels are needed beyond what the visible copy provides.
- The internal `NyxIcon` should receive `aria-hidden="true"` since the icon is decorative.

## Variant reference

| Variant | Background | Indicator border | Icon/suffix colour |
|---------|-----------|-----------------|-------------------|
| `Text` (default) | Default card background | Never | Theme colour |
| `Soft` | Default card background | Always visible | Theme colour |
| `Subtle` | Default card background | Always visible | Theme colour |
| `Ghost` | Default card background | Visible on hover | Theme colour |
| `Outline` | Default card background | Visible on hover | Theme colour |
| `Filled` | Filled with theme colour | Never | Default text colour (`--nyx-text`) |

## Known limitations

- Icon size is fixed internally and is not configurable via a prop.
- The component does not support multiple values or a trend sparkline.
- `suffix` and `icon` cannot both be rendered simultaneously if a layout constraint exists — both are shown when provided, and consumers should choose one or the other for compact cards.
