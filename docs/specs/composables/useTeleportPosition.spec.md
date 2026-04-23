# useTeleportPosition

> Composable for positioning teleported floating UI relative to an anchor element.

## Purpose and scope

Provides viewport-aware positioning, width matching, and the teleport target for floating components such as dropdowns and tooltips.

## Internal architecture

- Wraps `useTeleportPositionBase` for the actual position calculation and CSS variable updates
- Watches the anchor ref so the floating layer repositions if the anchor element instance changes
- Derives `teleportTarget` from the nearest ancestor `<dialog>` when present, otherwise falls back to `body`

## API

### `useTeleportPosition(elRelative, elAbsolute, options?)`

**Parameters**:

| Param | Type | Description |
|---|---|---|
| `elRelative` | `Ref<HTMLElement \| DefineComponent \| null>` | Anchor element used for positioning |
| `elAbsolute` | `Ref<HTMLElement \| DefineComponent \| null>` | Floating element being positioned |
| `options` | `TeleportPositionOptions` | Optional position, width, gap, and offset configuration |

**Returns**:

| Value | Type | Description |
|---|---|---|
| `cssVariables` | `Ref<CssVariablesDict>` | CSS custom properties for top/left/width |
| `computedPosition` | `Ref<NyxPosition>` | Final position after viewport mirroring |
| `teleportTarget` | `ComputedRef<HTMLElement \| 'body'>` | Teleport target, dialog-aware when the anchor sits inside a native `<dialog>` |
| `updateCssVariables` | `() => void` | Recomputes the floating layer position |

## Behaviour

- Uses `useTeleportPositionBase` for clamping and mirroring logic
- Recomputes positioning when the anchor ref changes
- Keeps dropdowns/tooltips above native dialog chrome by teleporting into the dialog when possible

## Known limitations

- `teleportTarget` resolves from the anchor element, so the anchor must exist before the floating layer opens
