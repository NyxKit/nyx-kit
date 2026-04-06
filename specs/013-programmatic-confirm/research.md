# Research: Programmatic Confirmation Dialog

**Feature**: `013-programmatic-confirm`  
**Date**: 2026-04-06

## Decisions Made

### Decision 1: How to spawn NyxModal programmatically

**Option A**: Use dynamic component with `h()` or `defineComponent`  
**Option B**: Use Vue's `createVNode` + `render`  
**Option C**: Use Teleport + reactive state in a composable

**Chosen**: Option C - Use a composable that manages modal state and renders NyxModal via a slot-based approach. This follows Vue 3 composition patterns and reuses the existing component cleanly.

**Rationale**: 
- NyxModal already accepts `v-model` for open/close state
- A composable can hold the reactive state and render the modal in the app root
- This pattern is consistent with how other UI libraries (e.g., Vuetify's `$dialog`) handle programmatic dialogs

**Alternatives considered**: 
- Option A/B require more boilerplate and bypass Vue's template system
- Option C leverages existing NyxModal without modification

---

### Decision 2: How to handle multiple confirm calls simultaneously

**Option A**: Queue dialogs (show one at a time)  
**Option B**: Reject new calls while dialog is open  
**Option C**: Replace existing dialog

**Chosen**: Option B - Reject with an error while a dialog is already open.

**Rationale**:
- Simpler implementation
- Forces consumer to handle async flow properly
- Most libraries (sweetalert2, etc.) don't support nesting anyway

**Alternatives considered**:
- Queuing adds complexity and potential for stale state
- Replacing could confuse users who expect previous dialog to complete

---

### Decision 3: How to handle component unmount while dialog is open

**Chosen**: Resolve the promise with `NyxFail` indicating "cancelled".

**Rationale**:
- User didn't explicitly confirm
- Returning a failure result is the safest semantic
- Consumer can check result and handle gracefully

---

### Decision 4: Return type using NyxResult

**Chosen**: Use `NyxResult.ok()` (NyxSuccess) for confirmation and `NyxResult.fail('cancelled', 'User cancelled')` for cancellation.

**Rationale**:
- Aligns with user's request for `isSuccess` property
- NyxResult provides consistent error handling semantics
- Allows consumers to use `.isSuccess` or `.isFailure` checks

---

## Implementation Notes

1. Create a new composable `useNyxConfirm.ts` that:
   - Holds internal state for modal visibility
   - Exposes `confirm(options)` method returning Promise\<NyxResult\>
   - Renders NyxModal when needed

2. Export a singleton `NyxKit` object from `src/main.ts` (extend existing NyxKit) that provides `.confirm()` method

3. Default values:
   - theme: NyxTheme.Primary
   - confirmText: "Confirm"
   - cancelText: "Cancel"
   - title: "" (empty - modal header will be hidden)
   - message: "" (shown in body)

4. The NyxModal component already supports:
   - `v-model` for open/close
   - `title`, `confirmText`, `cancelText` props
   - Emit events: confirm, cancel, close

---

## Open Questions Resolved

| Question | Resolution |
|----------|------------|
| How to mount modal without explicit template? | Use a composable with reactive state that conditionally renders NyxModal |
| What to return on unmount? | NyxFail with 'cancelled' error |
| Default theme? | NyxTheme.Primary |