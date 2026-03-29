# NyxTabs

> A tabbed content container with named trigger and panel slots, keyboard navigation, and scrollable overflowing panel content.

## Purpose and scope

NyxTabs switches between multiple content panels using a shared tab list. It is intended for related views that should stay in the same layout region while exposing a compact navigation control.

**Use when:**
- You need to switch between a small set of related content panels
- Each panel can be authored with named slots such as `tab-profile`
- Consumers may need custom trigger content via `tab-button-*` slots

**Do not use when:**
- Content should be shown all at once rather than progressively revealed
- The navigation represents page-level routing rather than in-place view switching

## Internal architecture

- `defineModel<string>()` stores the active tab key; when unset, `tabs[0]` is treated as active
- The root `.nyx-tabs` element contains a nav row, an optional default slot region, a sliding panel container, and an optional footer slot
- `useNyxProps` generates shared theme/size/variant classes
- `useId()` generates stable tab and panel IDs for ARIA relationships
- Keyboard interaction is handled on the `tablist` and updates the active model for arrow, Home, and End keys
- All tab panels stay mounted; the container translates horizontally to the active panel while the active panel becomes the scroll container when content exceeds the available height

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `string[]` | — | Ordered list of tab names used for triggers, slots, and active state |
| `theme` | `NyxTheme` | `'default'` | Colour theme |
| `size` | `NyxSize` | `'md'` | Size token |
| `variant` | `NyxTabsVariant` | `'modern'` | Visual style variant |
| `position` | `NyxPosition` | `'top-left'` | Position token passed through shared prop-class generation |
| `floating` | `boolean` | `false` | Adds the `floating` state class |
| `border` | `boolean` | `false` | Adds the `border` state class |
| `tabTransition` | `'none' \| 'fade' \| 'slide-fade' \| 'slide-full'` | `'fade'` | Reserved transition mode token |

## Emits

None beyond the implicit `update:modelValue` emitted by `defineModel`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | — | Optional content rendered between the nav and the panel container |
| `footer` | — | Optional footer rendered after the panel container |
| `tab-${name}` | — | Content for the panel associated with a tab |
| `tab-button-${name}` | — | Custom trigger content for a tab button |

## v-model

Binds to the active tab name as `string`.

## Keyboard behaviour

| Key | Behaviour |
|---|---|
| `ArrowRight` / `ArrowDown` | Activates the next tab, wrapping to the first |
| `ArrowLeft` / `ArrowUp` | Activates the previous tab, wrapping to the last |
| `Home` | Activates the first tab |
| `End` | Activates the last tab |

## Accessibility

- The tab list uses `role="tablist"`
- Each trigger uses `role="tab"`, `aria-selected`, `aria-controls`, and roving `tabindex`
- Each panel uses `role="tabpanel"` and `aria-labelledby`

## Known limitations

- Trigger focus is not programmatically moved when arrow-key navigation changes the active tab
- `tabTransition` is defined but does not currently change the rendered transition behaviour
- Tabs are keyed by display strings, so duplicate tab names are not supported
