# NyxCommandPalette validation

Validated on 2026-10-08 for the `2.3.0` minor release. Commands use the repository's configured pnpm package manager. No dependency was added; npm publication is outside this change.

| Check | Result |
|---|---|
| `pnpm type-check` | Passed, including generic stories and component tests |
| `pnpm exec eslint src/components/NyxCommandPalette --no-fix` | Passed |
| `pnpm exec vitest run` | 542 passed; one existing `NyxStatusDot` default-size assertion failed |
| Command palette unit coverage | 24 passed: validation, ranking, models, original payloads, slots, loading/disabled, IME, dynamic data, SSR/hydration |
| `pnpm exec playwright test --project=chromium --project=firefox --reporter=line` | Current Chromium/Firefox run: all 50 tests passed. Initial WebKit run could not launch because host libraries are unavailable |
| Focused command palette browser run | All 26 Chromium/Firefox cases passed |
| `pnpm storybook:build` | Passed |
| Live Storybook review | All 19 stories rendered at 1000px and 320px in dark and light modes (76 checks); no component runtime errors or horizontal page overflow |
| Story interactions | Controlled search/selection, fuzzy discovery, disabled activation, keyboard activation, custom content, Ctrl/Meta+K overlay toggling/focus restoration, query-only viewport reveal, and conversation navigation |
| Docs page | Navigation entry and generated API/controls rendered successfully |
| `pnpm build` | Passed; runtime exports and declarations generated |
| Packed consumer smoke test | Root/component subpath exports agree; root/type subpath generic types compile in a Vue consumer; inline, closed, and initially-open overlays render in Node without DOM globals |

Browser coverage includes 100 commands across five groups, disabled skipping, pointer/keyboard parity, result viewport scrolling, independent instances, initially selected result scrolling, native modal focus containment/restoration, scroll ownership, nested overlays, backdrop drags, IME, parent closure, mode switching, unmount, removed openers, narrow layouts, and out-of-order remote responses.

SSR tests cover stable IDs during hydration for multiple inline palettes, closed overlays, and initially-open overlays. Shortcut tests cover real modifier flags, reactive updates, editable targets, repeat/IME guards, duplicate-instance arbitration, and teardown. Motion tests cover exit resource retention, rapid reversal, stale activation, viewport collapse, and reduced motion.

Native dialog behavior is tested in browsers rather than inferred from the jsdom dialog stub.

## Existing limitations outside this feature

- `NyxStatusDot.spec.ts` expects `size-xs`; its unchanged component defaults to `size-md`. This is already recorded in `AGENTS.md`.
- WebKit requires host libraries (`libicu74`, `libxml2`, `libflite1`) unavailable in this environment. No WebKit behavior claim is made.
- The existing package barrel requires the optional Vue Router peer at runtime. The isolated packed consumer supplies Vue and Vue Router, as recorded in the existing divergence log.
- Existing build tooling reports bundle-size and dependency warnings; both production builds complete.

## Stationary search follow-up

- The overlay is horizontally centered and anchored at `15dvh`; viewport changes grow downward.
- All 30 palette browser cases passed in Chromium and Firefox. New cases sample search position every animation frame through reveal, filtering, empty results and collapse at 1000×800 and 320×480, also checking the surface stays within the viewport.
- Type-check passed. E2E-file lint reports existing `prefer-web-first-assertions` errors at lines 62 and 68; the added regression cases introduce no lint findings.

## Viewport modes follow-up

- Replaced the unreleased boolean with `NyxCommandPaletteViewportMode` (`Always`, `WhileSearching`, default `AfterInteraction`). Verified runtime enum identity and declarations through root and types build entries.
- Palette unit tests: 28 passed. Full suite: 546 passed; the same existing NyxStatusDot default-size assertion failed.
- Palette Chromium/Firefox tests: all 32 passed, including footer focus handoff, Enter reveal without selection, persistence through clears (reopening behavior superseded below), and stationary search during viewport changes.
- Type-check, scoped component lint, library build and Storybook build passed.
- Built Default story tested in both browsers at 1000px and 320px: hidden initial viewport, footer reveal, retained input focus, persistence after clear, and horizontal centering within the preview document. SearchOnly, RevealAndKeepOpen, AlwaysShown and CustomShortcut stories also rendered in both browsers.
- Storybook uses a preview iframe: the dialog centers within that document, not the surrounding manager sidebar/Controls layout. Consumers receive the same body-teleported overlay in their app document.

## Disclosure reset and compact reveal control

- Overlay closure now resets disclosure history, including parent-driven closure. Empty-query reopen starts hidden; retained nonblank queries still show matching results. Inline behavior is unchanged.
- Footer reveal control follows slot content, aligns right, uses the existing XSmall icon size and has no hover/press transform.
- Enter and ArrowDown reveal hidden results without selecting. ArrowDown highlights the first enabled result, then navigates on subsequent presses; repeat/IME guards remain active.
- All 29 palette unit tests and type-check passed. All 32 Chromium/Firefox palette cases passed after the reset change; the expanded dismissal/ArrowDown scenario was also rerun in both browsers.

## Final pre-commit validation

- Living spec reconciled with all requested interactions, enum values/defaults, per-open-session reset, right-aligned 12px reveal icon, footer customization, stable positioning, and shortcut/iframe limitations. Local spec cross-references resolve.
- Final library build (including type-check) and scoped component ESLint passed. The final Storybook build after removing the demo count/reset button passed.
- Full unit suite: 547 passed, one known unrelated NyxStatusDot size assertion failed; all 29 palette unit tests passed.
- Full Chromium/Firefox E2E suite: 56 passed, including all 32 palette cases. WebKit host-library limitation remains unchanged.
