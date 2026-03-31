# Data Model: NyxIcon

## Entity: NyxIcon

| Field | Type | Default | Required | Notes |
|-------|------|---------|----------|-------|
| `name` | `string` | — | Yes | Lucide icon name in kebab-case |
| `variant` | `NyxIconVariant` | `'line'` | No | Icon style variant |
| `theme` | `NyxTheme` | — | No | Optional theme color |
| `size` | `NyxSize` | — | No | Optional size token |
| `pixel` | `boolean` | `false` | No | Whether size is in pixels |

## Enum: NyxIconVariant

| Value | Description |
|-------|-------------|
| `line` | Outline/stroked icons (default) |
| `filled` | Filled icons |

## Relationships

- **NyxIcon** uses **NyxTheme** for color application
- **NyxIcon** uses **NyxSize** for dimensions
- **NyxIcon** renders **LucideIcon** (from lucide-vue-next)

## Validation Rules

1. `name` must be a valid Lucide icon name in kebab-case (e.g., "arrow-right")
2. Name is converted to PascalCase via helper: "arrow-right" → "ArrowRight"
3. Variant must be one of: `'line'`, `'filled'`
4. `theme` must be a valid NyxTheme value when provided
5. `size` must be a valid NyxSize value when provided
6. Invalid icon name renders nothing (no crash)

## Implementation Helper

```ts
function toPascalCase(str: string): string {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}
```
