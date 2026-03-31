import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import vClickOutside from '@/directives/vClickOutside'
import NyxSelect from './NyxSelect.vue'
import { NyxSelectType } from '@/types'

const globalConfig = {
  directives: { clickOutside: vClickOutside }
}

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.stubGlobal('scrollIntoView', vi.fn())
})

let wrapper: ReturnType<typeof mount>

afterEach(() => {
  wrapper?.unmount()
})

const sampleOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
]

describe('NyxSelect', () => {
  it('renders without errors', () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    expect(wrapper.find('.nyx-select').exists()).toBe(true)
  })

  it('renders the control element', () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    expect(wrapper.find('.nyx-select__control').exists()).toBe(true)
  })

  it('dropdown is not open by default', () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    const control = wrapper.find('.nyx-select__control')
    expect(control.classes()).not.toContain('nyx-select__control--open')
  })

  it('opens dropdown when control is clicked', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    expect(wrapper.find('.nyx-select__control').classes()).toContain('nyx-select__control--open')
  })

  it('renders option items in the dropdown', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()
    const options = document.body.querySelectorAll('.nyx-select__option')
    expect(options.length).toBe(3)
  })

  it('selects an option and closes dropdown on click', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: '' },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()
    const firstOption = document.body.querySelector<HTMLElement>('.nyx-select__option')
    firstOption?.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('a')
    expect(wrapper.find('.nyx-select__control').classes()).not.toContain('nyx-select__control--open')
  })

  it('marks selected option with selected class', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: 'b' },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()
    const options = document.body.querySelectorAll('.nyx-select__option')
    expect(options[1].classList.contains('nyx-select__option--selected')).toBe(true)
    expect(options[0].classList.contains('nyx-select__option--selected')).toBe(false)
  })

  it('emits array with selected value in multiple mode', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: [], type: NyxSelectType.Multiple },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()
    const firstOption = document.body.querySelector<HTMLElement>('.nyx-select__option')
    firstOption?.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const emittedValue = wrapper.emitted('update:modelValue')![0][0]
    expect(Array.isArray(emittedValue)).toBe(true)
    expect(emittedValue).toContain('a')
  })

  it('has a hidden native <select> for accessibility', () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    expect(wrapper.find('select.sr-only').exists()).toBe(true)
  })

  it('input has role="combobox"', () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    expect(wrapper.find('[role="combobox"]').exists()).toBe(true)
  })

  it('combobox input has aria-expanded=false when closed', () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe('false')
  })

  it('combobox input has aria-expanded=true when open', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe('true')
  })

  it('dropdown has role="listbox"', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()
    expect(document.body.querySelector('[role="listbox"]')).not.toBeNull()
  })

  it('options have role="option"', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()
    const optionEls = document.body.querySelectorAll('[role="option"]')
    expect(optionEls.length).toBe(3)
  })

  it('selected option has aria-selected=true', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: 'b' },
      global: globalConfig
    })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()
    const optionEls = document.body.querySelectorAll('[role="option"]')
    expect(optionEls[1].getAttribute('aria-selected')).toBe('true')
    expect(optionEls[0].getAttribute('aria-selected')).toBe('false')
  })

  describe('keyboard navigation', () => {
    const optionsWithDisabled = [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b', disabled: true },
      { label: 'Option C', value: 'c' },
    ]

    it('ArrowDown moves focus to next option', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: sampleOptions },
        global: globalConfig
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      const options = document.body.querySelectorAll('.nyx-select__option')
      expect(options[0].classList.contains('nyx-select__option--focused')).toBe(true)
    })

    it('ArrowDown skips disabled options', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: optionsWithDisabled },
        global: globalConfig
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      const options = document.body.querySelectorAll('.nyx-select__option')
      expect(options[0].classList.contains('nyx-select__option--focused')).toBe(true)
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      expect(options[2].classList.contains('nyx-select__option--focused')).toBe(true)
    })

    it('ArrowUp moves focus to previous option', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: sampleOptions, modelValue: 'c' },
        global: globalConfig
      })
      await wrapper.find('.nyx-select__control').trigger('click')
      await nextTick()
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowUp' })
      await nextTick()
      const options = document.body.querySelectorAll('.nyx-select__option')
      expect(options[1].classList.contains('nyx-select__option--focused')).toBe(true)
    })

    it('ArrowUp skips disabled options', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: optionsWithDisabled, modelValue: 'c' },
        global: globalConfig
      })
      await wrapper.find('.nyx-select__control').trigger('click')
      await nextTick()
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowUp' })
      await nextTick()
      const options = document.body.querySelectorAll('.nyx-select__option')
      expect(options[0].classList.contains('nyx-select__option--focused')).toBe(true)
    })

    it('Home moves focus to first option', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: sampleOptions, modelValue: 'c' },
        global: globalConfig
      })
      await wrapper.find('.nyx-select__control').trigger('click')
      await nextTick()
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'Home' })
      await nextTick()
      const options = document.body.querySelectorAll('.nyx-select__option')
      expect(options[0].classList.contains('nyx-select__option--focused')).toBe(true)
    })

    it('End moves focus to last option', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: sampleOptions },
        global: globalConfig
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'End' })
      await nextTick()
      const options = document.body.querySelectorAll('.nyx-select__option')
      expect(options[2].classList.contains('nyx-select__option--focused')).toBe(true)
    })

    it('Enter selects focused option', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: sampleOptions, modelValue: '' },
        global: globalConfig
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('a')
    })



    it('opens dropdown when ArrowDown is pressed', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: sampleOptions },
        global: globalConfig
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      expect(wrapper.find('.nyx-select__control').classes()).toContain('nyx-select__control--open')
    })

    it('input has aria-activedescendant when option is focused', async () => {
      wrapper = mount(NyxSelect, {
        attachTo: document.body,
        props: { options: sampleOptions },
        global: globalConfig
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      const inputEl = input.element as HTMLInputElement
      expect(inputEl.getAttribute('aria-activedescendant')).toBeTruthy()
    })
  })
})
