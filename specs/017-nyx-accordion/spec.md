# Feature Specification: NyxAccordion

**Feature Branch**: `017-nyx-accordion`  
**Created**: 2026-09-12  
**Status**: Draft, specification only  
**Input**: Add an accordion, consider sharing panel/slot logic with NyxTabs, close siblings by default, and support one open item ID or multiple IDs without requiring a bound model.

**Authoritative component contract**: [NyxAccordion.spec.md](../../docs/specs/components/NyxAccordion.spec.md). API details, normalization, slots, examples, reuse boundaries, and implementation validation live there.

## User Scenarios & Testing

### User Story 1 - Expand one section without managing state (Priority: P1)

A developer supplies sections and content. Users open and close sections without requiring application-managed state.

**Why this priority**: Delivers the default accordion behavior with minimal setup.

**Independent Test**: Render an unbound accordion with three sections and toggle two headers in sequence.

**Acceptance Scenarios**:

1. **Given** no initial open state, **When** the accordion appears, **Then** all bodies are collapsed.
2. **Given** A is open, **When** B opens, **Then** A closes and B opens in one state transition.
3. **Given** B is open, **When** B is activated again, **Then** all sections are collapsed.
4. **Given** an edited form control in a body, **When** the body closes and reopens, **Then** its local value is retained.

### User Story 2 - Keep several sections open (Priority: P1)

A developer enables multiple expansion so users can compare content, with or without application-managed state.

**Why this priority**: Configurable automatic closing is central to the request.

**Independent Test**: Enable multiple expansion and open A followed by B, with and without a bound model.

**Acceptance Scenarios**:

1. **Given** multiple expansion is enabled, **When** A and B open, **Then** both remain expanded.
2. **Given** A and B are open, **When** B closes, **Then** A remains open.
3. **Given** no model is supplied, **When** multiple expansion is enabled, **Then** independent expansion still works.

### User Story 3 - Observe and control open sections (Priority: P2)

A developer binds an open item ID or an array of IDs to coordinate expansion with application state.

**Why this priority**: Supports initial expansion, external resets, and application workflows.

**Independent Test**: Supply initial state, toggle an item, then replace the bound state externally in each mode.

**Acceptance Scenarios**:

1. **Given** initial valid IDs, **When** the accordion renders, **Then** the corresponding sections expand according to the configured mode.
2. **Given** a bound model, **When** a user toggles a section, **Then** exactly one update contains the mode's scalar or array value without mutating a supplied array.
3. **Given** an external state change or reset, **When** it is received, **Then** sections update without an echo update event.
4. **Given** several open IDs, **When** mode changes to single, **Then** only the first valid ID remains visibly open, following the component contract's normalization rules.

### User Story 4 - Customize content consistently (Priority: P2)

A developer provides shared content renderers and per-item overrides. Existing tab consumers retain their working content definitions if rendering internals are shared.

**Why this priority**: Predictable slots reduce template repetition.

**Independent Test**: Supply shared header/body content and one per-item override; check every item and its slot scope. Exercise tab stories if internals change.

**Acceptance Scenarios**:

1. **Given** shared renderers, **When** items render, **Then** each receives item data, index, open state, and effective disabled state.
2. **Given** a per-item override, **When** that region renders, **Then** its override takes precedence over the shared renderer.
3. **Given** no custom header, **When** an item renders, **Then** its label becomes the trigger text.
4. **Given** an existing NyxTabs consumer, **When** shared internals are introduced, **Then** its API, content, mounted state, and layout continue to work.

### User Story 5 - Operate sections with a keyboard (Priority: P1)

Keyboard and assistive-technology users can discover headers, toggle sections, and reach expanded content.

**Why this priority**: Accessible operation belongs in the initial contract.

**Independent Test**: Navigate sections containing disabled items, nested content, and form controls using only the keyboard.

**Acceptance Scenarios**:

