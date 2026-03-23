import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxSwitch from './NyxSwitch.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxSwitch', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxSwitch)
    expect(wrapper.find('.nyx-switch').exists()).toBe(true)
  })

  it('has nyx-switch--on class when modelValue=true', () => {
    const wrapper = mount(NyxSwitch, { props: { modelValue: true } })
    expect(wrapper.find('.nyx-switch').classes()).toContain('nyx-switch--on')
  })

  it('does not have nyx-switch--on class when modelValue=false', () => {
    const wrapper = mount(NyxSwitch, { props: { modelValue: false } })
    expect(wrapper.find('.nyx-switch').classes()).not.toContain('nyx-switch--on')
  })

  it('emits update:modelValue with true when clicked while off', async () => {
    const wrapper = mount(NyxSwitch, { props: { modelValue: false } })
    await wrapper.find('.nyx-switch').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(true)
  })

  it('emits update:modelValue with false when clicked while on', async () => {
    const wrapper = mount(NyxSwitch, { props: { modelValue: true } })
    await wrapper.find('.nyx-switch').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(false)
  })

  it('toggles model on repeated clicks', async () => {
    const wrapper = mount(NyxSwitch, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (val: boolean) => wrapper.setProps({ modelValue: val })
      }
    })
    await wrapper.find('.nyx-switch').trigger('click')
    expect(wrapper.props('modelValue')).toBe(true)
    await wrapper.find('.nyx-switch').trigger('click')
    expect(wrapper.props('modelValue')).toBe(false)
  })

  it('renders a hidden checkbox input', () => {
    const wrapper = mount(NyxSwitch)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('renders the knob element', () => {
    const wrapper = mount(NyxSwitch)
    expect(wrapper.find('.nyx-switch__knob').exists()).toBe(true)
  })
})
