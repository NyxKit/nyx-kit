# Contracts: Programmatic Confirmation Dialog

**Feature**: `013-programmatic-confirm`

## Public API Contract

### `NyxKit.confirm()`

**Location**: Exported from `nyx-kit` package main entry

**Signature**:
```typescript
function confirm(options: ConfirmOptions): Promise<NyxResult<void, 'cancelled'>>
```

**Parameters** (`ConfirmOptions`):
```typescript
interface ConfirmOptions {
  theme?: NyxTheme          // Default: NyxTheme.Primary
  title?: string            // Default: ""
  message: string           // Required
  confirmText?: string     // Default: "Confirm"
  cancelText?: string       // Default: "Cancel"
}
```

**Return Type** (`NyxResult`):
```typescript
// On success (user confirmed):
{ isSuccess: true, isFailure: false, value: void }

// On failure (user cancelled):
{ isSuccess: false, isFailure: true, error: 'cancelled', message: 'User cancelled' }
```

**Errors**:
- Throws `Error` if called while another confirmation dialog is already open: "A confirmation dialog is already open"

---

## Vue Plugin Integration

The `confirm()` method is added to the existing `NyxKit` plugin object.

```typescript
import NyxKit from 'nyx-kit'

// After app.use(NyxKit), NyxKit.confirm() is available
app.use(NyxKit)
```

---

## Dependencies

- `NyxModal` component (internal - renders the dialog)
- `NyxResult` class from `src/classes/NyxResult.ts`
- `NyxTheme` enum from `src/types/common.ts`