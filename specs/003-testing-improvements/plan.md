# Implementation Plan: Testing Improvements

**Branch**: `003-testing-improvements` | **Date**: 2026-03-23 | **Spec**: `specs/003-testing-improvements/spec.md`
**Input**: Audit report `docs/audits/20260323-1042.md` — Testing dimension scored 4/10

## Summary

The audit found zero component render tests across 23 components, a placeholder E2E suite, no tests for `useTeleportPositionBase` (the most complex composable), and no tests for NyxSlider drag logic or NyxModal keyboard handling. The existing composable/utility tests are solid — the gap is entirely in component rendering and interaction testing. This plan closes that gap by adding `@vue/test-utils` render tests for the core components and replacing the placeholder E2E with real interactive behaviour tests.

## Technical Context

**Language/Version**: TypeScript 5.x / Vue 3
**Primary Dependencies**: `@vue/test-utils`, `vitest`, `@playwright/test`, `jsdom`
**Storage**: N/A
**Testing**: Vitest (unit + component), Playwright (E2E)
**Target Platform**: jsdom (unit), Chromium (E2E)
**Project Type**: Vue 3 component library (published as `nyx-kit`)
**Performance Goals**: Full unit suite < 10 s; no test should require a real browser
**Constraints**: No new runtime dependencies. Only `devDependencies`. Components with browser-only APIs (Teleport, ResizeObserver, pointer events) need jsdom shims or vi.fn stubs.
**Scale/Scope**: 23 components; ~15 priority targets for this iteration

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Spec before code | PASS | This plan is the spec; no new exported symbols |
| Minimal diff | PASS | Only new `*.spec.ts` files; no source changes |
| No new runtime deps | PASS | All tooling already in devDependencies |
| Test-first for non-trivial logic | PASS | This feature *is* the tests |
| No breaking changes | PASS | Test files are not published |

## Project Structure

### Documentation (this feature)

```text
specs/003-testing-improvements/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── NyxButton/
│   │   └── NyxButton.spec.ts        # NEW — props → classes, disabled, slots
│   ├── NyxInput/
│   │   └── NyxInput.spec.ts         # NEW — v-model, validation state, slots
│   ├── NyxModal/
│   │   └── NyxModal.spec.ts         # NEW — open/close, ESC, static, ARIA
│   ├── NyxSlider/
│   │   └── NyxSlider.spec.ts        # NEW — drag logic, step, range, direction
│   ├── NyxSelect/
│   │   └── NyxSelect.spec.ts        # NEW — open/close, option selection, multiple
│   ├── NyxTabs/
│   │   └── NyxTabs.spec.ts          # NEW — tab switching, ARIA, keyboard
│   ├── NyxProgress/
│   │   └── NyxProgress.spec.ts      # NEW — min/max calc, variants, ARIA
│   ├── NyxCheckbox/
│   │   └── NyxCheckbox.spec.ts      # NEW — v-model, disabled, indeterminate
│   ├── NyxTextarea/
│   │   └── NyxTextarea.spec.ts      # NEW — v-model, resize, maxlength
│   ├── NyxSwitch/
│   │   └── NyxSwitch.spec.ts        # NEW — v-model, disabled
│   ├── NyxTooltip/
│   │   └── NyxTooltip.spec.ts       # NEW — visibility, ARIA
│   ├── NyxBadge/
│   │   └── NyxBadge.spec.ts         # NEW — variants, slots
│   ├── NyxSpinner/
│   │   └── NyxSpinner.spec.ts       # NEW — ARIA, size classes
│   └── NyxCard/
│       └── NyxCard.spec.ts          # NEW — slots, click emit
├── composables/
│   └── useTeleportPositionBase.spec.ts  # NEW — position calc, mirroring, SSR guard
e2e/
├── nyx-button.spec.ts    # NEW — replaces placeholder; click, keyboard, disabled
├── nyx-modal.spec.ts     # NEW — open/close, ESC, focus trap
├── nyx-slider.spec.ts    # NEW — drag, keyboard arrow keys
└── vue.spec.ts           # UPDATE — replace scaffolding artefact check
```

**Structure Decision**: Option 1 (single project). Test files sit next to source files following the existing `*.spec.ts` convention already established by `NyxEditor.spec.ts`, `useNyxProps.spec.ts`, etc.

## Complexity Tracking

No constitution violations.

---

## Post-Design Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| No new exported symbols | PASS | Only `*.spec.ts` files added |
| No new runtime dependencies | PASS | All tooling pre-existing |
| Minimal diff | PASS | New files only; no existing source touched |
| Test-first principle satisfied | PASS | This entire feature is tests |
| E2E placeholder removed | REQUIRED | `e2e/vue.spec.ts` scaffolding test must be replaced |

---

## Phase 0: Research

### Resolved questions

**1. How are SCSS imports handled in Vitest?**
- Decision: Stub CSS/SCSS with `css: { modules: { classNameStrategy: 'non-scoped' } }` or `transform` in `vitest.config`. Existing `NyxEditor.spec.ts` works today — check current config before adding shims.
- Rationale: Already solved; investigate config rather than guessing.

**2. How are Teleport elements tested in jsdom?**
- Decision: `@vue/test-utils` `mount` with `attachTo: document.body` makes teleported content accessible via `document.body.querySelector(...)`. This is the established pattern.
- Rationale: Documented @vue/test-utils behaviour; no extra config needed.

**3. How are pointer events (drag) simulated in Vitest/jsdom?**
- Decision: Use `wrapper.trigger('pointerdown', {...})`, `wrapper.trigger('pointermove', {...})`, `wrapper.trigger('pointerup')`. `clientX`/`clientY` coordinates are passed in event init. `getBoundingClientRect` must be mocked via `vi.spyOn(el, 'getBoundingClientRect')`.
- Rationale: jsdom does not have a real layout engine; rect mocking is standard practice.

**4. Does the existing Vitest config support `@vue/test-utils`?**
- Decision: `NyxEditor.spec.ts` already uses `mount` successfully — config is already correct.
- Rationale: Evidence from existing passing test.

**5. What is the Playwright dev server entry point?**
- Decision: `playwright.config.ts` `webServer.url` — confirm from current config. Likely `http://localhost:9000` (Vite dev server port from `vite.config.ts`).
- Rationale: Need to verify before writing E2E tests.
