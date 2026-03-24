# Component API Contract: NyxTree

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24

This document defines the public-facing API contract for `NyxTree` as a published npm library component. Changes to any item below are breaking changes and must be flagged explicitly.

---

## NyxTree

### v-model

| Binding | Type | Required | Description |
|---------|------|----------|-------------|
| `v-model` | `Record<string, string \| Record<string, unknown>>` | yes | The nested data object to render |

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disables all interaction without removing the tree |
| `selected` | `string[]` | `[]` | The currently selected node path (controlled — consumer owns state) |

### Emits

| Event | Payload | When |
|-------|---------|------|
| `select` | `string[]` | User clicks or activates a node; payload is the full root-to-node path |

### Slots

None in v1.

### CSS classes

| Class | Applied to | Notes |
|-------|-----------|-------|
| `.nyx-tree` | root `<ul>` | |
| `.nyx-tree-node` | each `<li>` | |
| `.nyx-tree-node--branch` | `<li>` with children | |
| `.nyx-tree-node--leaf` | `<li>` with string value | |
| `.nyx-tree-node--expanded` | branch `<li>` when open | |
| `.nyx-tree-node--selected` | `<li>` whose path matches `selected` prop | |
| `.nyx-tree-node__label` | clickable label element inside `<li>` | |
| `.nyx-tree-children` | nested `<ul>` | |

### ARIA

| Element | Role | Attributes |
|---------|------|-----------|
| root `<ul>` | `tree` | — |
| each `<li>` | `treeitem` | `aria-expanded` (branches only), `aria-selected` |
| nested `<ul>` | `group` | — |

---

## NyxTreeNode (internal — not exported)

Internal recursive sub-component. Not part of the public API. Do not import directly.
