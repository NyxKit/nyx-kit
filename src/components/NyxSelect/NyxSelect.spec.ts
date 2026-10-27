import { describe, it, expect, expectTypeOf, afterEach, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick, reactive } from 'vue'
import vClickOutside from '@/directives/vClickOutside'
import NyxSelect from './NyxSelect.vue'
import { NyxSelectType, type NyxSelectOption, type NyxSelectOptionGroup } from '@/types'
import type { NyxSelectSlots } from './NyxSelect.types'

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

  it('teleports the dropdown into the nearest dialog when rendered inside one', async () => {
    const dialog = document.createElement('dialog')
    document.body.appendChild(dialog)

    wrapper = mount(NyxSelect, {
      attachTo: dialog,
      props: { options: sampleOptions },
      global: globalConfig
    })

    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()

    expect(dialog.querySelector('.nyx-select__dropdown')).not.toBeNull()
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

  it('updates the displayed label when the single-select model changes externally', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: 'a' },
      global: globalConfig
    })

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Option A')

    await wrapper.setProps({ modelValue: 'c' })
    await nextTick()

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Option C')
  })

  it('updates the selected option marker when the single-select model changes externally', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: 'a' },
      global: globalConfig
    })

    await wrapper.setProps({ modelValue: 'c' })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()

    const options = document.body.querySelectorAll('.nyx-select__option')
    expect(options[2].classList.contains('nyx-select__option--selected')).toBe(true)
    expect(options[0].classList.contains('nyx-select__option--selected')).toBe(false)
  })

  it('updates displayed labels when the multi-select model changes externally', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: ['a'], type: NyxSelectType.Multiple },
      global: globalConfig
    })

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Option A')

    await wrapper.setProps({ modelValue: ['b', 'c'] })
    await nextTick()

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Option B, Option C')
  })

  it('updates selected markers when the multi-select model changes externally', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: ['a'], type: NyxSelectType.Multiple },
      global: globalConfig
    })

    await wrapper.setProps({ modelValue: ['b', 'c'] })
    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()

    const options = document.body.querySelectorAll('.nyx-select__option')
    expect(options[0].classList.contains('nyx-select__option--selected')).toBe(false)
    expect(options[1].classList.contains('nyx-select__option--selected')).toBe(true)
    expect(options[2].classList.contains('nyx-select__option--selected')).toBe(true)
  })

  it('clears stale displayed labels when the external value is invalid or cleared', async () => {
    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: sampleOptions, modelValue: 'b' },
      global: globalConfig
    })

    await wrapper.setProps({ modelValue: 'missing' })
    await nextTick()
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    await wrapper.setProps({ modelValue: '' })
    await nextTick()
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')
  })

  it('updates grouped-option selection when the external value changes', async () => {
    const groupedOptions = [
      {
        label: 'Group 1',
        options: [
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' },
        ]
      },
      {
        label: 'Group 2',
        options: [
          { label: 'Option C', value: 'c' },
        ]
      }
    ]

    wrapper = mount(NyxSelect, {
      attachTo: document.body,
      props: { options: groupedOptions, modelValue: 'a' },
      global: globalConfig
    })

    await wrapper.setProps({ modelValue: 'c' })
    await nextTick()
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Option C')

    await wrapper.find('.nyx-select__control').trigger('click')
    await nextTick()
    const options = document.body.querySelectorAll('.nyx-select__option')
    expect(options[2].classList.contains('nyx-select__option--selected')).toBe(true)
  })

  describe.each([false, true])('option content (grouped: %s)', (grouped) => {
    const shape = (options: NyxSelectOption<number>[]): NyxSelectOption<number>[] | NyxSelectOptionGroup<number>[] =>
      grouped ? [{ label: 'Discussions', options }] : options

    const numericOptions = () => [
      { label: 'Release planning', value: 1 },
      { label: 'Archived discussion', value: 2, disabled: true },
      { label: 'Team feedback', value: 3 }
    ]
    const optionSlot = ({ option }: { option: NyxSelectOption<number> }) => h('span', { class: 'custom-option' }, [
      h('span', option.label),
      h('span', { class: 'metadata' }, `Date for ${option.value.toFixed(0)}`)
    ])

    it('preserves the plain label span fallback', () => {
      wrapper = mount(NyxSelect<number>, {
        attachTo: document.body,
        props: { options: shape(numericOptions()), modelValue: 1 },
        global: globalConfig
      })

      const option = document.body.querySelector('[role="option"]')!
      expect(option.innerHTML).toBe('<span>Release planning</span>')
      expect(wrapper.get('input').element.value).toBe('Release planning')
    })

    it('exposes the complete typed option and keeps label-based native options and search', async () => {
      expectTypeOf<Parameters<NonNullable<NyxSelectSlots<number>['option']>>[0]>()
        .toEqualTypeOf<{ option: NyxSelectOption<number> }>()
      const options = numericOptions()
      const slot = vi.fn(optionSlot)
      wrapper = mount(NyxSelect<number>, {
        attachTo: document.body,
        props: { options: shape(options), modelValue: 1 },
        slots: { option: slot },
        global: globalConfig
      })

      expect(document.body.querySelector('.custom-option')?.textContent).toBe('Release planningDate for 1')
      expect(wrapper.get('input').element.value).toBe('Release planning')
      expect(wrapper.findAll('select option').map(option => option.text()))
        .toEqual(options.map(option => option.label))
      await wrapper.get('.nyx-select__control').trigger('click')
      expect(slot.mock.calls.slice(-3).map(([scope]) => scope.option)).toEqual(options)
      await wrapper.get('input').setValue('date for')
      expect(document.body.querySelectorAll('[role="option"]')).toHaveLength(0)
      expect(document.body.textContent).toContain('No results found')
      await wrapper.get('input').setValue('TEAM')
      expect(document.body.querySelectorAll('[role="option"]')).toHaveLength(1)
      expect(document.body.querySelector('[role="option"]')?.getAttribute('data-option-value')).toBe('3')
    })

    it('owns pointer and keyboard selection, disabled rows, ARIA, and input focus', async () => {
      const options = numericOptions()
      wrapper = mount(NyxSelect<number>, {
        attachTo: document.body,
        props: { options: shape(options), modelValue: 1 },
        slots: { option: optionSlot },
        global: globalConfig
      })

      await wrapper.get('.nyx-select__control').trigger('click')
      const input = wrapper.get('input')
      expect(document.activeElement).toBe(input.element)
      const disabled = document.body.querySelector<HTMLElement>('[data-option-value="2"]')!
      expect(disabled.getAttribute('aria-disabled')).toBe('true')
      disabled.querySelector<HTMLElement>('.metadata')!.click()
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.emitted('select')).toBeUndefined()

      await wrapper.get('.nyx-select__control').trigger('click')
      await input.trigger('keydown', { key: 'ArrowDown' })
      const last = document.body.querySelector<HTMLElement>('[data-option-value="3"]')!
      expect(input.attributes('aria-activedescendant')).toBe(last.id)
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
      expect(wrapper.emitted('select')).toEqual([[options[2]]])
      expect(input.attributes('aria-expanded')).toBe('false')
      expect(document.activeElement).toBe(input.element)

      await wrapper.get('.nyx-select__control').trigger('click')
      document.body.querySelector<HTMLElement>('[data-option-value="3"] .metadata')!.click()
      await nextTick()
      expect(wrapper.emitted('select')).toHaveLength(2)
      expect(wrapper.emitted('select')![1]).toEqual([options[2]])
    })

    it.each([NyxSelectType.Single, NyxSelectType.Multiple])(
      'preserves %s selection through option replacement, reorder and reactive label edits',
      async (type) => {
        const modelValue = type === NyxSelectType.Multiple ? [1, 3] : 1
        wrapper = mount(NyxSelect<number>, {
          attachTo: document.body,
          props: { options: shape(numericOptions()), modelValue, type },
          slots: { option: optionSlot },
          global: globalConfig
        })
        const replacements = reactive(numericOptions().reverse())
        await wrapper.setProps({ options: shape(replacements) })
        replacements.find(option => option.value === 1)!.label = 'Updated release'
        await nextTick()
        const label = type === NyxSelectType.Multiple ? 'Updated release, Team feedback' : 'Updated release'
        expect(wrapper.get('input').element.value).toBe(label)
        const native = wrapper.get('select').element as HTMLSelectElement
        expect([...native.selectedOptions].map(option => option.value).sort())
          .toEqual(type === NyxSelectType.Multiple ? ['1', '3'] : ['1'])

        await wrapper.get('.nyx-select__control').trigger('click')
        expect(document.body.querySelector('[data-option-value="1"]')?.getAttribute('aria-selected')).toBe('true')
        expect(document.body.querySelector('[data-option-value="1"] .custom-option')?.textContent)
          .toBe('Updated releaseDate for 1')
        await wrapper.get('input').setValue('Team')
        replacements.find(option => option.value === 1)!.label = 'Latest release'
        await nextTick()
        expect(wrapper.get('input').element.value).toBe('Team')
        await wrapper.get('input').trigger('keyup', { key: 'Escape' })
        expect(wrapper.get('input').element.value)
          .toBe(type === NyxSelectType.Multiple ? 'Latest release, Team feedback' : 'Latest release')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        expect(wrapper.emitted('select')).toBeUndefined()
      }
    )
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
