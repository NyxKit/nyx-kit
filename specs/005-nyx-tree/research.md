# Research: NyxTree — Tree-Node Navigation System

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24

---

## Finding 1: ARIA Tree Pattern

**Decision**: Use the WAI-ARIA tree pattern with `role="tree"` on the root `<ul>`, `role="treeitem"` on each `<li>`, and `role="group"` on nested `<ul>` children.

**Rationale**: This communicates hierarchical structure and branch expansion state correctly to assistive technology.

**Alternatives considered**: Plain list semantics were rejected because they lose tree-specific hierarchy and expansion meaning.

---

## Finding 2: Keyboard Navigation Strategy

**Decision**: Handle keyboard navigation on the root `<ul>` with a local `@keydown` handler.

**Rationale**: Tree keyboard behavior must be scoped to the focused tree, and root-local handling keeps the behavior simple and colocated with the component.

**Alternatives considered**: Global key handlers and shortcut composables were rejected because they are either too broad or too indirect for this widget pattern.

---

## Finding 3: Focus Management

**Decision**: Use programmatic focus movement between visible `treeitem` elements and derive `tabindex="0"` from `status: Active`.

**Rationale**: This keeps active state data-driven while still allowing Arrow Up/Down focus movement for visible items.

**Alternatives considered**: Full roving-tabindex fallback when no node is active was deferred for v1.

---

## Finding 4: Expand/Collapse State Ownership

**Decision**: Keep expand/collapse state in the model via `NyxTreeNodeStatus`, not in local component refs.

**Rationale**: The shipped implementation is fully controlled. This avoids duplicate state and keeps selection/expansion synchronized through one source of truth.

**Alternatives considered**: Local per-node `ref<boolean>` state was rejected because it conflicts with the controlled model design.

---

## Finding 5: Node Label Display

**Decision**: Render `node.label` directly from each `NyxTreeNodeBase`.

**Rationale**: The canonical data model already carries human-readable labels, so no key-extraction shim is needed.

**Alternatives considered**: Slot-based label rendering was deferred to a future iteration.

---

## Finding 6: Selection Communication

**Decision**: Emit `select` with the full `NyxTreeNodeBase` object on every click or keyboard activation.

**Rationale**: This matches the shipped type contract and gives the parent enough context to update `status`, routing, or detail panels without reconstructing a node from a path.

**Alternatives considered**: Emitting `string[]` paths was rejected because the implementation and canonical types already center the node object.

---

## Finding 7: Storybook Story Pattern

**Decision**: Follow the existing `defineComponent` story factory pattern used elsewhere in Nyx Kit.

**Rationale**: This keeps NyxTree consistent with sibling components and makes interactive stories straightforward.

**Alternatives considered**: CSF3 object syntax was rejected because the codebase has not adopted it as the default pattern.

---

## Finding 8: NyxTreeNode Export

**Decision**: `NyxTreeNode` remains an internal sub-component and is not exported from the public component index.

**Rationale**: It is a recursive implementation detail, not a standalone consumer-facing API surface.

**Alternatives considered**: Public export for customization was deferred to a future slot-driven design.
