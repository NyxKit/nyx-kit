# Implementation Plan: NyxEditor Footer Info

**Branch**: `008-editor-footer-info` | **Date**: 2026-03-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-editor-footer-info/spec.md`

## Summary

Add a default `NyxEditor` footer that shows the current caret-aware document path on the left and live word count on the right, while exposing the same footer data through a scoped `footer` slot for consumer customization.

## Technical Context

**Language/Version**: TypeScript 5.x + Vue 3.5  
**Primary Dependencies**: Vue 3, `@tiptap/vue-3`, Tiptap `StarterKit`, `tiptap-markdown`, existing internal NyxEditor sub-components/composables  
**Storage**: N/A  
**Testing**: Vitest + `@vue/test-utils`; Storybook for API verification; Playwright only if browser-level caret/footer behavior proves unreliable in unit coverage  
**Target Platform**: Browser, published component library  
**Project Type**: Vue component library  
**Performance Goals**: Footer updates feel immediate during caret movement and content edits in normal single-document editing flows  
**Constraints**: Must follow docs-first workflow; keep changes additive to the `NyxEditor` public contract; use existing editor-state data instead of reparsing serialized markdown/html; use design-token-based styling; keep footer calculations inside `NyxEditor` rather than offloading them to consumers  
**Scale/Scope**: One existing component (`NyxEditor`), shared editor types, stories, specs, and unit coverage; no new runtime dependencies

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Docs Are the Source of Truth | ✓ PASS | `docs/specs/components/NyxEditor.spec.md` already exists and must be updated with footer props/slots/data |
| Spec Before Code | ✓ PASS | Feature spec exists in `specs/008-editor-footer-info/spec.md`; implementation will also update the living NyxEditor doc spec |
| Minimal Diff | ✓ PASS | Scope is limited to NyxEditor, shared editor types, stories, and tests |
| Consumer-Library Contract | ✓ PASS | Footer support is additive via default UI plus scoped slot payload |
| Test-First for Non-Trivial Logic | ✓ PASS | Footer path and word-count logic require unit coverage; E2E only if browser behavior needs it |
| Design Token Discipline | ✓ PASS | Footer styling stays within existing NyxEditor SCSS/token patterns |
| Consistency Over Local Optimisation | ✓ PASS | Slot naming follows existing `footer` convention from component-model docs |

*Post-design re-check: All gates still pass. Footer information remains an additive NyxEditor contract with synced docs and stories.*

## Project Structure

### Documentation (this feature)

```text
specs/008-editor-footer-info/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── component-api.md
└── tasks.md
```

### Source Code (repository root)

```text
src/components/NyxEditor/
├── NyxEditor.vue
├── NyxEditor.scss
├── NyxEditor.types.ts
├── NyxEditor.spec.ts
├── NyxEditor.stories.ts
├── NyxEditorBubbleMenu/
├── NyxEditorToolbar/
├── NyxEditorToolbarContent/
└── useEditorAnnotations.ts

src/types/
└── editor.ts

docs/specs/components/
└── NyxEditor.spec.md
```

**Structure Decision**: Keep the footer feature inside the existing `NyxEditor` component boundary, with any shared footer-state helper colocated in `src/components/NyxEditor/` and any new public payload types added to `src/types/editor.ts`.

## Phase 0: Research

Research will confirm three design choices before implementation:

1. Derive footer info directly from Tiptap editor state rather than serialized markdown/html
2. Represent the caret path as structured segments plus a preformatted display string
3. Expose footer customization through the existing `footer` slot naming convention used elsewhere in the library

## Phase 1: Design & Contracts

Design outputs will include:

- `research.md` documenting editor-state and slot-pattern decisions
- `data-model.md` for footer info, structural path segments, and slot payload
- `contracts/component-api.md` capturing the default footer behavior and `footer` slot payload contract
- `quickstart.md` showing default and custom footer usage

## Implementation Steps

### Step 1 - Add shared footer data types

- Add public meta data interfaces to `src/types/editor.ts`
- Keep the payload focused on structured path data, display-ready path text, word count, and caret/selection metadata

### Step 2 - Compute footer info from editor state

- Add footer-state calculation inside `NyxEditor` or a colocated helper/composition
- Recompute footer data on editor creation, content updates, and caret/selection updates
- Support collapsed caret positions as well as non-empty selections

### Step 3 - Render the default footer

- Add a footer region to `NyxEditor.vue`
- Show structural path on the left and word count on the right using the computed footer info
- Style the footer in `NyxEditor.scss` using existing editor tokens and layout patterns
- Cap the component at `100dvh` and keep editor content/source regions scrollable so the footer stays pinned to the bottom

### Step 4 - Expose footer customization via slot

- Add a scoped `footer` slot in `NyxEditor.vue`
- Pass the full footer payload to the slot while preserving the default footer as the fallback

### Step 5 - Sync docs, stories, and tests

- Update `docs/specs/components/NyxEditor.spec.md` with footer architecture, slot scope, and default behavior
- Add Storybook coverage in `src/components/NyxEditor/NyxEditor.stories.ts` for default and custom footer rendering
- Add unit tests in `src/components/NyxEditor/NyxEditor.spec.ts` for path calculation, word count, and slot payload consistency

## Complexity Tracking

No constitution violations or special complexity exceptions are required.
