# Design System

All design tokens are CSS custom properties defined in `src/styles/variables.css`. Components must never hard-code colours, spacing, font sizes, or animation speeds — always reference a token.

## Colour System

### Text
| Token | Purpose |
|---|---|
| `--nyx-c-text-1` | Primary body text |
| `--nyx-c-text-2` | Secondary / muted text |
| `--nyx-c-text-3` | Subtle / placeholder text |
| `--nyx-c-text-4` | Disabled text |
| `--nyx-c-text-inverse-1` – `4` | Text on dark/coloured backgrounds |

### Backgrounds
| Token | Purpose |
|---|---|
| `--nyx-c-bg` | Page / app background |
| `--nyx-c-bg-soft` | Slightly elevated surfaces (cards, inputs) |
| `--nyx-c-bg-mute` | Further elevated or disabled surfaces |

### Themes
Each theme colour has five variants:

| Suffix | Purpose |
|---|---|
| *(base)* | Default shade |
| `-light` | Hover / softer fill |
| `-dark` | Active / pressed state |
| `-highlight` | Accent or border glow |
| `-alt` | Text-on-theme or alternate use |

Themes: `primary`, `secondary`, `success`, `warning`, `danger`, `info`.

Example: `--nyx-c-primary`, `--nyx-c-primary-light`, `--nyx-c-primary-dark`, `--nyx-c-primary-highlight`, `--nyx-c-primary-alt`.

### Raw Palettes
Available for use when a semantic token does not exist: `--nyx-c-gray-{1-9}`, `--nyx-c-purple-{1-4}`, `--nyx-c-teal-{1-4}`, `--nyx-c-green-{1-4}`, `--nyx-c-amber-{1-4}`, `--nyx-c-red-{1-4}`, `--nyx-c-blue-{1-4}`.

## Typography

| Token | Value |
|---|---|
| `--nyx-font-family-base` | `'Nunito'`, sans-serif stack |
| `--nyx-font-family-mono` | monospace stack |
| `--nyx-font-family-pixel` | `'Press Start 2P'` |

Font size scale (maps to `NyxSize`):

| Token | Size |
|---|---|
| `--nyx-font-size-xs` | XSmall |
| `--nyx-font-size-sm` | Small |
| `--nyx-font-size-md` | Medium (default) |
| `--nyx-font-size-lg` | Large |
| `--nyx-font-size-xl` | XLarge |

## Spacing

Two parallel scales for gap (between elements) and padding (within elements):

| Token | Scale |
|---|---|
| `--nyx-gap-xs` … `--nyx-gap-xl` | Flex / grid gaps |
| `--nyx-pad-xs` … `--nyx-pad-xl` | Internal padding |
| `--nyx-radius-xs` … `--nyx-radius-xl` | Border radii |

## Effects

| Token | Purpose |
|---|---|
| `--nyx-shadow-xs` … `--nyx-shadow-xl` | Box shadows by elevation |
| `--nyx-speed-fastest` … `--nyx-speed-slowest` | Transition durations |

## Pixel Mode

A first-class alternative theme using `box-shadow` to simulate pixel borders. Activated globally via `NyxKitOptions.pixel` or per-component via the `pixel` prop.

| Token | Purpose |
|---|---|
| `--nyx-pixel-size` | Pixel block unit (`4px`) |
| `--nyx-pixel-c` | Pixel border colour |
| `--nyx-pixel-c-alt` | Alternate pixel colour |
| `--nyx-pixel-c-highlight` | Highlight pixel colour |

SCSS mixins in `src/styles/mixins.scss`:

| Mixin | Used by |
|---|---|
| `pixel-base` | All pixel-mode elements |
| `pixel-button` | NyxButton (adds scale/translate on `:active`) |
| `pixel-field` | NyxInput, NyxTextarea, NyxSelect |
| `pixel-modal` | NyxModal (`overflow: visible` for pixel border) |

Pixel mode is only valid with `variant: Solid`. Components should guard against applying pixel styles when a non-Solid variant is active.

## Flex Utilities

`src/styles/flex.css` provides minimal layout utility classes:

| Class | Behaviour |
|---|---|
| `[class^='flex']` | `display: flex; gap: 0.5rem` |
| `.flex` | + `align-items: center` |
| `.flex-col` | + `flex-direction: column` |
| `.gap-xl` | `gap: 2rem` |
| `.wrap` | `flex-wrap: wrap` |

These are intentionally minimal. Do not expand this file without discussion — component-scoped styles are preferred.

## Consumer-Defined Defaults

`NyxKitOptions.defaults` (set at plugin install time) lets a consuming project define the resolved values for `theme`, `size`, and `variant` when a component receives the `'default'` sentinel:

```ts
app.use(NyxKit, {
  defaults: {
    theme: 'primary',   // NyxTheme (excluding 'default')
    size: 'md',         // NyxSize (excluding 'default')
    variant: 'outline', // NyxVariant (excluding 'default')
  }
})
```

Resolution order (handled by `useNyxProps`):
1. Explicit prop value (anything except `'default'`) — used as-is
2. `NyxKitOptions.defaults.<prop>` — if set
3. Absolute library fallback: `NyxTheme.Primary`, `NyxSize.Medium`, `NyxVariant.Filled`

Components that do not use `useNyxProps` (e.g. `NyxSpinner`, `NyxSteps`, `NyxForm`) are not affected by this resolution chain.

## Theme Enum → CSS Class Mapping

Components apply a CSS class derived from `NyxTheme`:

| `NyxTheme` value | Class applied |
|---|---|
| `Default` | `nyx--theme-default` |
| `Primary` | `nyx--theme-primary` |
| `Secondary` | `nyx--theme-secondary` |
| `Success` | `nyx--theme-success` |
| `Warning` | `nyx--theme-warning` |
| `Danger` | `nyx--theme-danger` |
| `Info` | `nyx--theme-info` |

Component SCSS then scopes token overrides under these classes, e.g.:
```scss
.nyx--theme-primary {
  --nyx-c-component: var(--nyx-c-primary);
}
```
