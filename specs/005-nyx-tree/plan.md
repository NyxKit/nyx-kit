# Implementation Plan: NyxTree — Tree-Node Navigation System

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/005-nyx-tree/spec.md`

## Summary

Implement NyxTree as a fully functional interactive tree-node navigation component. The existing boilerplate renders leaf values recursively but lacks node labels, expand/collapse behaviour, selection, keyboard navigation, accessibility attributes, and Storybook stories. This plan brings the component to a production-ready state by completing the existing files and adding the missing ones, with no new external dependencies.

## Technical Context

**Language/Version**: TypeScript 5.7 / Vue 3.5
**Primary Dependencies**: Vue 3 (ref, computed, defineProps, defineEmits, defineModel), SCSS
**Storage**: N/A — all state is local/instance-level
**Testing**: Vitest + @vue/test-utils (unit), Playwright (E2E if interactive flows require it)
**Target Platform**: Browser — published as `nyx-kit` npm library
**Project Type**: UI component library
**Performance Goals**: Standard DOM rendering; no heavy computation
**Constraints**: No new npm dependencies; must follow Nyx Kit component conventions; no breaking changes to the existing `v-model` API shape
**Scale/Scope**: Single component with one internal sub-component; ~5 files modified/created

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Docs-first (Constitution I) | ✓ PASS | `docs/specs/components/NyxTree.spec.md` created before any code changes |
| Spec before code (Constitution II) | ✓ PASS | Spec complete in `specs/005-nyx-tree/spec.md` |
| Minimal diff (Constitution III) | ✓ PASS | Plan targets surgical edits to 3 existing files + 2 new files |
| Consumer-library contract (Constitution IV) | ✓ PASS | No breaking API changes; existing `v-model` shape preserved; new props are optional |
| Design tokens (Constitution VI) | ✓ PASS | SCSS will use CSS variables from `variables.css`, not hardcoded values |
| Consistency (Constitution VII) | ✓ PASS | Props, emits, class names, and story pattern checked against sibling components |

*Post-design re-check: All gates still pass. No violations.*

## Project Structure

### Documentation (this feature)

```text
specs/005-nyx-tree/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── component-api.md ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit.tasks — not created here)
```

### Source Code

```text
src/components/NyxTree/
├── NyxTree.vue          ← MODIFY: add disabled/selected props, wire select emit, ARIA, keydown
├── NyxTree.scss         ← MODIFY: add label, selected, hover, toggle indicator styles
├── NyxTree.types.ts     ← MODIFY: update NyxTreeProps, NyxTreeNodeProps
├── NyxTreeNode.vue      ← MODIFY: add label prop, expand/collapse, click handler, ARIA
├── NyxTree.spec.ts      ← MODIFY: extend with selection, keyboard, and disabled tests
├── NyxTree.stories.ts   ← CREATE: Flat, Nested, Selected, Disabled stories
└── index.ts             ← NO CHANGE (already exports NyxTree correctly)

docs/specs/components/
└── NyxTree.spec.md      ← ALREADY CREATED (sync with any API changes from implementation)
```

**Structure Decision**: Single-project layout. All changes are within `src/components/NyxTree/`. No new folders. No new dependencies.

---

## Implementation Steps

### Step 1 — Update `NyxTree.types.ts`

**What changes:**
- Add `selected?: string[]` and `disabled?: boolean` to `NyxTreeProps`
- Add `label: string` to `NyxTreeNodeProps`
- Rename `KeyDict` import to use the recursive type alias `NyxTreeModel` for clarity (define locally or import from types)

**Before:**
```ts
export interface NyxTreeProps {}
export interface NyxTreeNodeProps {
  node: string | KeyDict<string | KeyDict<unknown>>
  path: string[]
}
```

**After:**
```ts
// Interface (not type alias) to allow recursive self-reference.
// `disabled` is a reserved key for per-node disabled state on branch nodes.
export interface NyxTreeModel {
  disabled?: boolean
  [key: string]: string | boolean | NyxTreeModel | undefined
}

export interface NyxTreeProps {
  selected?: string[]
  open?: string[][]
  disabled?: boolean
}

