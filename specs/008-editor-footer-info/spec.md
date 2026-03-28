# Feature Specification: NyxEditor Footer Info

**Feature Branch**: `008-editor-footer-info`  
**Created**: 2026-03-28  
**Status**: Draft  
**Input**: User description: "i made a boilerplate for the editor footer content, by default it will show:
- document structure up until the current caret on the left-hand side of the footer
  => h1 title > h2 title > ul > li [index]
  => h1 title > h2 title > paragraph [index]
- word count on the right-hand side of the footer

this information should also be passed back to the template using the slot for customization"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read document context at the caret (Priority: P1)

As an editor user, I can see the current document path in the footer so I understand where my caret sits inside the document structure while editing.

**Why this priority**: The footer only provides value if it immediately tells the user where they are in the document without extra clicks or inspection.

**Independent Test**: Can be fully tested by moving the caret across headings, paragraphs, and list items and verifying that the footer updates to the correct structural path each time.

**Acceptance Scenarios**:

1. **Given** the caret is inside a paragraph under nested headings, **When** the footer is visible, **Then** the left side shows the heading titles followed by `paragraph N`, where `N` is counted within the current heading section rather than across the whole document.
2. **Given** the caret is inside a list item under nested headings, **When** the footer is visible, **Then** the left side shows the heading titles followed by `list` and `item N`.
3. **Given** the caret moves to a different block, **When** the editor updates the current selection, **Then** the footer reflects the new structural path without requiring manual refresh.

---

### User Story 2 - See document length at a glance (Priority: P2)

As an editor user, I can see the current word count in the footer so I can monitor document length while editing.

**Why this priority**: Word count is a common editorial signal and complements the structural path without changing the editing flow.

**Independent Test**: Can be fully tested by editing text content and verifying that the right side of the footer updates the displayed word count accordingly.

**Acceptance Scenarios**:

1. **Given** the document contains text, **When** the footer renders, **Then** the right side shows the current word count.
2. **Given** the user adds or removes words, **When** the editor content changes, **Then** the word count updates to match the current document content.
3. **Given** the document contains headings, lists, and paragraphs, **When** the footer calculates word count, **Then** the displayed count reflects the full editable document content rather than only the current block.

---

### User Story 3 - Customize footer presentation with slot data (Priority: P3)

As a consuming project, I can receive the footer information through a slot so I can customize how the footer content is rendered without recomputing editor-specific state outside the component.

**Why this priority**: Consumers need flexibility in presentation, but should not have to reproduce caret-path and count logic themselves.

**Independent Test**: Can be fully tested by rendering `NyxEditor` with a footer slot and verifying that the slot receives the same structural path and word-count data shown by the default footer.

**Acceptance Scenarios**:

1. **Given** a consuming project provides a footer slot, **When** the editor renders, **Then** the slot receives the current footer data needed for custom rendering.
2. **Given** the caret moves or document content changes, **When** the footer data updates, **Then** the slot receives the updated values in sync with the default footer state.
3. **Given** no custom slot is provided, **When** the editor renders, **Then** the default footer layout still shows structural path on the left and word count on the right.

---

### Edge Cases

- The caret is inside a heading itself, rather than inside a paragraph or list item below it.
- The caret is inside nested lists and the footer must identify the correct active list type and item index.
- The document is empty or contains only whitespace.
- The caret is inside a paragraph before any heading exists in the document.
- The document structure changes while the caret stays in place, causing the structural path to update.
- A consumer provides a custom footer slot but only uses part of the slot data.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `NyxEditor` MUST render a default footer area.
- **FR-002**: The default footer MUST show the current document structure path on the left side.
- **FR-003**: The document structure path MUST reflect the document hierarchy from the relevant heading context down to the block containing the current caret.
- **FR-004**: For list content, the structure path MUST identify the active list type and the current item index.
- **FR-005**: For paragraph content, the structure path MUST identify the paragraph and its index within the current structural scope.
- **FR-006**: The default footer MUST show the current word count on the right side.
- **FR-007**: Word count MUST update when the editable document content changes.
- **FR-008**: The structural path MUST update when the current caret position changes.
- **FR-009**: `NyxEditor` MUST expose the footer data through a slot so consuming projects can customize footer rendering.
- **FR-010**: The slot payload MUST include both the structural path data and the word-count data shown by the default footer.
- **FR-011**: The default footer MUST still render when no custom slot is provided.
- **FR-012**: The footer feature MUST remain scoped to informational display and slot customization; it MUST NOT require consuming projects to recompute editor structure metadata outside the component.
- **FR-013**: `NyxEditor` MUST cap its overall height at `100dvh` and keep the editable content area scrollable so the footer remains visible at the bottom of the component.

### Key Entities *(include if feature involves data)*

- **Editor Meta**: The current editor footer state, including structural path and word count.
- **Structural Path Segment**: One part of the caret path, such as a heading title, list type, list item index, or paragraph index.
- **Footer Meta Payload**: The data object passed to a consumer-provided footer slot for custom rendering.

## Assumptions

- The footer is visible by default rather than opt-in for the initial feature scope.
- Structural path text uses concise labels: heading titles without literal tag names, `list`, `item N`, and `paragraph N`.
- Word count is based on the editable document text rather than raw serialized markup.
- The slot is intended for custom presentation, not for replacing editor-internal footer calculations.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, users can identify the current caret location within the document structure from the footer in 100% of tested heading, paragraph, and list scenarios.
- **SC-002**: In acceptance testing, the footer updates structural path information immediately after caret movement across tested document blocks without requiring manual refresh.
- **SC-003**: In editing regression tests, word count updates correctly after text insertion and deletion in 100% of covered scenarios.
- **SC-004**: In integration testing, consuming projects can render a custom footer from slot payload data without reimplementing editor-side structure parsing.
