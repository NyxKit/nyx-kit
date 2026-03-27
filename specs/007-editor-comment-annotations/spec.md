# Feature Specification: NyxEditor Comment Annotations

**Feature Branch**: `007-editor-comment-annotations`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "Improve NyxEditor comment annotations and selection payloads so consuming projects can render, style, and persist comment highlights across mixed-content selections."

## Clarifications

### Session 2026-03-27

- Q: Should unresolved annotations include extra reason details in the editor contract? → A: No, unresolved is exposed as a single state and reason handling stays in the consuming app.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create annotations from a live selection (Priority: P1)

As a product team using `NyxEditor`, I can respond to a user's current text selection with both a simple selection payload and a richer annotation-create payload so I can create an external annotation record without reverse-engineering the editor document.

**Why this priority**: Comment creation is the entry point for the whole feature. If a consuming project cannot reliably capture what the user selected, the rest of the annotation workflow has no usable foundation.

**Independent Test**: Can be fully tested by selecting content in the editor, triggering the comment action, and verifying that the consuming project receives enough information to create a persisted comment record for that selection.

**Acceptance Scenarios**:

1. **Given** a user selects content within the editor, **When** the consuming project listens for the annotation action, **Then** it receives the current `selection` payload and an `annotation:create` payload containing an annotation anchor.
2. **Given** a user selection spans multiple content types in one continuous selection, **When** the comment action is triggered, **Then** the payload still represents one continuous annotation target rather than separate unrelated fragments.
3. **Given** there is no active text selection, **When** the comment action is triggered, **Then** no incomplete or ambiguous annotation target is emitted.
4. **Given** a user selection includes formatted or structured content such as list items, block quotes, or code blocks, **When** the comment action is triggered, **Then** the payload still identifies one continuous target that the consuming project can persist as a single comment anchor.

---

### User Story 2 - Render consumer-supplied annotations as highlights (Priority: P2)

As a consuming project, I can pass existing annotations back into `NyxEditor` so the editor highlights the annotated ranges consistently and users can see where annotations apply.

**Why this priority**: Capturing a comment is only half the workflow. Consumers also need a supported way to render saved comments again during later editing and review sessions.

**Independent Test**: Can be fully tested by providing a set of saved comment annotations to the editor and verifying that all valid ranges are visibly highlighted and remain associated with the correct comments.

**Acceptance Scenarios**:

1. **Given** a consuming project provides one or more annotations through the `annotations` prop, **When** the editor renders the content, **Then** each annotation appears as a visible highlight within the editor surface using its current `interaction`, `status`, and `attachment` values.
2. **Given** multiple comment annotations overlap or touch adjacent content, **When** the editor renders them, **Then** each annotation remains individually addressable to the consuming project.
3. **Given** a consuming project needs brand-specific presentation, **When** annotation highlights are rendered, **Then** the project can customize the highlight appearance through supported theme-driven styling without reimplementing editor-internal selection mapping.
4. **Given** a user focuses or blurs a rendered annotation, **When** the editor detects that interaction, **Then** it emits the annotation id back to the consuming project through the matching focus or blur event.

---

### User Story 3 - Preserve annotation metadata while content evolves (Priority: P3)

As a consuming project, I can pass annotation metadata into the editor and receive it back through styling and focus behavior so I can manage resolved and unresolved states in my own application logic.

**Why this priority**: Annotation rendering only stays useful if the editor preserves the consumer-supplied state model rather than replacing it with hidden internal business logic.

**Independent Test**: Can be fully tested by passing annotations with different `status`, `attachment`, and `interaction` values, then verifying that the editor renders those values as classes/data attributes and emits annotation focus events with the expected ids.

**Acceptance Scenarios**:

1. **Given** an annotation is marked `resolved`, **When** the editor renders it, **Then** the rendered highlight exposes that status through its styling hooks.
2. **Given** an annotation is marked `unresolved`, **When** the editor renders it, **Then** it is still rendered and styled as an unresolved annotation rather than being hidden automatically.
3. **Given** an annotation is marked `detached`, **When** the editor renders it, **Then** the rendered highlight exposes that attachment state through its styling hooks.

---

### Edge Cases