export interface NyxTreeEmits {
  (e: 'select', path: string[]): void
}

export interface NyxTreeNodeProps {
  label: string
  node: string | NyxTreeModel
  path: string[]
  selected?: string[]
  disabled?: boolean
}
```

---

### Step 2 — Update `NyxTree.vue`

**What changes:**
- Accept `NyxTreeProps` (`disabled`, `selected`) via `withDefaults(defineProps<NyxTreeProps>(), ...)`
- Declare `NyxTreeEmits`
- Add `role="tree"` and `aria-disabled` to root `<ul>`
- Forward `label` (the key), `selected`, and `disabled` props down to `NyxTreeNode`
- Bubble `select` emit from child nodes up through the tree

**Template change summary:**
```html
<ul class="nyx-tree" role="tree" :aria-disabled="disabled || undefined">
  <NyxTreeNode
    v-for="(value, key) in model"
    :key="key"
    :label="String(key)"       ← NEW
    :node="value"
    :path="[String(key)]"
    :selected="selected"        ← NEW
    :disabled="disabled"        ← NEW
    @select="emit('select', $event)"  ← NEW
  />
</ul>
```

---

### Step 3 — Update `NyxTreeNode.vue`

This is the most significant change. The node must:

1. **Show its label** — render `props.label` in a `<span class="nyx-tree-node__label">`
2. **Distinguish leaf vs branch** — already has `isLeaf` computed
3. **Branch: toggle expand/collapse** — `const expanded = ref(true)`; click on label toggles
4. **All nodes: emit select on click** — click on label emits `select` with `path`
5. **Apply CSS modifier classes** — `nyx-tree-node--branch`, `nyx-tree-node--leaf`, `nyx-tree-node--expanded`, `nyx-tree-node--selected`
6. **ARIA** — `role="treeitem"`, `aria-expanded` (branches), `aria-selected`, `tabindex`
7. **Keyboard handler** — `@keydown` on root `<ul>` of NyxTree handles ArrowUp/Down/Left/Right/Enter/Space
8. **Disabled** — if `disabled`, suppress click and keyboard events; apply `aria-disabled`

**Emit shape:** `NyxTreeNode` needs its own emits:
```ts
interface NyxTreeNodeEmits {
  (e: 'select', path: string[]): void
}
```

**Recursive event bubbling:** each child `NyxTreeNode` emits `select`; the parent `NyxTreeNode` (or root `NyxTree`) listens with `@select="emit('select', $event)"`.

**isSelected computed:**
```ts
const isSelected = computed(() =>
  props.selected?.length === props.path.length &&
  props.path.every((seg, i) => seg === props.selected![i])
)
```

**Template structure:**
```html
<li
  class="nyx-tree-node"
  :class="{
    'nyx-tree-node--branch': !isLeaf,
    'nyx-tree-node--leaf': isLeaf,
    'nyx-tree-node--expanded': !isLeaf && expanded,
    'nyx-tree-node--selected': isSelected,
  }"
  role="treeitem"
  :aria-expanded="!isLeaf ? expanded : undefined"
  :aria-selected="isSelected"
  :aria-disabled="disabled || undefined"
  :tabindex="isSelected ? 0 : -1"
>
  <span
    class="nyx-tree-node__label"
    @click="!disabled && handleClick()"
  >
    <span v-if="!isLeaf" class="nyx-tree-node__toggle">{{ expanded ? '▾' : '▸' }}</span>
    {{ label }}
  </span>
  <ul
    v-if="!isLeaf"
    class="nyx-tree-children"
    role="group"
    :inert="!expanded || undefined"
  >
    <NyxTreeNode
      v-for="(value, key) in (node as NyxTreeModel)"
      :key="key"
      :label="String(key)"
      :node="value"
      :path="[...path, String(key)]"
      :selected="selected"
      :disabled="disabled"
      @select="emit('select', $event)"
    />
  </ul>
