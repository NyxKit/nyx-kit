import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NyxDropdown from './NyxDropdown.vue'
import { NyxPosition, NyxSize, NyxTheme, NyxTrigger, NyxVariant } from '@/types'

const sampleOptions = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Delete', value: 'delete', disabled: true },
]

let wrapper: ReturnType<typeof mount>

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: true,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
})

afterEach(() => {
  wrapper?.unmount()
  vi.unstubAllGlobals()
})

describe('NyxDropdown', () => {
  it('opens and closes when the trigger is activated', async () => {
    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: { options: sampleOptions },
      slots: { default: '<button type="button">Actions</button>' },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    expect(document.body.querySelector('.nyx-dropdown__panel')).not.toBeNull()

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    await nextTick()
    expect(document.body.querySelector('.nyx-dropdown__panel')).toBeNull()
  })

  it('renders the default option menu when no custom dropdown slot is provided', async () => {
    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: { options: sampleOptions },
      slots: { default: '<button type="button">Actions</button>' },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    await nextTick()

    const items = document.body.querySelectorAll('.nyx-dropdown-item')
    expect(items.length).toBe(3)
    expect(items[0].textContent).toContain('Edit')
  })

  it('opens on hover when hover is supported', async () => {
    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: { options: sampleOptions, trigger: NyxTrigger.Hover },
      slots: { default: '<button type="button">Actions</button>' },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('pointerenter')
    await nextTick()

    expect(document.body.querySelector('.nyx-dropdown__panel')).not.toBeNull()
  })

  it('falls back to click when hover is unavailable', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: { options: sampleOptions, trigger: NyxTrigger.Hover },
      slots: { default: '<button type="button">Actions</button>' },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    await nextTick()

    expect(document.body.querySelector('.nyx-dropdown__panel')).not.toBeNull()
  })

  it('closes when clicking outside the dropdown', async () => {
    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: { options: sampleOptions, trigger: NyxTrigger.Click },
      slots: { default: '<button type="button">Actions</button>' },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    await nextTick()

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(document.body.querySelector('.nyx-dropdown__panel')).toBeNull()
  })

  it('forwards theme, size, and variant props to the default menu', async () => {
    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: {
        options: sampleOptions,
        theme: NyxTheme.Secondary,
        size: NyxSize.Small,
        variant: NyxVariant.Outline,
      },
      slots: { default: '<button type="button">Actions</button>' },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    await nextTick()

    const menu = document.body.querySelector('.nyx-dropdown-menu')
    expect(menu?.className).toContain('theme-secondary')
    expect(menu?.className).toContain('size-sm')
    expect(menu?.className).toContain('variant-outline')
  })

  it('forwards the position prop to the teleported panel', async () => {
    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: {
        options: sampleOptions,
        position: NyxPosition.Top,
      },
      slots: { default: '<button type="button">Actions</button>' },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    await nextTick()

    const panel = document.body.querySelector('.nyx-dropdown__panel')
    expect(panel?.getAttribute('data-position')).toBe('top')
  })

  it('emits select and closes when a menu item is activated', async () => {
    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: { options: sampleOptions },
      slots: { default: '<button type="button">Actions</button>' },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    await nextTick()

    const firstItem = document.body.querySelector<HTMLButtonElement>('.nyx-dropdown-item')
    firstItem?.click()
    await nextTick()

    expect(wrapper.emitted('select')?.[0]?.[0]).toEqual(sampleOptions[0])
    expect(document.body.querySelector('.nyx-dropdown__panel')).toBeNull()
  })

  it('renders custom dropdown content when the dropdown slot is provided', async () => {
    wrapper = mount(NyxDropdown, {
      attachTo: document.body,
      props: { options: sampleOptions },
      slots: {
        default: '<button type="button">Actions</button>',
        dropdown: '<div class="custom-panel">Custom content</div>',
      },
    })

    await wrapper.get('.nyx-dropdown__trigger').trigger('click')
    await nextTick()

    expect(document.body.querySelector('.custom-panel')).not.toBeNull()
    expect(document.body.querySelector('.nyx-dropdown-item')).toBeNull()
  })
})
