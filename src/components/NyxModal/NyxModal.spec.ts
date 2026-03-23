import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NyxModal from './NyxModal.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

let wrapper: ReturnType<typeof mount>

afterEach(() => {
  wrapper?.unmount()
})

describe('NyxModal', () => {
  it('renders without errors', () => {
    wrapper = mount(NyxModal, { attachTo: document.body })
    expect(document.body.querySelector('.nyx-modal')).not.toBeNull()
  })

  it('does not have open class when modelValue is false', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: false }
    })
    const modal = document.body.querySelector('.nyx-modal')
    expect(modal?.classList.contains('nyx-modal--open')).toBe(false)
  })

  it('has open class when modelValue is true', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true }
    })
    const modal = document.body.querySelector('.nyx-modal')
    expect(modal?.classList.contains('nyx-modal--open')).toBe(true)
  })

  it('has open class when static=true regardless of modelValue', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: false, static: true }
    })
    const modal = document.body.querySelector('.nyx-modal')
    expect(modal?.classList.contains('nyx-modal--open')).toBe(true)
  })

  it('has role="dialog" on the article element when open', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true }
    })
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog).not.toBeNull()
  })

  it('has aria-modal="true" on the dialog element', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true }
    })
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
  })

  it('sets aria-labelledby when title is provided', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true, title: 'Test Modal' }
    })
    const dialog = document.body.querySelector('[role="dialog"]')
    const labelledById = dialog?.getAttribute('aria-labelledby')
    expect(labelledById).toBeTruthy()
    const title = document.body.querySelector(`#${labelledById}`)
    expect(title?.textContent).toBe('Test Modal')
  })

  it('renders default slot content in body', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true },
      slots: { default: '<p class="body-content">Body text</p>' }
    })
    expect(document.body.querySelector('.body-content')).not.toBeNull()
  })

  it('renders header slot', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true },
      slots: { header: '<h2 class="custom-header">Custom Header</h2>' }
    })
    expect(document.body.querySelector('.custom-header')).not.toBeNull()
  })

  it('emits close when ESC key is pressed', async () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true }
    })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(false)
  })

  it('does not close on ESC when static=true', async () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true, static: true }
    })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('emits close when the × close button is clicked', async () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true, title: 'Test' }
    })
    const closeBtn = document.body.querySelector<HTMLButtonElement>('.nyx-modal__close')
    closeBtn?.click()
    await nextTick()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits confirm when confirm button is clicked', async () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true, confirmText: 'OK' }
    })
    await nextTick()
    // Find the confirm button (last NyxButton in footer)
    const buttons = document.body.querySelectorAll<HTMLButtonElement>('.nyx-modal__footer .nyx-button')
    const confirmBtn = buttons[buttons.length - 1]
    confirmBtn?.click()
    await nextTick()
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('renders confirm button when confirmText is provided', () => {
    wrapper = mount(NyxModal, {
      attachTo: document.body,
      props: { modelValue: true, confirmText: 'Confirm' }
    })
    expect(document.body.querySelector('.nyx-modal__footer')).not.toBeNull()
  })
})
