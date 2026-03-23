# Quickstart: Testing Improvements

**Branch**: `003-testing-improvements` | **Date**: 2026-03-23

## For the implementer

Everything needed to write tests is already installed. No new packages.

### Run the tests

```bash
# Run all unit tests
pnpm test:unit

# Run with watch mode
pnpm test:unit --watch

# Run a single spec file
pnpm test:unit src/components/NyxButton/NyxButton.spec.ts

# Run E2E (requires dev server running first)
pnpm test:e2e
```

### Anatomy of a component spec

All component specs follow the `NyxEditor.spec.ts` pattern. Copy this skeleton:

```ts
import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxXxx from './NyxXxx.vue'

describe('NyxXxx', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxXxx)
    expect(wrapper.find('.nyx-xxx').exists()).toBe(true)
  })
})
```

### Testing components with Teleport

```ts
import { afterEach } from 'vitest'

let wrapper: ReturnType<typeof mount>

afterEach(() => wrapper?.unmount())

it('renders dialog when open', async () => {
  wrapper = mount(NyxModal, {
    attachTo: document.body,
    props: { modelValue: true, title: 'Test' }
  })
  const dialog = document.body.querySelector('[role="dialog"]')
  expect(dialog).not.toBeNull()
})
```

### Mocking `getBoundingClientRect` for drag tests

```ts
import { vi } from 'vitest'

vi.spyOn(trackEl, 'getBoundingClientRect').mockReturnValue({
  left: 0, top: 0, right: 200, bottom: 20,
  width: 200, height: 20, x: 0, y: 0,
  toJSON: () => {}
} as DOMRect)
```

### Testing keyboard events

```ts
await wrapper.trigger('keydown', { key: 'Escape' })
```

Or for document-level listeners (as used in `useKeyPress`):

```ts
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
await nextTick()
```

### Testing `v-model` (defineModel)

```ts
const wrapper = mount(NyxCheckbox, {
  props: {
    modelValue: false,
    'onUpdate:modelValue': (val: boolean) => wrapper.setProps({ modelValue: val })
  }
})
await wrapper.find('input').setValue(true)
expect(wrapper.props('modelValue')).toBe(true)
```

## Priority order for implementation

Work in this order (highest test-coverage ROI first):

1. `NyxButton.spec.ts` — simplest component, establishes pattern
2. `NyxProgress.spec.ts` — verifies the min/max bug fix (C2) is tested
3. `NyxModal.spec.ts` — tests focus trap + ARIA (H2 fixes)
4. `NyxSlider.spec.ts` — drag logic is the highest-risk untested code
5. `NyxInput.spec.ts` — core form primitive
6. `NyxCheckbox.spec.ts`, `NyxTextarea.spec.ts`, `NyxSwitch.spec.ts` — form primitives
7. `NyxSelect.spec.ts` — complex interaction, needs careful mocking
8. `NyxTabs.spec.ts` — tests ARIA tab pattern (H3 fixes)
9. `useTeleportPositionBase.spec.ts` — complex composable
10. `NyxTooltip`, `NyxBadge`, `NyxSpinner`, `NyxCard` — lower priority
11. `e2e/vue.spec.ts` — remove placeholder test
