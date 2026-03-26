# Component API Contract: NyxGrid

**Branch**: `006-add-nyx-grid` | **Date**: 2026-03-26

This document defines the public-facing API contract for `NyxGrid` as a published npm library component. Changes to any item below are breaking changes and must be flagged explicitly.

---

## NyxGrid

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Plain-text header fallback when no `header` slot is provided |
| `mode` | `NyxGridMode` | `NyxGridMode.Grid` | Chooses standard grid placement or masonry compaction |
| `columns` | `number` | `3` | Positive integer column count used by both grid and masonry; invalid values fall back to `3` |
| `gap` | `NyxSize \| number` | `NyxSize.Medium` | Shared spacing between items; token values are scaled 1.5x and numbers are treated as rem units |

### Emits

None.

### Slots

| Slot | Scope | Purpose |
|------|-------|---------|
| `default` | - | Consumer-provided content items to lay out |
| `header` | - | Custom header content; takes precedence over `title` |
| `footer` | - | Optional footer content rendered after the layout stage |

### Structural semantics

| Region | Element | Render rule |
|--------|---------|-------------|
| Root | `<section>` | Always rendered |
| Header | `<header>` | Only when `header` slot exists or `title` is provided |
| Content | `<div>` | Always rendered |
| Footer | `<footer>` | Only when `footer` slot exists |

### CSS classes

| Class | Applied to | Notes |
|-------|-----------|-------|
| `.nyx-grid` | root `<section>` | |
| `.nyx-grid__header` | optional header wrapper | |
| `.nyx-grid__title` | fallback title element | |
| `.nyx-grid__content` | content stage container | |
| `.nyx-grid__item` | internal item wrapper around each top-level slotted child | |
| `.nyx-grid__footer` | optional footer wrapper | |
| `.nyx-grid--grid` | root when `mode='grid'` | |
| `.nyx-grid--masonry` | root when `mode='masonry'` | |

### Behavior notes

| Behavior | Contract |
|----------|----------|
| Invalid `mode` | Falls back to standard grid behavior |
| Invalid `columns` | Falls back to `3` |
| `columns` in masonry | Uses the same column count control as standard grid |
| Numeric `gap` | Treated as a rem value, including `0` for no gap |
| Token `gap` | Uses the selected size token scaled up by 1.5x |
| Empty default slot | Renders an empty content region without placeholder UI |
| Reorder animation | Supported for keyed top-level slot children |
| Content semantics | Determined by the consumer's slotted children, not by `NyxGrid` |
