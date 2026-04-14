import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { NyxTheme } from '@/types'
import NyxInput from './NyxInput.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxInput', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxInput)
    expect(wrapper.find('.nyx-input').exists()).toBe(true)
  })

  it('renders an <input> inside the wrapper', () => {
    const wrapper = mount(NyxInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('reflects modelValue in the input', () => {
    const wrapper = mount(NyxInput, { props: { modelValue: 'hello' } })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('hello')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(NyxInput)
    await wrapper.find('input').setValue('typed text')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('typed text')
  })

  it('sets disabled attribute when disabled=true', () => {
    const wrapper = mount(NyxInput, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets readonly attribute when readonly=true', () => {
    const wrapper = mount(NyxInput, { props: { readonly: true } })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('applies theme class', () => {
    const wrapper = mount(NyxInput, { props: { theme: NyxTheme.Primary } })
    expect(wrapper.find('.nyx-input').classes()).toContain('theme-primary')
  })

  it('sets placeholder on input', () => {
    const wrapper = mount(NyxInput, { props: { placeholder: 'Enter text...' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text...')
  })

  it('renders prefix content from props', () => {
    const wrapper = mount(NyxInput, { props: { prefix: '$' } })
    expect(wrapper.find('.nyx-input__prefix').text()).toBe('$')
  })

  it('renders suffix content from props', () => {
    const wrapper = mount(NyxInput, { props: { suffix: 'kg' } })
    expect(wrapper.find('.nyx-input__suffix').text()).toBe('kg')
  })

  it('renders prefix and suffix slots when provided', () => {
    const wrapper = mount(NyxInput, {
      props: {
        prefix: '$',
        suffix: 'kg',
      },
      slots: {
        prefix: '<strong>€</strong>',
        suffix: '<em>lb</em>',
      },
    })

    expect(wrapper.find('.nyx-input__prefix').html()).toContain('€')
    expect(wrapper.find('.nyx-input__suffix').html()).toContain('lb')
  })

  it('emits focus event', async () => {
    const wrapper = mount(NyxInput)
    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event', async () => {
    const wrapper = mount(NyxInput)
    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})
