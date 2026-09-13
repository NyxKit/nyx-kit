# NyxAccordion

> A vertical list of collapsible sections with optional single or multiple open-item state.

**Status:** Implemented on the feature branch; not yet released. Created 2026-09-12 on `017-nyx-accordion`.

The component is included in the planned `2.1.0` minor release.

Feature scenarios: [017-nyx-accordion](../../../specs/017-nyx-accordion/spec.md). This living document and the component stories describe the public API.

## Purpose and scope

Use for FAQs, settings sections, or related content that users expand in place. Use [NyxTabs](./NyxTabs.spec.md) when related views occupy one shared panel area instead.

The mode prop is `multiple`, defaulting to `false`. Opening an item closes its siblings by default. Setting `multiple` allows independent expansion. A parent v-model is optional in either mode.

An explicit mode keeps behavior stable when the model is absent, initially undefined, or cleared. Inferring mode from the model alone would make unbound multiple mode impossible to express. A second inverse `autoClose` prop would create conflicting settings, so the component uses only `multiple`.

## Existing-component findings

- [NyxTabs source](../../../src/components/NyxTabs/NyxTabs.vue), [story](../../../src/components/NyxTabs/NyxTabs.stories.ts), and [tests](../../../src/components/NyxTabs/NyxTabs.spec.ts) use ordered string keys, named panel/trigger slots, optional `defineModel`, `useId`, and `useNyxProps`. Panel markup is inline; no reusable tab-body component exists today.
- NyxTabs keeps all panels mounted and defaults to the first tab. Accordion also preserves mounted content, and begins fully collapsed and places each body directly after its header.
- [NyxSelect](../../../src/components/NyxSelect/NyxSelect.vue) separates an explicit mode prop from its scalar/array model and uses a computed get/set normalization layer. Accordion follows that approach with string IDs and safe handling of mismatched shapes.
- [NyxCard](../../../src/components/NyxCard/NyxCard.vue) demonstrates named-slot fallbacks and conditional optional wrappers. Accordion extends this to shared scoped fallbacks plus per-item overrides.
- Follow [component conventions](../../architecture/component-model.md), [file conventions](../../conventions/README.md), and [testing guidance](../../testing/README.md).

## Internal architecture

Implementation structure: `src/components/NyxAccordion/` containing `NyxAccordion.vue`, `NyxAccordion.types.ts`, `NyxAccordion.scss`, `NyxAccordion.stories.ts`, and `NyxAccordion.spec.ts`.

- Silent unbound normalization uses a separate local ref. User writes go through `defineModel`; when Vue retains an equal scalar after an item was discarded locally, explicitly emit the model event once so reopening that ID is still observable.
- Use `<script setup lang="ts">`, a standalone props interface, and `const model = defineModel<string | string[]>()`. Avoid a static model default that initializes the parent unexpectedly. Use computed get/set normalization and retain local state when no model binding exists.
- Render ordered items with a component-owned heading, a native trigger button, and a body. Item IDs provide identity independently of display labels and array positions.
- Create stable, instance-scoped, SSR-compatible trigger/panel IDs with `useId()`. Arbitrary item IDs must be mapped safely to DOM IDs without collisions or unsafe selector interpolation. Reordering must preserve item identity.
- Keep bodies mounted while items exist. A Vue transition wraps each panel with `v-show`, keeping bodies mounted. Collapsing panels immediately receive `inert` and `aria-hidden`; after the exit transition they use `display: none`. Descendants leave keyboard and accessibility navigation as soon as collapse starts. Closing and reopening retains child component/form state.
- Keep state transitions local to this component unless a second concrete consumer justifies a shared composable. Extract logic if needed to keep each `.vue` file within 300 lines.
- Route supported visual props through `useNyxProps`. Follow [DESIGN.md](../../../DESIGN.md) and [design-system.md](../../architecture/design-system.md); use existing tokens and component-scoped styles.

### Reuse boundary with NyxTabs

