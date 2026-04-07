# NyxLogViewer

> A read-only, terminal-style log display component that renders an array of `NyxLog` entries in a bare, header-less table. Automatically switches between a two-column layout (timestamp + value) and a three-column layout (timestamp + origin + value) based on whether any entry carries an origin.

## Purpose and scope

NyxLogViewer is used in monitoring dashboards, debug panels, and event feeds to display a stream of structured log entries. It is deliberately minimal: no chrome, no headers, no interactivity — just the data.

**Use when:**
- You need to display a live or historical list of log entries
- Each entry has a timestamp and a message, optionally tagged with a source and a severity theme

**Do not use when:**
- You need an interactive terminal (input, REPL, command execution)
- You need to display hierarchical or nested log data

## Internal architecture

- Renders via `NyxTable` with headers disabled and bare/minimal cell styling.
- A computed `hasOrigin` flag (true when any entry has a non-empty `origin`) drives the column count.
- Timestamp formatting is handled by a formatting utility accepting the `timestampFormat` prop; defaults to `HH:mm:ss`.
- Each row applies a `theme-{value}` class to the value cell when `theme` is present on the entry.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `NyxLog[]` | Required | Array of log entries to display |
| `timestampFormat` | `string` | `'HH:mm:ss'` | Format string applied to every entry's `timestamp` field |

## NyxLog interface

```typescript
interface NyxLog {
  timestamp: Date | number | string
  value: string
  origin?: string
  theme?: NyxTheme
}
```

## Emits

| Event | Payload | When |
|-------|---------|------|
| `update:modelValue` | `NyxLog[]` | Satisfies the v-model contract; the component does not mutate the array |

## Slots

None.

## v-model

`v-model` binds to `modelValue: NyxLog[]`. The component treats the array as read-only input — it never mutates it internally. `update:modelValue` is emitted to complete the contract but is not triggered by the component itself.

## Column layout

| Condition | Layout |
|-----------|--------|
| No entry has `origin` | 2 columns: timestamp · value |
| At least one entry has `origin` | 3 columns: timestamp · origin · value |

The switch is reactive — changing the bound array triggers an immediate re-evaluation.

## Keyboard behaviour

None — the component is read-only with no interactive elements.

## Accessibility

- The underlying `NyxTable` provides semantic `<table>` markup.
- No `<thead>` is rendered.
- The timestamp column uses tabular-nums styling to keep numeric alignment stable for screen readers and visual users alike.

## Known limitations

- No internal sorting; entries are displayed in array order.
- No virtualization; very large arrays (thousands of entries) may cause rendering performance issues — consumers should slice or paginate the array externally.
- `timestampFormat` is not validated; an invalid format string may produce unexpected output depending on the underlying date library.
