# Feature Specification: NyxTree — Tree-Node Navigation System

**Feature Branch**: `005-nyx-tree`
**Created**: 2026-03-24
**Status**: Draft
**Input**: User description: "I want to create NyxTree: a tree-node navigational system. There are boilerplate files but no stories."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Display nested data as a labelled tree (Priority: P1)

A developer passes a nested key-value object to NyxTree and sees every node rendered as an indented, labelled tree where branch labels (keys) and leaf labels (keys + values) are both visible.

**Why this priority**: This is the foundational rendering behaviour. The existing boilerplate renders leaf *values* but never shows node *labels/keys*, making the tree unreadable in practice. No other feature is useful without correct display.

**Independent Test**: Mount NyxTree with a two-level nested object and assert that both branch labels and leaf labels appear in the rendered output.

**Acceptance Scenarios**:

1. **Given** a flat model `{ Alpha: 'a', Beta: 'b' }`, **When** the component is mounted, **Then** the tree renders two labelled items showing `Alpha` and `Beta` as node labels.
2. **Given** a nested model `{ Fruits: { Apple: 'apple' } }`, **When** the component is mounted, **Then** `Fruits` is rendered as a branch label and `Apple` as a child leaf label beneath it.
3. **Given** any model, **When** the component renders, **Then** indentation visually communicates depth for each nesting level.

---

### User Story 2 — Expand and collapse branch nodes (Priority: P2)

A user clicks a branch node label to toggle its children open or closed. Branches can be independently expanded or collapsed without affecting siblings or ancestors.

**Why this priority**: Without collapse support the tree becomes cluttered for deeply nested or wide data sets. Expand/collapse is the defining UX behaviour that makes a tree component useful for navigation.

**Independent Test**: Mount NyxTree with a nested model, click a branch label, and assert that child nodes are hidden; click again and assert they are visible.

**Acceptance Scenarios**:

1. **Given** a branch node is collapsed (default state), **When** the user clicks the branch label, **Then** all direct children are revealed.
2. **Given** a branch node is expanded, **When** the user clicks the branch label, **Then** all direct children collapse and are no longer visible.
3. **Given** two sibling branch nodes, **When** one is collapsed, **Then** the other's state is unaffected.
4. **Given** a nested tree with grandchildren, **When** a grandparent branch is collapsed, **Then** the entire sub-tree is hidden regardless of intermediate expand states.

---

### User Story 3 — Select a node and receive its path (Priority: P3)

A user clicks any node (leaf or branch) to select it. The parent application receives a `select` event carrying the full path from the root to the selected node.

**Why this priority**: Selection is what makes NyxTree a *navigational* component rather than a read-only display. It unlocks integration into sidebars, file browsers, and hierarchical menus. The emit signature is already defined in the types but not wired up.

**Independent Test**: Mount NyxTree, click a nested leaf, and assert the emitted `select` payload is an array representing the path from root to that leaf.

**Acceptance Scenarios**:

1. **Given** a flat model `{ Alpha: 'a' }`, **When** the user clicks the `Alpha` leaf, **Then** a `select` event is emitted with payload `['Alpha']`.
2. **Given** a nested model `{ Fruits: { Apple: 'apple' } }`, **When** the user clicks `Apple`, **Then** `select` is emitted with `['Fruits', 'Apple']`.
3. **Given** a branch node `Fruits`, **When** the user clicks `Fruits`, **Then** `select` is emitted with `['Fruits']`.
4. **Given** a selected node, **When** a different node is clicked, **Then** only the newly clicked node is selected and the previous selection is cleared.

---

### User Story 4 — Keyboard navigation (Priority: P4)

A user navigates the visible tree nodes using arrow keys and activates a node using Enter or Space, without using a pointer device.

**Why this priority**: Keyboard navigation is necessary for accessibility and power-user workflows. It is deferred to P4 because P1–P3 must be stable first.

**Independent Test**: Mount NyxTree, focus the component, press Arrow Down, and assert the next visible node receives focus.

**Acceptance Scenarios**:

