# Public Contract: NyxMetricCard

**Type**: Vue 3 component (published npm library)  
**Date**: 2026-04-07

---

## Import

```typescript
import { NyxMetricCard } from 'nyx-kit'
```

---

## Props

```typescript
interface NyxMetricCardProps {
  /** Metric label. Rendered uppercase and muted. Required. */
  title: string

  /** Primary metric value. Rendered large and bright. Required. */
  value: string

  /** Unit appended after value in smaller muted style (e.g. "%", "h", "ms"). */
  unit?: string

  /** Secondary text after value+unit, coloured with resolved theme (e.g. "STABLE"). */
  suffix?: string

  /** Colour theme. Drives indicator border, suffix, and icon colour. */
  theme?: NyxTheme

  /** Lucide kebab-case icon name rendered via NyxIcon (e.g. "wifi", "trending-up"). */
  icon?: string

  /**
   * Visual variant controlling indicator border presence and card fill.
   * Supported: Text (default), Filled, Soft, Subtle, Ghost, Outline.
   */
  variant?: NyxVariant
}
```

---

## Emits

None.

---

## Slots

None.

---

## v-model

Not applicable.

---

## CSS Classes Applied to Root

Classes are applied by `useNyxProps`. Examples:

| Class | Applied when |
|-------|-------------|
| `theme-primary` | `theme="primary"` (or default resolved theme) |
| `variant-text` | `variant` omitted or `NyxVariant.Text` |
| `variant-soft` | `variant="soft"` |
| `variant-subtle` | `variant="subtle"` |
| `variant-ghost` | `variant="ghost"` |
| `variant-outline` | `variant="outline"` |
| `variant-filled` | `variant="filled"` |

---

## Minimal Usage Examples

```vue
<!-- Required props only -->
<NyxMetricCard title="ACTIVE NODES" value="12/12" />

<!-- With unit -->
<NyxMetricCard title="SYSTEM UPTIME" value="182" unit="h" />

<!-- With themed suffix -->
<NyxMetricCard
  title="ACTIVE NODES"
  value="12/12"
  suffix="STABLE"
  theme="success"
  :variant="NyxVariant.Soft"
/>

<!-- With icon -->
<NyxMetricCard
  title="NETWORK LATENCY"
  value="24"
  unit="ms"
  icon="wifi"
  theme="primary"
  :variant="NyxVariant.Soft"
/>

<!-- Filled variant (icon/suffix use default text colour) -->
<NyxMetricCard
  title="CPU LOAD"
  value="42"
  unit="%"
  icon="cpu"
  theme="warning"
  :variant="NyxVariant.Filled"
/>
```

---

## Breaking Change Policy

This component follows the Nyx Kit consumer-library contract (Constitution §IV). All props are additive. Removing or renaming a prop is a breaking change and requires a major version bump.
