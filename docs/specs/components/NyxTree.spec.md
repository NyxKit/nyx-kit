# NyxTree

> A recursive tree-node component for displaying and navigating hierarchical node data with status-driven expand/collapse and selection support.

## Purpose and scope

NyxTree renders a `NyxTreeNodeBase[]` model as an interactive, hierarchical tree. It is a fully controlled component — all state (expand/collapse, selection) lives in the model. The parent updates node `status` in response to `select` events.

**Use when:**
- You need to display hierarchical data (e.g. file trees, category trees, config namespaces)
- Users must be able to navigate and select items within a nested structure
- You need a sidebar or panel-based navigational component

**Do not use when:**
- The data is flat — a list or `NyxSelect` is more appropriate
- You need drag-and-drop reordering (not supported in v1)
- You need multi-select (not supported in v1)

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `NyxTreeModel` | — | Array of top-level `NyxTreeNodeBase` nodes to render |
| `disabled` | `boolean` | `false` | Disables all interaction on the entire tree |

## Emits

| Event | Payload | Description |
|---|---|---|
| `select` | `NyxTreeNodeBase` | The node that was clicked or activated via keyboard. Emitted after the model has been updated. |
| `update:modelValue` | `NyxTreeModel` | Emitted automatically when the component sets `status: Active` on a node or clears a previously active node. This keeps `v-model` in sync with selection state. |

## v-model

Binds to the `NyxTreeNodeBase[]` model array. The tree renders reactively when any node's properties change.

## Internal architecture

- `NyxTree` renders the root `<ul role="tree">`, exposes tree-level disabled and keyboard handling, and handles node selection
- `NyxTreeNode` is a recursive component — branch nodes (non-empty `children`) render a toggle + nested `<ul role="group">`; leaf nodes render a label only
- Expand/collapse state lives entirely in `node.status` (no internal state); `isExpanded` is computed directly from `node.status`
- Selection is managed by the root: when a node is selected, the root traverses the model, sets `status: Active` on the target node, clears any previously active sibling, reassigns `model.value`, and emits both `select` and `update:modelValue`
- Collapsed children stay mounted and use `inert` + CSS `max-height` / `opacity` transitions for accessibility-safe hiding

## Types

```ts
type NyxTreeModel = NyxTreeNodeBase[]

interface NyxTreeNodeBase {
  id: string
  label: string
  children: NyxTreeNodeBase[]
  status?: NyxTreeNodeStatus
  disabled?: boolean
}

// NyxTreeNode is a class implementing NyxTreeNodeBase with defaults:
//   status = NyxTreeNodeStatus.Closed, disabled = false
// Use plain objects matching NyxTreeNodeBase for model data.

enum NyxTreeNodeStatus {
  Active = 'active',
  Open = 'open',
  Closed = 'closed',
}
```

## CSS classes

| Class | Applied to | Notes |
|---|---|---|
| `.nyx-tree` | root `<ul>` | |
| `.nyx-tree-node` | each `<li>` | |
| `.nyx-tree-node--branch` | `<li>` with non-empty `children` | |
| `.nyx-tree-node--leaf` | `<li>` with empty `children` | |
| `.nyx-tree-node--expanded` | branch `<li>` when `status` is `Open` or `Active` | |
| `.nyx-tree-node--active` | `<li>` with `status: Active` | |
| `.nyx-tree-node--disabled` | `<li>` with `disabled: true` or inside disabled tree | |
| `.nyx-tree-node__label` | clickable label span inside `<li>` | |
| `.nyx-tree-node__toggle` | expand/collapse indicator span (branches only) | |
| `.nyx-tree-children` | nested `<ul>` | Always in DOM; hidden via `inert` + CSS |

## Keyboard behaviour

| Key | Behaviour |
|---|---|
| `Tab` | Focuses the root tree; treeitems are then focused programmatically or by consumer-managed active state |
| `Arrow Down` | Focus next visible node |
| `Arrow Up` | Focus previous visible node |
| `Arrow Right` | Triggers label click on focused node (emits `select`) |
| `Arrow Left` | Triggers label click on focused node (emits `select`) |
| `Enter` / `Space` | Triggers label click on focused node (emits `select`) |

## Accessibility

- Root `<ul>` has `role="tree"`
- Each `<li>` node has `role="treeitem"`
- Nested `<ul>` groups have `role="group"`
- Branch nodes expose `aria-expanded` reflecting expand state
- Active nodes expose `aria-selected="true"`
- Disabled nodes expose `aria-disabled="true"`
- Collapsed children use `inert` to prevent AT/keyboard access to hidden nodes

## Known limitations

- The component manages `status: Active` internally for selection. Consumers who need custom selection logic (e.g. multi-select, custom clear behavior) must intercept the updated model via `v-model` and apply their own mutations before passing the model back.
- Expand/collapse state (`status: Open/Closed`) is fully data-driven and managed by the consumer — the component does not mutate it internally.
- `Arrow Right` and `Arrow Left` emit `select` identically to Enter/Space; precise expand-only / focus-first-child / focus-parent semantics are a future iteration.
- Per-node disabled applies to any `NyxTreeNodeBase` with `disabled: true`; it affects the node and its subtree.
- When no node is `Active`, all treeitems render with `tabindex="-1"`; tests and consumers can still focus items programmatically, but roving-tabindex fallback is not implemented in v1.
- Multi-select is not supported in v1.
- Drag-and-drop reordering is not supported.
- Nodes render only their `label`; rich slot content is planned for a future iteration.
- Async/lazy-loaded child nodes are not supported.
