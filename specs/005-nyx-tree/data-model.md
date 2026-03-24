# Data Model: NyxTree

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24

---

## Entities

### NyxTreeModel

The input data structure accepted by `NyxTree` via `v-model`.

```ts
type NyxTreeModel = NyxTreeNodeBase[]
```

- Top-level data is an ordered array of nodes
- Each node has a stable `id`, display `label`, and recursive `children`
- Expand/select state is derived from optional `status`
- Disabled state is derived from optional `disabled`
- Depth is unbounded

**Examples:**

```ts
const flat: NyxTreeModel = [
  { id: 'alpha', label: 'Alpha', children: [] },
  { id: 'beta', label: 'Beta', children: [] },
]

const nested: NyxTreeModel = [
  {
    id: 'fruits',
    label: 'Fruits',
    status: NyxTreeNodeStatus.Open,
    children: [
      { id: 'apple', label: 'Apple', children: [] },
      { id: 'banana', label: 'Banana', children: [] },
    ],
  },
]
```

---

### NyxTreeNodeBase

```ts
interface NyxTreeNodeBase {
  id: string
  label: string
  children: NyxTreeNodeBase[]
  status?: NyxTreeNodeStatus
  disabled?: boolean
}
```

---

### NyxTreeNodeStatus

```ts
enum NyxTreeNodeStatus {
  Active = 'active',
  Open = 'open',
  Closed = 'closed',
}
```

- `Closed` is the default when status is omitted
- `Open` expands a branch without selecting it
- `Active` selects a node and also expands it when the node is a branch

---

### NyxTreeProps

```ts
interface NyxTreeProps {
  disabled?: boolean
}
```

`v-model` binds to `NyxTreeModel`.

---

### NyxTreeEmits

```ts
interface NyxTreeEmits {
  (e: 'select', node: NyxTreeNodeBase): void
}
```

Emitted whenever a node label is clicked or activated via keyboard. Carries the full node object.

---

## State Transitions

### Branch rendering

```text
status omitted / Closed -> branch renders collapsed
status Open            -> branch renders expanded
status Active          -> branch renders expanded and selected
```

### Selection

```text
Click / Enter / Space on node -> 'select' emitted with node object
Parent updates node.status    -> tree re-renders to show new active/open state
```

---

## Validation Rules

| Rule | Detail |
|------|--------|
| Model may be empty | `[]` renders an empty `<ul>` with no nodes |
| Labels may be empty strings | Node still renders |
| Labels may contain any string | No length or character restrictions imposed by the component |
| Depth is unbounded | No artificial depth limit |
| Mixed branch/leaf arrays | Supported — each node is evaluated independently |
| Disabled nodes cascade | A node with `disabled: true` disables itself and its subtree |
