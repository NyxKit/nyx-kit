# Research: NyxEditor Footer Info

**Branch**: `008-editor-footer-info` | **Date**: 2026-03-28

## Decision 1: Drive footer info from editor state

**Decision**: Compute footer structure and word count directly from the current Tiptap editor state.

**Rationale**: The footer must track the live caret position, including collapsed selections, and respond to document edits immediately. Serialized markdown or HTML does not provide reliable caret-aware structure without extra parsing.

**Alternatives considered**:
- Recompute from serialized markdown/html — rejected because it loses direct selection/caret context and adds unnecessary parsing overhead.

## Decision 2: Use a structured footer payload plus display-ready text

**Decision**: Represent footer data as structured path segments alongside a preformatted path string and numeric word count.

**Rationale**: The default footer needs a ready-to-render string, while the scoped slot needs structured data so consumers can customize presentation without reparsing the string.

**Alternatives considered**:
- Expose only a path string — rejected because it limits slot customization.
- Expose only segments — rejected because the default footer would have to reformat them repeatedly in the render path.

## Decision 3: Use the existing `footer` slot convention

**Decision**: Expose footer customization through a scoped `footer` slot.

**Rationale**: `docs/architecture/component-model.md` already standardizes `footer` as the slot name for bottom content regions. Reusing that convention keeps `NyxEditor` aligned with the rest of the component library.

**Alternatives considered**:
- Introduce a custom slot name like `editor-footer` — rejected because it adds inconsistency without extra value.

## Decision 4: Keep the footer visible by default

**Decision**: Render the footer by default and use the scoped slot only to override the inner content.

**Rationale**: The feature spec assumes default footer visibility and positions the slot as a customization surface, not as an opt-in toggle for whether a footer exists at all.

**Alternatives considered**:
- Make the footer opt-in — rejected because it weakens the default user value described in the spec.

## Decision 5: Keep implementation within the NyxEditor boundary

**Decision**: Implement footer-state logic within `NyxEditor` or a small colocated helper/composition in `src/components/NyxEditor/`.

**Rationale**: The footer depends on editor-internal state and should stay close to the editor lifecycle. This keeps the change surgical and avoids introducing a broader cross-component abstraction prematurely.

**Alternatives considered**:
- Add a generic cross-editor utility outside `NyxEditor` — rejected because the current need is specific to this editor and does not yet justify a broader abstraction.
