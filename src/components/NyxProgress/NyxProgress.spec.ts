import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { NyxProgressVariant } from '@/types'
import NyxProgress from './NyxProgress.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxProgress', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxProgress)
    expect(wrapper.find('.nyx-progress').exists()).toBe(true)
  })

  it('calculates progress width for standard range', () => {
    const wrapper = mount(NyxProgress, { props: { modelValue: 50, min: 0, max: 100 } })
    const style = wrapper.find('.nyx-progress').attributes('style')
    expect(style).toContain('--progress: 50%')
  })

  it('calculates progress width correctly with non-zero min (C2 regression)', () => {
    // modelValue=50, min=40, max=60 → (50-40)/(60-40) = 10/20 = 50%
    const wrapper = mount(NyxProgress, { props: { modelValue: 50, min: 40, max: 60 } })
    const style = wrapper.find('.nyx-progress').attributes('style')
    expect(style).toContain('--progress: 50%')
  })

  it('calculates 0% progress at minimum value', () => {
    const wrapper = mount(NyxProgress, { props: { modelValue: 40, min: 40, max: 60 } })
    const style = wrapper.find('.nyx-progress').attributes('style')
    expect(style).toContain('--progress: 0%')
  })

  it('calculates 100% progress at maximum value', () => {
    const wrapper = mount(NyxProgress, { props: { modelValue: 60, min: 40, max: 60 } })
    const style = wrapper.find('.nyx-progress').attributes('style')
    expect(style).toContain('--progress: 100%')
  })

  it('shows indeterminate state when modelValue is null', () => {
    const wrapper = mount(NyxProgress, { props: { modelValue: null } })
    const style = wrapper.find('.nyx-progress').attributes('style')
    expect(style).toContain('--progress: 100%')
    expect(wrapper.find('.indeterminate').exists()).toBe(true)
  })

  it('renders line bar for line variant', () => {
    const wrapper = mount(NyxProgress, {
      props: { modelValue: 50, variant: NyxProgressVariant.Line }
    })
    expect(wrapper.find('.nyx-progress__bar').exists()).toBe(true)
  })

  it('renders dots for dots variant', () => {
    const wrapper = mount(NyxProgress, {
      props: { modelValue: 2, variant: NyxProgressVariant.Dots, max: 5 }
    })
    expect(wrapper.findAll('.nyx-progress__dot').length).toBe(5)
    expect(wrapper.find('.nyx-progress__bar').exists()).toBe(false)
  })

  it('applies variant-- double-dash class', () => {
    const wrapper = mount(NyxProgress, { props: { variant: NyxProgressVariant.Line } })
    expect(wrapper.find('.nyx-progress').classes()).toContain('variant--line')
  })

  it('shows label when showValue is provided and modelValue is not null', () => {
    const wrapper = mount(NyxProgress, {
      props: { modelValue: 75, showValue: 'end' }
    })
    expect(wrapper.find('.nyx-progress__label').exists()).toBe(true)
    expect(wrapper.find('.nyx-progress__label').text()).toBe('75')
  })

  it('does not show label when modelValue is null', () => {
    const wrapper = mount(NyxProgress, {
      props: { modelValue: null, showValue: 'end' }
    })
    expect(wrapper.find('.nyx-progress__label').exists()).toBe(false)
  })
})
