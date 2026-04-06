# Data Model: Programmatic Confirmation Dialog

**Feature**: `013-programmatic-confirm`

## Types

### ConfirmOptions

Input configuration object for the confirmation dialog.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `theme` | `NyxTheme` | No | `NyxTheme.Primary` | Visual theme for the confirm button |
| `title` | `string` | No | `""` | Modal header text |
| `message` | `string` | Yes | - | Modal body content |
| `confirmText` | `string` | No | `"Confirm"` | Label for the confirm button |
| `cancelText` | `string` | No | `"Cancel"` | Label for the cancel button |

### ConfirmResult

Return type from `NyxKit.confirm()`. Uses `NyxResult` from `src/classes/NyxResult.ts`.

```typescript
type ConfirmResult = NyxResult<void, 'cancelled'>
```

On confirmation: `NyxResult.ok()` (isSuccess: true)  
On cancellation: `NyxResult.fail('cancelled', 'User cancelled')` (isSuccess: false)

---

## Usage Flow

1. Consumer calls `await NyxKit.confirm({ title: 'Delete?', message: 'Are you sure?' })`
2. Internal state opens NyxModal with provided options
3. User clicks Confirm → Promise resolves with `NyxResult.ok()`
4. User clicks Cancel / presses Escape / clicks backdrop → Promise resolves with `NyxResult.fail('cancelled', 'User cancelled')`

---

## Constraints

- Only one confirmation dialog can be open at a time
- If called while a dialog is already open, the call is rejected with an error
- If component unmounts while dialog is open, resolves as cancelled