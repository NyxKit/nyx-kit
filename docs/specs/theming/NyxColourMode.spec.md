# NyxColourMode — Living Spec

**Layer**: theming
**Branch**: `004-colour-mode-system`
**Status**: implemented

---

## Summary

`NyxColourMode` is a three-value enum that controls the colour mode of the entire application. It is set globally at plugin install time and overridable at runtime via `useNyxColourMode()`. The active mode is surfaced as a `data-nyx-mode` attribute on `<html>`, which CSS uses to switch semantic colour tokens.

---

## Enum

```ts
enum NyxColourMode {
  Dark     = 'dark',     // default — always dark
  Light    = 'light',    // always light
  Adaptive = 'adaptive', // clock-driven: light during day, dark at night
}
```

Exported from `nyx-kit/types`.

---

## Plugin Options

Colour-mode settings live under a `colourMode` sub-object:

```ts
NyxKit.install(app, {
  colourMode: {
    mode: NyxColourMode.Adaptive,
    adaptiveDayStart: 7,   // optional, default 6
    adaptiveDayEnd: 21,    // optional, default 20
  }
})
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `colourMode.mode` | `NyxColourMode` | `Dark` | Initial mode |
| `colourMode.adaptiveDayStart` | `number` (0–23) | `6` | Hour at which Adaptive → Light |
| `colourMode.adaptiveDayEnd` | `number` (0–23) | `20` | Hour at which Adaptive → Dark |

`NyxColourModeOptions` is exported from `nyx-kit/types`.

---

## Composable: `useNyxColourMode()`

```ts
import { useNyxColourMode, NyxColourMode } from 'nyx-kit/composables'

const { mode, setting, isDark, isLight, setMode } = useNyxColourMode()

// Read resolved mode (always Dark or Light)
console.log(mode.value) // 'dark' | 'light'

// Override for this session
setMode(NyxColourMode.Light)

// Reset to adaptive
setMode(NyxColourMode.Adaptive)
```

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `setting` | `Readonly<Ref<NyxColourMode>>` | Configured setting (may be `Adaptive`) |
| `mode` | `ComputedRef<'dark' \| 'light'>` | Resolved mode — never `Adaptive` |
| `isDark` | `ComputedRef<boolean>` | Shorthand |
| `isLight` | `ComputedRef<boolean>` | Shorthand |
| `setMode` | `(m: NyxColourMode) => void` | Override; starts/stops adaptive watcher |

---

## CSS

The composable applies `document.documentElement.setAttribute('data-nyx-mode', resolvedMode)`.

Dark mode is the `:root` default — no override block required.

Light mode is activated by:

```css
html[data-nyx-mode="light"] {
  --nyx-c-bg:                    var(--nyx-c-white);
  --nyx-c-bg-soft:               var(--nyx-c-white-soft);
  --nyx-c-bg-mute:               var(--nyx-c-white-mute);
  --nyx-c-divider:               var(--nyx-c-divider-light-1);
  --nyx-c-divider-light:         var(--nyx-c-divider-light-2);
  --nyx-c-divider-inverse:       var(--nyx-c-divider-dark-1);
  --nyx-c-divider-inverse-light: var(--nyx-c-divider-dark-2);
  --nyx-c-text-1:                var(--nyx-c-text-light-1);
  --nyx-c-text-2:                var(--nyx-c-text-light-2);
  --nyx-c-text-3:                var(--nyx-c-text-light-3);
  --nyx-c-text-4:                var(--nyx-c-text-light-4);
  --nyx-c-text-inverse-1:        var(--nyx-c-text-dark-1);
  --nyx-c-text-inverse-2:        var(--nyx-c-text-dark-2);
  --nyx-c-text-inverse-3:        var(--nyx-c-text-dark-3);
  --nyx-c-text-inverse-4:        var(--nyx-c-text-dark-4);
}
```

Consumers may also set the attribute directly (e.g. from a server-rendered page) without using the composable.

---

## Adaptive Mode

- Resolved each time `setInterval` fires (once per minute, aligned to minute boundary)
- Day window check: `hour >= adaptiveDayStart && hour < adaptiveDayEnd`
- `adaptiveDayStart` and `adaptiveDayEnd` come from `inject('libEnv')` at composable mount time
- Watcher starts on `setMode(Adaptive)` or when initial setting is `Adaptive`
- Watcher stops when `setMode(Dark|Light)` is called
- Cleaned up via `onUnmounted`

---

## Constraints

- SSR-safe: `document` access only inside `onMounted` or behind `typeof document !== 'undefined'`
- No external runtime dependencies
- Non-breaking: dark-first default unchanged for consumers not opting in
- `NyxColourMode` ≠ `NyxTheme` — they are orthogonal systems
