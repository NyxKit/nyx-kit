# NyxTree

> A recursive tree-node component for displaying and navigating nested key-value data with expand/collapse and selection support.

## Purpose and scope

NyxTree renders a nested key-value object as an interactive, hierarchical tree. It exposes a selection event carrying the full root-to-node path, and supports keyboard navigation for accessibility.

**Use when:**
- You need to display hierarchical data (e.g. file trees, category trees, config namespaces)
- Users must be able to navigate and select items within a nested structure
- You need a sidebar or panel-based navigational component

**Do not use when:**
- The data is flat — a list or NyxSelect is more appropriate
- You need drag-and-drop reordering (not supported in v1)
- You need multi-select (not supported in v1)

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `NyxTreeModel` | — | The nested data model to render |
| `selected` | `string[]` | `[]` | Path of the currently selected node; ancestor branches auto-expand |
| `open` | `string[][]` | `[]` | Paths of branch nodes that start expanded (all others start closed) |
| `disabled` | `boolean` | `false` | Disables all interaction on the entire tree |

## Emits

| Event | Payload | Description |
|---|---|---|
| `select` | `string[]` | Full path array from root to the selected node |

## v-model

Binds to the nested data model object. The tree renders reactively when the model changes.

## Internal architecture

- `NyxTree` renders the root `<ul role="tree">` and iterates top-level keys
- `NyxTreeNode` is a recursive component handling each node; leaf nodes render a label, branch nodes render a toggle + nested `<ul role="group">`
- Each `NyxTreeNode` receives a `path` prop (string array) tracking its position in the hierarchy
- Expand/collapse state is a writable computed per branch node instance: priority order is (1) ancestor-of-selected (always open), (2) user-toggled state, (3) `open` prop fallback
- Selection is propagated upward via the `select` emit; no internal selection state is owned by the tree

## Types

```ts
// The path from the root to a node
type NyxTreePath = string[]

// Accepted model shape (recursive interface).
// The `disabled` key is reserved: when set to `true` on a branch node object,
// that branch is rendered as non-interactive and visually dimmed.
// `disabled` is filtered out and never rendered as a visible child node.
interface NyxTreeModel {
  disabled?: boolean
  [key: string]: string | boolean | NyxTreeModel | undefined
}
```

## CSS classes

| Class | Applied to | Notes |
|---|---|---|
| `.nyx-tree` | root `<ul>` | |
| `.nyx-tree-node` | each `<li>` | |
| `.nyx-tree-node--branch` | `<li>` with object value | |
| `.nyx-tree-node--leaf` | `<li>` with string value | |
| `.nyx-tree-node--expanded` | branch `<li>` when open | |
| `.nyx-tree-node--selected` | `<li>` whose path matches `selected` prop | |
| `.nyx-tree-node__label` | clickable label span inside `<li>` | |
| `.nyx-tree-node__toggle` | expand/collapse indicator span (branches only) | |
| `.nyx-tree-node__value` | leaf value span | |
| `.nyx-tree-children` | nested `<ul>` | |

## Keyboard behaviour

| Key | Behaviour |
|---|---|
| `Arrow Down` | Focus next visible node |
| `Arrow Up` | Focus previous visible node |
| `Arrow Right` | Triggers label click on focused node (toggles expand + emits select) |
| `Arrow Left` | Triggers label click on focused node (toggles expand + emits select) |
| `Enter` / `Space` | Triggers label click on focused node (emits `select` with the node's path) |

## Accessibility

- Root `<ul>` has `role="tree"`
- Each `<li>` node has `role="treeitem"`
- Nested `<ul>` groups have `role="group"`
- Branch nodes expose `aria-expanded` reflecting collapse state
- Each node is focusable via `tabindex`

## Known limitations

- All branch nodes are closed by default; use the `open` prop to pre-expand specific nodes, or set `selected` to a deep path — ancestors auto-expand
- `Arrow Right` and `Arrow Left` activate the focused node's label (toggle expand/collapse + emit `select`); precise expand-only / focus-first-child / focus-parent semantics are a future iteration
- Per-node disabled is supported only on branch nodes via `disabled: true` in the model; leaf nodes cannot be individually disabled in v1
- Multi-select is not supported in v1
- Drag-and-drop reordering is not supported
- Leaf values are plain text; rich slot content is planned for a future iteration
- Async/lazy-loaded child nodes are not supported
