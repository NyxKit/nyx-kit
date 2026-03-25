# Feature Specification: NyxTree — Tree-Node Navigation System

**Feature Branch**: `005-nyx-tree`
**Created**: 2026-03-24
**Status**: Draft
**Input**: User description: "I want to create NyxTree: a tree-node navigational system. There are boilerplate files but no stories."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Display hierarchical node data as a labelled tree (Priority: P1)

A developer passes a `NyxTreeNodeBase[]` model to NyxTree and sees every node rendered as an indented, labelled tree where both branch and leaf labels are visible.

**Why this priority**: This is the foundational rendering behaviour. No selection or navigation feature matters if the tree does not clearly render node labels and depth.

**Independent Test**: Mount NyxTree with a two-level node model and assert that both branch labels and leaf labels appear in the rendered output.

**Acceptance Scenarios**:

1. **Given** a flat model `[{ id: 'alpha', label: 'Alpha', children: [] }, { id: 'beta', label: 'Beta', children: [] }]`, **When** the component is mounted, **Then** the tree renders two labelled items showing `Alpha` and `Beta`.
2. **Given** a nested model `[{ id: 'fruits', label: 'Fruits', children: [{ id: 'apple', label: 'Apple', children: [] }] }]`, **When** the component is mounted, **Then** `Fruits` is rendered as a branch label and `Apple` as a child leaf label beneath it.
3. **Given** any model, **When** the component renders, **Then** indentation visually communicates depth for each nesting level.

---

### User Story 2 — Render branch state from node status (Priority: P2)

A parent application marks branch nodes as `Open`, `Closed`, or `Active`, and NyxTree renders each branch's expanded state from that status without keeping duplicate internal state.

**Why this priority**: Expand/collapse is the defining UX behaviour that makes a tree useful for navigation, and in this implementation it is fully controlled by the parent model.

**Independent Test**: Mount NyxTree with a nested model, set one branch to `Open`, and assert its children are visible while a sibling branch with no status remains collapsed.

**Acceptance Scenarios**:

1. **Given** a branch node has no `status`, **When** the component renders, **Then** the branch is treated as `Closed` and its child group is visually collapsed.
2. **Given** a branch node has `status: Open`, **When** the component renders, **Then** its child group is visible and `aria-expanded="true"` is exposed.
3. **Given** a branch node has `status: Active`, **When** the component renders, **Then** the branch is both selected and expanded.
4. **Given** two sibling branch nodes, **When** one node's status changes, **Then** the sibling's rendered state is unaffected.

---

### User Story 3 — Select a node and receive the node object (Priority: P3)

A user clicks any node (leaf or branch) to select it. The parent application receives a `select` event carrying the full `NyxTreeNodeBase` object for the activated node.

**Why this priority**: Selection is what makes NyxTree a navigational component rather than a read-only display. The parent can then decide how selection and branch state should update.

**Independent Test**: Mount NyxTree, click a nested leaf, and assert the emitted `select` payload includes that node's `id` and `label`.

**Acceptance Scenarios**:

1. **Given** a flat leaf node `{ id: 'alpha', label: 'Alpha', children: [] }`, **When** the user clicks `Alpha`, **Then** a `select` event is emitted with that node object.
2. **Given** a nested model containing `{ id: 'apple', label: 'Apple', children: [] }`, **When** the user clicks `Apple`, **Then** `select` is emitted with the `Apple` node object.
3. **Given** a branch node `Fruits`, **When** the user clicks `Fruits`, **Then** `select` is emitted with the `Fruits` node object.
4. **Given** a selected node, **When** the parent updates a different node to `status: Active`, **Then** only the newly active node is rendered as selected.

---

### User Story 4 — Keyboard navigation (Priority: P4)

A user navigates the visible tree nodes using arrow keys and activates a node using Enter or Space, without using a pointer device.

**Why this priority**: Keyboard navigation is necessary for accessibility and power-user workflows. It is deferred to P4 because P1–P3 must be stable first.

**Independent Test**: Mount NyxTree, focus a tree item, press Arrow Down, and assert the next visible node receives focus.

**Acceptance Scenarios**:

1. **Given** a tree item has focus, **When** Arrow Down is pressed, **Then** focus moves to the next visible node in document order.
2. **Given** a tree item has focus, **When** Arrow Up is pressed, **Then** focus moves to the previous visible node.
3. **Given** a focused branch node, **When** Arrow Right is pressed, **Then** the branch label is activated and emits `select` for that node. *(v1 simplification — precise expand-only / focus-first-child behaviour is a future iteration.)*
4. **Given** a focused branch node, **When** Arrow Left is pressed, **Then** the branch label is activated and emits `select` for that node. *(v1 simplification — precise collapse-only / focus-parent behaviour is a future iteration.)*
5. **Given** a focused node, **When** Enter or Space is pressed, **Then** a `select` event is emitted with that node object.

