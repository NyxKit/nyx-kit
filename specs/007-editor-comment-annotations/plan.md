# Implementation Plan: NyxEditor Comment Annotations

**Branch**: `007-editor-comment-annotations` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/007-editor-comment-annotations/spec.md`

## Summary

Align `NyxEditor` with the current shared annotation types so consuming projects can create anchors from live selections, pass `NyxAnnotation[]` back into the editor, render those annotations as inline decorations, and receive annotation focus events without taking ownership of editor-internal decoration logic.

## Technical Context

**Language/Version**: TypeScript 5.7 / Vue 3.5  
**Primary Dependencies**: Vue 3, `@tiptap/vue-3`, `@tiptap/starter-kit`, `@tiptap/extension-underline`, `@tiptap/extension-task-list`, `@tiptap/extension-task-item`, `tiptap-markdown`, SCSS  
**Storage**: N/A - comment threads and persisted annotations are consumer-owned inputs  
**Testing**: Vitest + `@vue/test-utils` (unit), Playwright (interactive coverage if annotation interactions become browser-sensitive), Storybook for API verification  
**Target Platform**: Browser - published as `nyx-kit` npm library  
**Project Type**: UI component library  
**Performance Goals**: Preserve current editor responsiveness for selection updates and content editing while adding annotation rendering for typical single-document editing flows  
**Constraints**: No new npm dependencies; no breaking removal of existing editor emits; must align docs/specs with the current exported annotation types; current annotation rendering is driven by `interaction`, `status`, and `attachment`; component still has unresolved implementation errors to be fixed separately  
**Scale/Scope**: One existing component (`NyxEditor`) plus editor-facing shared types, synced docs/specs, stories, and tests for annotation creation, rendering, and focus behavior

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Docs-first (Constitution I) | ✓ PASS | `docs/specs/components/NyxEditor.spec.md` exists and must be updated before implementation to reflect annotation props, emits, and highlight behavior |
| Spec before code (Constitution II) | ✓ PASS | Feature spec complete in `specs/007-editor-comment-annotations/spec.md`; implementation must also sync the living NyxEditor doc spec |
| Minimal diff (Constitution III) | ✓ PASS | Scope stays within NyxEditor, shared editor types, stories, tests, and synced docs |
| Consumer-library contract (Constitution IV) | ✓ PASS | Annotation APIs remain additive; current exports in `src/types/editor.ts` are treated as the source contract |
| Test-first for non-trivial logic (Constitution V) | ✓ PASS | Annotation anchor creation, decoration metadata, and annotation id focus/blur behavior require unit coverage |
| Design tokens (Constitution VI) | ✓ PASS | Annotation presentation must continue to use theme/token-driven styling hooks rather than hard-coded colors |
| Consistency (Constitution VII) | ✓ PASS | Public types live in `src/types/`, stories remain the executable API surface, and editor semantics stay aligned with existing component conventions |

*Post-design re-check: All gates still pass. The design remains additive, token-driven, and docs-first.*

## Project Structure

### Documentation (this feature)

```text
specs/007-editor-comment-annotations/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── component-api.md
└── tasks.md
```

### Source Code

```text
src/components/NyxEditor/
├── NyxEditor.vue
├── NyxEditor.types.ts
├── NyxEditor.scss
├── NyxEditor.spec.ts
├── NyxEditor.stories.ts
├── NyxEditorBubbleMenu/
│   └── NyxEditorBubbleMenu.vue
└── index.ts

src/types/
├── editor.ts
└── index.ts

docs/specs/components/
└── NyxEditor.spec.md
```

**Structure Decision**: Single-project component-library layout. Changes stay within the existing NyxEditor component folder, shared editor types, and synced documentation. No new package boundaries and no new runtime dependencies.

---

## Implementation Steps

### Step 1 - Align implementation with the current shared editor type contract

**What changes:**
- Treat the current exports in `src/types/editor.ts` as canonical:
  - `NyxAnnotationInteraction`
  - `NyxAnnotationStatus`
  - `NyxAnnotationAttachment`
  - `NyxAnnotationAnchor`
  - `NyxAnnotation`
- Use `NyxAnnotationAnchor` for both `selection` and `annotation:create`

### Step 2 - Extend `NyxEditor` public props and emits

**What changes:**
- Keep `annotations?: NyxAnnotation[]` as the current additive prop surface
- Add `annotationStatusTheme?: NyxAnnotationStatusTheme` as a partial map so status styling can be themed independently of attachment state while unknown statuses fall back safely
- Keep `selection` and `annotation:create` aligned on the same `NyxAnnotationAnchor` payload
- Remove the obsolete `comment` emit in favor of `annotation:create`
- Keep `annotation:create`, `annotation:focus`, and `annotation:blur` as the annotation-specific emit surface
- Do not plan `activeAnnotationId` or hover events until the code and types explicitly support them

### Step 3 - Add editor-internal annotation mapping and rendering

**What changes:**
- Use the current anchor shape (`text`, context, range) to derive annotation decorations
- Render all annotations passed in through `annotations`
- Surface `interaction`, `status`, and `attachment` on each decoration through classes and data attributes
- Keep per-annotation id addressing and `annotation:focus` emission intact

### Step 4 - Add token-driven highlight styling

**What changes:**
- Align `NyxEditor.scss` with the current decoration classes for:
  - interaction
  - status
  - attachment
- Preserve theme/token-driven styling through `annotationStatusTheme` and the current decoration classes/data attributes

### Step 5 - Sync stories and component docs

**What changes:**
- Update `src/components/NyxEditor/NyxEditor.stories.ts` with stories for:
  - emitted selection and annotation-create payloads
  - annotation rendering from `annotations`
  - focus and blur emission from rendered annotations
  - combinations of `interaction`, `status`, and `attachment`
- Update `docs/specs/components/NyxEditor.spec.md` before implementation completion so the living component spec matches the planned public API

### Step 6 - Add automated coverage

**What changes:**
- Extend `src/components/NyxEditor/NyxEditor.spec.ts` for:
  - annotation-anchor payload generation
  - no annotation:create emit on empty selection
  - annotation decoration metadata
  - annotation focus and blur emission
  - current `interaction`, `status`, and `attachment` rendering hooks
- Add E2E coverage only if browser-level selection and overlap behavior cannot be trusted through unit tests alone

---

## Complexity Tracking

No Constitution violations. No complexity exceptions required.
