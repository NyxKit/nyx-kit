# Implementation Plan: NyxColourMode — Out-of-the-Box Theming System

**Branch**: `004-colour-mode-system` | **Date**: 2026-03-23
**Spec**: `/specs/004-colour-mode-system/spec.md`

---

## Summary

Introduce a three-mode colour system (`Dark`, `Light`, `Adaptive`) controlled by a new `NyxColourMode` enum. The active mode is applied as `data-nyx-mode` on `<html>` and drives CSS token overrides. Configurable at plugin install time; overridable at runtime via a new `useNyxColourMode()` composable. Adaptive mode switches automatically between light and dark based on the local clock.

---

## Technical Context

**Language/Version**: TypeScript 5.x / Vue 3.5+
**Primary Dependencies**: Vue `inject`, `ref`, `computed`, `onUnmounted` (all already in use)
**Storage**: Module-level singleton `ref` (no persistence in v1)
**Testing**: Vitest + `@vue/test-utils`
**Target Platform**: Browser (SSR-safe)
**Project Type**: Published npm component library
**Performance Goals**: Mode switch ≤ one `setAttribute` call per minute for Adaptive
**Constraints**: SSR-safe; no new npm dependencies; non-breaking
**Scale/Scope**: Single new enum, one new composable, one CSS block, three existing file edits

---

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Docs first | PASS | spec.md and this plan precede all code |
| Non-breaking | PASS | dark-first default unchanged; new opt-in API only |
| No new dependencies | PASS | uses only Vue core APIs already imported |
| Surgical edits | PASS | two new files, five targeted edits |
| SSR-safe | PASS | all DOM access guarded |
| IV-b (dark-first) | PASS | `:root` untouched; light mode is an opt-in override |

---

## Project Structure

### Documentation (this feature)

```text
specs/004-colour-mode-system/
├── plan.md              ← this file
├── spec.md
├── research.md
├── data-model.md
├── contracts/
│   └── NyxColourMode.ts
└── tasks.md             (created by /speckit.tasks)

docs/specs/theming/
└── NyxColourMode.spec.md
```

### Source Code

```text
src/types/
├── colour-mode.ts        NEW — NyxColourMode enum
└── index.ts              EDIT — add export

src/types/plugin.ts       EDIT — add NyxColourModeOptions type; nest colourMode?: NyxColourModeOptions in NyxKitOptions

src/composables/
├── useNyxColourMode.ts   NEW
└── index.ts              EDIT — export useNyxColourMode

src/main.ts               EDIT — call applyColourMode(options) in install (SSR-guarded)

src/styles/
├── variables.css         EDIT — add html[data-nyx-mode="light"] block
└── base.css              EDIT — add svg { fill: currentColor }

eslint/
└── index.mjs             NEW — shareable flat ESLint config exported as nyx-kit/eslint

package.json              EDIT — add ./eslint export, "eslint" to files, optional peer deps

docs/architecture/
└── design-system.md      EDIT — update Colour Mode section to reference enum + composable
```

---

## Implementation Phases

### Phase A — Types (no risk, no dependencies)

1. Create `src/types/colour-mode.ts` with `NyxColourMode` enum
2. Export from `src/types/index.ts`
3. Extend `NyxKitOptions` in `src/types/plugin.ts`

### Phase B — CSS (no risk, pure additive)

4. Add `html[data-nyx-mode="light"]` block to `src/styles/variables.css`

### Phase C — Composable

5. Write `src/composables/useNyxColourMode.ts`:
   - Module-level `_setting = ref<NyxColourMode>(NyxColourMode.Dark)` singleton
   - Module-level `_intervalId: number | null = null`
   - `resolveMode(setting, dayStart, dayEnd)` pure function
   - `applyToDOM(resolvedMode)` — SSR-guarded `setAttribute`
   - `useNyxColourMode()` returns `{ setting, mode, isDark, isLight, setMode }`
   - `setMode` stops/starts adaptive watcher, calls `applyToDOM`
   - `onUnmounted` clears interval
6. Export from `src/composables/index.ts`

### Phase D — Plugin wiring

7. In `src/main.ts` `install`, read `options.colourMode.mode` and call the composable's `setMode` (client-side only)

### Phase E — Tests

8. `src/composables/useNyxColourMode.spec.ts`:
   - Dark default
   - Light mode applies correct attribute
   - Adaptive resolves to light during day window
   - Adaptive resolves to dark outside day window
   - `setMode` overrides libEnv setting
   - Interval is cleared on unmount

### Phase F — Docs update

9. Update `docs/architecture/design-system.md` Colour Mode section
10. `docs/specs/theming/NyxColourMode.spec.md` already written

### Phase G — ESLint exposure

11. Create `eslint/index.mjs` — shareable flat config (vue essential + ts recommended + oxlint shims)
12. Add `"./eslint"` to `package.json` exports and `"eslint"` to `"files"`
13. Declare `eslint`, `eslint-plugin-vue`, `@vue/eslint-config-typescript`, `eslint-plugin-oxlint` as optional peer dependencies
14. Document usage in `README.md`

---

## Key Implementation Notes

### Singleton pattern for `useNyxColourMode`

```ts
// module-level (outside the function)
const _setting = ref<NyxColourMode>(NyxColourMode.Dark)
let _dayStart = 6
let _dayEnd = 20
let _intervalId: ReturnType<typeof setInterval> | null = null
```

The singleton means all `useNyxColourMode()` calls share the same reactive state. The `libEnv` inject is read once on first call to initialise the singleton if it hasn't been set yet.

### Adaptive clock watcher

```ts
const startAdaptiveWatcher = () => {
  applyToDOM(resolveMode())
  const now = new Date()
  const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()
  setTimeout(() => {
    applyToDOM(resolveMode())
    _intervalId = setInterval(() => applyToDOM(resolveMode()), 60_000)
  }, msToNextMinute)
}
```

`setTimeout` to the next minute boundary, then `setInterval` at 60s. This ensures the switch happens at the exact minute boundary.

### Plugin install wiring

```ts
install: (app: App, options: NyxKitOptions = {}) => {
  app.directive('click-outside', vClickOutside)
  app.provide('libEnv', options)
  // Client-side only — apply initial colour mode
  if (typeof document !== 'undefined') {
    initColourMode(options)
  }
}
```

`initColourMode` reads `options.colourMode?.mode ?? NyxColourMode.Dark`, sets `_dayStart`/`_dayEnd` from `options.colourMode`, calls `setMode`.
