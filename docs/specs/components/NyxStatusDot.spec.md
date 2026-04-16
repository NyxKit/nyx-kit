# NyxStatusDot

> A compact status indicator dot with theme, size, variant, glow, animation, and label support.

## Purpose and scope

Use `NyxStatusDot` when a UI needs a small, non-interactive visual status marker similar to the indicator used in `NodeCard`.
It is intentionally decorative and does not manage status state or labels.

## Internal architecture

`NyxStatusDot` renders a circular indicator plus an optional label.
It resolves shared visual props through `useNyxProps` and maps theme classes to colour tokens in `NyxStatusDot.scss`.
The component uses an optional backlight glow, and `NyxAnimationState.Playing` pulses that glow.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `NyxTheme` | `Success` | Colour theme for the dot |
| `size` | `NyxSize` | `XSmall` | Dot size scale |
| `variant` | `NyxVariant` | `Filled` | Visual treatment of the dot |
| `backlight` | `boolean` | `false` | Enables a glow around the dot |
| `animation` | `NyxAnimationState` | `Paused` | Controls whether the backlight pulses |
| `label` | `string` | `''` | Fallback label rendered by the default slot |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | — | Custom label content; falls back to `props.label` |

## Accessibility

The indicator itself is decorative and renders with `aria-hidden="true"`.
Consumers should provide label text if they need an accessible status label.

## Known limitations

- No built-in tooltip or semantic state mapping.
