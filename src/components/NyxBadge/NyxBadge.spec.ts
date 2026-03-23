import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { NyxTheme, NyxVariant } from '@/types'
import NyxBadge from './NyxBadge.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxBadge', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxBadge)
    expect(wrapper.find('.nyx-badge').exists()).toBe(true)
  })

  it('renders default slot content', () => {
    const wrapper = mount(NyxBadge, { slots: { default: 'New' } })
    expect(wrapper.find('.nyx-badge').text()).toContain('New')
  })

  it('applies theme class', () => {
    const wrapper = mount(NyxBadge, { props: { theme: NyxTheme.Primary } })
    expect(wrapper.find('.nyx-badge').classes()).toContain('theme-primary')
  })

  it('applies variant class', () => {
    const wrapper = mount(NyxBadge, { props: { variant: NyxVariant.Filled } })
    expect(wrapper.find('.nyx-badge').classes()).toContain('variant-filled')
  })

  it('does not render close button by default', () => {
    const wrapper = mount(NyxBadge)
    expect(wrapper.find('.nyx-badge__button').exists()).toBe(false)
  })

  it('renders close button when hasClose=true', () => {
    const wrapper = mount(NyxBadge, { props: { hasClose: true } })
    expect(wrapper.find('.nyx-badge__button').exists()).toBe(true)
    expect(wrapper.find('.nyx-badge').classes()).toContain('nyx-badge--closable')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(NyxBadge, { props: { hasClose: true } })
    await wrapper.find('.nyx-badge__button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits click event when badge is clicked', async () => {
    const wrapper = mount(NyxBadge)
    await wrapper.find('.nyx-badge').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
