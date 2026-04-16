import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { NyxAnimationState, NyxSize, NyxTheme, NyxVariant } from '@/types'
import NyxStatusDot from './NyxStatusDot.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxStatusDot', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxStatusDot)
    expect(wrapper.find('.nyx-status-dot').exists()).toBe(true)
  })

  it('renders as a decorative span', () => {
    const wrapper = mount(NyxStatusDot)
    expect(wrapper.find('span.nyx-status-dot').exists()).toBe(true)
    expect(wrapper.find('.nyx-status-dot').attributes('aria-hidden')).toBe('true')
    expect(wrapper.find('.nyx-status-dot__indicator').attributes('aria-hidden')).toBe('true')
  })

  it('applies the default theme, size, and variant classes', () => {
    const wrapper = mount(NyxStatusDot)
    expect(wrapper.find('.nyx-status-dot').classes()).toEqual(
      expect.arrayContaining(['theme-success', 'size-xs', 'variant-filled'])
    )
  })

  it('applies custom props through useNyxProps', () => {
    const wrapper = mount(NyxStatusDot, {
      props: {
        theme: NyxTheme.Danger,
        size: NyxSize.Large,
        variant: NyxVariant.Outline,
        backlight: true,
      },
    })

    const classes = wrapper.find('.nyx-status-dot').classes()
    expect(classes).toEqual(expect.arrayContaining([
      'theme-danger',
      'size-lg',
      'variant-outline',
      'backlight-danger',
    ]))
  })

  it('renders the label prop when no slot is provided', () => {
    const wrapper = mount(NyxStatusDot, { props: { label: 'Online' } })
    expect(wrapper.find('.nyx-status-dot__label').text()).toBe('Online')
  })

  it('prefers the default slot over the label prop', () => {
    const wrapper = mount(NyxStatusDot, {
      props: { label: 'Online' },
      slots: { default: 'Custom status' },
    })

    expect(wrapper.find('.nyx-status-dot__label').text()).toBe('Custom status')
  })

  it('pauses animation when animation is paused', () => {
    const wrapper = mount(NyxStatusDot, { props: { animation: NyxAnimationState.Paused } })
    expect(wrapper.find('.nyx-status-dot').classes()).toContain('animation-paused')
  })

  it('defaults animation to paused', () => {
    const wrapper = mount(NyxStatusDot)
    expect(wrapper.find('.nyx-status-dot').classes()).toContain('animation-paused')
  })

  it('adds the playing class when animation is playing', () => {
    const wrapper = mount(NyxStatusDot, { props: { animation: NyxAnimationState.Playing } })
    expect(wrapper.find('.nyx-status-dot').classes()).toContain('animation-playing')
  })
})
