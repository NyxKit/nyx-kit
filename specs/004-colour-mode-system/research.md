# Research: NyxColourMode Theming System

**Phase 0 output for branch `004-colour-mode-system`**

---

## Decision 1 — Enum name for the mode setting

**Decision**: `NyxColourMode` with values `Dark`, `Light`, `Adaptive`

**Rationale**:
- "Colour mode" is the standard term in modern OS and browser APIs (macOS "Appearance", Chrome DevTools "Colour scheme", CSS `color-scheme`)
- `NyxColourMode` is unambiguous and distinct from `NyxTheme` (accent/brand colours)
- `Adaptive` is preferred over `Mixed`, `Auto`, or `Circadian`:
  - `Mixed` implies two things happening at once (confusing)
  - `Auto` suggests `prefers-color-scheme` (system preference), which is NOT what this is
  - `Circadian` is accurate but too technical for a public API
  - `Adaptive` communicates "adjusts to context" without over-specifying the mechanism

**Alternatives considered**: `NyxAppearance` (Apple convention, unfamiliar outside Apple ecosystem), `NyxMode` (too generic), `NyxPalette` (wrong concept — palettes are colour sets, not modes)

---

## Decision 2 — CSS application mechanism

**Decision**: `data-nyx-mode` attribute on `<html>` (`document.documentElement`)

**Rationale**:
- Attribute on `<html>` is the modern standard (GitHub, Tailwind dark mode, Apple, Radix UI all use this pattern)
- Scoping to `<html>` means the override cascades to the entire document without specificity fights
- Using `data-nyx-mode` (not `class`) keeps the library's styling concerns namespaced and avoids collisions with consumer class-based utility frameworks (Tailwind, Bootstrap)
- `:root` stays unchanged — no dark-first regression for consumers who don't use the feature

**Alternatives considered**: CSS class on `<body>` (Tailwind dark mode — causes specificity conflicts), `color-scheme` media query only (not controllable at runtime), scoped per-component (impractical for global mode switching)

---

## Decision 3 — Adaptive mode time window

**Decision**: Default day window `06:00–20:00` (hours 6–19 inclusive). Configurable via `adaptiveDayStart` / `adaptiveDayEnd` in `NyxKitOptions`. Uses `new Date().getHours()` (local clock).

**Rationale**:
- 6am–8pm covers typical waking hours across most latitudes without being prescriptive
- Local clock (not UTC) is what the user experiences; system-preference (`prefers-color-scheme`) would shadow user intent
- Making the window configurable lets consumers match their use case (e.g. a night-owl dashboard might use 8am–11pm)

**Alternatives considered**: `prefers-color-scheme` as adaptive signal (defeats the purpose — Adaptive should be clock-driven, not OS-driven), fixed non-configurable window (too opinionated for a library)

---

## Decision 4 — Clock watcher implementation

**Decision**: `setInterval` aligned to the next full minute, cleaned up via `onUnmounted`. Fires once immediately on composable mount.

**Rationale**:
- Minute-level granularity is sufficient for mode switching; sub-minute polling wastes CPU
- Aligning to the next minute boundary means the switch happens at exactly :00 seconds, not arbitrarily mid-minute
- `onUnmounted` cleanup prevents interval leak when the composable is used in a component that is unmounted

**Alternatives considered**: `requestAnimationFrame` loop (vastly over-engineered for a once-per-minute concern), `visibilitychange` event only (misses the tab-left-open overnight case)

---

## Decision 5 — Reactive state ownership

**Decision**: A module-level `ref` (singleton pattern) shared across all `useNyxColourMode()` calls within the same app instance.

**Rationale**:
- Colour mode is app-global state — all consumers should see the same mode
- Module-level singleton avoids `provide/inject` overhead for a read-heavy value
- `inject('libEnv')` is used only for initial value resolution (at install time)

**Alternatives considered**: `provide/inject` for every composable call (correct but verbose and requires a Provider component), `localStorage`-based persistence (out of scope for v1 — consumers can layer this on top of `setMode`)

---

## Decision 6 — SSR safety

**Decision**: All `document.documentElement` access guarded with `typeof document !== 'undefined'` or inside `onMounted`.

**Rationale**: Nyx Kit targets SSR-capable Vue apps (Nuxt). The `install` hook runs on the server; `document` is not available there. The initial attribute must be applied client-side only.

**No NEEDS CLARIFICATION items remain.**