Reuse evaluation: retain local panel markup. The common code would only wrap a slot and forward attributes, while tabs require horizontal layout and accordion bodies require native hiding. There is no meaningful shared behavior to extract yet. Scoped shared slots and per-item overrides provide the intended authoring consistency.

Do not reuse tab selection, tablist keyboard behavior, or the horizontal sliding container. Accordion bodies and tab panels have different visibility and accessibility contracts. Do not introduce a generic public panel API solely for this feature.

Any extraction must preserve existing NyxTabs props, `tab-${name}`, `tab-button-${name}`, default/footer slots, fallback content, mounted state, layout, and scrolling. Update its living spec before changing its architecture and validate its story and tests. Renaming tab slots or changing tab behavior is outside this feature. NyxTabs remains unchanged.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `NyxAccordionItem[]` | Required | Ordered item descriptors; not mutated by the component |
| `multiple` | `boolean` | `false` | Allow multiple expanded bodies; false closes siblings on open |
| `disabled` | `boolean` | `false` | Disable user toggling for all items; external model updates still render |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Native heading level appropriate to the surrounding page |
| `theme` | `NyxTheme` | Omitted | Resolve through `useNyxProps` and global defaults; final fallback `NyxTheme.Primary` |
| `size` | `NyxSize` | Omitted | Resolve through `useNyxProps` and global defaults; final fallback `NyxSize.Medium` |

Only theme and size are exposed visual controls for the first version. No new global tokens or dependencies are required by this spec.

Shared-default documentation was corrected during implementation: there are no `Default` members in these enums. Omit the props to inherit `defaults.all`. The historical discrepancy is recorded in [AGENTS.md](../../../AGENTS.md).

## Types

```ts
interface NyxAccordionItem {
  id: string
  label: string
  disabled?: boolean
}

type NyxAccordionModel = string | string[]

interface NyxAccordionSlotProps {
  item: NyxAccordionItem
  index: number
  open: boolean
  disabled: boolean
}
```

IDs must be unique, nonblank strings; `''` is reserved for the empty single model. Labels must provide meaningful visible text and may change without changing identity. Invalid/blank IDs are skipped; duplicate IDs retain only the first descriptor. Report these invalid descriptors in development. Render order and slot `index` refer to the accepted items. `disabled` in slot scope includes the component-level disabled state.

The component is exported through direct `.vue` imports in `src/components/index.ts` and `src/main.ts`. Public item, model, slot, and props types are exported through `src/types/index.ts` and the root entry. Consumers can import the component from `nyx-kit` or `nyx-kit/components`, and types from `nyx-kit` or `nyx-kit/types`.

## v-model

Binds to the open item ID (`string`) or open item IDs (`string[]`). Model shape follows `multiple`, never the reverse.

| Mode | Empty state | Opening `b` when `a` is open | Closing `b` |
|---|---|---|---|
| Single (default) | `''` | `'b'` | `''` |
| Multiple | `[]` | `['a', 'b']` | `['a']` |

- An omitted or undefined model renders all items collapsed. Mounting does not emit an initialization update. Users may close the last item; there is no required-open-item rule.
- With a two-way binding, external changes are the source of truth. Without a binding, interaction updates internal state and still emits the same model event for optional listeners.
- Accept only IDs present in the current item list; ignore unknown IDs and deduplicate arrays while retaining their order. New multiple-mode openings append an ID; closings filter it out. Never mutate a supplied array in place.
- A scalar supplied in multiple mode normalizes to a singleton array, or `[]` for the empty/unknown scalar. An array supplied in single mode normalizes to its first valid ID, or `''`.
- If `multiple` changes, apply that same conversion. Unbound state retains the converted value; converting back to multiple does not resurrect discarded IDs. With a bound model, derive display from the latest parent value, without rewriting it automatically. Parents changing mode should convert their model too if they want discarded IDs removed permanently.
- Removing items immediately hides their panels and excludes their IDs from effective state. Unbound state discards removed IDs. Bound values are not rewritten; reintroducing an item referenced by the parent may reopen it. Reordering alone preserves open IDs and child state.
- Normalization during mount, external updates, mode changes, and item changes does not emit. The next successful user toggle emits a fresh canonical value of the current mode, with unknown/duplicate IDs removed. A single user toggle emits once, including when it also closes siblings.
- Disabled items cannot be toggled by users. Existing expanded content remains visible when disabled; external updates and automatic sibling closing may still close it. Rejected interactions emit nothing.

