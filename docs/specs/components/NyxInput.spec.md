# NyxInput

> Text and number input with Nyx theming plus optional prefix and suffix content.

## Purpose and scope

Use this for standard text inputs and numeric inputs when the library styling, sizing, and visual variants are needed. Prefix and suffix content can be supplied either as plain string props or via named slots for richer markup.

## Internal architecture

- Root wrapper `div.nyx-input` receives the resolved Nyx utility classes from `useNyxProps`.
- A native `<input>` is rendered with `v-model` bound to `defineModel<string>()`.
- Prefix and suffix content are rendered in absolutely positioned wrapper spans around the input.
- Slot content overrides the prop fallback for `prefix` and `suffix`.
- When `type === NyxInputType.Number`, number control state and handlers come from `useNyxInputNumber`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `NyxInputType` | `Text` | Native input type |
| `theme` | `NyxTheme` | `Default` via `useNyxProps` | Colour theme |
| `variant` | `NyxVariant` | `Default` via `useNyxProps` | Fill style |
| `size` | `NyxSize` | `Default` via `useNyxProps` | Size scale |
| `pixel` | `boolean` | `false` | Pixel-art mode |
| `prefix` | `string` | `undefined` | Left-side fallback content |
| `suffix` | `string` | `undefined` | Right-side fallback content |
| `id` | `string` | generated | Native input id |
| `disabled` | `boolean` | `false` | Native disabled state |
| `readonly` | `boolean` | `false` | Native readonly state |
| `required` | `boolean` | `false` | Native required state |
| `autofocus` | `boolean` | `false` | Native autofocus |
| `placeholder` | `string` | `undefined` | Native placeholder |
| `autocomplete` | `string` | `undefined` | Native autocomplete |
| `minlength` | `number` | `undefined` | Native minlength |
| `maxlength` | `number` | `undefined` | Native maxlength |
| `pattern` | `string` | `undefined` | Native pattern |
| `tabindex` | `number` | `undefined` | Native tab order |
| `min` | `number` | `undefined` | Native min |
| `max` | `number` | `undefined` | Native max |
| `step` | `number` | `undefined` | Native step |
| `numberControls` | `NyxInputNumberControls` | `Stacked` for number inputs, otherwise `None` | Layout for numeric increment/decrement controls |

## Emits

| Event | Payload | When |
|---|---|---|
| `click` | `MouseEvent` | Input is clicked |
| `focus` | `FocusEvent` | Input receives focus |
| `blur` | `FocusEvent` | Input loses focus |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `prefix` | none | Overrides the left-side prefix fallback content |
| `suffix` | none | Overrides the right-side suffix fallback content |

## v-model

`v-model` binds to the input value as `string`.

## Accessibility

- Uses a native `<input>` element for built-in keyboard and form behaviour.
- Prefix and suffix wrappers are presentation-only and use `pointer-events: none`.
- Number control buttons remain native `<button>` elements, so keyboard activation still works.
- Consumers should provide a label via surrounding form markup or `aria-label`/`aria-labelledby`.

## Known limitations

- Prefix and suffix content are visual only; they do not alter the input value.
- The component generates an id when one is not supplied, but it does not render a label itself.
- The hold-repeat timing is implementation-defined; only the progression of step multipliers is part of the contract.
