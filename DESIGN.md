# DESIGN.md — Nyx Kit Style Guide

Design tokens live in [`src/styles/variables.css`](src/styles/variables.css). This document is the human-readable reference for all design decisions. When tokens change, update this file in the same commit.

---

## Colour System

### Base Palette

Raw colour values. **Do not use these directly in components** — use the semantic theme tokens below instead.

#### Neutrals

| Token | Value |
|---|---|
| `--nyx-c-white` | `#f5f5f5` |
| `--nyx-c-white-pure` | `#ffffff` |
| `--nyx-c-white-soft` | `#f9f9f9` |
| `--nyx-c-white-mute` | `#f1f1f1` |
| `--nyx-c-black` | `#1a1a1a` |
| `--nyx-c-black-soft` | `#242424` |
| `--nyx-c-black-mute` | `#2f2f2f` |
| `--nyx-c-gray` | `#8E8E8E` |
| `--nyx-c-gray-light-1..5` | `#A4A4A4` → `#F5F5F5` |
| `--nyx-c-gray-dark-1..5` | `#636363` → `#202020` |

#### Brand Colours

| Name | Base | Light | Lighter | Dark | Darker | Darkest | RGB var |
|---|---|---|---|---|---|---|---|
| Purple | `#9F50F0` | `#B583FF` | `#D3A7FF` | `#8A2BE2` | `#6F1AB6` | `#4B0082` | `--nyx-rgb-purple` |
| Purplegray | `#71657A` | `#8A7E96` | `#A49AAE` | `#5D5466` | `#4B4453` | `#3A353F` | `--nyx-rgb-purplegray` |
| Teal | `#0F4C75` | `#3282B8` | `#84D7F1` | `#0A3046` | `#051E2D` | — | `--nyx-rgb-teal` |
| Green | `#1FAA59` | `#23CE6B` | `#5EE787` | `#137D4D` | `#0B4F32` | — | `--nyx-rgb-green` |
| Amber | `#E58E26` | `#F3A847` | `#FFC067` | `#B86519` | `#8C4C15` | — | `--nyx-rgb-amber` |
| Red | `#D72638` | `#E63946` | `#F86C6B` | `#9B1C26` | `#73101A` | — | `--nyx-rgb-red` |
| Blue | `#3B82F6` | `#60A5FA` | `#93C5FD` | `#2563EB` | `#1E40AF` | — | `--nyx-rgb-blue` |

RGB vars (`--nyx-rgb-*`) expose raw `r, g, b` triples for use in `rgba()` where opacity control is needed.

---

### Semantic Theme Tokens

**Dark-first by design.** The `:root` defaults resolve to dark-mode values. Light mode is an opt-in override.

#### Backgrounds

| Token | Dark default |
|---|---|
| `--nyx-c-bg` | `--nyx-c-black` |
| `--nyx-c-bg-soft` | `--nyx-c-black-soft` |
| `--nyx-c-bg-mute` | `--nyx-c-black-mute` |

#### Dividers

| Token | Dark default |
|---|---|
| `--nyx-c-divider` | `--nyx-c-divider-dark-1` (`rgba(84,84,84,0.65)`) |
| `--nyx-c-divider-light` | `--nyx-c-divider-dark-2` (`rgba(84,84,84,0.48)`) |
| `--nyx-c-divider-inverse` | `--nyx-c-divider-light-1` |
| `--nyx-c-divider-inverse-light` | `--nyx-c-divider-light-2` |

#### Text

| Token | Dark default |
|---|---|
| `--nyx-c-text-1` | `rgba(255,255,255,0.87)` |
| `--nyx-c-text-2` | `rgba(235,235,235,0.60)` |
| `--nyx-c-text-3` | `rgba(235,235,235,0.38)` |
| `--nyx-c-text-4` | `rgba(235,235,235,0.18)` |
| `--nyx-c-text-code` | `--nyx-c-indigo-lightest` |
| `--nyx-c-text-inverse-1..4` | Light counterparts of the above |

#### Semantic Colour Roles

Each role exposes five tokens: `base`, `-light`, `-dark`, `-highlight`, `-alt`, and an RGB companion.

