# Tasks: NyxColourMode — Out-of-the-Box Theming System

**Input**: Design documents from `/specs/004-colour-mode-system/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Types, exports, and CSS — all pure additive changes with zero runtime risk.

- [x] T001 [P] Create `src/types/colour-mode.ts` with `NyxColourMode` enum (`Dark = 'dark'`, `Light = 'light'`, `Adaptive = 'adaptive'`)
- [x] T002 [P] Add `export * from './colour-mode'` to `src/types/index.ts`
- [x] T003 Add `NyxColourModeOptions` type to `src/types/plugin.ts`; nest as `colourMode?: NyxColourModeOptions` in `NyxKitOptions` (fields: `mode?`, `adaptiveDayStart?`, `adaptiveDayEnd?`)
- [x] T004 Add `html[data-nyx-mode="light"]` CSS override block to `src/styles/variables.css` (all 14 tokens from contracts/NyxColourMode.ts)

**Checkpoint**: Types compile cleanly; `NyxColourMode` is importable from `nyx-kit/types`; light mode tokens override correctly when `data-nyx-mode="light"` is set on `<html>`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Internal helpers used by both the composable and the plugin.

**⚠️ CRITICAL**: Composable and plugin wiring depend on these helpers.

- [x] T005 Define module-level singleton state in `src/composables/useNyxColourMode.ts` (create file): `_setting = ref<NyxColourMode>(NyxColourMode.Dark)`, `_dayStart = 6`, `_dayEnd = 20`, `_intervalId: ReturnType<typeof setInterval> | null = null`
- [x] T006 Implement `resolveMode(): NyxColourMode.Dark | NyxColourMode.Light` pure function in `src/composables/useNyxColourMode.ts` — returns `Light` when hour in `[_dayStart, _dayEnd)`, else `Dark`; when `_setting` is not `Adaptive`, returns `_setting` directly
- [x] T007 Implement `applyToDOM(resolvedMode: NyxColourMode.Dark | NyxColourMode.Light): void` in `src/composables/useNyxColourMode.ts` — SSR-guarded `document.documentElement.setAttribute('data-nyx-mode', resolvedMode)`
- [x] T008 Implement `startAdaptiveWatcher()` in `src/composables/useNyxColourMode.ts` — call `applyToDOM(resolveMode())` immediately, then `setTimeout` to next minute boundary, then `setInterval` at 60 000 ms; store handle in `_intervalId`
- [x] T009 Implement `stopAdaptiveWatcher()` in `src/composables/useNyxColourMode.ts` — clears `_intervalId` and sets it to `null`

**Checkpoint**: Internal helper functions exist and are unit-testable in isolation.

---

## Phase 3: User Story 1 — Dark / Light mode switching via composable (P1) 🎯 MVP

**Goal**: `useNyxColourMode()` returns reactive `setting`, `mode`, `isDark`, `isLight`, and `setMode`. Calling `setMode(Light)` immediately updates the DOM attribute and persists to `localStorage`.

**Independent Test**: In a browser console: `import { useNyxColourMode } from 'nyx-kit/composables'`; call `setMode(NyxColourMode.Light)`; verify `document.documentElement.getAttribute('data-nyx-mode') === 'light'` and `localStorage.getItem('nyx-colour-mode') === 'light'`. Reload and verify the attribute is restored.

### Implementation for User Story 1

- [x] T010 [US1] Implement `useNyxColourMode()` composable body in `src/composables/useNyxColourMode.ts`: read `localStorage` → `inject('libEnv').colourMode.mode` → `NyxColourMode.Dark` resolution chain on first call; initialise `_dayStart`/`_dayEnd` from `libEnv.colourMode`; validate `_dayStart < _dayEnd` (NyxLog.warn + reset to defaults if invalid)
- [x] T011 [US1] Add `mode = computed(resolveMode)` and `isDark = computed(() => mode.value === NyxColourMode.Dark)` and `isLight = computed(() => mode.value === NyxColourMode.Light)` in `src/composables/useNyxColourMode.ts`
- [x] T012 [US1] Implement `setMode(m: NyxColourMode): void` in `src/composables/useNyxColourMode.ts`: update `_setting.value`, write to `localStorage` (SSR-guarded), stop adaptive watcher if running, call `applyToDOM(resolveMode())`, start adaptive watcher if new mode is `Adaptive`
- [x] T013 [US1] Return `{ setting: readonly(_setting), mode, isDark, isLight, setMode }` from `useNyxColourMode()` in `src/composables/useNyxColourMode.ts`
- [x] T014 [US1] Register `onUnmounted(() => stopAdaptiveWatcher())` inside `useNyxColourMode()` in `src/composables/useNyxColourMode.ts`
- [x] T015 [US1] Add `export { useNyxColourMode }` to `src/composables/index.ts`

**Checkpoint**: `useNyxColourMode()` is callable from a Vue component; `setMode(Light)` applies `data-nyx-mode="light"` and persists; `setMode(Dark)` removes the light override; `mode` / `isDark` / `isLight` are reactive.

---

## Phase 4: User Story 2 — Adaptive clock-driven mode (P2)

**Goal**: Setting `NyxColourMode.Adaptive` makes the mode flip automatically at `adaptiveDayStart` and `adaptiveDayEnd` boundaries. The watcher fires once immediately, then at each full minute boundary.

**Independent Test**: Set `_dayStart = new Date().getHours()` (current hour) and `_dayEnd = _dayStart + 1`; call `setMode(Adaptive)`; verify DOM shows `data-nyx-mode="light"`. Then manually advance the mock clock past `_dayEnd`; verify mode flips to `dark`. Unmount the component and verify the interval is cleared.

### Implementation for User Story 2

- [x] T016 [P] [US2] Write Vitest spec `src/composables/useNyxColourMode.spec.ts`: mock `Date`, `setInterval`, `clearInterval`, `document.documentElement.setAttribute`, and `localStorage`
- [x] T017 [US2] Add test: "defaults to Dark when no localStorage and no libEnv" in `src/composables/useNyxColourMode.spec.ts`
- [x] T018 [US2] Add test: "setMode(Light) applies data-nyx-mode='light' and writes localStorage" in `src/composables/useNyxColourMode.spec.ts`
- [x] T019 [US2] Add test: "Adaptive resolves to Light when current hour is inside day window" in `src/composables/useNyxColourMode.spec.ts`
- [x] T020 [US2] Add test: "Adaptive resolves to Dark when current hour is outside day window" in `src/composables/useNyxColourMode.spec.ts`
- [x] T021 [US2] Add test: "setMode(Dark) stops the adaptive interval" in `src/composables/useNyxColourMode.spec.ts`
- [x] T022 [US2] Add test: "onUnmounted clears the adaptive interval" in `src/composables/useNyxColourMode.spec.ts`
- [x] T023 [US2] Add test: "invalid adaptiveDayStart >= adaptiveDayEnd emits NyxLog.warn and falls back to (6, 20)" in `src/composables/useNyxColourMode.spec.ts`

**Checkpoint**: All 7 tests pass. Adaptive mode self-corrects on invalid window; interval is always cleaned up.

---

## Phase 5: User Story 3 — Plugin install integration (P3)

**Goal**: `NyxKit.install(app, { colourMode: { mode: NyxColourMode.Light } })` applies the mode immediately on app startup (client-side only), without requiring the consumer to call `useNyxColourMode()` manually.

**Independent Test**: Create a minimal Vue app with `NyxKit.install(app, { colourMode: { mode: NyxColourMode.Light } })`; before mounting any component, verify `document.documentElement.getAttribute('data-nyx-mode') === 'light'`.

### Implementation for User Story 3

- [x] T024 [US3] Add `initColourMode(options: NyxKitOptions): void` helper in `src/composables/useNyxColourMode.ts` (or inline in `src/main.ts`) — reads `options.colourMode?.mode ?? NyxColourMode.Dark`, sets `_dayStart`/`_dayEnd` from `options.colourMode`, calls `setMode`; SSR-guarded
- [x] T025 [US3] Wire `initColourMode(options)` call inside the `install` function in `src/main.ts` — invoke only when `typeof document !== 'undefined'`; call after `app.provide('libEnv', options)`

**Checkpoint**: Plugin-installed colour mode is applied before the first Vue render; Adaptive watcher starts on install when `colourMode: { mode: NyxColourMode.Adaptive }`; dark-first default is unchanged when option is omitted.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T026 [P] Update `docs/architecture/design-system.md` — replace placeholder Colour Mode section with reference to `NyxColourMode` enum, `useNyxColourMode()` composable, `data-nyx-mode` attribute, and localStorage persistence behaviour
- [x] T027 [P] Add inline JSDoc to `useNyxColourMode.ts` — document `setting` vs `mode` distinction, SSR safety note, and singleton behaviour
- [x] T028 Run `pnpm typecheck` and `pnpm test` from repo root; fix any type errors or failing tests
- [x] T029 [P] Add `svg { fill: currentColor }` to `src/styles/base.css` so SVG icons inherit the active text colour; any explicit child `fill` still wins

---

## Phase 7: ESLint Config Exposure

**Goal**: Consumers can extend Nyx Kit's ESLint flat config so their projects adopt the same rules without manual setup.

- [x] T030 [P] Create `eslint/index.mjs` — shareable flat config exporting `pluginVue.configs['flat/essential']`, `vueTsConfigs.recommended`, and `oxlint.configs['flat/recommended']`
- [x] T031 [P] Add `"./eslint": { "import": "./eslint/index.mjs" }` to `exports` and `"eslint"` to `"files"` in `package.json`; declare `eslint`, `eslint-plugin-vue`, `@vue/eslint-config-typescript`, `eslint-plugin-oxlint` as optional peer dependencies
- [x] T032 Document ESLint usage (install peer deps + extend config) in `README.md`

**Checkpoint**: `import nyxConfig from 'nyx-kit/eslint'` resolves in a consuming project; spreading `nyxConfig` into a flat config array lints `.vue` and `.ts` files without additional peer configuration.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — T001–T004 can all start immediately and run in parallel
- **Foundational (Phase 2)**: Depends on T001 (enum must exist) — BLOCKS composable work
- **US1 (Phase 3)**: Depends on all of Phase 1 + Phase 2
- **US2 (Phase 4)**: Depends on Phase 3 (tests exercise the watcher helpers from Phase 2)
- **US3 (Phase 5)**: Depends on Phase 3 (plugin calls `setMode` from composable)
- **Polish (Phase 6)**: Depends on all story phases complete
- **ESLint (Phase 7)**: No dependencies — can run in parallel with Phase 6

### User Story Dependencies

- **US1 (P1)**: Core composable — foundational for US2 and US3
- **US2 (P2)**: Adaptive tests — can be written before US3 but exercises US1 code
- **US3 (P3)**: Plugin wiring — thin layer on top of US1; can proceed once US1 is done

### Parallel Opportunities

- T001, T002, T004 can all run in parallel (different files, no mutual dependency)
- T005–T009 (foundational helpers) can be written top-to-bottom in one pass or split across calls
- T017–T023 (test cases) can be written in any order once the spec file is created (T016)
- T026–T027 (docs + JSDoc) can run in parallel with T028 (typecheck/test)

---

## Parallel Example: Setup Phase

```bash
# These three tasks touch different files — launch together:
Task T001: "Create src/types/colour-mode.ts with NyxColourMode enum"
Task T002: "Add export to src/types/index.ts"
Task T004: "Add html[data-nyx-mode='light'] block to src/styles/variables.css"
# T003 depends on T001 (needs the enum type), run after T001
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup (T001–T004)
2. Complete Phase 2: Foundational helpers (T005–T009)
3. Complete Phase 3: US1 composable (T010–T015)
4. **STOP and VALIDATE**: `setMode(Light)` flips the DOM; `setMode(Dark)` restores it; localStorage round-trip works
5. Ship — consumers can already use `useNyxColourMode()` for manual light/dark switching

### Incremental Delivery

1. Setup + Foundational → types and helpers ready
2. US1 → manual dark/light switching, localStorage persistence (**MVP**)
3. US2 → adaptive clock tests pass, automatic switching works
4. US3 → plugin install integration, zero-config mode for library consumers
5. Polish → docs updated, all checks green
