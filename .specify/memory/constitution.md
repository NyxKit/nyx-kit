# Nyx Kit Constitution

## Core Principles

### I. Docs Are the Source of Truth
`docs/` is the authoritative specification. Before implementing any change, read the relevant doc. Update `docs/` first, then implement. If code diverges from `docs/`, flag it before proceeding. Each non-trivial exported symbol has a living spec file under `docs/specs/` that must stay in sync with the source at all times.

### II. Spec Before Code (NON-NEGOTIABLE)
For every new component, composable, directive, or utility: write `docs/specs/<layer>/<Symbol>.spec.md` before writing any implementation code. The spec is the contract — it must capture props, emits, slots, v-model, keyboard behaviour, and accessibility before the first line of implementation exists.

### III. Minimal Diff, Surgical Edits
Make the smallest change that achieves the goal. Do not reformat, restructure, or "improve" code beyond the stated task. Avoid broad rewrites unless explicitly requested.

### IV. Consumer-Library Contract
Nyx Kit is a published npm library. Props, emits, slots, exported types, entry points, and the `package.json` exports map are public contracts. Breaking changes must be flagged explicitly. Prefer additive changes (new optional props, new overloads) over breaking ones.

### IV-a. Opinionated Global Stylesheet (Non-Negotiable)
`nyx-kit/style.css` intentionally ships a full CSS reset (Meyerweb v2.0) and global base styles (`body` font, colour, background). Consumers build on top of Nyx Kit's baseline — they are not expected to bring their own reset. **Do not recommend separating, scoping, or making the reset opt-in.** This is a deliberate design decision, not a defect.

### IV-b. Dark-First Colour System (Non-Negotiable)
Nyx Kit targets dark-first applications. `src/styles/variables.css` maps all semantic colour tokens to dark palette values unconditionally in `:root` — this default does not change. There is no `prefers-color-scheme` media query response.

Since branch `004-colour-mode-system`, the library ships a first-class opt-in colour mode system: `NyxColourMode` enum, `useNyxColourMode()` composable, and a `html[data-nyx-mode="light"]` CSS override block. The active mode is applied as a `data-nyx-mode` attribute on `<html>`. Dark is always the default and requires no attribute. This is intentional and governed — do not remove it or flag it as a violation.

Do not add `prefers-color-scheme` automation. Do not change the `:root` default token values. Consumers who do not opt into `NyxColourMode` see no change in behaviour.

### V. Test-First for Non-Trivial Logic
Unit tests (Vitest) are written for non-trivial component logic and utilities. E2E tests (Playwright) cover interactive behaviour. Stories (Storybook) are the API contract for components — a story that no longer compiles is a failing test.

### VI. Design Token Discipline
Never hard-code colours, spacing, or font sizes. Use SCSS variables and design tokens from `docs/architecture/design-system.md`. Changes to `src/styles/` are cross-cutting and must be flagged before proceeding.

### VII. Consistency Over Local Optimisation
Prop names, defaults, slot names, and emit conventions must match sibling components. Check `docs/architecture/component-model.md` before naming anything. Inconsistency in a library creates permanent consumer confusion.

## Technology Stack

- **Framework**: Vue 3 + TypeScript
- **Build**: Vite (rolldown via Vite 8) + vite-plugin-dts
- **Unit tests**: Vitest
- **E2E tests**: Playwright
- **Stories**: Storybook 8
- **Styles**: SCSS
- **Package manager**: pnpm
- **Published as**: `nyx-kit` on npm

## Development Workflow

1. Read the relevant `docs/` file(s) before proposing anything
2. Create or update the spec file in `docs/specs/` first
3. Implement in code, following `docs/conventions/README.md`
4. Update story if the API changes
5. Run `pnpm type-check`, `pnpm test:unit`, and `pnpm test:e2e` (if interactive)
6. Keep `README.md` in sync with structural or API changes

## Governance

This constitution supersedes all other practices. When using spec-kit commands (`/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`), all artifacts must be placed under `.specify/` and any generated spec must also produce or update the corresponding `docs/specs/` file. The `AGENTS.md` file provides additional runtime guidance for AI agents and is complementary to this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
