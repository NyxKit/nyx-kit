# Data Model: NyxMetricCard

**Phase**: 1 — Design & Contracts  
**Date**: 2026-04-07

---

## Component Props

NyxMetricCard has no internal state. All data flows in through props.

### NyxMetricCardProps

| Prop | TypeScript type | Required | Default | Notes |
|------|----------------|----------|---------|-------|
| `title` | `string` | Yes | — | Rendered uppercase + muted (`--nyx-c-text-2`) |
| `value` | `string` | Yes | — | Rendered large + bright (`--nyx-c-text-1`) |
| `unit` | `string` | No | `undefined` | Rendered smaller + muted; displayed immediately after value |
| `suffix` | `string` | No | `undefined` | Rendered using theme colour; displayed after value+unit |
| `theme` | `NyxTheme` | No | Resolved by `useNyxProps` | Applied to indicator, suffix, and icon |
| `icon` | `string` | No | `undefined` | Lucide kebab-case icon name; forwarded to `NyxIcon` with `theme` |
| `variant` | `NyxVariant` | No | `NyxVariant.Text` | Controls indicator visibility and card fill |

### Supported NyxVariant values

| Value | Indicator border | Card background | Icon/suffix colour |
|-------|-----------------|----------------|-------------------|
| `NyxVariant.Text` (default) | Never | Default | Theme |
| `NyxVariant.Soft` | Always | Default | Theme |
| `NyxVariant.Subtle` | Always | Default | Theme |
| `NyxVariant.Ghost` | On hover | Default | Theme |
| `NyxVariant.Outline` | On hover | Default | Theme |
| `NyxVariant.Filled` | Never | Filled with theme | `var(--nyx-c-text-1)` |

---

## DOM Shape

```html
<div class="nyx-metric-card [classList...]">
  <span class="nyx-metric-card__indicator" aria-hidden="true"></span>

  <div class="nyx-metric-card__body">
    <div class="nyx-metric-card__title">{{ title }}</div>

    <div class="nyx-metric-card__row">
      <span class="nyx-metric-card__value">{{ value }}</span>
      <span v-if="unit" class="nyx-metric-card__unit">{{ unit }}</span>
      <span v-if="suffix" class="nyx-metric-card__suffix">{{ suffix }}</span>
      <span v-if="icon" class="nyx-metric-card__icon">
        <NyxIcon :name="icon" :theme="theme" :size="NyxSize.Small" aria-hidden="true" />
      </span>
    </div>
  </div>
</div>
```

---

## CSS Variable Contract

| Variable | Source | Usage |
|----------|--------|-------|
| `--nyx-c-text-1` | `variables.css` | `value` colour |
| `--nyx-c-text-2` | `variables.css` | `title`, `unit` colour |
| `--nyx-c-{theme}` | `variables.css` | Indicator border, suffix colour, icon colour |
| `--nyx-rgb-{theme}` | `variables.css` | Filled background via `rgba(var(--nyx-rgb-{theme}), 1)` |
| `--nyx-c-bg-1` or `--nyx-c-surface` | `variables.css` | Default card background |

---

## Emits

None — NyxMetricCard is read-only.

---

## State Transitions

None — the component holds no mutable internal state.
