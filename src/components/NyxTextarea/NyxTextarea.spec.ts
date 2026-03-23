import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { NyxTheme } from '@/types'
import NyxTextarea from './NyxTextarea.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxTextarea', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxTextarea)
    expect(wrapper.find('.nyx-textarea').exists()).toBe(true)
  })

  it('renders a <textarea> inside the wrapper', () => {
    const wrapper = mount(NyxTextarea)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('reflects modelValue in the textarea', () => {
    const wrapper = mount(NyxTextarea, { props: { modelValue: 'hello' } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('hello')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(NyxTextarea)
    await wrapper.find('textarea').setValue('typed text')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('typed text')
  })

  it('sets disabled attribute when disabled=true', () => {
    const wrapper = mount(NyxTextarea, { props: { disabled: true } })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('sets readonly attribute when readonly=true', () => {
    const wrapper = mount(NyxTextarea, { props: { readonly: true } })
    expect(wrapper.find('textarea').attributes('readonly')).toBeDefined()
  })

  it('applies theme class', () => {
    const wrapper = mount(NyxTextarea, { props: { theme: NyxTheme.Primary } })
    expect(wrapper.find('.nyx-textarea').classes()).toContain('theme-primary')
  })

  it('sets placeholder on textarea', () => {
    const wrapper = mount(NyxTextarea, { props: { placeholder: 'Enter text...' } })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter text...')
  })

  it('emits focus event', async () => {
    const wrapper = mount(NyxTextarea)
    await wrapper.find('textarea').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event', async () => {
    const wrapper = mount(NyxTextarea)
    await wrapper.find('textarea').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})