1. **Given** the tree has focus, **When** Arrow Down is pressed, **Then** focus moves to the next visible node in document order.
2. **Given** the tree has focus, **When** Arrow Up is pressed, **Then** focus moves to the previous visible node.
3. **Given** a focused branch node, **When** Arrow Right is pressed, **Then** the branch label is activated (toggles expand/collapse and emits `select` with the branch path). *(v1 simplification — precise expand-only / focus-first-child behaviour is a future iteration.)*
4. **Given** a focused branch node, **When** Arrow Left is pressed, **Then** the branch label is activated (toggles expand/collapse and emits `select` with the branch path). *(v1 simplification — precise collapse-only / focus-parent behaviour is a future iteration.)*
5. **Given** a focused node, **When** Enter or Space is pressed, **Then** a `select` event is emitted with that node's path.

---

### Edge Cases

- What happens when the model is an empty object `{}`? The tree renders an empty container with no visible items.
- What happens when a leaf value is an empty string? The node is still rendered with its label visible.
- What happens when keys contain special characters or very long strings? The tree renders them without truncation by default; overflow is the consumer's responsibility.
- What happens when the model object is deeply nested (e.g. 10+ levels)? The tree renders correctly; no artificial depth limit is imposed.
- What happens when the model changes reactively? The tree re-renders to reflect the new structure, preserving expand/collapse state for nodes that still exist.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: NyxTree MUST render every key in the model as a visible, labelled node.
- **FR-002**: NyxTree MUST visually indent child nodes relative to their parent branch.
- **FR-003**: Branch nodes MUST be togglable — users MUST be able to expand and collapse them independently.
- **FR-004**: All branch nodes MUST default to collapsed on initial render. An `open` prop MAY be used to pre-expand specific nodes by path.
- **FR-005**: NyxTree MUST emit a `select` event carrying the full root-to-node path whenever a node is clicked or activated via keyboard.
- **FR-006**: NyxTree MUST track a single active selection at a time and communicate it to the parent via `v-model` or a dedicated prop.
- **FR-007**: NyxTree MUST support keyboard navigation: Arrow Up/Down to move focus, Arrow Left/Right to collapse/expand branches, Enter/Space to select.
- **FR-008**: NyxTree MUST be accessible — each node MUST carry an appropriate ARIA tree role, and the root list MUST be identified as a tree container.
- **FR-009**: NyxTree MUST have a Storybook story demonstrating flat data, nested data, and selected-state scenarios.
- **FR-010**: NyxTree MUST expose a `disabled` prop that prevents all interaction without removing the tree from the layout.
- **FR-011**: NyxTree MUST accept an `open` prop (`string[][]`) specifying paths of branch nodes that start expanded; all other branches start collapsed.
- **FR-012**: `NyxTreeModel` MAY include a reserved `disabled: true` key on any branch node object. A branch with this key MUST be non-interactive, visually dimmed, and expose `aria-disabled`. The `disabled` key MUST NOT render as a visible child node.
- **FR-013**: When the `selected` prop points to a node at depth > 1, NyxTree MUST automatically expand all ancestor branches along that path. This expansion MUST react to external changes to the `selected` prop.

### Key Entities

- **TreeNode**: A unit in the hierarchy. Has a label (its key in the model), a value (string if leaf, nested object if branch), a depth level, and a path array from the root.
- **TreePath**: An ordered array of string keys from the root to a specific node (e.g. `['Fruits', 'Apple']`). Used for selection and event payloads.
- **BranchNode**: A TreeNode whose value is a nested object; carries an independent expand/collapse state.
- **LeafNode**: A TreeNode whose value is a primitive string.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can display a two-level nested data object as a readable, labelled tree without writing any custom rendering logic.
- **SC-002**: A user can collapse any branch node to hide its sub-tree with a single click or keypress.
- **SC-003**: A parent component receives the correct path array on every selection event. Clicking a branch emits `select` with that branch's path and independently toggles expand/collapse — both are intentional; neither is spurious.
- **SC-004**: All tree interactions (click, keyboard navigation, expand/collapse) are fully operable without a pointer device.
- **SC-005**: NyxTree passes automated accessibility checks for tree and tree-item ARIA patterns.
- **SC-006**: The component is covered by unit tests for all functional requirements with no regressions in the existing test suite.

## Assumptions

- The model shape is `Record<string, string | Record<string, unknown>>` (established by the existing boilerplate). Mixed depth is supported.
- Expand/collapse state is local to the component instance and is not persisted across renders.
- Selection is single-item only; multi-select is out of scope for this version.
- Leaf values are rendered as plain text; rich slot content can be added in a future iteration.
- Storybook is already configured in this project — no new tooling dependencies are required.
