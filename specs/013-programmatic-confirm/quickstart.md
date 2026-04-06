# Quickstart: Programmatic Confirmation Dialog

**Feature**: `013-programmatic-confirm`

## Installation & Setup

1. Install `nyx-kit`:
   ```bash
   pnpm add nyx-kit
   ```

2. Register the plugin in your Vue app:
   ```typescript
   import { createApp } from 'vue'
   import NyxKit from 'nyx-kit'
   import 'nyx-kit/style.css'

   const app = createApp(App)
   app.use(NyxKit)
   app.mount('#app')
   ```

## Usage

### Basic Confirmation

```typescript
import { NyxKit, NyxTheme } from 'nyx-kit'

const result = await NyxKit.confirm({
  title: 'Delete Item',
  message: 'Are you sure you want to delete this item? This action cannot be undone.'
})

if (result.isSuccess) {
  // User clicked Confirm
  await deleteItem()
} else {
  // User clicked Cancel (or pressed Escape, or clicked backdrop)
  console.log('User cancelled')
}
```

### With Custom Theme

```typescript
import { NyxKit, NyxTheme } from 'nyx-kit'

const result = await NyxKit.confirm({
  theme: NyxTheme.Danger,
  title: 'Confirm Delete',
  message: 'This will permanently delete all selected items.',
  confirmText: 'Delete',
  cancelText: 'Keep'
})
```

### Handling Multiple Calls

If `NyxKit.confirm()` is called while a dialog is already open, it will reject with an error:

```typescript
try {
  await NyxKit.confirm({ message: 'First dialog' })
} catch (error) {
  // Error: 'A confirmation dialog is already open'
}
```

## API Reference

### `NyxKit.confirm(options: ConfirmOptions): Promise<NyxResult<void, 'cancelled'>>`

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `options.theme` | `NyxTheme` | No | `Primary` | Theme for confirm button |
| `options.title` | `string` | No | `""` | Modal header |
| `options.message` | `string` | Yes | - | Modal body content |
| `options.confirmText` | `string` | No | `"Confirm"` | Confirm button label |
| `options.cancelText` | `string` | No | `"Cancel"` | Cancel button label |

### Return Value

Returns a `NyxResult`:
- **On Confirm**: `NyxResult.ok()` - `result.isSuccess === true`
- **On Cancel**: `NyxResult.fail('cancelled', 'User cancelled')` - `result.isSuccess === false`

### NyxTheme Values

- `NyxTheme.Primary` (default)
- `NyxTheme.Secondary`
- `NyxTheme.Success`
- `NyxTheme.Warning`
- `NyxTheme.Danger`
- `NyxTheme.Info`