1. **Given** an enabled focused header, **When** Enter or Space is pressed, **Then** it toggles once without submitting a containing form.
2. **Given** collapsed and expanded bodies, **When** the user tabs through them, **Then** only expanded-body controls are reachable.
3. **Given** a disabled header, **When** activation is attempted, **Then** state does not change.
4. **Given** focus inside a body, **When** an external update hides or removes it, **Then** focus recovers to an available header or the root fallback defined in the component contract.

### Edge Cases

- Empty items: optional empty content, with no fabricated triggers or panels.
- Blank IDs: skip; duplicate IDs: retain the first descriptor. Report invalid descriptors in development.
- Unknown/repeated open IDs: ignore unknown IDs and deduplicate without modifying parent arrays.
- Scalar/array mismatch: configured mode wins; normalize deterministically as specified in the component contract.
- Mode changes and removed/reordered items: preserve valid identity and avoid update feedback loops.
- Disabled open items: prevent user toggling but permit external state changes and automatic sibling closing.
- Missing body: render an empty body without developer instructions in the product UI.
- Nested accordions, multiple instances, and unusual IDs: isolate keyboard handling and maintain unique DOM relationships.

## Assumptions and Decisions

- Single expansion is the default; zero open items is allowed. Start fully collapsed unless initial state is supplied.
- Mode is explicit, not inferred from model shape, so multiple expansion also works unbound.
- Items have stable IDs, labels, and optional disabled state. Relabeling does not change identity.
- Bodies retain mounted local state while collapsed.
- Evaluate private panel reuse with NyxTabs during planning; no new public panel or renamed tab slots are required.
- This step creates a branch and draft specifications. Implementation follows separately.

## Requirements

### Functional Requirements

- **FR-001**: Provide ordered collapsible sections with stable identity and meaningful header labels (Stories 1, 4).
- **FR-002**: Close siblings by default and allow the last section to close (Story 1).
- **FR-003**: Allow independent multiple expansion through explicit configuration, including without bound state (Story 2).
- **FR-004**: Support optional scalar or array open state according to mode (Story 3).
- **FR-005**: Honor external state and emit one canonical value per successful user toggle without mutation or normalization feedback (Story 3).
- **FR-006**: Provide shared header/body renderers and deterministic per-item overrides (Story 4).
- **FR-007**: Retain body-local state while collapsed and exclude collapsed content from focus/accessibility navigation (Stories 1, 5).
- **FR-008**: Provide keyboard activation, expanded-state semantics, isolated header navigation, disabled handling, and focus recovery (Story 5; component contract).
- **FR-009**: Handle invalid/empty data, mode changes, and dynamic items according to the edge cases and component contract (Story 3).
- **FR-010**: Integrate existing theme/size defaults and validate supported colour modes (component contract validation).
- **FR-011**: Assess useful tab-panel/slot reuse while preserving the NyxTabs public contract (Story 4).
- **FR-012**: Deliver documentation, stories, public type exports, and behavioral validation with implementation (component contract validation).

### Key Entities

- **Item**: Stable ID, label, and optional disabled state.
- **Expansion state**: Zero or one open ID, or ordered open IDs in multiple mode.
- **Header**: Component-owned activation control with customizable content.
- **Body**: Per-item content retained while collapsed.

## Success Criteria

- **SC-001**: Consumers can use either mode without parent state, demonstrated by two standalone examples.
- **SC-002**: All specified transitions display expected sections and report expected state in bound and unbound examples.
- **SC-003**: A shared renderer and one override render all items without a distinct template for every section.
- **SC-004**: Every enabled section is keyboard-operable; collapsed-body controls are unreachable through sequential keyboard navigation.
- **SC-005**: Existing tab examples require zero consumer API changes if internals are shared.

## Out of Scope

Horizontal accordions, model-type inference, mandatory-open mode, lazy mounting/unmount-on-close, expand/collapse-all controls, public item/panel primitives, animation configuration, and unrelated tab fixes.
