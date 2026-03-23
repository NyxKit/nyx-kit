import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { NyxSize } from '@/types'
import NyxSpinner from './NyxSpinner.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxSpinner', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxSpinner)
    expect(wrapper.find('.nyx-spinner').exists()).toBe(true)
  })

  it('has role="progressbar"', () => {
    const wrapper = mount(NyxSpinner)
    expect(wrapper.find('.nyx-spinner').attributes('role')).toBe('progressbar')
  })

  it('has aria-label="Loading"', () => {
    const wrapper = mount(NyxSpinner)
    expect(wrapper.find('.nyx-spinner').attributes('aria-label')).toBe('Loading')
  })

  it('renders as an SVG element', () => {
    const wrapper = mount(NyxSpinner)
    expect(wrapper.find('svg.nyx-spinner').exists()).toBe(true)
  })

  it('renders track and indicator circles', () => {
    const wrapper = mount(NyxSpinner)
    expect(wrapper.find('.nyx-spinner__track').exists()).toBe(true)
    expect(wrapper.find('.nyx-spinner__indicator').exists()).toBe(true)
  })

  it('applies size class', () => {
    const wrapper = mount(NyxSpinner, { props: { size: NyxSize.Large } })
    expect(wrapper.find('.nyx-spinner').classes()).toContain('size-lg')
  })
})
