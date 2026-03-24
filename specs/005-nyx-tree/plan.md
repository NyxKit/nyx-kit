# Implementation Plan: NyxTree — Tree-Node Navigation System

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/005-nyx-tree/spec.md`

## Summary

Implement NyxTree as a fully controlled tree-node navigation component backed by `NyxTreeNodeBase[]`. The finished component renders node labels, derives expand/select state from `node.status`, emits the clicked node object, supports keyboard activation, exposes ARIA tree semantics, and ships Storybook stories for canonical usage.

## Technical Context

**Language/Version**: TypeScript 5.7 / Vue 3.5
**Primary Dependencies**: Vue 3 (`ref`, `computed`, `defineProps`, `defineEmits`, `defineModel`), SCSS
**Storage**: N/A — all interactive state is parent-owned in the model
**Testing**: Vitest + `@vue/test-utils` (unit), Playwright (E2E if interactive flows require it)
**Target Platform**: Browser — published as `nyx-kit` npm library
**Project Type**: UI component library
**Performance Goals**: Standard DOM rendering; no heavy computation
**Constraints**: No new npm dependencies; must follow Nyx Kit component conventions; preserve the existing `v-model` API shape of `NyxTreeNodeBase[]`
**Scale/Scope**: Single component with one internal recursive sub-component; existing boilerplate completed and documented

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Docs-first (Constitution I) | ✓ PASS | `docs/specs/components/NyxTree.spec.md` exists and must stay synced with implementation |
| Spec before code (Constitution II) | ✓ PASS | Spec complete in `specs/005-nyx-tree/spec.md` |
| Minimal diff (Constitution III) | ✓ PASS | Scope stays within the existing NyxTree component files and docs |
| Consumer-library contract (Constitution IV) | ✓ PASS | `v-model` remains `NyxTreeNodeBase[]`; `select` emits the node object |
| Design tokens (Constitution VI) | ✓ PASS | SCSS uses existing CSS variables and radius tokens |
| Consistency (Constitution VII) | ✓ PASS | Props, emits, stories, and docs align with current component conventions |

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
└── tasks.md             ← Phase 2 output
```

### Source Code

```text
src/components/NyxTree/
├── NyxTree.vue          ← root tree semantics, disabled guard, keyboard navigation, select bubbling
├── NyxTree.scss         ← label, active, disabled, and collapsed-child styles
├── NyxTree.types.ts     ← canonical node model, status enum, emit types
├── NyxTreeNode.vue      ← recursive node rendering from node object + status-driven state
├── NyxTree.spec.ts      ← status, selection, keyboard, and disabled tests
├── NyxTree.stories.ts   ← flat, nested, status, interactive, and disabled stories
└── index.ts             ← existing export

docs/specs/components/
└── NyxTree.spec.md      ← must stay in sync with the status-driven node API
```

**Structure Decision**: Single-project layout. All changes are within `src/components/NyxTree/` plus synced docs. No new folders. No new dependencies.

---

## Implementation Steps

### Step 1 — Canonicalize `NyxTree.types.ts`

**What changes:**
- Define `NyxTreeModel` as `NyxTreeNodeBase[]`
- Keep `NyxTreeProps` minimal with only `disabled?: boolean`
- Define `NyxTreeEmits` as `select` with `NyxTreeNodeBase`
- Define `NyxTreeNodeStatus`, `NyxTreeNodeBase`, and the `NyxTreeNode` helper class with default `Closed` / `disabled: false`

### Step 2 — Update `NyxTree.vue`

**What changes:**
- Accept `NyxTreeProps` (`disabled`) via `withDefaults(defineProps<NyxTreeProps>(), ...)`
- Declare `NyxTreeEmits`
- Add `role="tree"`, `aria-disabled`, and `tabindex="0"` to the root `<ul>`
- Forward `node` and `disabled` props down to `NyxTreeNode`
- Bubble `select` emit from child nodes up through the tree
- Attach root-level keyboard navigation

### Step 3 — Update `NyxTreeNode.vue`

The node component must:

1. Render `node.label` in `.nyx-tree-node__label`
2. Distinguish branch vs leaf from `node.children.length`
3. Derive `isExpanded` from `node.status === Open || Active`
4. Derive `isActive` from `node.status === Active`
5. Emit `select` with the clicked `NyxTreeNodeBase`
6. Apply `nyx-tree-node--branch`, `--leaf`, `--expanded`, `--active`, and `--disabled` classes
7. Expose `role="treeitem"`, `aria-expanded`, `aria-selected`, `aria-disabled`, and `tabindex`
8. Keep child groups mounted with `role="group"` and `inert` when collapsed
9. Cascade tree-level disabled and node-level disabled state into descendants

### Step 4 — Keyboard navigation in `NyxTree.vue`

Keyboard navigation is handled at the root `NyxTree` level via `@keydown` on the root `<ul>`.

**Strategy:** Collect visible node elements with `querySelectorAll('[role="treeitem"]')`, filter out anything inside an inert subtree, move focus with Arrow Up/Down, and delegate Arrow Left/Right/Enter/Space to the focused label click.

### Step 5 — Update `NyxTree.scss`

Add styles for:
- `.nyx-tree`
- `.nyx-tree-node__label`
- `.nyx-tree-node__toggle`
- `.nyx-tree-node--active`
- `.nyx-tree-node--disabled`
- `.nyx-tree-children` and `.nyx-tree-node--expanded > .nyx-tree-children`

All visual tokens must come from existing CSS variables.

### Step 6 — Create `NyxTree.stories.ts`

Story exports following the `NyxButton.stories.ts` `defineComponent` pattern:

| Story | Description |
|-------|-------------|
| `Default` | Flat model with no active or open state |
| `Nested` | Nested model showing collapsed-by-default branches |
| `WithStatus` | Nested model with open branch and active leaf driven by `status` |
| `Interactive` | Parent-controlled status updates in response to `select` |
| `NodeDisabled` | Branch-level `disabled: true` state |
| `Disabled` | Entire tree disabled via prop |

### Step 7 — Extend `NyxTree.spec.ts`

Add test groups for the new behaviour:

| Test group | Key assertions |
|-----------|----------------|
| Label rendering | Each node label appears in the tree |
| Branch/leaf classes | `.nyx-tree-node--branch` and `--leaf` apply correctly |
| Expand/collapse | Default branch stays collapsed; `Open` and `Active` branches render expanded |
| Select emit | Click leaf or branch → `select` emitted with the matching node object |
| Active class | `--active` applied to the node matching `status: Active` |
| Disabled | No `select` emits when disabled; `aria-disabled` present |
| ARIA | `role="tree"`, `role="treeitem"`, `aria-expanded`, `aria-selected`, and `role="group"` are present where appropriate |
| Keyboard | Arrow Up/Down move focus; Enter activates the focused label |

---

## Complexity Tracking

No Constitution violations. No complexity exceptions required.