| Role | Mapped to |
|---|---|
| `--nyx-c-default` | Purplegray |
| `--nyx-c-primary` | Purple |
| `--nyx-c-secondary` | Teal |
| `--nyx-c-info` | Default (Purplegray) |
| `--nyx-c-success` | Green |
| `--nyx-c-warning` | Amber |
| `--nyx-c-danger` | Red |

Example: `--nyx-c-primary` → `#9F50F0`, `--nyx-c-primary-light` → `#B583FF`, `--nyx-rgb-primary` → `159, 80, 240`.

---

### Colour Mode

**Dark mode** is the `:root` default — no override block required.

**Light mode** is activated by setting `data-nyx-mode="light"` on `<html>`:

```js
document.documentElement.setAttribute('data-nyx-mode', 'light')
```

Or use `useNyxColourMode()` from `nyx-kit`.

The light override block in `variables.css` re-maps backgrounds, dividers, and text tokens to their light counterparts. Brand/semantic role colours are unchanged between modes.

---

## Typography

### Font Families

| Token | Stack |
|---|---|
| `--nyx-font-family-base` | Nunito, Inter var, Inter, system-ui sans-serif stack |
| `--nyx-font-family-mono` | ui-monospace, SF Mono, Menlo, Consolas, monospace stack |
| `--nyx-font-family-pixel` | Press Start 2P, then `--nyx-font-family-mono` |

Nunito and Press Start 2P are loaded from Google Fonts (see `variables.css` line 12).

### Font Sizes

| Token | Value |
|---|---|
| `--nyx-font-size-xs` | `0.7rem` |
| `--nyx-font-size-sm` | `0.8rem` |
| `--nyx-font-size-md` | `0.9rem` |
| `--nyx-font-size-lg` | `1rem` |
| `--nyx-font-size-xl` | `1.1rem` |

---

## Spacing

### Gaps

Used for `gap`, `margin`, and `column-gap` between elements.

| Token | Value |
|---|---|
| `--nyx-gap-xs` | `0.1rem` |
| `--nyx-gap-sm` | `0.25rem` |
| `--nyx-gap-md` | `0.5rem` |
| `--nyx-gap-lg` | `0.75rem` |
| `--nyx-gap-xl` | `1rem` |

### Padding

Used for inner padding on interactive elements (buttons, inputs, etc.).

| Token | Value |
|---|---|
| `--nyx-pad-xs` | `0.7rem` |
| `--nyx-pad-sm` | `0.8rem` |
| `--nyx-pad-md` | `0.9rem` |
| `--nyx-pad-lg` | `1rem` |
| `--nyx-pad-xl` | `1.1rem` |

---

## Border Radius

| Token | Value |
|---|---|
| `--nyx-radius-xs` | `0.1rem` |
| `--nyx-radius-sm` | `0.25rem` |
| `--nyx-radius-md` | `0.5rem` |
| `--nyx-radius-lg` | `0.75rem` |
| `--nyx-radius-xl` | `1rem` |
| `--nyx-radius-max` | `100%` (pill / circle) |

---

## Shadows

| Token | Usage |
|---|---|
| `--nyx-shadow-xs` | Subtle lift, almost flat |
| `--nyx-shadow-sm` | Cards, dropdowns |
| `--nyx-shadow-md` | Modals, popovers |
| `--nyx-shadow-lg` | Large overlays |
| `--nyx-shadow-xl` | Highest elevation |

All shadows are composed of two layers: a wide, low-opacity diffuse shadow and a tight, slightly stronger ambient shadow.

---

## Animation

| Token | Value |
|---|---|
| `--nyx-speed-fastest` | `0.1s` |
| `--nyx-speed-fast` | `0.2s` |
| `--nyx-speed-regular` | `0.3s` |
| `--nyx-speed-slow` | `0.4s` |
| `--nyx-speed-slowest` | `0.5s` |

Use these for `transition-duration` and `animation-duration`. Always pair with an appropriate easing (prefer `ease-out` for entrances, `ease-in` for exits).

---

## Pixel Style

A retro pixel-art aesthetic available for opt-in use.

| Token | Purpose |
|---|---|
| `--nyx-pixel-size` | Base unit (`4px`) — all pixel-shadow offsets are multiples of this |
| `--nyx-pixel-c` | Fill colour (`--nyx-c-default-alt`) |
| `--nyx-pixel-c-alt` | Border colour (`--nyx-c-default`) |
| `--nyx-pixel-c-highlight` | Highlight colour (`--nyx-c-default-highlight`) |
| `--nyx-pixel-shadow` | Resting box-shadow (inner + outer border, no corners) |
| `--nyx-pixel-shadow-after` | Used on `::after` for layered fill effect |
| `--nyx-pixel-shadow-interact` | Hover/focus state — inverts highlight and alt roles |

