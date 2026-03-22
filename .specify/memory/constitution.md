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