</li>
```

**handleClick:**
```ts
function handleClick() {
  if (!isLeaf.value) expanded.value = !expanded.value
  emit('select', props.path)
}
```

---

### Step 4 — Keyboard navigation in `NyxTree.vue`

Keyboard navigation is handled at the root `NyxTree` level via `@keydown` on the root `<ul>`.

**Strategy:** Collect all visible node elements with `querySelectorAll('[role="treeitem"]')` at keydown time and move focus based on current focused index.

```ts
const treeRef = ref<HTMLElement | null>(null)

function getVisibleItems(): HTMLElement[] {
  return Array.from(treeRef.value?.querySelectorAll('[role="treeitem"]') ?? []) as HTMLElement[]
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  const items = getVisibleItems()
  const focused = document.activeElement as HTMLElement
  const idx = items.indexOf(focused)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      items[Math.min(idx + 1, items.length - 1)]?.focus()
      break
    case 'ArrowUp':
      event.preventDefault()
      items[Math.max(idx - 1, 0)]?.focus()
      break
    case 'ArrowRight':
      event.preventDefault()
      // Expand: delegate to focused node's click on label (or custom method)
      focused?.querySelector<HTMLElement>('.nyx-tree-node__label')?.click()
      break
    case 'ArrowLeft':
      event.preventDefault()
      focused?.querySelector<HTMLElement>('.nyx-tree-node__label')?.click()
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      focused?.querySelector<HTMLElement>('.nyx-tree-node__label')?.click()
      break
  }
}
```

**Note on ArrowLeft/Right**: Both keys delegate to the focused node's label click, which toggles expand/collapse and emits `select`. This is a deliberate v1 simplification — precise expand-only / focus-first-child / focus-parent semantics are deferred. The spec (US4-S3, US4-S4) has been updated to reflect this.

---

### Step 5 — Update `NyxTree.scss`

Add styles for:

```scss
.nyx-tree {
  list-style: none;

  .nyx-tree-node {
    padding-left: 1rem;

    &__label {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.2rem 0.4rem;
      border-radius: var(--nyx-radius-sm, 4px);
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: var(--nyx-c-gray-dark-3);
      }
    }

    &__toggle {
      font-size: 0.7em;
      line-height: 1;
      flex-shrink: 0;
    }

    &--selected > .nyx-tree-node__label {
      background-color: var(--nyx-c-gray-dark-2);
      color: var(--nyx-c-primary);
    }

    &--disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  // Children use CSS max-height + opacity transitions (not <Transition>).
  // The <ul> is always in the DOM (v-if="!isLeaf"); the `inert` attribute
  // prevents keyboard/AT interaction when collapsed. This keeps the DOM
  // stable so the CSS transition has a real element to animate.
  .nyx-tree-children {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.25s ease, opacity 0.2s ease;
  }

  .nyx-tree-node--expanded > .nyx-tree-children {
    max-height: 2000px;
    opacity: 1;
  }
}
```

---

### Step 6 — Create `NyxTree.stories.ts`

Four story exports following the `NyxButton.stories.ts` `defineComponent` pattern:

| Story | Description |
|-------|-------------|
| `Default` | Flat model, no selection |
| `Nested` | Two-level nested model, default expanded |
| `WithSelection` | Nested model with `selected` pre-set to a leaf path |
| `Disabled` | Nested model, `disabled: true` |

---

### Step 7 — Extend `NyxTree.spec.ts`

Add test groups for the new behaviour (existing tests must still pass):

| Test group | Key assertions |
|-----------|----------------|
| Label rendering | Each key appears as a label in the tree |
| Branch/leaf classes | `.nyx-tree-node--branch` and `--leaf` applied correctly |
| Expand/collapse | Clicking branch toggles `.nyx-tree-node--expanded` and child visibility |
| Select emit | Click leaf → `select` emitted with correct path; click branch → emitted with branch path |
| Selected class | `--selected` applied to the node matching the `selected` prop |
| Disabled | No `select` emits when `disabled=true`; `aria-disabled` present |
| ARIA | `role="tree"`, `role="treeitem"`, `aria-expanded` on branches, `aria-selected` on nodes |

---

## Complexity Tracking

No Constitution violations. No complexity exceptions required.
