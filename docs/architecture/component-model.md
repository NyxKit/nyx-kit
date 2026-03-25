# Component Model

This document defines the conventions all components must follow for props, slots, emits, v-model, and composable usage.

## Shared Visual Props

Every visual component accepts a consistent set of props defined by `NyxComponentProps` (`src/types/common.ts`):

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `theme` | `NyxTheme` | `Default` | Colour theme |
| `size` | `NyxSize` | `Default` | Size scale |
| `variant` | `NyxVariant` | `Default` | Fill style |
| `shape` | `NyxShape` | `Rectangle` | Border-radius preset |
| `pixel` | `boolean` | `false` | Pixel-art mode |

Not every component exposes all five — only declare the props that are meaningful for the component. Do not expose a prop just for consistency if it has no effect.

### Additional visual props
| Prop | Type | Purpose |
|---|---|---|
| `gradient` | `boolean` | Gradient fill (Solid variant only) |
| `backlight` | `boolean` | Glow effect behind the component |
| `disabled` | `boolean` | Disabled state |

## `useNyxProps`

All visual props must be processed through `useNyxProps`. It:

- Injects `libEnv` (global `NyxKitOptions`) to read library-level defaults
- Resolves `theme`, `size`, and `variant` through a three-step chain:
  1. If the prop is not `'default'`, use it as-is
  2. Else if `NyxKitOptions.defaults.<prop>` is set, use that
  3. Else fall back to the absolute default (`NyxTheme.Primary`, `NyxSize.Medium`, `NyxVariant.Filled`)
- Computes `classList` — the reactive array of CSS classes to spread onto the root element
- Computes `gradient` and `backlight` as CSS variable bindings

```typescript
const { classList, gradient, backlight } = useNyxProps(props)
```

Apply to the root element:
```html
<div :class="classList" :style="{ ...gradient, ...backlight }">
```

Never manually construct class lists from `theme`, `size`, `variant`, etc. — always go through `useNyxProps`.

## v-model

| Pattern | Use when |
|---|---|
| `defineModel<T>()` | Single value (string, number, boolean) |
| `defineModel<T[]>()` | Multi-select or array values |
| `defineModel<boolean>('modelValue')` | Open/close state (modals, dropdowns) |

Prefer `defineModel` (Vue 3.4+) over manual `modelValue` prop + `update:modelValue` emit.

### Components operating on nested or recursive data

When a component accepts an array or tree of objects (`T[]`) and must mutate a nested property (e.g. a `status` field inside a deeply nested object), `defineModel` alone does not emit `update:modelValue` when a **nested property** is mutated — only when the array itself is reassigned.

**Rule**: Components that mutate nested properties in an array/tree model must reassign the model after mutating, to ensure `update:modelValue` fires:

```ts
// WRONG: mutation without reassignment — update:modelValue does not fire
function handleSelect(node: MyNode) {
  node.status = NodeStatus.Active  // defineModel sees no change
}

// CORRECT: mutate then reassign to trigger update:modelValue
function handleSelect(node: MyNode) {
  const updated = updateNodeInTree(model.value, node.id, target => {
    target.status = NodeStatus.Active
  })
  model.value = updated  // reassignment fires update:modelValue
}
```

Use a recursive `updateNodeInTree` helper that traverses the structure, applies the mutation, and returns a new shallow-copy of the affected nodes and their ancestors to preserve reactivity.

Also emit a semantic event (e.g. `select`) with the affected node so consumers can react to the specific interaction beyond the model update.

## Emits

Emit names use camelCase. Common events across components:

| Event | Payload | When |
|---|---|---|
| `click` | `MouseEvent` | User clicks a clickable element |
| `focus` | `FocusEvent` | Element receives focus |
| `blur` | `FocusEvent` | Element loses focus |
| `close` | — | Modal/popover dismissed |
| `cancel` | — | User cancels a modal action |
| `confirm` | — | User confirms a modal action |

Do not emit events that duplicate v-model updates — `update:modelValue` is emitted implicitly by `defineModel`.

## Slots

Use named slots for optional content regions. Conventions:

| Slot name | Purpose |
|---|---|
| `default` | Primary content |
| `header` | Top section (modals, cards) |
| `footer` | Bottom section (modals, cards) |
| `actions` | Right-aligned action area (tables) |
| `empty` | Shown when list/data is empty |
| `tab-${name}` | Per-tab content in NyxTabs |
| `tab-button-${name}` | Custom tab trigger in NyxTabs |

Always check whether content is provided before rendering a slot's wrapper element:
```html
<div v-if="$slots.footer" class="footer">
  <slot name="footer" />
</div>
```

## Teleported Elements

Floating elements (dropdowns, tooltips, modals) must be teleported to `<body>` using Vue's `<Teleport>`:
```html
<Teleport to="body">
  <div v-if="isOpen" ref="elDropdown" class="nyx-dropdown">...</div>
</Teleport>
```

Position the floating element with `useTeleportPosition`:
```typescript
useTeleportPosition(elTrigger, elDropdown, {
  position: NyxPosition.Bottom,
  matchWidth: true,
})
```

The composable handles viewport clamping and auto-mirroring when space is insufficient.

## Click-Outside

Dismiss dropdowns and popovers using the `v-click-outside` directive (registered globally by the plugin):
```html
<div v-click-outside="close">...</div>
```

For cases where the directive cannot be applied to the floating element itself (e.g. teleported content), use the composable directly from `src/directives/vClickOutside.ts`.

## Keyboard Handling

| Composable | When to use |
|---|---|
| `useKeyPress(key, callback)` | Single key, e.g. ESC to close a modal |
| `useKeyboardShortcuts(map)` | Multi-key combinations, e.g. `Ctrl+K` |

Both attach on `onMounted` and clean up on `onUnmounted`. Do not add `window.addEventListener('keydown', ...)` directly in components.

## Accessible Markup

- Interactive elements must use semantic HTML (`<button>`, `<input>`, `<select>`, `<a>`).
- Sliders and range inputs must include `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Disabled states must set both the CSS class and the native `disabled` / `aria-disabled` attribute.
- Buttons that render as `<a>` (when `href` is provided) must open in `_blank` for external URLs; `isCurrentDomain` from `src/utils/url.ts` makes this determination.

## File Structure per Component

```
src/components/NyxFoo/
  NyxFoo.vue          # component implementation
  NyxFoo.stories.ts   # Storybook stories
  NyxFoo.spec.ts      # unit tests (if applicable)
  index.ts            # re-export: export { default as NyxFoo } from './NyxFoo.vue'
```

Sub-components (e.g. `NyxTableCell`, `NyxTreeNode`) live in the parent's folder and are exported from the same `index.ts`.

## Generic Components

Components that operate on typed data (e.g. `NyxTable<T>`) should use a generic type parameter:
```typescript
defineProps<{ modelValue: T[] }>()
```

The generic must be declared on the `<script setup>` tag:
```html
<script setup lang="ts" generic="T extends object">
```
