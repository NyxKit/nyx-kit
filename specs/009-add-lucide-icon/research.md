# Research: NyxIcon Component

## Decision: Which Lucide package to use

**Choice**: `lucide-vue-next`

**Rationale**:
- Already in dependencies (`lucide-vue-next@0.577.0`)
- Official Vue 3 package using Composition API
- More popular (708K weekly downloads vs 6.1K for @lucide/vue)
- ISC license - permissive, safe for open source use

**Alternatives considered**:
- `@lucide/vue` - older, designed for Vue 2 compatibility layer, less maintained
- `lucide-vue` - Vue 2 only (not applicable)

---

## Decision: Component architecture

**Choice**: Dynamic component resolution via kebab-case to PascalCase conversion

**Rationale**:
- Allows passing icon name as string prop
- Lucide exports each icon as named component (e.g., `ArrowRight`, `CheckCircle`)
- Import all icons as `* as LucideIcons` and resolve by converting "arrow-right" → "ArrowRight"
- No manual mapping needed - converter handles any icon name

**Implementation**:
```ts
function toPascalCase(str: string): string {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

// "arrow-right" → "ArrowRight"
const iconName = toPascalCase(props.name)
const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
```

---

## Decision: Icon variant handling

**Choice**: Two separate icon sets - line icons (default) and filled icons

**Rationale**:
- Lucide provides both `ArrowRight` (line) and `ArrowRightFilled` (filled) as separate components
- Variant prop toggles between these two sets
- Simplifies implementation vs. prop passing to Lucide components

---

## Decision: Theme integration

**Choice**: Use CSS custom properties from nyx-kit design system

**Rationale**:
- NyxTheme maps to CSS variables like `--nyx-rgb-primary`
- Icon color can be set via `currentColor` or explicit RGB variable
- No theme = use text color from CSS vars

---

## Decision: Default size

**Choice**: 24x24 (Lucide default)

**Rationale**:
- Lucide icons are designed on 24x24 grid
- Industry standard, matches most use cases
- Can be overridden via size prop
