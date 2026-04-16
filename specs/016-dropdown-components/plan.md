# Implementation Plan: NyxDropdown Components

**Branch**: `016-dropdown-components` | **Date**: 2026-04-16 | **Spec**: `/home/arnedecant/Projects/nyxkit/nyx-kit/specs/016-dropdown-components/spec.md`
**Input**: Feature specification from `/specs/016-dropdown-components/spec.md`

## Summary

Add a new dropdown component family with a self-contained trigger wrapper, a default option-rendered panel, and reusable menu/item building blocks. The implementation reuses the shared teleport positioning behavior and is exported through the existing component barrels.

## Technical Context

**Language/Version**: TypeScript + Vue 3  
**Primary Dependencies**: Vue 3, SCSS, shared Nyx Kit composables and types  
**Storage**: N/A  
**Testing**: Vitest, Storybook, Playwright  
**Target Platform**: Browser-based Vue applications
**Project Type**: Library  
**Performance Goals**: Dropdown opens and positions without visible lag during normal interaction  
**Constraints**: Preserve existing library patterns, use shared positioning behavior, avoid breaking public exports  
**Scale/Scope**: One new component family with three public exports

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Pass.

- Docs remain the source of truth and the feature spec was written before implementation.
- The change is additive and keeps public contracts explicit.
- The design uses existing component patterns and shared composables rather than introducing a new architecture.
- Styling will continue to use existing design tokens and component conventions.
- Tests are required for interactive behavior and story/API coverage.

## Project Structure

### Documentation (this feature)

```text
specs/016-dropdown-components/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── dropdown-components.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── NyxDropdown/
│   │   ├── NyxDropdown.vue
│   │   ├── NyxDropdownMenu.vue
│   │   ├── NyxDropdownItem.vue
│   │   ├── NyxDropdown.stories.ts
│   │   ├── NyxDropdownMenu.stories.ts
│   │   ├── NyxDropdownItem.stories.ts
│   │   └── NyxDropdown.spec.ts
│   └── index.ts
├── composables/
│   └── useTeleportPosition.ts
├── types/
│   └── select.ts
└── index.ts
```

**Structure Decision**: Add a new `src/components/NyxDropdown/` component family with three public exports, reuse the shared teleport positioning composable, and wire the new symbols through the existing component barrel exports.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations requiring justification.
