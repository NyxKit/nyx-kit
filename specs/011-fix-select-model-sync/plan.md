# Implementation Plan: NyxSelect External Model Sync

**Branch**: `011-fix-select-model-sync` | **Date**: 2026-04-02 | **Spec**: `/home/arnedecant/Projects/nyxkit/nyx-kit/specs/011-fix-select-model-sync/spec.md`
**Input**: Feature specification from `/specs/011-fix-select-model-sync/spec.md`

## Summary

Fix `NyxSelect` so externally controlled `v-model` changes immediately update both the displayed value and selected option state for single-select and multi-select usage. Keep the fix localized to the existing component contract, with targeted unit coverage, story validation, and a docs update to the living `NyxSelect` component spec.

## Technical Context

**Language/Version**: TypeScript with Vue 3.5+ single-file components  
**Primary Dependencies**: Vue 3, existing `defineModel` usage, `useNyxProps`, `useTeleportPosition`, `useSelectKeyboardControls`, `v-click-outside`  
**Storage**: N/A  
**Testing**: Vitest with `@vue/test-utils`, Storybook 10, Playwright only if the bug fix alters browser-level interactive flows beyond component-local state sync  
**Target Platform**: Published Vue 3 component-library consumers using `NyxSelect` as a controlled form input  
**Project Type**: Vue 3 component library (`nyx-kit`)  
**Performance Goals**: External value synchronization remains effectively immediate for normal select interactions and does not introduce redundant re-render loops for standard option list sizes  
**Constraints**: Must remain backward-compatible; must update docs before code; must preserve current placeholder, search, grouped-option, teleport, and keyboard behavior; must prefer a minimal localized change over architectural rewrites  
**Scale/Scope**: One existing component, one living component spec, one story file, and one unit test file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Docs before code | ✅ | The existing living spec at `docs/specs/components/NyxSelect.spec.md` must be updated before implementation |
| Public contract safety | ✅ | This is a bug fix to existing `v-model` behavior with no planned API changes |
| Minimal diff | ✅ | Scope is limited to `NyxSelect` docs, logic, tests, and stories |
| Test-first for non-trivial logic | ✅ | External model synchronization is non-trivial component logic and requires targeted Vitest coverage |
| Design token discipline | ✅ | No style-token changes are expected for this fix |
| Consistency over local optimisation | ✅ | The fix should follow the repository's documented `defineModel` and normalized model patterns |

## Project Structure

### Documentation (this feature)

```text
specs/011-fix-select-model-sync/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── nyx-select.md
└── tasks.md
```

### Source Code (repository root)

```text
docs/
└── specs/
    └── components/
        └── NyxSelect.spec.md

src/
└── components/
    └── NyxSelect/
        ├── NyxSelect.vue
        ├── NyxSelect.types.ts
        ├── NyxSelect.spec.ts
        ├── NyxSelect.stories.ts
        └── NyxSelect.scss
```

**Structure Decision**: Keep the fix entirely within the existing `NyxSelect` component surface. Update the living component spec first, then adjust the component’s derived display-state synchronization and add regression tests and a story scenario that demonstrates external model updates.

## Phase 0: Research Summary

1. Keep `normalisedModel` as the single source of truth and ensure derived display state is recalculated when that model changes externally.
2. Favor watcher-based or computed synchronization tied to the normalized model rather than duplicating selection state in a second persistent ref.
3. Verify the fix across single-select, multi-select, grouped options, and open/closed dropdown states with unit tests.
4. Update the `NyxSelect` living spec to document that externally controlled values must immediately update visible labels and selected option state.

## Phase 1: Design Summary

1. Define the external model value as the authoritative input for displayed labels and selected markers.
2. Document synchronization rules for three derived surfaces: closed-control text, dropdown selected state, and reset-to-placeholder behavior.
3. Add regression coverage for parent-driven model changes after mount in both single and multi-select modes.
4. Add or update Storybook coverage so the external-sync behavior can be reviewed visually.

## Post-Design Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Docs before code | ✅ | Design explicitly updates the existing living spec before implementation |
| Public contract safety | ✅ | No prop, slot, emit, or export changes are required |
| Minimal diff | ✅ | Design remains localized to the existing `NyxSelect` files |
| Test-first for non-trivial logic | ✅ | Design calls for explicit regression tests before implementation completion |
| Design token discipline | ✅ | No style-token or global-style changes are required |
| Consistency over local optimisation | ✅ | Design follows the existing `defineModel` normalization pattern documented in `component-model.md` |

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