The pixel shadow is a pure `box-shadow` composition — no borders, no `outline`. This keeps the pixel border scalable and composable.

---

## Backlight

| Token | Value |
|---|---|
| `--nyx-backlight-intensity` | `0.75` |
| `--nyx-backlight-size` | `1rem` |

Used by the backlight glow effect on interactive elements. Multiply `--nyx-backlight-intensity` against the component's colour for the glow `opacity` or `rgba` alpha.

---

## Component Token Pattern

Interactive components (buttons, inputs, tags, etc.) use a **local token layer** that sits between the global semantic tokens and the component's actual CSS properties. This indirection is what makes the theme × variant × size system work without combinatorial class explosion.

### How it works

A component declares its own scoped CSS variables at the root class level, initialised to the default (neutral) semantic colour:

```scss
.nyx-button {
  --nyx-c-button:           var(--nyx-c-default);
  --nyx-c-button-highlight: var(--nyx-c-default-highlight);
  --nyx-c-button-alt:       var(--nyx-c-default-alt);
  --nyx-rgb-button:         var(--nyx-rgb-default);
}
```

All CSS properties reference only these local vars — never the global tokens directly.

### Theme classes remap the local vars

A `theme-*` class changes *which colour* the component expresses, without touching any layout or visual treatment:

```scss
&.theme-primary {
  --nyx-c-button:           var(--nyx-c-primary);
  --nyx-c-button-highlight: var(--nyx-c-primary-highlight);
  --nyx-c-button-alt:       var(--nyx-c-primary-alt);
  --nyx-rgb-button:         var(--nyx-rgb-primary);
}
```

### Variant classes change the visual treatment

A `variant-*` class changes *how* that colour is applied — it never sets a literal colour value, only adjusts opacity, background, and border behaviour using the already-remapped local vars:

| Variant | Treatment |
|---|---|
| *(default/solid)* | Filled background with full colour |
| `variant-outline` | Transparent background; coloured border at 40% opacity; text uses `-alt`; hover fills with `-alt` |
| `variant-ghost` | No background, no border; text uses `-alt`; hover adds border at 40% opacity; active fills |
| `variant-soft` | Background at 12% opacity; no border; text uses `-alt`; hover raises to 24% |
| `variant-subtle` | Fully transparent at rest; background at 12% opacity on hover, 18% on active; no border |
| `variant-text` | No background or border; colour uses `-highlight`; animated underline on hover |

The opacity values (`0.12`, `0.24`, `0.4`) are applied via `rgba(var(--nyx-rgb-button), α)` — this is why every colour role exposes an RGB companion var.

### Gradient classes

`gradient-*` classes layer an animated diagonal gradient over the component using the `-alt` shade as the destination colour. The gradient slides on hover. They compose with `variant-outline` and `variant-ghost`.

### The three-layer stack

```text
Global semantic tokens   (--nyx-c-primary, --nyx-rgb-primary, …)
        ↓  remapped by theme-* class
Component local tokens   (--nyx-c-button, --nyx-rgb-button, …)
        ↓  consumed by variant-* class
Rendered CSS properties  (background-color, border-color, color, filter, …)
```

Theme and variant are fully orthogonal — any combination is valid. A new component follows the same pattern: define local vars, map them from global tokens, then write variants against local vars only.

---

## Token Usage Rules

1. **Never hard-code colours, spacing, or font sizes** in component styles. Always reference a token.
2. **Use semantic tokens** (`--nyx-c-primary`, `--nyx-c-text-1`) in components — not raw base tokens (`--nyx-c-purple`).
3. **Use base tokens** only in `variables.css` itself when defining semantic tokens, or in theming override blocks.
4. **RGB companion vars** (`--nyx-rgb-primary`) exist solely for `rgba(var(--nyx-rgb-primary), 0.2)` patterns — use them when you need opacity control over a semantic colour.
5. Changes to `src/styles/` affect every component. Flag any token changes to the user before proceeding.