## Emits

| Event | Payload | When |
|---|---|---|
| `update:modelValue` | `string \| string[]` | Successful user toggle changes effective open state |

No duplicate `change`, `open`, or `close` events are emitted. This component updates an ID model, not nested item data, so the nested-model semantic-event requirement does not apply.

## Slots

| Slot | Scope | Purpose / fallback |
|---|---|---|
| `header-${id}` | `NyxAccordionSlotProps` | Per-item trigger content; falls back to `header`, then `item.label` |
| `header` | `NyxAccordionSlotProps` | Shared trigger-content renderer invoked once per item |
| `item-${id}` | `NyxAccordionSlotProps` | Per-item body; falls back to the shared `default` slot |
| `default` | `NyxAccordionSlotProps` | Shared body renderer invoked for each item without a named body override |
| `empty` | None | Rendered only when there are no accepted items; no built-in placeholder |

Header overrides use `header-${id}` rather than the draft `item-header-${id}` to avoid colliding with a body whose ID starts with `header-`.

Slot precedence depends on whether the slot is supplied, not on whether its result contains text. Custom header content stays inside the component-owned button; consumers must supply an accessible name and must not nest links, buttons, or other interactive controls there. The component owns its expansion indicator and marks it decorative.

A missing body renders an empty body without developer instructions in the product UI. Keep the body element for a valid `aria-controls` target. An empty item list without an `empty` slot creates no fake trigger or panel. There is no additional root header/footer API.

## Usage examples

Import `NyxAccordion` from `nyx-kit` or `nyx-kit/components`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NyxAccordion } from 'nyx-kit'

const items = [
  { id: 'account', label: 'Account' },
  { id: 'privacy', label: 'Privacy' },
]
const openItem = ref('account')
const openItems = ref<string[]>(['account', 'privacy'])
</script>

<template>
  <!-- Unbound, single-open by default -->
  <NyxAccordion :items="items">
    <template #item-account>Account details</template>
    <template #item-privacy>Privacy details</template>
  </NyxAccordion>

  <!-- Bound scalar, with shared scoped body content -->
  <NyxAccordion v-model="openItem" :items="items">
    <template #default="{ item }">Details for {{ item.label }}</template>
  </NyxAccordion>

  <!-- Bound array, independently open bodies -->
  <NyxAccordion v-model="openItems" :items="items" multiple>
    <template #header="{ item, open }">{{ item.label }} ({{ open ? 'open' : 'closed' }})</template>
    <template #default="{ item }">Details for {{ item.label }}</template>
    <template #item-privacy>Custom privacy content takes precedence</template>
  </NyxAccordion>

  <!-- Multiple mode also works without a model -->
  <NyxAccordion :items="items" multiple>
    <template #default="{ item }">Details for {{ item.label }}</template>
  </NyxAccordion>
