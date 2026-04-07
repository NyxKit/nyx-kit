import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { NyxTheme, NyxVariant } from '@/types'
import NyxMetricCard from './NyxMetricCard.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('NyxMetricCard', () => {
  // ── US1: Basic metric display ─────────────────────────────────────────────

  it('renders root .nyx-metric-card element', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12' } })
    expect(wrapper.find('.nyx-metric-card').exists()).toBe(true)
  })

  it('renders title text', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'ACTIVE NODES', value: '12' } })
    expect(wrapper.find('.nyx-metric-card__title').text()).toBe('ACTIVE NODES')
  })

  it('renders value text', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12/12' } })
    expect(wrapper.find('.nyx-metric-card__value').text()).toBe('12/12')
  })

  it('does not render unit when unit prop is absent', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12' } })
    expect(wrapper.find('.nyx-metric-card__unit').exists()).toBe(false)
  })

  it('does not render suffix when suffix prop is absent', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12' } })
    expect(wrapper.find('.nyx-metric-card__suffix').exists()).toBe(false)
  })

  it('does not render icon when icon prop is absent', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12' } })
    expect(wrapper.find('.nyx-metric-card__icon').exists()).toBe(false)
  })

  // ── US2: Optional props ───────────────────────────────────────────────────

  it('renders unit text when unit is provided', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'UPTIME', value: '182', unit: 'h' } })
    expect(wrapper.find('.nyx-metric-card__unit').text()).toBe('h')
  })

  it('renders suffix text when suffix is provided', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12/12', suffix: 'STABLE' } })
    expect(wrapper.find('.nyx-metric-card__suffix').text()).toBe('STABLE')
  })

  it('renders icon wrapper when icon is provided', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'LATENCY', value: '24', icon: 'wifi' } })
    expect(wrapper.find('.nyx-metric-card__icon').exists()).toBe(true)
  })

  it('applies theme class when theme is provided', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12', theme: NyxTheme.Success } })
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('theme-success')
  })

  // ── US3: Variants ─────────────────────────────────────────────────────────

  it('applies variant-soft class when variant is soft', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12', variant: NyxVariant.Soft } })
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('variant-soft')
  })

  it('applies variant-subtle class when variant is subtle', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12', variant: NyxVariant.Subtle } })
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('variant-subtle')
  })

  it('applies variant-ghost class when variant is ghost', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12', variant: NyxVariant.Ghost } })
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('variant-ghost')
  })

  it('applies variant-outline class when variant is outline', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12', variant: NyxVariant.Outline } })
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('variant-outline')
  })

  it('applies variant-filled class when variant is filled', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12', variant: NyxVariant.Filled } })
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('variant-filled')
  })

  it('applies variant-text class when variant is text (default)', () => {
    const wrapper = mount(NyxMetricCard, { props: { title: 'NODES', value: '12' } })
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('variant-text')
  })

  // ── US4: Filled variant colour overrides ──────────────────────────────────

  it('renders suffix in non-filled variant alongside theme', () => {
    const wrapper = mount(NyxMetricCard, {
      props: { title: 'NODES', value: '12', suffix: 'STABLE', theme: NyxTheme.Success, variant: NyxVariant.Soft }
    })
    expect(wrapper.find('.nyx-metric-card__suffix').exists()).toBe(true)
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('theme-success')
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('variant-soft')
  })

  it('renders suffix and icon correctly in filled variant', () => {
    const wrapper = mount(NyxMetricCard, {
      props: { title: 'NODES', value: '12', suffix: 'OK', icon: 'check', theme: NyxTheme.Success, variant: NyxVariant.Filled }
    })
    expect(wrapper.find('.nyx-metric-card__suffix').exists()).toBe(true)
    expect(wrapper.find('.nyx-metric-card__icon').exists()).toBe(true)
    expect(wrapper.find('.nyx-metric-card').classes()).toContain('variant-filled')
  })
})
