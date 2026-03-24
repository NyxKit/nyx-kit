# Data Model: NyxTree

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24

---

## Entities

### NyxTreeModel

The input data structure accepted by `NyxTree` via `v-model`.

```ts
type NyxTreeModel = Record<string, string | NyxTreeModel>
```

- Keys are string labels (rendered as node labels)
- Leaf values are strings (rendered as the leaf's value text, currently unused visually but preserved in the model)
- Branch values are nested `NyxTreeModel` objects (recursive)
- Depth is unbounded

**Examples:**

```ts
// Flat (all leaves)
const flat: NyxTreeModel = { Alpha: 'a', Beta: 'b', Gamma: 'c' }

// Nested (branches + leaves)
const nested: NyxTreeModel = {
  Fruits: { Apple: 'apple', Banana: 'banana' },
  Veggies: { Carrot: 'carrot' }
}
```

---

### NyxTreePath

A full path from the root to a specific node, represented as an ordered array of string keys.

```ts
type NyxTreePath = string[]
```

**Examples:**

```ts
['Alpha']             // top-level leaf
['Fruits']            // top-level branch
['Fruits', 'Apple']   // nested leaf
```

---

### NyxTreeProps (component props)

```ts
interface NyxTreeProps {
  disabled?: boolean    // default: false — prevents all interaction
  selected?: string[]   // default: [] — currently selected node path (controlled)
}
```

`v-model` binds to `NyxTreeModel` (the full data object).

---

### NyxTreeEmits (component emits)

```ts
interface NyxTreeEmits {
  (e: 'select', path: string[]): void
}
```

Emitted whenever a node is clicked or activated via keyboard. Carries the full `NyxTreePath` from root to the selected node.

---

### NyxTreeNodeProps (internal sub-component props)

```ts
interface NyxTreeNodeProps {
  label: string                                  // the key for this node in its parent dict
  node: string | NyxTreeModel                    // leaf string or nested object
  path: string[]                                 // full path from root to this node
  selected?: string[]                            // propagated from NyxTree for highlighting
  disabled?: boolean                             // propagated from NyxTree
}
```

---

## State Transitions

### Branch Node (expand/collapse)

```
Initial state: expanded = true

expanded=true  --[click label]--> expanded=false
expanded=false --[click label]--> expanded=true
expanded=true  --[ArrowLeft]----> expanded=false (if focused)
expanded=false --[ArrowRight]---> expanded=true  (if focused)
```

### Selection

```
No selection  --[click node / Enter / Space]--> node selected, 'select' emitted
Node selected --[click different node]---------> previous deselected, new node selected, 'select' emitted
Node selected --[click same node]--------------> 'select' emitted (no toggle in v1)
```

---

## Validation Rules

| Rule | Detail |
|------|--------|
| Model may be empty | `{}` renders an empty `<ul>` with no nodes |
| Leaf values may be empty string | Node still renders with its label |
| Keys may contain any string | No length or character restrictions imposed by the component |
| Depth is unbounded | No artificial depth limit |
| Mixed flat+nested in same object | Supported — each key is independently leaf or branch |
