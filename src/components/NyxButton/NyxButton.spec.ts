import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { NyxTheme, NyxVariant, NyxSize } from '@/types'
import NyxButton from './NyxButton.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxButton', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxButton)
    expect(wrapper.find('.nyx-button').exists()).toBe(true)
  })

  it('renders a <button> by default', () => {
    const wrapper = mount(NyxButton)
    expect(wrapper.find('button.nyx-button').exists()).toBe(true)
    expect(wrapper.find('a.nyx-button').exists()).toBe(false)
  })

  it('renders an <a> when href is provided', () => {
    const wrapper = mount(NyxButton, { props: { href: 'https://example.com' } })
    expect(wrapper.find('a.nyx-button').exists()).toBe(true)
    expect(wrapper.find('button.nyx-button').exists()).toBe(false)
  })

  it('applies theme class', () => {
    const wrapper = mount(NyxButton, { props: { theme: NyxTheme.Primary } })
    expect(wrapper.find('.nyx-button').classes()).toContain('theme-primary')
  })

  it('applies variant class', () => {
    const wrapper = mount(NyxButton, { props: { variant: NyxVariant.Filled } })
    expect(wrapper.find('.nyx-button').classes()).toContain('variant-filled')
  })

  it('applies size class', () => {
    const wrapper = mount(NyxButton, { props: { size: NyxSize.Large } })
    expect(wrapper.find('.nyx-button').classes()).toContain('size-lg')
  })

  it('sets disabled attribute when disabled=true', () => {
    const wrapper = mount(NyxButton, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('renders default slot content', () => {
    const wrapper = mount(NyxButton, { slots: { default: 'Submit' } })
    expect(wrapper.find('.nyx-button').text()).toBe('Submit')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(NyxButton)
    await wrapper.find('.nyx-button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')!.length).toBe(1)
  })

  it('sets href on the anchor element', () => {
    const wrapper = mount(NyxButton, { props: { href: 'https://example.com' } })
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
  })
})
