# Implementation Plan: NyxBreadcrumbs Routing and Visual Enhancements

**Branch**: `010-breadcrumbs-router-icons` | **Date**: 2026-04-02 | **Spec**: `/home/arnedecant/Projects/nyxkit/nyx-kit/specs/010-breadcrumbs-router-icons/spec.md`
**Input**: Feature specification from `/specs/010-breadcrumbs-router-icons/spec.md`

## Summary

Extend `NyxBreadcrumbs` so each breadcrumb item can optionally carry its own icon and route target, while preserving current string and `href`-based usage. Add one reusable separator customization surface that supports either plain text, an icon-by-name prop value, or a shared separator slot, and update the public breadcrumb type, Storybook coverage, tests, and the missing living docs spec for `NyxBreadcrumbs`.

## Technical Context

**Language/Version**: TypeScript with Vue 3.5+ single-file components  
**Primary Dependencies**: Vue 3, `lucide-vue-next`, existing `NyxIcon`, existing `useNyxProps` pipeline  
**Storage**: N/A  
**Testing**: Vitest with `@vue/test-utils`, Storybook 10, Playwright only if browser-level routing behavior must be verified  
**Target Platform**: Published Vue 3 component-library consumers, including apps that may use Vue Router  
**Project Type**: Vue 3 component library (`nyx-kit`)  
**Performance Goals**: No perceptible rendering regression for breadcrumb trails up to at least 20 items; separator and icon rendering remains linear to item count  
**Constraints**: Must remain additive and backward-compatible; must not add a hard `vue-router` runtime dependency; must update docs before code; must preserve token-based styling and current string-item support  
**Scale/Scope**: One existing component, one shared public breadcrumb type, one Storybook story file, one unit test file, and new `docs/specs/components/NyxBreadcrumbs.spec.md`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Docs before code | ✅ | Implementation must create and update `docs/specs/components/NyxBreadcrumbs.spec.md` before source changes because the living component spec is currently missing |
| Public contract safety | ✅ | Change is additive: keep existing `href` and string-item support, add optional `icon` and `route` fields |
| Minimal diff | ✅ | Feature is localized to `NyxBreadcrumbs`, shared breadcrumb type, docs, story, and tests |
| Test-first for non-trivial logic | ✅ | Route precedence, icon rendering, and separator precedence require targeted Vitest coverage and Storybook variants |
| Design token discipline | ✅ | No new style tokens are required; any styling must continue to use existing component and design-system tokens |
| Consistency over local optimisation | ✅ | Slot naming stays `separator`, click event remains `click`, and icon naming follows existing `NyxIcon` conventions |

## Project Structure

### Documentation (this feature)

```text
specs/010-breadcrumbs-router-icons/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── nyx-breadcrumbs.md
└── tasks.md
```

### Source Code (repository root)

```text
docs/
├── architecture/
│   └── component-model.md
└── specs/
    └── components/
        └── NyxBreadcrumbs.spec.md

src/
├── components/
│   └── NyxBreadcrumbs/
│       ├── NyxBreadcrumbs.vue
│       ├── NyxBreadcrumbs.types.ts
│       ├── NyxBreadcrumbs.stories.ts
│       ├── NyxBreadcrumbs.spec.ts
│       └── NyxBreadcrumbs.scss
└── types/
    └── common.ts
```

**Structure Decision**: Keep the implementation entirely within the existing component and shared type locations. Add the missing living component spec under `docs/specs/components/`, update architecture docs only if the public breadcrumb contract needs cross-component documentation, and avoid introducing new modules or dependencies.

## Phase 0: Research Summary

1. Use a library-owned route target type on `NyxBreadcrumb` rather than importing router types directly into the public surface.
2. Keep `route` additive and higher precedence than `href` when both are present.
3. Expand `separator` into a minimal union that supports text or icon-by-name, while keeping the single `separator` slot as the highest-precedence customization point.
4. Verify with docs updates, targeted Vitest coverage, and Storybook variants; skip Playwright unless the final implementation introduces browser-level routing behavior beyond render branching.

## Phase 1: Design Summary

1. Extend the breadcrumb item data model with optional `icon` and `route` fields while preserving string normalization.
2. Define a breadcrumb rendering contract with three item modes: static label, URL link, and route-driven link.
3. Define separator rendering precedence: slot first, then icon/text prop, with no trailing separator after the final item.
4. Document the public consumer contract for the updated breadcrumb item shape and customization precedence.
5. Plan docs-first implementation work: create `docs/specs/components/NyxBreadcrumbs.spec.md`, then update source, tests, and stories.

## Post-Design Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Docs before code | ✅ | Design explicitly includes creating the missing living component spec before implementation |
| Public contract safety | ✅ | Data model remains additive and preserves current item inputs |
| Minimal diff | ✅ | No new package, entry point, or shared abstraction required |
| Test-first for non-trivial logic | ✅ | Design artifacts identify concrete unit and story coverage for each branching path |
| Design token discipline | ✅ | Design does not require cross-cutting style-token changes |
| Consistency over local optimisation | ✅ | Uses existing slot and icon conventions instead of adding parallel APIs |

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
