# Feature Specification: NyxIcon Component

**Feature Branch**: `009-add-lucide-icon`  
**Created**: 2026-03-31  
**Status**: Draft  
**Input**: User description: "i want to create a NyxIcon component that acts as a simple funnel/wrapper for Lucide (vue) icons.

Important Q: does this compromise some license? I'm not planning on earning money from nyx-kit itself and it's open source (public repo on github)

Notes on the NyxIcon:
- supports a string version "name"
- supports a NyxIconVariant (filled / line / others?) => line is default
- supports a NyxTheme => optional, without, it will use the text color from the css vars)
- other helper props?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Render Lucide Icons (Priority: P1)

As a developer using nyx-kit, I want to render Lucide icons by name, so that I can easily include icons in my Vue applications.

**Why this priority**: This is the core functionality - without it, the component has no purpose.

**Independent Test**: Can be tested by rendering an icon with just a name prop and verifying the correct Lucide component renders.

**Acceptance Scenarios**:

1. **Given** a valid Lucide icon name (e.g., "arrow-right"), **When** passed to NyxIcon as `name="arrow-right"`, **Then** the corresponding Lucide icon renders.
2. **Given** an invalid icon name, **When** passed to NyxIcon, **Then** a fallback or empty state displays without crashing.
3. **Given** no name prop provided, **When** NyxIcon renders, **Then** it renders without error (empty or placeholder).

---

### User Story 2 - Icon Variants (Priority: P1)

As a developer, I want to switch between icon variants (line/filled), so that icons match my design system.

**Why this priority**: Different design systems require different icon styles - this is essential for adoption.

**Independent Test**: Can be tested by setting variant prop and verifying the icon style changes appropriately.

**Acceptance Scenarios**:

1. **Given** `variant="line"` (default), **When** icon renders, **Then** it uses the outline/stroked style.
2. **Given** `variant="filled"`, **When** icon renders, **Then** it uses the filled style.

---

### User Story 3 - Theme Integration (Priority: P2)

As a developer, I want icons to respect theme colors, so they integrate with my application's color scheme.

**Why this priority**: Icons should adapt to the theme system like other Nyx components.

**Independent Test**: Can be tested by applying different NyxTheme values and verifying the icon color changes.

**Acceptance Scenarios**:

1. **Given** a theme prop (e.g., `theme="primary"`), **When** icon renders, **Then** it uses the theme color.
2. **Given** no theme prop, **When** icon renders, **Then** it uses the default text color from CSS variables.

---

### User Story 4 - Size Control (Priority: P2)

As a developer, I want to control icon size, so they fit different UI contexts.

**Why this priority**: Icons need to scale across various use cases (buttons, headers, etc.).

**Independent Test**: Can be tested by setting size prop and verifying the rendered dimensions.

**Acceptance Scenarios**:

1. **Given** a size prop, **When** icon renders, **Then** it renders at the specified dimensions.
2. **Given** no size prop, **When** icon renders, **Then** it uses a sensible default size.

---

### User Story 5 - Internal Migration (Priority: P2)

As a nyx-kit maintainer, I want all internal icon usage to flow through NyxIcon, so there's a single point for theming and icon management.

**Why this priority**: Consistency across the library; enables centralized theme control.

**Independent Test**: Can be verified by checking that no direct imports from `lucide-vue-next` exist in component files (except within NyxIcon itself).

**Acceptance Scenarios**:

1. **Given** existing components using `lucide-vue-next` icons directly, **When** NyxIcon is created, **Then** those components SHOULD be migrated to use NyxIcon.
2. **Given** NyxEditor component, **When** it uses icons, **Then** it uses NyxIcon for consistency.

---

### Edge Cases

- What happens when an icon name maps to a non-existent Lucide icon?
- How does the component handle server-side rendering?
- Does the component work when used inside other Nyx components with different themes?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: NyxIcon MUST accept a `name` prop (string) that maps to a Lucide icon.
- **FR-002**: NyxIcon MUST support a `variant` prop for switching between icon styles (line/filled), defaulting to "line".
- **FR-003**: NyxIcon MUST support an optional `theme` prop that applies NyxTheme color when provided.
- **FR-004**: NyxIcon MUST default to CSS variable text color when no theme is specified.
- **FR-005**: NyxIcon MUST support a `size` prop for controlling icon dimensions.
- **FR-006**: NyxIcon MUST gracefully handle invalid icon names without crashing.
- **FR-007**: NyxIcon MUST be compatible with Vue 3 and work with both @lucide/vue and lucide-vue-next packages.
- **FR-008**: All internal nyx-kit components that currently import icons directly from `lucide-vue-next` MUST be migrated to use NyxIcon.

### Key Entities

- **NyxIcon**: The main component wrapping Lucide icons
- **NyxIconVariant**: Enum defining icon style variants (line, filled)
- **Lucide Icon Library**: External dependency providing the actual icon components

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can render any Lucide icon by providing just its name as a string prop.
- **SC-002**: Icon variant switching works correctly between line and filled styles.
- **SC-003**: Theme integration applies the correct color from the NyxTheme system when provided.
- **SC-004**: Icons render at the specified size or a sensible default (24x24).
- **SC-005**: No runtime errors occur when providing invalid icon names.
- **SC-006**: All internal icon usage in nyx-kit flows through NyxIcon (no direct lucide-vue-next imports in components).
