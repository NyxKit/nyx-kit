# AGENTS.md — Working Guide for AI Agents

## The Docs Are the Source of Truth

The `docs/` folder is the **authoritative specification** for this project. It is a living document.

- **Before implementing any requested change**, read the relevant `docs/` file(s). If no doc covers the area yet, ask the user whether to write one first.
- If the user asks for a feature change, a design decision, or a new component: **update `docs/` first**, then implement.
- If code diverges from `docs/`, **flag it to the user before proceeding** — do not silently reconcile in favour of the code.
- If `docs/` diverges from itself (e.g. a type in one doc doesn't match what another assumes), flag it.
- `README.md` is a human-facing summary; keep it in sync with `docs/` when making changes, but `docs/` wins on conflicts.
- Storybook stories are the authoritative specification for component APIs — keep them consistent with `docs/`.

---

## What This Repo Is

**Nyx Kit** is a Vue 3 component library and developer kit. It provides reusable components, composables, directives, utilities, and types for building modern Vue applications.

The stack:

| Layer | Technology | Location | Status |
|---|---|---|---|
| Components | Vue 3 + TypeScript | `src/components/` | ✅ in progress |
| Composables | TypeScript | `src/composables/` | ✅ in progress |
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
    composables/
      index.ts          # re-exports all composables
      use*.ts           # individual composables
    directives/         # Vue directives
    types/              # shared TypeScript types
    utils/              # pure utility functions
    classes/            # class-based abstractions
    styles/             # global SCSS (variables, reset, themes)
  e2e/                  # Playwright end-to-end tests
```

```
docs/
  audits/               # periodic audits and quality reports
  architecture/
    README.md           # layer diagram and key design decisions
    design-system.md    # tokens, theming, SCSS variables, dark mode
    component-model.md  # prop conventions, slot patterns, emit contracts
    build.md            # Vite config, entry points, exports map
  conventions/
    README.md           # naming, file structure, Vue/TS code style, git
  testing/
    README.md           # test strategy (unit / E2E), coverage targets
```

**Start here for context:**
1. `README.md` — one-page overview and planned features roadmap
2. `docs/architecture/README.md` — layer diagram and key decisions
3. `docs/architecture/component-model.md` — prop/slot/emit conventions
4. A component's `*.stories.ts` — its concrete API and usage

---

## How to Change This Repo Safely

> **Always consider `docs/` before making any change.** If the relevant area has a doc, read it first. If the change would affect a documented decision, update `docs/` as part of the same change.

### For design or feature changes

1. **Read the relevant `docs/` file(s)** before proposing anything.
2. **Update `docs/` first** to reflect the agreed design.
3. **Check for cross-doc impact**: a change to `component-model.md` likely touches `design-system.md` and related stories. Update all affected docs in the same pass.
4. Then implement in code, following `docs/conventions/README.md`.

### For new components

1. Check `README.md` and `docs/architecture/component-model.md` for the intended API and conventions.
2. Create a folder under `src/components/Nyx<Name>/` with the component file, an `index.ts` re-export, and a `.stories.ts` file.
3. Register the export in `src/components/index.ts` and `src/index.ts`.
4. Add unit tests (`.spec.ts`) for non-trivial logic.

### For changes to existing components

1. Read the component file, its story, and any relevant `docs/` section before touching anything.
2. Keep prop names and defaults consistent with sibling components — check `docs/architecture/component-model.md`.
3. Update the story if the API changes. A story that no longer compiles is a failing test.

### For changes to types, utils, or composables

1. These are shared — check all components that import the symbol before changing its signature.
2. Prefer adding a new overload or optional parameter over a breaking change.

### For style changes

1. Use existing SCSS variables and design tokens from `docs/architecture/design-system.md`. Do not hard-code colours, spacing, or font sizes.
2. Changes to `src/styles/` (variables, reset, themes) affect every component — flag this to the user before proceeding.

### For docs-only changes

- Prefer targeted edits over full rewrites.
- When renaming a concept, find and update every occurrence across all doc files.
- Keep `README.md` index files accurate — they are entry points, not copies of the content below them.

---

## What Must Be Validated

Before considering any change complete, verify:

- [ ] All affected `docs/` files are updated and internally consistent
- [ ] Cross-references between docs use correct relative paths
- [ ] The component compiles without TypeScript errors (`yarn type-check`)
- [ ] The story renders correctly in Storybook
- [ ] Unit tests pass (`yarn test:unit`)
- [ ] E2E tests pass if the change touches interactive behaviour (`yarn test:e2e`)
- [ ] The export is registered in `src/components/index.ts` and `src/index.ts` (for new components)
- [ ] `README.md` reflects any structural or API changes
- [ ] No new npm packages are added without flagging them to the user first

---

## What Not to Touch Casually

| Thing | Why |
|---|---|
| `src/types/` — shared type definitions | Used across all components and exported publicly. Renaming or removing a type is a breaking change for library consumers. |
| `src/styles/` — SCSS variables and design tokens | Changing a variable affects every component that uses it. Treat as a cross-cutting concern. |
| `vite.config.ts` — entry points and exports | Changing an entry point or export path breaks the published package contract for consumers. |
| `package.json` — `exports` map | Must stay in sync with `vite.config.ts`. Any mismatch breaks tree-shaking or type resolution for consumers. |
| `src/composables/useNyxProps.ts` | The central prop-merging composable used by most components. Changes here cascade everywhere. |

---

## Divergence Log

When you notice that something in the codebase or stories is out of sync, record it here before fixing it.

| Noticed | Location | Description | Status |
|---|---|---|---|
| — | — | No known divergences. | — |
