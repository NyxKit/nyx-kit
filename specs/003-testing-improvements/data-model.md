# Data Model: Testing Improvements

**Branch**: `003-testing-improvements` | **Date**: 2026-03-23

This feature produces no new runtime data models. All artifacts are test files. This document captures the **test contract model** — what each spec file must assert.

---

## Test Contract Model

Each component spec follows this structure:

```text
describe('<ComponentName>', () => {
  // 1. Render smoke test — does it mount without errors?
  // 2. Class/prop reflection — do props produce correct DOM classes?
  // 3. Slot content — do slots render?
  // 4. v-model — does two-way binding work?
  // 5. Emits — do events fire correctly?
  // 6. Keyboard / interaction — do key handlers work?
  // 7. ARIA — are accessibility attributes present and correct?
  // 8. Edge cases — disabled state, falsy values, boundary conditions
})
```

---

## Priority Matrix

| Component | Priority | Key Behaviours to Test |
|-----------|----------|----------------------|
| NyxButton | HIGH | render, classes (theme/variant/size), disabled, slot, click emit, href → `<a>` |
| NyxModal | HIGH | open/close toggle, ESC key, static mode, focus trap, role="dialog", aria-modal, aria-labelledby |
| NyxSlider | HIGH | value → thumbPosition, step snapping, range mode, direction, pointer drag |
| NyxProgress | HIGH | min/max calculation, indeterminate, dots variant, variant-- class |
| NyxInput | HIGH | v-model, disabled, readonly, slots (prefix/suffix), validation class |
| NyxSelect | HIGH | option list renders, selection, multiple mode, open/close |
| NyxTabs | MEDIUM | tab switching, active tab class, slot content per tab |
| NyxCheckbox | MEDIUM | v-model true/false, indeterminate, disabled |
| NyxTextarea | MEDIUM | v-model, resize prop, rows prop |
| NyxSwitch | MEDIUM | v-model true/false, disabled |
| NyxTooltip | MEDIUM | visible on trigger, aria-describedby on trigger |
| NyxBadge | LOW | slot content, theme/variant classes |
| NyxSpinner | LOW | role="progressbar", aria-label, size class |
| NyxCard | LOW | slot renders, click emit |
| useTeleportPositionBase | HIGH | position calculation, mirroring, SSR guard (window undefined) |

---

## Component Test Contracts (detailed)

### NyxButton

```text
Props → DOM:
  - theme='primary' → classList contains 'theme-primary'
  - variant='filled' → classList contains 'variant-filled'
  - size='lg' → classList contains 'size-lg'
  - disabled=true → <button disabled> attribute present
  - href='http://...' → renders <a> not <button>

Slots:
  - default slot renders text content

Emits:
  - @click fired on button click
  - @click NOT fired when disabled

Smoke:
  - mounts without errors
  - has class 'nyx-button'
```

### NyxModal

```text
v-model:
  - modelValue=false → .nyx-modal--open absent
  - modelValue=true → .nyx-modal--open present

ARIA:
  - article[role="dialog"] present when open
  - article[aria-modal="true"] present
  - aria-labelledby matches <h1 :id="..."> when title prop provided

Keyboard:
  - ESC key fires 'close' emit when not static
  - ESC key does NOT close when static=true

Slots:
  - header slot renders
  - footer slot renders
  - default body slot renders

Actions:
  - backdrop click triggers close (not static)
  - close button click triggers 'cancel' emit
  - confirm button click triggers 'confirm' emit

Focus trap:
  - first focusable element receives focus on open (requires attachTo: body)
```

### NyxSlider

```text
Thumb position:
  - modelValue=50, min=0, max=100 → thumbPosition1 = 50%
  - modelValue=25, min=0, max=100 → thumbPosition1 = 25%
  - modelValue=50, min=40, max=60 → thumbPosition1 = 50%

Range mode:
  - modelValue=[10, 90] → two thumbs rendered
  - modelValue=[0, 50] → second thumb renders (model[1] !== undefined guard)

Step snapping:
  - step=10, drag to position 15 → snaps to 20 (or 10 depending on roundToStep)

Direction:
  - direction='column' → drag uses clientY/rect.height (mock getBoundingClientRect)

Keyboard:
  - ArrowRight increases value by step (or 1)
  - ArrowLeft decreases value
```

### NyxProgress

```text
Width calculation:
  - modelValue=50, min=0, max=100 → --progress: '50%'
  - modelValue=50, min=40, max=60 → --progress: '50%'
  - modelValue=null → --progress: '100%' (indeterminate)

Variants:
  - NyxProgressVariant.Dots → renders .nyx-progress__dot elements (count = max)
  - NyxProgressVariant.Line → renders .nyx-progress__bar

Class:
  - has class 'variant--line' (double dash - existing convention)

Label:
  - showValue=true + modelValue=75 → .nyx-progress__label renders '75'
  - showValue=false → no label
```

### useTeleportPositionBase

```text
SSR guard:
  - called with window=undefined → returns without throwing

Position calculation:
  - mock anchor rect + absolute rect
  - assert --top and --left CSS variables match expected position formula

Mirroring:
  - when no space below, mirrors to top
  - when no space right, mirrors to left
```

---

## File Locations

```text
src/
  components/
    NyxButton/NyxButton.spec.ts
    NyxModal/NyxModal.spec.ts
    NyxSlider/NyxSlider.spec.ts
    NyxProgress/NyxProgress.spec.ts
    NyxInput/NyxInput.spec.ts
    NyxSelect/NyxSelect.spec.ts
    NyxTabs/NyxTabs.spec.ts
    NyxCheckbox/NyxCheckbox.spec.ts
    NyxTextarea/NyxTextarea.spec.ts
    NyxSwitch/NyxSwitch.spec.ts
    NyxTooltip/NyxTooltip.spec.ts
    NyxBadge/NyxBadge.spec.ts
    NyxSpinner/NyxSpinner.spec.ts
    NyxCard/NyxCard.spec.ts
  composables/
    useTeleportPositionBase.spec.ts
e2e/
  vue.spec.ts  (UPDATE — remove scaffolding placeholder)
```
