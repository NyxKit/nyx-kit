# Research: NyxLogViewer

**Phase**: 0 — Unknowns resolution  
**Date**: 2026-04-07

---

## Decision 1: Interface naming — NyxLog → NyxLogEntry

**Decision**: Name the log entry interface `NyxLogEntry`, not `NyxLog`.  
**Rationale**: `src/classes/NyxLog.ts` already exports a `NyxLog` class (a static console-formatting utility). Declaring a second `NyxLog` in the component's types file would create a name collision on import. `NyxLogEntry` is unambiguous and follows the `Nyx` prefix convention.  
**Alternatives considered**: `LogEntry` (no Nyx prefix — inconsistent with library conventions), `NyxLogRecord` (too verbose).

---

## Decision 2: NyxTable integration — default slot for custom cell rendering

**Decision**: Pass `NyxLogEntry[]` directly as `NyxTable`'s `v-model` and render all cells via the default slot (`<template #default="{ item }">`). Set `header: false` to suppress headers.  
**Rationale**: NyxTable's default slot receives the processed row object, giving full access to all fields including `theme` and `origin`. This is the only way to apply per-row theme colouring since NyxTable only supports table-level theming natively. The slot replaces NyxTable's auto-cell rendering entirely.  
**Alternatives considered**: Wrapping NyxTable in a plain `<table>` — rejected because NyxTable already handles grid layout, theming tokens, and accessibility markup. Building a fully custom table — rejected as redundant.

---

## Decision 3: NyxTable variant for bare styling

**Decision**: Use `variant="ghost"` on `NyxTable`.  
**Rationale**: `ghost` is the most minimal variant in NyxTable's SCSS — it produces transparent backgrounds and minimal borders, matching the screenshot's bare console aesthetic. `text` variant is even more stripped but may remove spacing that aids readability in a log list.  
**Alternatives considered**: `variant="text"` — considered but `ghost` preserves just enough row separation for dense log data.

---

## Decision 4: Column layout switching

**Decision**: Compute `hasOrigin = computed(() => props.modelValue.some(e => !!e.origin))` and pass either `gridTemplateColumns="auto 1fr"` (two-col) or `gridTemplateColumns="auto auto 1fr"` (three-col) to `NyxTable`. The `v-if="hasOrigin"` on the origin cell matches.  
**Rationale**: `gridTemplateColumns` is a direct NyxTable prop that accepts a CSS grid template string, giving precise control over column widths. `auto` for timestamp and origin keeps them minimal; `1fr` for the value fills remaining space.  
**Alternatives considered**: Using `columns` prop with equal `1fr` fractions — rejected because timestamp and origin should be narrow/auto-sized while value gets all remaining space.

---

## Decision 5: Timestamp formatting — no new dependency

**Decision**: Implement a small internal `formatTimestamp(ts, fmt)` utility that handles the tokens needed by the spec (`HH`, `mm`, `ss`, `DD`, `MM`, `YYYY`) using native `Date` methods. If `timestamp` is already a string, display it as-is. If it is a `Date` or `number`, apply the format string.  
**Rationale**: The project has zero date library dependencies. Adding `date-fns` for `HH:mm:ss` formatting is disproportionate; the Constitution (§IV) requires flagging new dependencies. A 10-line formatter covers the documented use case completely. Consumers who need complex formatting can pre-format the timestamp before binding.  
**Alternatives considered**: `date-fns` — deferred to a future feature if more complex tokens are needed; `Intl.DateTimeFormat` — doesn't accept format strings, only locale options.

---

## Decision 6: Per-row theme colouring — CSS class on value cell

**Decision**: Apply `theme-{value}` class to the `__value` cell's `<NyxTableCell>` wrapper. NyxLogViewer's own SCSS maps these classes to `--nyx-c-{theme}` colours, mirroring the pattern used in NyxIcon and NyxBadge.  
**Rationale**: NyxTable applies theme at the table level only; row-level colouring must be applied to individual cells. Since the theme affects only the value text (not origin or timestamp per the screenshot), scoping it to the value cell is correct. Reusing `theme-{name}` class names avoids inventing a new convention.  
**Alternatives considered**: Inline `color` style — rejected because it bypasses the design token system (Constitution §VI). Passing theme as a NyxTableCell prop — NyxTableCell has no theme prop.

---

## Decision 7: Monospace / tabular-nums on timestamp column

**Decision**: Apply `font-variant-numeric: tabular-nums` and `font-family: var(--nyx-font-family-mono)` to the `__timestamp` cell via SCSS.  
**Rationale**: The screenshot clearly shows a monospace timestamp column. Using the existing `--nyx-font-family-mono` token respects the design system without hardcoding a font name.  
**Alternatives considered**: No special styling — rejected; variable-width timestamps would cause column jitter as values change.

---

## No unresolved unknowns

All decisions documented. Ready for Phase 1.