- A selection starts in one content block and ends in another, including combinations such as lists, paragraphs, quotes, or code blocks.
- Two saved comments overlap partially, nest, or share a boundary.
- A saved comment target points to content that has been deleted, split, or merged since the comment was created.
- A consuming project loads comments before editor content is available, or content before comments are available.
- A user edits inside an already-commented range while another comment in the same document remains active.
- Consumer-supplied annotations may use the same visual theme for multiple statuses unless a separate theme-mapping surface is introduced later.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `NyxEditor` MUST keep emitting `selection` payloads as `NyxEditorSelection` for non-empty selections.
- **FR-002**: The annotation-target payload MUST represent a continuous user selection even when that selection spans multiple content blocks or content types.
- **FR-002a**: `NyxEditor` MUST emit `annotation:create` with a `NyxAnnotationAnchor` payload derived from the current selection.
- **FR-003**: The annotation anchor MUST include `content`, `prefixContext`, `suffixContext`, `startOffset`, and `endOffset`.
- **FR-004**: `NyxEditor` MUST allow consuming projects to pass `annotations?: NyxAnnotation[]` for rendering.
- **FR-004a**: Each `NyxAnnotation` MUST include `id`, `anchor`, `interaction`, `status`, and `attachment`, with optional `tone`.
- **FR-004b**: `NyxEditor` MUST allow consuming projects to provide `annotationStatusTheme?: NyxAnnotationStatusTheme` so `resolved` and `unresolved` annotations can map to different theme tokens even when both are attached.
- **FR-005**: `NyxEditor` MUST render all supplied annotations as inline decorations using their consumer-provided metadata.
- **FR-006**: Rendered annotations MUST expose styling hooks for `interaction`, `status`, and `attachment`.
- **FR-007**: Rendered annotations MUST remain individually addressable by annotation id through DOM metadata and focus interaction.
- **FR-008**: `NyxEditor` MUST emit `annotation:focus` with the focused annotation id as a string when a rendered annotation is clicked or keyboard-focused through the supported interaction path.
- **FR-008a**: `NyxEditor` MUST emit `annotation:blur` with the blurred annotation id as a string when a rendered annotation loses focus after having been focused.
- **FR-009**: `NyxEditor` MUST preserve consumer-supplied `NyxAnnotationStatus` values of `resolved` and `unresolved`.
- **FR-010**: `NyxEditor` MUST preserve consumer-supplied `NyxAnnotationAttachment` values of `attached` and `detached`.
- **FR-011**: `NyxEditor` MUST preserve consumer-supplied `NyxAnnotationInteraction` values of `default`, `hover`, and `focus` for rendering hooks.
- **FR-012**: The exported type surface MUST include `NyxAnnotationInteraction`, `NyxAnnotationStatus`, `NyxAnnotationAttachment`, `NyxAnnotationAnchor`, and `NyxAnnotation`.
- **FR-013**: The feature MUST remain scoped to annotation creation, annotation rendering, and annotation focus/blur emission; it MUST NOT require `NyxEditor` to own thread bodies, author metadata, moderation workflows, or external comment storage.

### Annotation Contract

- **Comment Annotation** records are owned by the consuming project and supplied back to `NyxEditor` for rendering.
- Each `Comment Annotation` must contain:
  - a stable annotation identifier controlled by the consuming project
  - authoritative document-location data for the annotated range
  - an informational text snapshot representing the original user selection
- The identifier is used to correlate rendered highlights, active-comment state, and consumer-side thread data.
- The document-location data is used to remap or reject persisted annotations as the document changes.
- The text snapshot is used for preview and mismatch detection, but it is not sufficient on its own to restore the annotation location.

### Annotation Rendering State

- `NyxAnnotationStatus` is currently `resolved | unresolved`.
- `NyxAnnotationAttachment` is currently `attached | detached`.
- `NyxAnnotationInteraction` is currently `default | hover | focus`.
- The editor renders annotations using the consumer-provided values rather than inventing its own higher-level business states.

### Highlight Styling Surface

- Annotation highlight rendering is owned by `NyxEditor`.
- Consuming projects customize appearance through theme-driven styling hooks exposed by annotation classes and data attributes.
- `annotationStatusTheme` maps `NyxAnnotationStatus` values to `NyxTheme` tokens for highlight styling.
- Consuming projects must not need to replace or duplicate annotation mapping logic in order to brand annotation highlights.

### Overlapping Annotation Behavior

- Overlapping annotations are allowed.
- When annotations overlap, each annotation remains separately addressable by its stable annotation identifier.
- The current implementation contract only guarantees annotation id addressing and focus emission; higher-order overlap precedence rules remain implementation work.

### Key Entities *(include if feature involves data)*

- **NyxAnnotation**: A consumer-supplied annotation record containing `id`, `anchor`, `interaction`, `status`, `attachment`, and optional `tone`.
- **NyxAnnotationAnchor**: The anchor object containing `content`, surrounding context, and editor offsets.
- **Annotation focus/blur payload**: The focused or blurred annotation id emitted as a string.

## Assumptions

- Consuming projects remain responsible for storing comment threads, author data, permissions, and comment lifecycle rules.
- `NyxEditor` is responsible for turning consumer-supplied annotations into inline decorations and focus events.
- Theme mapping between statuses and colors is represented by `annotationStatusTheme`.
- Mixed-content selections are treated as one continuous annotation target when the user creates a single continuous selection.
- The current annotation model keeps `resolved` and `unresolved` as consumer-owned status values rather than editor-derived remapping outcomes.
- The current annotation model keeps `attached` and `detached` as consumer-owned attachment values rather than editor-derived remapping outcomes.
- Structured content, including lists and code blocks, is eligible for comment targeting when included in a continuous user selection.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability review, consuming teams can create and persist a comment from a selection in three steps or fewer without inspecting editor-internal markup.
- **SC-002**: In acceptance testing, 100% of annotations passed through the `annotations` prop render with their annotation id and state metadata exposed on the decoration.
- **SC-003**: In mixed-content selection tests, 95% of comment creation attempts across multi-block selections result in a single emitted `NyxAnnotationAnchor` rather than fragmented or ambiguous targets.
- **SC-004**: In integration testing, consuming projects can distinguish rendered annotations by `interaction`, `status`, and `attachment` without replacing the editor's decoration logic.
