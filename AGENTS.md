# AGENTS.md — Working Guide for AI Agents

## The README and Storybook Are the Source of Truth

`README.md` is the authoritative overview for this project. Storybook stories are the authoritative specification for component APIs and behaviour.

- If the user asks for a feature change or a new component: **check `README.md` and the relevant story first**, then implement.
- If code diverges from a story or the README, **flag it to the user before proceeding** — do not silently reconcile in favour of the code.
- If two stories or types contradict each other, flag it.

---

## What This Repo Is

**Nyx Kit** is a Vue 3 component library and developer kit. It provides reusable components, composables, directives, utilities, and types for building modern Vue applications.

The stack:

| Layer | Technology | Location | Status |
|---|---|---|---|
| Components | Vue 3 + TypeScript | `src/components/` | ✅ in progress |
| Composables | TypeScript | `src/compositions/` | ✅ in progress |
| Directives | TypeScript | `src/directives/` | ✅ in progress |
| Types | TypeScript | `src/types/` | ✅ in progress |
| Utilities | TypeScript | `src/utils/` | ✅ in progress |
| Classes | TypeScript | `src/classes/` | ✅ in progress |
| Styles | SCSS | `src/styles/` | ✅ in progress |
| Stories | Storybook 8 | `src/**/*.stories.ts` | ✅ in progress |
| Unit tests | Vitest | `src/**/*.spec.ts` | ✅ in progress |
| E2E tests | Playwright | `e2e/` | ✅ in progress |

The library is published to npm as `nyx-kit`. The build is handled by Vite with `vite-plugin-dts` for type declarations.

---

## How to Navigate This Repo

```
nyx-kit/
  README.md             # high-level summary and planned features
  AGENTS.md             # this file
  CLAUDE.md             # Claude Code behaviour settings
  package.json          # dependencies and build scripts
  vite.config.ts        # build config (entry points, exports)
  src/
    index.ts            # main library entry point
    components/
      index.ts          # re-exports all components
      Nyx*/             # one folder per component (e.g. NyxButton/)
    compositions/
      index.ts          # re-exports all composables
      use*.ts           # individual composables
    directives/         # Vue directives
    types/              # shared TypeScript types
    utils/              # pure utility functions
    classes/            # class-based abstractions
    styles/             # global SCSS (variables, reset, themes)
  e2e/                  # Playwright end-to-end tests
```

**Start here for context:**
1. `README.md` — one-page overview and planned features roadmap
2. `src/components/index.ts` — all exported components at a glance
3. A component's `*.stories.ts` — its API, props, slots, and usage

---

## How to Change This Repo Safely

### For new components

1. **Check `README.md`** to see if it is planned and what the intended API is.
2. Create a folder under `src/components/Nyx<Name>/` with the component file, an `index.ts` re-export, and a `.stories.ts` file.
3. Register the export in `src/components/index.ts` and `src/index.ts`.
4. Add unit tests (`.spec.ts`) for non-trivial logic.

### For changes to existing components

1. Read the component file and its story before touching anything.
2. Keep prop names and defaults consistent with sibling components — check how analogous props are handled elsewhere.
3. Update the story if the API changes. A story that no longer compiles is a failing test.

### For changes to types, utils, or composables

1. These are shared — check all components that import the symbol before changing its signature.
2. Prefer adding a new overload or optional parameter over a breaking change.

### For style changes

1. Use existing SCSS variables and design tokens. Do not hard-code colours, spacing, or font sizes.
2. Changes to `src/styles/` (variables, reset, themes) affect every component — flag this to the user before proceeding.

---

## What Must Be Validated

Before considering any change complete, verify:

- [ ] The component compiles without TypeScript errors (`yarn type-check`)
- [ ] The story renders correctly in Storybook
- [ ] Unit tests pass (`yarn test:unit`)
- [ ] E2E tests pass if the change touches interactive behaviour (`yarn test:e2e`)
- [ ] The export is registered in `src/components/index.ts` and `src/index.ts` (for new components)
- [ ] No new npm packages are added without flagging them to the user first

---

## What Not to Touch Casually

| Thing | Why |
|---|---|
| `src/types/` — shared type definitions | Used across all components and exported publicly. Renaming or removing a type is a breaking change for library consumers. |
| `src/styles/` — SCSS variables and design tokens | Changing a variable affects every component that uses it. Treat as a cross-cutting concern. |
| `vite.config.ts` — entry points and exports | Changing an entry point or export path breaks the published package contract for consumers. |
| `package.json` — `exports` map | Must stay in sync with `vite.config.ts`. Any mismatch breaks tree-shaking or type resolution for consumers. |
| `src/compositions/useNyxProps.ts` | The central prop-merging composable used by most components. Changes here cascade everywhere. |

---

## Divergence Log

When you notice that something in the codebase or stories is out of sync, record it here before fixing it.

| Noticed | Location | Description | Status |
|---|---|---|---|
| — | — | No known divergences. | — |
