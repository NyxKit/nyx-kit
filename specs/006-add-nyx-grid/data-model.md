# Data Model: NyxGrid

**Branch**: `006-add-nyx-grid` | **Date**: 2026-03-26

---

## Entities

### NyxGridProps

```ts
interface NyxGridProps {
  title?: string
  mode?: 'grid' | 'masonry'
  columns?: number
  gap?: NyxSize
}
```

- `title` renders only when the `header` slot is absent
- `mode` defaults to `'grid'`
- `columns` defaults to `3` after sanitization
- `gap` defaults to `NyxSize.Medium`

---

### NyxGridMode

```ts
enum NyxGridMode {
  Grid = 'grid',
  Masonry = 'masonry',
}
```

- `grid` places items row-by-row into equal-width tracks
- `masonry` places each next item into the shortest current column

---

### GridRegion

```ts
type GridRegion = 'header' | 'content' | 'footer'
```

- `header` is optional
- `content` is always rendered
- `footer` is optional

---

### NormalizedGridItem

Internal view-model derived from top-level default-slot VNodes.

```ts
interface NormalizedGridItem {
  key: string | number
  order: number
  width: number
  height: number
  x: number
  y: number
}
```

- `key` comes from `vnode.key` when available; fallback generation is internal only
- `order` always reflects original slot order
- `width`, `height`, `x`, and `y` are computed layout values, not public API

---

### LayoutSnapshot

Internal measurement state used to animate reflow.

```ts
interface LayoutSnapshot {
  containerHeight: number
  columns: number
  gapPx: number
  items: NormalizedGridItem[]
}
```

---

## State Transitions

### Header resolution

```text
header slot present -> render slot content
header slot absent + title present -> render title text
neither present -> omit header wrapper
```

### Footer resolution

```text
footer slot present -> render footer wrapper
footer slot absent  -> omit footer wrapper
```

### Layout mode resolution

```text
mode omitted / invalid -> 'grid'
mode 'grid'           -> row-first column placement
mode 'masonry'        -> shortest-column placement
```

### Column resolution

```text
columns omitted          -> 3
columns positive integer -> use as-is
columns invalid          -> 3
```

### Reflow cycle

```text
slot items change / container resizes / item height changes
-> measure rendered items
-> compute next LayoutSnapshot
-> animate wrappers from previous positions to next positions
```

---

## Validation Rules

| Rule | Detail |
|------|--------|
| Default slot may be empty | Component still renders the content region |
| Header slot wins over title | No duplicate title output |
| Footer is slot-only | No footer prop is supported |
| Arbitrary child markup is allowed | The component never requires a specific item object shape |
| Stable top-level keys are recommended | Reorder animation fidelity depends on keyed slot children |
| DOM order stays stable | Visual layout may reposition items, but source order is unchanged |
