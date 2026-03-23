import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxSteps from './NyxSteps.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

const steps = ['Setup', 'Configure', 'Deploy']

describe('NyxSteps', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxSteps, { props: { steps } })
    expect(wrapper.find('.nyx-steps').exists()).toBe(true)
  })

  it('renders a button for each step', () => {
    const wrapper = mount(NyxSteps, { props: { steps } })
    expect(wrapper.findAll('.nyx-steps__step').length).toBe(3)
  })

  it('renders a numeric steps count', () => {
    const wrapper = mount(NyxSteps, { props: { steps: 4 } })
    expect(wrapper.findAll('.nyx-steps__step').length).toBe(4)
  })

  it('first step is current by default', () => {
    const wrapper = mount(NyxSteps, { props: { steps } })
    expect(wrapper.findAll('.nyx-steps__step')[0].classes()).toContain('nyx-steps__step--status-current')
  })

  it('marks steps before modelValue as complete', () => {
    const wrapper = mount(NyxSteps, { props: { steps, modelValue: 2 } })
    const stepEls = wrapper.findAll('.nyx-steps__step')
    expect(stepEls[0].classes()).toContain('nyx-steps__step--status-complete')
    expect(stepEls[1].classes()).toContain('nyx-steps__step--status-complete')
    expect(stepEls[2].classes()).toContain('nyx-steps__step--status-current')
  })

  it('marks steps after modelValue as incomplete', () => {
    const wrapper = mount(NyxSteps, { props: { steps, modelValue: 1 } })
    const stepEls = wrapper.findAll('.nyx-steps__step')
    expect(stepEls[2].classes()).toContain('nyx-steps__step--status-incomplete')
  })

  it('is readonly by default — clicking does not emit', async () => {
    const wrapper = mount(NyxSteps, { props: { steps } })
    await wrapper.findAll('.nyx-steps__step')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('emits update:modelValue on step click when not readonly', async () => {
    const wrapper = mount(NyxSteps, { props: { steps, modelValue: 0, readonly: false } })
    await wrapper.findAll('.nyx-steps__step')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(2)
  })

  it('applies column direction class', () => {
    const wrapper = mount(NyxSteps, { props: { steps, direction: 'column' } })
    expect(wrapper.find('.nyx-steps').classes()).toContain('nyx-steps--column')
  })

  it('applies readonly class when readonly', () => {
    const wrapper = mount(NyxSteps, { props: { steps, readonly: true } })
    expect(wrapper.find('.nyx-steps').classes()).toContain('nyx-steps--readonly')
  })

  it('works with string array steps and string modelValue', async () => {
    const wrapper = mount(NyxSteps, {
      props: { steps, modelValue: 'Configure', readonly: false }
    })
    const stepEls = wrapper.findAll('.nyx-steps__step')
    expect(stepEls[0].classes()).toContain('nyx-steps__step--status-complete')
    expect(stepEls[1].classes()).toContain('nyx-steps__step--status-current')
    expect(stepEls[2].classes()).toContain('nyx-steps__step--status-incomplete')
  })
})
