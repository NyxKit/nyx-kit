# NyxTooltip

> Teleported tooltip with configurable opening delay.

## Purpose and scope

Displays short supporting text or slot content next to a trigger. Supports hover, click, and externally controlled visibility.

## Internal architecture

`NyxTooltip.vue` uses `useNyxProps` for visual classes and `useTeleportPosition` for positioning and teleporting into the nearest native dialog or the document body. Content remains mounted; the model controls the open class. `updatePosition()` is exposed for explicit position recalculation.

One pending timer delays automatic opening. Repeated trigger events do not restart it. Mouse leave, outside click, trigger/delay changes, external model changes, and unmount cancel pending opening. Closing updates the model immediately (existing CSS transitions still apply). A changed delay applies to the next trigger event.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string \| number` | Omitted | Fallback tooltip content |
| `theme` | `NyxTheme` | Inherited | Visual theme |
| `variant` | `NyxVariant` | Inherited | Visual variant |
| `size` | `NyxSize` | Inherited | Visual size |
| `position` | `NyxPosition` | `NyxPosition.Top` | Initial preferred placement |
| `disabled` | `boolean` | `false` | Adds the shared disabled class; does not currently suppress triggers |
| `trigger` | `'hover' \| 'click' \| 'manual'` | `'hover'` | Automatic opening event, or external control only |
| `delay` | `number` | `150` | Opening delay in milliseconds for hover and click. Zero, negative, or non-finite values open immediately |

## Emits and v-model

`v-model` is a boolean, defaulting to `false`. Automatic opening emits `update:modelValue(true)` after the delay; mouse leave and outside click close automatic tooltips immediately. Manual mode ignores these events. External model updates are immediate and bypass `delay`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | None | Trigger content |
| `tooltip-content` | None | Replaces the text fallback |

## Keyboard behaviour and accessibility

The wrapper has `aria-describedby` pointing to the unique ID of the content, which has `role="tooltip"`. No focus, blur, or Escape handlers are implemented. Consumers requiring keyboard opening must control the model themselves.

## Known limitations

- `disabled` does not currently prevent opening or close an open tooltip.
- `aria-describedby` belongs to the wrapper, not automatically to a slotted focusable element.
- Position is captured at setup; reactive position changes are not tracked.
- Assigning the same external model value again cannot cancel a pending timer because it is not a reactive change.
