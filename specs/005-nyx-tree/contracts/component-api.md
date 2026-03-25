# Component API Contract: NyxTree

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24

This document defines the public-facing API contract for `NyxTree` as a published npm library component. Changes to any item below are breaking changes and must be flagged explicitly.

---

## NyxTree

### v-model

| Binding | Type | Required | Description |
|---------|------|----------|-------------|
| `v-model` | `NyxTreeNodeBase[]` | yes | The hierarchical node model to render |

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disables all interaction without removing the tree |

### Emits

| Event | Payload | When |
|-------|---------|------|
| `select` | `NyxTreeNodeBase` | User clicks or activates a node label. The component also mutates the node's `status` to `Active`, clears any previously active sibling, and emits `update:modelValue` with the updated model array. |
| `update:modelValue` | `NyxTreeModel` | Emitted automatically when the component sets or clears `status: Active` on a node. This keeps `v-model` in sync with the selection state. |

### Slots

None in v1.

### CSS classes

| Class | Applied to | Notes |
|-------|-----------|-------|
| `.nyx-tree` | root `<ul>` | |
| `.nyx-tree-node` | each `<li>` | |
| `.nyx-tree-node--branch` | `<li>` with children | |
| `.nyx-tree-node--leaf` | `<li>` with no children | |
| `.nyx-tree-node--expanded` | branch `<li>` when status is `Open` or `Active` | |
| `.nyx-tree-node--active` | `<li>` with `status: Active` | |
| `.nyx-tree-node--disabled` | `<li>` disabled directly or via ancestor/tree state | |
| `.nyx-tree-node__label` | clickable label element inside `<li>` | |
| `.nyx-tree-node__toggle` | branch expand indicator | |
| `.nyx-tree-children` | nested `<ul>` | |

### ARIA

| Element | Role | Attributes |
|---------|------|-----------|
| root `<ul>` | `tree` | `aria-disabled` |
| each `<li>` | `treeitem` | `aria-expanded` (branches only), `aria-selected`, `aria-disabled` |
| nested `<ul>` | `group` | `inert` when collapsed |

---

## NyxTreeNode (internal — not exported)

Internal recursive sub-component. Not part of the public API. Do not import directly.

## NyxTreeNode (class helper — optional)

A helper class is available in `NyxTree.types.ts` for consumers who prefer class-based models. It wraps a `NyxTreeNodeBase` object and provides defaults:

```ts
new NyxTreeNode({ id: 'a', label: 'A', children: [] })
// status: NyxTreeNodeStatus.Closed, disabled: false
```

This class is **not required** — the component accepts plain objects matching `NyxTreeNodeBase` directly.
