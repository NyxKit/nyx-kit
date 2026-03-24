# Research: NyxTree — Tree-Node Navigation System

**Branch**: `005-nyx-tree` | **Date**: 2026-03-24

---

## Finding 1: ARIA Tree Pattern

**Decision**: Use the WAI-ARIA `tree` role pattern with `role="tree"` on the root `<ul>`, `role="treeitem"` on each `<li>`, and `role="group"` on nested `<ul>` children.

**Rationale**: This is the established accessible pattern for hierarchical navigational lists. It communicates the structure to screen readers and enables AT-assisted navigation. The `aria-expanded` attribute on branch `<treeitem>` nodes communicates open/close state.

**Alternatives considered**: `role="navigation"` + `role="list"` — rejected, loses hierarchy semantics and does not communicate expand/collapse state to AT.

---

## Finding 2: Keyboard Navigation Strategy

**Decision**: Use the native `keydown` event on the root `<ul>` element (via Vue's `@keydown`) rather than the global `useKeyPress` or `useKeyboardShortcuts` composables.

**Rationale**:
- `useKeyPress` attaches to `window` — would fire for any arrow key press on the page, not just when the tree has focus. Inappropriate for tree navigation.
- `useKeyboardShortcuts` supports a target `Ref<HTMLElement>`, which scopes listeners correctly. However, it is designed for combo shortcuts (modifier + key) and uses a history-set approach. Arrow keys are single-key events with no modifiers, so the fit is awkward.
- A direct `@keydown.prevent` handler on the root `<ul>` is the simplest, most idiomatic Vue approach and keeps the keyboard logic co-located with the template. This is consistent with how `NyxSelect` handles its own internal keyboard events.

**Alternatives considered**: `useKeyboardShortcuts` with tree root ref — technically works but overkill; rejected to keep implementation minimal.

---

## Finding 3: Roving Tabindex for Focus Management

**Decision**: Use a roving tabindex approach — only the currently focused node has `tabindex="0"`, all others have `tabindex="-1"`. Focus is moved programmatically using `el.focus()` when arrow keys are pressed.

**Rationale**: This is the standard ARIA-recommended approach for widget containers with internal keyboard navigation (tree, menu, listbox). It prevents tab-stopping on every single node and keeps Tab behavior predictable.

**Alternatives considered**: Giving all nodes `tabindex="0"` — rejected; forces users to tab through every node, which defeats the purpose of arrow-key navigation.

---

## Finding 4: Expand/Collapse State

**Decision**: Store expand/collapse state as a local `ref<boolean>` inside each `NyxTreeNode` instance, defaulting to `true` (expanded).

**Rationale**: Each branch node is an independent Vue component instance, so instance-local state is the simplest and most correct approach. No shared store or lifted state is needed for v1. The spec explicitly states state is local and not persisted.

**Alternatives considered**: Lifted state map in `NyxTree` keyed by path — possible but adds unnecessary complexity for v1.

---

## Finding 5: Node Label Display

**Decision**: Pass the node's dictionary key as a `label` prop to `NyxTreeNode`. The current boilerplate omits keys entirely and renders only leaf values — this must be fixed.

**Rationale**: The key is the human-readable label for every node (both branches and leaves). Without it the tree is functionally unusable. The iteration `v-for="(value, key) in model"` already exposes the key; it just needs to be forwarded as a prop.

**Alternatives considered**: Slot-based label rendering — valid for v2 extensibility but unnecessary for v1 where all labels are string keys.

---

## Finding 6: Selection Communication

**Decision**: Emit `select` with the full `string[]` path on every click/activation. The selected path is exposed as a prop (`selected?: string[]`) that the parent controls; NyxTree itself does not own selection state.

**Rationale**: This matches the existing `NyxTreeEmits` definition in `NyxTree.types.ts` (already present). Keeping selection state external makes NyxTree a controlled component, consistent with Nyx Kit's `defineModel`/prop-driven conventions.

**Alternatives considered**: `defineModel<string[]>()` for two-way binding — considered, but a tree's selection is typically one-way push (emit) + one-way pull (selected prop); a full defineModel is not natural here and the types already define it as an emit.

---

## Finding 7: Storybook Story Pattern

**Decision**: Follow the `NyxButton.stories.ts` pattern — `defineComponent` template factories with `argTypes` and named story exports (`Default`, `Nested`, `Selected`, `Disabled`).

**Rationale**: This is the existing pattern across all Nyx Kit components and must be followed for consistency (Constitution principle VII).

**Alternatives considered**: CSF3 object syntax — the codebase has not adopted it yet; rejected to avoid inconsistency.

---

## Finding 8: NyxTreeNode Export

**Decision**: `NyxTreeNode` is an internal sub-component and does NOT need to be added to `src/components/index.ts`. The existing `index.ts` in the NyxTree folder exports only `NyxTree`. `NyxTreeNode` is used internally only.

**Rationale**: `NyxTreeNode` is analogous to `NyxTableCell` (exported) vs internal helpers. However, tree nodes have no consumer-facing value as a standalone component — unlike `NyxTableCell` which has a documented column API. Keep it internal.

**Alternatives considered**: Exporting `NyxTreeNode` for consumer customisation — deferred to v2 with slot support.
