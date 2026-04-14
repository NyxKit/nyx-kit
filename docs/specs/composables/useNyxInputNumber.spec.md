# useNyxInputNumber

> Composable for NyxInput numeric controls and press-and-hold repetition.

## Purpose and scope

Encapsulates the number-input specific logic for `NyxInput`: control visibility, button styling, single-step clicks, and fixed-step press-and-hold repetition.

## Internal architecture

- Computes whether number controls should render based on `type` and `numberControls`.
- Derives the number button variant from the resolved Nyx variant.
- Tracks hold timers and press count with local refs.
- Cleans up timers on unmount.

## API

### `useNyxInputNumber(options, model, nyxVariant)`

**Parameters**:

| Param | Type | Description |
|---|---|---|
| `options.type` | `NyxInputType` | Input type used to gate numeric controls |
| `options.step` | `number` | Step amount used for each increment/decrement |
| `options.min` | `number` | Fallback value when decrementing from an empty model |
| `options.max` | `number` | Fallback value when incrementing from an empty model |
| `options.numberControls` | `NyxInputNumberControls` | Layout choice for numeric controls |
| `options.holdDelay` | `number` | `400` | Delay before auto-repeat starts |
| `model` | `Ref<string | undefined>` | Input value to update |
| `nyxVariant` | `Ref<NyxVariant>` | Resolved visual variant used to style the buttons |

**Returns**:

| Value | Type | Description |
|---|---|---|
| `normalizedNumberControls` | `ComputedRef<NyxInputNumberControls>` | Resolved control layout |
| `numberButtonVariant` | `ComputedRef<NyxVariant>` | Button variant derived from the parent variant |
| `onNumberButtonClick` | `(direction, event?) => void` | Handles click-based stepping |
| `onNumberButtonPointerDown` | `(direction, event) => void` | Starts hold acceleration |
| `onNumberButtonPointerUp` | `() => void` | Stops hold acceleration |

## Behaviour

- A pointer down performs an immediate step.
- Hold repeat starts after a configurable delay (default `400ms`).
- Repeat uses the same `step` value on every auto-repeat tick.
- Mouse clicks with a non-zero `detail` do not double-step after pointer-driven activation.
- An empty string model value is treated as unset, so cleared inputs still step from the fallback base.

## Known limitations

- Hold timings are implementation details and may be tuned later.
