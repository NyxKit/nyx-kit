# NyxTrigger

> Shared trigger mode enum used by interactive components.

## Purpose and scope

NyxTrigger defines the supported interaction modes for components that can be opened by user action. It currently covers hover-activated and click-activated patterns.

## Values

| Value | Meaning |
|---|---|
| `Hover` | Open on hover-capable pointer interaction, with click fallback on touch-only devices |
| `Click` | Open and close through click/tap interaction |

## Known limitations

- Only hover and click are supported for now.