---

### Edge Cases

- What happens when the model is an empty array `[]`? The tree renders an empty container with no visible items.
- What happens when a node label is an empty string? The node still renders; consumers own label quality.
- What happens when labels contain special characters or very long strings? The tree renders them without truncation by default; overflow is the consumer's responsibility.
- What happens when the model is deeply nested (e.g. 10+ levels)? The tree renders correctly; no artificial depth limit is imposed.
- What happens when the model changes reactively? The tree re-renders to reflect the new structure, and rendered expand/select state follows the updated node `status` values.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: NyxTree MUST render every node in the model array as a visible, labelled node using the node's `label` field.
- **FR-002**: NyxTree MUST visually indent child nodes relative to their parent branch.
- **FR-003**: Branch nodes (nodes with `children.length > 0`) are expanded or collapsed based on their `status` field.
- **FR-004**: Nodes default to `NyxTreeNodeStatus.Closed` when no `status` is provided. A node with `status: Open` or `status: Active` renders as expanded.
- **FR-005**: NyxTree MUST emit a `select` event carrying the `NyxTreeNodeBase` object whenever a node is clicked or activated via keyboard. The component also mutates the clicked node's `status` to `Active`, clears any previously active sibling node, and emits `update:modelValue` with the updated model array so the change propagates through `v-model`.
- **FR-006**: Selection is data-driven — a node with `status: Active` is rendered as selected. The component manages active-state transitions internally on selection; consumers may also set `status: Active` directly in their model.
- **FR-007**: NyxTree MUST support keyboard navigation: Arrow Up/Down to move focus, Arrow Left/Right/Enter/Space to activate the focused node's label.
- **FR-008**: NyxTree MUST be accessible — each node MUST carry appropriate ARIA tree roles (`role=treeitem`, `aria-expanded`, `aria-selected`, `aria-disabled`), and the root list MUST have `role=tree`.
- **FR-009**: NyxTree MUST have Storybook stories demonstrating flat data, nested data, status-driven expand/select, interactive selection, node-level disabled state, and fully disabled tree state.
- **FR-010**: NyxTree MUST expose a `disabled` prop that prevents all interaction without removing the tree from the layout.
- **FR-011**: Branch labels MAY emit `select` without mutating branch status internally; parents are responsible for updating branch `status` if click should toggle open/closed state.
- **FR-012**: Any `NyxTreeNodeBase` MAY include `disabled: true`. A disabled node MUST be non-interactive, visually dimmed, and expose `aria-disabled="true"`.

### Key Entities

- **NyxTreeNodeBase**: The plain-object interface for a tree node — `{ id, label, children: NyxTreeNodeBase[], status?, disabled? }`.
- **NyxTreeNode**: Optional class helper that wraps a plain `NyxTreeNodeBase` object, providing defaults (`status: Closed`, `disabled: false`) for consumers who prefer class-based models. The component itself accepts plain `NyxTreeNodeBase` objects — this class is not required to use the component.
- **NyxTreeNodeStatus**: Enum — `Active` (selected; branch also shows as expanded), `Open` (branch expanded, not selected), `Closed` (default).
- **BranchNode**: A `NyxTreeNodeBase` with `children.length > 0`.
- **LeafNode**: A `NyxTreeNodeBase` with `children.length === 0`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can display a nested `NyxTreeNodeBase[]` model as a readable, labelled tree without writing custom rendering logic.
- **SC-002**: A parent can expand or collapse any branch node by updating its `status` to `Open`, `Closed`, or `Active` in response to a `select` event.
- **SC-003**: A parent component receives the full `NyxTreeNodeBase` object on every `select` event. The component emits on every click or keyboard activation of a node label.
- **SC-004**: All tree interactions (click, keyboard navigation) are operable without a pointer device.
- **SC-005**: NyxTree passes automated accessibility checks for tree and tree-item ARIA patterns.
- **SC-006**: The component is covered by unit tests for all functional requirements with no regressions in the existing test suite.

## Assumptions

- The model shape is `NyxTreeNodeBase[]` — an explicit array of node objects with `id`, `label`, `children`, optional `status`, and optional `disabled`.
- Expand/collapse state lives in the model (`status: Open/Closed`). The component renders it without maintaining internal expand state.
- Selection state is managed by the component: clicking or activating a node sets `status: Active` on that node, clears any previously active sibling, and emits `update:modelValue`. Consumers can also set `status: Active` directly in the model.
- Selection is single-item only; multi-select is out of scope for this version.
- Nodes render only their `label`; rich slot content can be added in a future iteration.
- Storybook is already configured in this project — no new tooling dependencies are required.
