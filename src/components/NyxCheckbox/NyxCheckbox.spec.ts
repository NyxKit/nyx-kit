import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxCheckbox from './NyxCheckbox.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxCheckbox', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxCheckbox)
    expect(wrapper.find('.nyx-checkbox').exists()).toBe(true)
  })

  it('renders a checkbox input', () => {
    const wrapper = mount(NyxCheckbox)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('reflects modelValue=true as checked input', () => {
    const wrapper = mount(NyxCheckbox, { props: { modelValue: true } })
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
  })

  it('reflects modelValue=false as unchecked input', () => {
    const wrapper = mount(NyxCheckbox, { props: { modelValue: false } })
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(NyxCheckbox, { props: { modelValue: false } })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(true)
  })

  it('sets disabled attribute when disabled=true', () => {
    const wrapper = mount(NyxCheckbox, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('renders label text when label prop is provided', () => {
    const wrapper = mount(NyxCheckbox, { props: { label: 'Accept terms' } })
    expect(wrapper.find('.nyx-checkbox__label').text()).toBe('Accept terms')
  })

  it('does not render label element when label is empty', () => {
    const wrapper = mount(NyxCheckbox, { props: { label: '' } })
    expect(wrapper.find('.nyx-checkbox__label').exists()).toBe(false)
  })

  it('toggles value when custom checkmark span is clicked', async () => {
    const wrapper = mount(NyxCheckbox, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (val: boolean) => wrapper.setProps({ modelValue: val })
      }
    })
    await wrapper.find('.nyx-checkbox__checkbox').trigger('click')
    expect(wrapper.props('modelValue')).toBe(true)
  })
})
