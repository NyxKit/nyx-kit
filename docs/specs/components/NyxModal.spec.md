# NyxModal

> Native `<dialog>` modal with backdrop, confirm/cancel actions, and slot-based content.

## Purpose and scope

NyxModal is the library's standard modal surface for confirmations, forms, and longer content. It uses the native dialog element so it participates in the browser top layer.

## Internal architecture

- Root element is a native `<dialog>` with `showModal()` / `close()` control
- Uses `defineModel<boolean>()` for open state
- Tracks title labeling with a generated `aria-labelledby` id when a header/title is present
- Resolves a focusable element on open and focuses it after the dialog opens
- Uses `useNyxProps` for theme, size, variant-style class resolution
- The dialog shell keeps `overflow: visible` so teleported children can escape the modal box when needed
- The animated modal chrome lives in an inner `.nyx-modal__surface` wrapper so the dialog root itself does not create a containing block for teleported overlays

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Fallback header title |
| `confirmText` | `string` | — | Confirm button label |
| `cancelText` | `string` | `Close` | Cancel button label |
| `size` | `NyxSize` | `default` | Modal size token |
| `static` | `boolean` | `false` | Prevents closing |
| `backdrop` | `boolean` | `true` | Toggles the backdrop |
| `customClass` | `string` | — | Additional class on the dialog |
| `pixel` | `boolean` | `false` | Enables pixel mode |
| `theme` | `NyxTheme` | `default` | Theme token for confirm button |

## Emits

| Event | Payload | When |
|---|---|---|
| `close` | — | Dialog is dismissed by the component |
| `cancel` | — | Cancel action is triggered |
| `confirm` | — | Confirm action is triggered |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | — | Modal body content |
| `header` | — | Custom header content |
| `footer` | — | Custom footer actions |

## v-model

Binds to `boolean` open state.

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Applies `aria-labelledby` when a title/header is available
- Focuses the first focusable descendant when opened

## Known limitations

- No built-in focus trap beyond initial focus placement
- Modal sizing and layout assume content is rendered inside the dialog shell
