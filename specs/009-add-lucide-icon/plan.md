# Implementation Plan: NyxIcon Component

**Branch**: `009-add-lucide-icon` | **Date**: 2026-03-31 | **Spec**: specs/009-add-lucide-icon/spec.md

**Input**: Feature specification from `/specs/009-add-lucide-icon/spec.md`

## Summary

Create a `NyxIcon` component that wraps Lucide Vue icons. Supports string-based icon names, variant switching (line/filled), optional theme coloring, and size control. Uses `lucide-vue-next` (already in dependencies).

### Internal Migration Scope

The following components currently use `lucide-vue-next` directly and must be migrated:

| Component | Icons Used |
|-----------|------------|
| `NyxEditor.vue` | `ChevronRight`, `FileCode` |
| `NyxEditorToolbarContent.vue` | Multiple toolbar icons |

After migration, no component should directly import from `lucide-vue-next` except `NyxIcon` itself.

## Technical Context

**Language/Version**: TypeScript + Vue 3.5+  
**Primary Dependencies**: `lucide-vue-next` (already installed), Vue 3  
**Testing**: Vitest (unit), Storybook (component API)  
**Target Platform**: Vue 3 SPA/library consumers  
**Project Type**: Vue 3 Component Library (`nyx-kit`)  
**Performance Goals**: Minimal bundle impact - tree-shakeable  
**Constraints**: Must maintain backward compatibility with existing Nyx components  
**Scale/Scope**: Single component, 1 entity type

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Docs before code | ✅ | Will create `docs/specs/components/NyxIcon.spec.md` before implementation |
| Living spec sync | ✅ | Component spec will stay in sync with implementation |
| Design tokens | ✅ | Uses existing CSS variables for theming |
| Consistency | ✅ | Follows existing Nyx component patterns (useNyxProps, etc.) |

## Project Structure

### Documentation (this feature)

```text
specs/009-add-lucide-icon/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (component library, no external APIs)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── NyxIcon/
│       ├── NyxIcon.vue
│       ├── NyxIcon.types.ts
│       └── NyxIcon.stories.ts
├── types/
│   └── common.ts         # Will add NyxIconVariant enum
```

**Structure Decision**: Adding `NyxIconVariant` to existing `src/types/common.ts`. Creating component folder under `src/components/NyxIcon/` following existing pattern.

---

## Phase 1: Design

### Data Model

**Entity: NyxIcon**

| Field | Type | Default | Required | Notes |
|-------|------|---------|----------|-------|
| `name` | `string` | — | Yes | Lucide icon name (kebab-case) |
| `variant` | `NyxIconVariant` | `'line'` | No | Icon style variant |
| `theme` | `NyxTheme` | — | No | Optional theme color |
| `size` | `NyxSize` | — | No | Optional size (maps to dimensions) |
| `pixel` | `boolean` | `false` | No | Whether size is in pixels |

**Enum: NyxIconVariant**

| Value | Description |
|-------|-------------|
| `line` | Outline/stroked icons (default) |
| `filled` | Filled icons |

### Props Interface

```typescript
interface NyxIconProps {
  name: string
  variant?: NyxIconVariant
  theme?: NyxTheme
  size?: NyxSize
  pixel?: boolean
}
```

### CSS Variables Used

- `--nyx-rgb-{theme}` - Theme RGB values for coloring
- `--nyx-text` - Default text color (fallback when no theme)

---

## Quickstart

```vue
<template>
  <!-- Basic usage -->
  <NyxIcon name="arrow-right" />
  
  <!-- With variant -->
  <NyxIcon name="check-circle" variant="filled" />
  
  <!-- With theme -->
  <NyxIcon name="warning" theme="warning" />
  
  <!-- With size -->
  <NyxIcon name="home" size="lg" />
</template>
```

---

## Next Steps

Proceed to `/speckit.tasks` for task breakdown, then `/speckit.implement` for code creation.