</template>
```

## Keyboard behaviour

| Key | Behaviour |
|---|---|
| `Enter` / `Space` on an enabled header | Toggle exactly once through native button activation |
| `Tab` / `Shift+Tab` | Normal page order through enabled headers and controls in expanded bodies |
| `ArrowDown` / `ArrowUp` on a header | Move focus to next/previous enabled header, wrapping; do not toggle |
| `Home` / `End` on a header | Focus first/last enabled header; do not toggle |

Arrow/Home/End navigation is an additional library convenience. Handle it on this instance's header buttons only; do not intercept keys from body content or nested accordions. Prevent scrolling only for handled navigation keys. No global listeners or tab-style roving tabindex. All enabled headers remain in the normal tab order.

On user toggling, focus stays on the trigger. If an external update hides a panel containing focus, move focus to its owning enabled header. If that header is disabled or removed, focus the next enabled header in item order, otherwise the previous. If none remain, use a programmatically focusable root fallback without adding it to sequential tab order. Do not move focus when it is outside the affected content.

## Accessibility

Follow the [WAI-ARIA accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/): native heading-wrapped buttons, `aria-expanded`, and `aria-controls` pointing to the matching body. Use `type="button"` to prevent form submission. Set native disabled on disabled triggers. Do not use tab/tablist/tabpanel roles.

Panels do not receive `role="region"` by default, avoiding excessive landmarks in large multiple accordions. Collapsed content is hidden from assistive technology and keyboard access. IDs must remain unique across instances and nested accordions. Provide visible focus and a decorative expanded-state indicator. Opening and closing motion respects reduced-motion preferences.

## Motion

Panels expand through a CSS grid row transition, with a short body fade/vertical offset and an indicator that flips over its horizontal axis (`rotateX`). Opening uses `--nyx-speed-regular` (300ms), closing uses `--nyx-speed-fast` (200ms), and easing decelerates without bounce (`cubic-bezier(0.25, 1, 0.5, 1)`). Local CSS variables `--nyx-accordion-open-duration`, `--nyx-accordion-close-duration`, and `--nyx-accordion-easing` allow theme-level adjustment without a new prop.

A panel contains a grid clipping wrapper and the padded body. Clipping is active only during the transition, so opened content and focus outlines can overflow normally. This accommodates intrinsic content size without a guessed maximum height or per-frame JavaScript measurement. Following items move with the changing panel space. Bodies remain mounted, including after closing. Vue handles interrupted enter/leave transitions so rapid toggles settle into the latest model state.

No entrance animation runs on initial rendering. `prefers-reduced-motion: reduce` disables the panel, body, and indicator transitions. ARIA/model state changes immediately, independent of animation completion; collapsing panels become inert and hidden to assistive technology at once. Focus recovery continues to use the panel wrapper, and no interaction is locked during animation.

## Validation coverage

- Stories under `Components/Navigation/NyxAccordion`: Default (unbound single), BoundSingle, Multiple, UnboundMultiple, CustomSlots, Disabled, Empty, and DynamicItemsAndMode. Include parent-driven updates and form controls demonstrating retained panel state.
- BoundSingle imports and locally registers `NyxForm`, `NyxFormField`, `NyxInput`, and `NyxActionItem` from their `.vue` files. The account panel wraps Display name in `NyxForm` and `NyxFormField`, forwarding the field's scoped `id` to `NyxInput` for label association. `NyxForm` also supplies the form-field styling and spacing variables.
- BoundSingle's Privacy and permissions panel uses `NyxActionItem`, the library's existing action-card component, to demonstrate a local profile-visibility toggle. There is no `NyxActionCard` export.
- Unit tests: optional binding in both modes, auto-close, closing last item, canonical emissions, fresh arrays, shape normalization, external updates without feedback loops, mode/item changes, invalid IDs, disabled interaction, slot scope and precedence, retained child state, and independent instances.
- Browser tests: real focus movement, native Space/Enter activation without double toggles or form submission, hidden-panel tab exclusion, nested accordions, focus recovery on external collapse/removal, intermediate expansion/collapse, rapid reversals, and reduced motion.
- Type-check, unit tests, interactive E2E, Storybook rendering in both colour modes, and package export/type resolution. If NyxTabs internals change, verify its existing API, slot fallback, scrolling, and mounted-state behavior too.

## Known limitations and scope boundaries

Defaults include all-collapsed initialization, descriptor-based items, retained mounted bodies, and the slot names above. All bodies mount eagerly; expensive content remains mounted while collapsed.

The first version is vertical only. Lazy mounting, unmount-on-close, mandatory-open mode, expand/collapse-all controls, per-item action buttons, public item/panel subcomponents, animation configuration, and model-type inference are outside the current component. The reuse evaluation concluded that a private shared panel would not remove meaningful behavior.
