# Data Model: NyxColourMode

---

## Entities

### `NyxColourMode` (enum)

```ts
enum NyxColourMode {
  Dark     = 'dark',
  Light    = 'light',
  Adaptive = 'adaptive',
}
```

| Value | CSS attribute value | Description |
|-------|-------------------|-------------|
| `Dark` | `data-nyx-mode="dark"` | Always dark. Default. |
| `Light` | `data-nyx-mode="light"` | Always light. |
| `Adaptive` | resolved to `dark` or `light` at runtime | Switches on local clock. |

`Adaptive` is never written to the DOM directly — it is resolved to `dark` or `light` before the attribute is applied.

---

### `NyxColourModeOptions` (new)

Groups the three colour-mode settings so each configurable domain stays isolated within `NyxKitOptions`.

```ts
interface NyxColourModeOptions {
  mode?: NyxColourMode          // default: NyxColourMode.Dark
  adaptiveDayStart?: number     // 0–23, default 6
  adaptiveDayEnd?: number       // 0–23, default 20
}
```

### `NyxKitOptions` (extended)

```ts
interface NyxKitOptions {
  pixel?: boolean
  colourMode?: NyxColourModeOptions
  defaults?: Partial<Record<NyxKitPrimitive, NyxKitDefaults>>
}
```

---

### Composable State (`useNyxColourMode`)

| Field | Type | Description |
|-------|------|-------------|
| `setting` | `Ref<NyxColourMode>` | The configured mode (may be `Adaptive`) |
| `mode` | `ComputedRef<NyxColourMode.Dark \| NyxColourMode.Light>` | Resolved mode — never `Adaptive` |
| `isDark` | `ComputedRef<boolean>` | `mode === Dark` |
| `isLight` | `ComputedRef<boolean>` | `mode === Light` |
| `setMode` | `(m: NyxColourMode) => void` | Override setting, reapply attribute |

---

## State Transitions

```
install(colourMode: Dark)   → setting = Dark,     mode = Dark,  DOM: data-nyx-mode="dark"
install(colourMode: Light)  → setting = Light,    mode = Light, DOM: data-nyx-mode="light"
install(colourMode: Adaptive)
  + hour in [dayStart, dayEnd) → setting = Adaptive, mode = Light, DOM: data-nyx-mode="light"
  + hour outside             → setting = Adaptive, mode = Dark,  DOM: data-nyx-mode="dark"
  + clock ticks past boundary → mode flips, DOM attribute updated

setMode(Light) at runtime   → setting = Light, mode = Light, DOM: data-nyx-mode="light"
                               (stops adaptive clock watcher if running)
setMode(Adaptive) at runtime → starts clock watcher, evaluates immediately
```

---

## CSS Token Override Map (Light mode)

Applied under `html[data-nyx-mode="light"]`:

| Token | Light value |
|-------|-------------|
| `--nyx-c-bg` | `var(--nyx-c-white)` |
| `--nyx-c-bg-soft` | `var(--nyx-c-white-soft)` |
| `--nyx-c-bg-mute` | `var(--nyx-c-white-mute)` |
| `--nyx-c-divider` | `var(--nyx-c-divider-light-1)` |
| `--nyx-c-divider-light` | `var(--nyx-c-divider-light-2)` |
| `--nyx-c-divider-inverse` | `var(--nyx-c-divider-dark-1)` |
| `--nyx-c-divider-inverse-light` | `var(--nyx-c-divider-dark-2)` |
| `--nyx-c-text-1` | `var(--nyx-c-text-light-1)` |
| `--nyx-c-text-2` | `var(--nyx-c-text-light-2)` |
| `--nyx-c-text-3` | `var(--nyx-c-text-light-3)` |
| `--nyx-c-text-4` | `var(--nyx-c-text-light-4)` |
| `--nyx-c-text-inverse-1` | `var(--nyx-c-text-dark-1)` |
| `--nyx-c-text-inverse-2` | `var(--nyx-c-text-dark-2)` |
| `--nyx-c-text-inverse-3` | `var(--nyx-c-text-dark-3)` |
| `--nyx-c-text-inverse-4` | `var(--nyx-c-text-dark-4)` |

Shadow and accent (theme) tokens are **not** overridden — they render identically in both modes.

---

## Files Created / Modified

| File | Change |
|------|--------|
| `src/types/colour-mode.ts` | New — `NyxColourMode` enum |
| `src/types/index.ts` | Add `export * from './colour-mode'` |
| `src/types/plugin.ts` | Add `NyxColourModeOptions` type; nest as `colourMode?: NyxColourModeOptions` in `NyxKitOptions` |
| `src/composables/useNyxColourMode.ts` | New composable + `initColourMode` plugin hook |
| `src/composables/index.ts` | Export `useNyxColourMode` |
| `src/main.ts` | Call `initColourMode(options)` in `install`; export `NyxColourModeOptions` |
| `src/styles/variables.css` | Add `html[data-nyx-mode="light"]` block (14 tokens) |
| `src/styles/base.css` | Add `svg { fill: currentColor }` |
| `eslint/index.mjs` | New — shareable flat ESLint config |
| `package.json` | Add `./eslint` export, `"eslint"` to files, optional peer deps |
| `docs/architecture/design-system.md` | Update Colour Mode section |
| `docs/specs/theming/NyxColourMode.spec.md` | New living spec |
