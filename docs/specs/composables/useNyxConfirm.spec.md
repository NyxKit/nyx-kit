# useNyxConfirm

> Composable for programmatic confirmation dialogs.

## Purpose and scope

Provides a `confirm()` function that spawns a modal dialog using the existing NyxModal component. Returns a Promise that resolves with a NyxResult indicating user confirmation or cancellation.

## Internal architecture

- Uses Vue's `h()` and `render()` to programmatically mount NyxModal
- Maintains a singleton container element for the dialog
- Tracks dialog state with a module-level `isDialogOpen` flag
- Resolves the promise on confirm/cancel/close events from NyxModal

## API

### `confirm(options: ConfirmOptions): Promise<NyxResultVoid<'cancelled'>>`

**Parameters**:

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `options.theme` | `NyxTheme` | `NyxTheme.Primary` | Theme for the confirm button |
| `options.title` | `string` | `''` | Modal header text |
| `options.message` | `string` | *(required)* | Modal body content |
| `options.confirmText` | `string` | `'Confirm'` | Confirm button label |
| `options.cancelText` | `string` | `'Cancel'` | Cancel button label |

**Return**: `Promise<NyxResultVoid<'cancelled'>>`
- On confirm: `NyxResult.ok()` (isSuccess: true)
- On cancel: `NyxResult.fail('cancelled', 'User cancelled')` (isSuccess: false)

## Edge cases

- **Concurrent calls**: If called while a dialog is already open, returns a rejected Promise with error "A confirmation dialog is already open"
- **Unmount**: If the composable is unmounted while the dialog is open, the promise resolves as cancelled

## Dependencies

- NyxModal component
- NyxResult class from `src/classes/NyxResult.ts`
- NyxTheme enum from `src/types/common.ts`

## Known limitations

- Only one confirmation dialog can be open at a time
- Requires the library to be used as a Vue plugin (app.use(NyxKit))