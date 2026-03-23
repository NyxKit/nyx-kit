# Feature Spec: NyxColourMode — Out-of-the-Box Theming System

**Branch**: `004-colour-mode-system`
**Date**: 2026-03-23
**Author**: via /speckit.specify

---

## Problem

Nyx Kit ships dark-first by design, but has no mechanism for consumers to opt into light mode or an adaptive mode that changes with the time of day. Consumers who need light mode must manually override a list of undocumented CSS tokens. There is no enum, no plugin option, no composable, and no reactive mechanism for switching modes at runtime.

---

## Goal

Introduce a first-class colour-mode system with three modes:

| Mode | Behaviour |
|------|-----------|
| `Dark` | Always dark (current default) |
| `Light` | Always light |
| `Adaptive` | Follows the local clock — light during the day, dark at night |

The mode must be:
1. Settable globally at plugin install time (`NyxKit.install(app, { colourMode: { mode: … } })`)
2. Reactively overridable per-session by the consuming project via a composable
3. Applied via a CSS `data-nyx-mode` attribute on `<html>` so all components respond automatically

---

## Enum

```ts
export enum NyxColourMode {
  Dark     = 'dark',
  Light    = 'light',
  Adaptive = 'adaptive',
}
```

`NyxColourMode` is distinct from `NyxTheme` (which maps to component accent colours like `primary`, `secondary`, `warning`).

---

## Plugin Options

Colour-mode settings are grouped under a `colourMode` sub-object so each configurable domain stays isolated within `NyxKitOptions`:

```ts
export type NyxColourModeOptions = {
  mode?: NyxColourMode          // default: NyxColourMode.Dark
  adaptiveDayStart?: number     // hour 0–23, default 6  (06:00)
  adaptiveDayEnd?: number       // hour 0–23, default 20 (20:00)
}

export type NyxKitOptions = {
  pixel?: boolean
  colourMode?: NyxColourModeOptions
  defaults?: Partial<Record<NyxKitPrimitive, NyxKitDefaults>>
}
```

Usage:

```ts
NyxKit.install(app, {
  colourMode: {
    mode: NyxColourMode.Adaptive,
    adaptiveDayStart: 7,
    adaptiveDayEnd: 21,
  }
})
```

On `install`, the plugin applies the initial `data-nyx-mode` attribute to `document.documentElement` (SSR-guarded) and, for `Adaptive`, starts a clock watcher.

---

## Composable: `useNyxColourMode()`

Public API:

```ts
const {
  mode,           // Ref<NyxColourMode> — current resolved mode (Dark or Light; never Adaptive)
  setting,        // Ref<NyxColourMode> — the configured setting (may be Adaptive)
  setMode,        // (mode: NyxColourMode) => void — override for this session
  isDark,         // ComputedRef<boolean>
  isLight,        // ComputedRef<boolean>
} = useNyxColourMode()
```

- `mode` is the **resolved** mode — always `Dark` or `Light`, never `Adaptive`
- `setting` is what was set (may be `Adaptive`)
- `setMode` updates the session setting, applies the attribute, and (for Adaptive) starts/stops the clock watcher
- Fully standalone — `NyxKit.install()` is **not required**. `inject('libEnv')` is used opportunistically if present; composable works with only its own defaults otherwise
- Applies `document.documentElement.setAttribute('data-nyx-mode', resolvedMode)` reactively

---

## CSS Contract

`variables.css` grows a `[data-nyx-mode="light"]` override block that re-maps the semantic tokens to light-palette values (14 tokens total — bg, divider, text, and their inverses). `base.css` receives `svg { fill: currentColor }` so SVG icons follow the active text colour automatically; any explicit `fill` on a child element still wins.

No changes to `:root` defaults — dark-first is preserved.

---

## Adaptive Mode Clock Logic

- Day window: `adaptiveDayStart` (default 6) ≤ hour < `adaptiveDayEnd` (default 20)
- Outside window → `Dark`; inside → `Light`
- If `adaptiveDayStart >= adaptiveDayEnd`, a `NyxLog.warn` is emitted and both values fall back to defaults (6, 20). Inverted windows are not supported.
- The watcher fires once immediately when `setMode(Adaptive)` is called, then on a `setInterval` aligned to the next full minute
- Cleaned up on composable unmount via `onUnmounted`

---

## Persistence

`setMode()` writes the chosen `NyxColourMode` value to `localStorage` under the key `nyx-colour-mode`. On composable initialisation the resolution order is:

1. `localStorage.getItem('nyx-colour-mode')` (user's last explicit choice)
2. `libEnv.colourMode.mode` (plugin install option)
3. `NyxColourMode.Dark` (absolute fallback)

The stored value is the raw enum string (`'dark'`, `'light'`, or `'adaptive'`). Invalid/unrecognised values are ignored and the next source in the chain is tried. `localStorage` access is SSR-guarded.

---

## Clarifications

### Session 2026-03-23

- Q: Should `setMode()` persist across page reloads? → A: Yes — persisted to `localStorage` automatically.
- Q: Can `useNyxColourMode()` be used without `NyxKit.install()`? → A: Yes — fully standalone; plugin is optional.
- Q: What happens when `adaptiveDayStart >= adaptiveDayEnd`? → A: Not supported — emit `NyxLog.warn` and fall back to defaults (6, 20).

---

## ESLint Config

Nyx Kit exposes its ESLint flat config so consuming projects can adopt the same rules without manual setup:

```ts
// eslint.config.ts in consuming project
import nyxConfig from 'nyx-kit/eslint'
export default [...nyxConfig, { /* project overrides */ }]
```

Includes: `eslint-plugin-vue` essential rules, `@vue/eslint-config-typescript` recommended rules, and `eslint-plugin-oxlint` compatibility shims. Test-framework rules (Vitest, Playwright) are excluded — consumers add those themselves. Requires `eslint`, `eslint-plugin-vue`, `@vue/eslint-config-typescript`, and `eslint-plugin-oxlint` as dev dependencies.

---

## Constraints

- SSR-safe: all `document` and `localStorage` access is guarded behind `typeof window !== 'undefined'`
- No external dependencies
- No breaking changes to existing consumers (dark-first default unchanged)
- `NyxColourMode` and `NyxColourModeOptions` exported from `nyx-kit/types`
- `useNyxColourMode` exported from `nyx-kit/composables`
- Shared ESLint flat config exported from `nyx-kit/eslint`
