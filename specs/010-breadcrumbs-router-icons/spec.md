# Feature Specification: NyxBreadcrumbs Routing and Visual Enhancements

**Feature Branch**: `010-breadcrumbs-router-icons`  
**Created**: 2026-04-02  
**Status**: Draft  
**Input**: User description: "let's work on NyxBreadcrumbs component: allow each breadcrumb, individually, to have an icon; the separator should also be a slot (just one, reused) for custom separators; the separator prop should also allow icon name; the breadcrumb individually should support Vue Router; currently href is optional, keep it like that; add route, also optional, to pass vue router specifics; if route is specified, render a router link instead of an anchor"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate with URL or app route targets (Priority: P1)

As a consumer of the component library, I want each breadcrumb item to support either a standard destination URL or an in-app route target so that the same breadcrumb trail can work for both traditional navigation and route-driven applications.

**Why this priority**: Navigation behavior is the core purpose of breadcrumbs, and route support changes the public contract of each breadcrumb item.

**Independent Test**: Can be fully tested by rendering one breadcrumb trail with plain items, URL-backed items, and route-backed items and verifying each item uses the expected navigation behavior.

**Acceptance Scenarios**:

1. **Given** a breadcrumb item with a label and a destination URL, **When** the breadcrumb trail is rendered, **Then** that item is presented as a standard link using the provided URL.
2. **Given** a breadcrumb item with a label and a route target, **When** the breadcrumb trail is rendered, **Then** that item is presented as route-driven navigation instead of a standard URL link.
3. **Given** a breadcrumb item with both a destination URL and a route target, **When** the breadcrumb trail is rendered, **Then** the route target takes precedence and the item uses route-driven navigation.
4. **Given** a breadcrumb item with only a label and no navigation target, **When** the breadcrumb trail is rendered, **Then** the item remains visible without behaving like a broken link.

---

### User Story 2 - Show icons on selected breadcrumb items (Priority: P2)

As a consumer of the component library, I want to add an icon to individual breadcrumb items so that I can visually distinguish important locations such as home, dashboard, or special sections without forcing icons onto every item.

**Why this priority**: Per-item icon support expands the breadcrumb data model and is a common design requirement, but it is secondary to navigation itself.

**Independent Test**: Can be fully tested by rendering a breadcrumb trail where some items include icons and others do not, and verifying each item shows only the content configured for it.

**Acceptance Scenarios**:

1. **Given** a breadcrumb trail where some items define an icon and others do not, **When** the trail is rendered, **Then** only the configured items display an icon alongside their labels.
2. **Given** a breadcrumb item with an icon and a label, **When** the trail is rendered, **Then** both remain understandable as a single breadcrumb item rather than separate navigation elements.

---

### User Story 3 - Reuse a custom separator across the trail (Priority: P3)

As a consumer of the component library, I want one shared customization point for separators so that I can switch the separator to text, an icon, or custom content without redefining it for every gap in the trail.

**Why this priority**: Separator customization improves visual flexibility, but it does not change the primary navigation flow.

**Independent Test**: Can be fully tested by rendering the same breadcrumb trail three ways: with the default separator, with a separator defined by a prop, and with one shared custom separator slot.

**Acceptance Scenarios**:

1. **Given** a breadcrumb trail that defines a separator as text, **When** the trail is rendered, **Then** the same text separator appears between every adjacent breadcrumb pair.
2. **Given** a breadcrumb trail that defines a separator as an icon identifier, **When** the trail is rendered, **Then** the same icon separator appears between every adjacent breadcrumb pair.
3. **Given** a breadcrumb trail that provides custom separator slot content, **When** the trail is rendered, **Then** that same slot content is reused between every adjacent breadcrumb pair.
4. **Given** custom separator slot content and a separator prop are both provided, **When** the trail is rendered, **Then** the slot content takes precedence for every separator position.

### Edge Cases

- When the breadcrumb trail contains zero or one item, no separator is shown.
- When a breadcrumb item is defined as plain text rather than a structured object, it continues to render as a valid breadcrumb item without icon or navigation behavior.
- When a breadcrumb item includes an icon but no navigation target, the item remains readable and non-broken.
- When a separator prop references an invalid or unavailable icon name, the component falls back to a visible separator state rather than rendering an empty gap.
- When mixed breadcrumb item types are used in the same trail, their order and labels remain unchanged.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow each breadcrumb item to include an optional icon in addition to its label.
- **FR-002**: The system MUST continue to accept breadcrumb items defined as plain text values.
- **FR-003**: The system MUST continue to support an optional destination URL for each breadcrumb item.
- **FR-004**: The system MUST allow each breadcrumb item to define an optional route target for application navigation.
- **FR-005**: The system MUST render a breadcrumb item using route-driven navigation whenever a route target is present.
- **FR-006**: The system MUST treat the route target as the active navigation definition when both a route target and a destination URL are present on the same breadcrumb item.
- **FR-007**: The system MUST render breadcrumb items without either navigation target as non-broken, readable items.
- **FR-008**: The system MUST allow separator customization through a single reusable separator slot that is applied consistently between all adjacent breadcrumb items.
- **FR-009**: The system MUST allow separator customization through a separator prop that supports either text content or an icon identifier.
- **FR-010**: The system MUST apply the same separator presentation to every separator position within a single breadcrumb trail.
- **FR-011**: The system MUST give the separator slot precedence over the separator prop when both are supplied.
- **FR-012**: The system MUST avoid rendering a separator after the final breadcrumb item.
- **FR-013**: The system MUST preserve existing breadcrumb click handling for structured breadcrumb items regardless of whether the item uses a destination URL or a route target.

### Key Entities *(include if feature involves data)*

- **Breadcrumb Item**: A single step in the breadcrumb trail with a required label and optional visual and navigation metadata, including an optional icon, optional destination URL, and optional route target.
- **Separator Definition**: The shared presentation placed between breadcrumb items, supplied either as text, an icon identifier, or custom slot content.
- **Breadcrumb Trail**: The ordered collection of breadcrumb items and the reusable separator behavior applied between adjacent items.

### Assumptions

- Existing string-based breadcrumb items remain supported for backward compatibility and are treated as label-only items.
- Route-based navigation is an additive option and does not remove URL-based navigation support.
- If both a route target and a destination URL are provided for the same item, the route target wins because the user explicitly requested router-first behavior.
- Separator customization is global to the breadcrumb trail, not configurable per separator instance.
- The separator slot is intended to be defined once and reused between all breadcrumb items in the same trail.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, a single breadcrumb trail can include at least five items containing any mix of label-only, URL-backed, and route-backed items, and each item displays the expected navigation behavior.
- **SC-002**: In acceptance testing, 100% of breadcrumb items configured with an icon display both the icon and label, while 100% of items without an icon remain visually valid.
- **SC-003**: Consumers can change separator presentation for an entire breadcrumb trail by defining exactly one separator prop value or exactly one separator slot, with no per-separator duplication required.
- **SC-004**: In acceptance testing, 100% of separators in a trail use the same configured presentation, and 0 separators appear after the final breadcrumb item.
