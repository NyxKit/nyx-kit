import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import vClickOutside from '@/directives/vClickOutside'
import NyxTooltip from './NyxTooltip.vue'

const globalConfig = {
  directives: { clickOutside: vClickOutside }
}

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

let wrapper: ReturnType<typeof mount>

afterEach(() => {
  wrapper?.unmount()
})

describe('NyxTooltip', () => {
  it('renders without errors', () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Tooltip text' },
      global: globalConfig
    })
    expect(wrapper.find('.nyx-tooltip').exists()).toBe(true)
  })

  it('renders default slot content as the trigger', () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info' },
      slots: { default: '<button class="trigger-btn">Hover me</button>' },
      global: globalConfig
    })
    expect(wrapper.find('.trigger-btn').exists()).toBe(true)
  })

  it('tooltip content is not open by default', () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info' },
      global: globalConfig
    })
    const content = document.body.querySelector('.nyx-tooltip__content')
    expect(content?.classList.contains('nyx-tooltip__content--open')).toBe(false)
  })

  it('opens tooltip content on mouseover (hover trigger)', async () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info', trigger: 'hover' },
      global: globalConfig
    })
    await wrapper.find('.nyx-tooltip').trigger('mouseover')
    await nextTick()
    const content = document.body.querySelector('.nyx-tooltip__content')
    expect(content?.classList.contains('nyx-tooltip__content--open')).toBe(true)
  })

  it('closes tooltip on mouseleave', async () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info', trigger: 'hover', modelValue: true },
      global: globalConfig
    })
    await wrapper.find('.nyx-tooltip').trigger('mouseleave')
    await nextTick()
    const content = document.body.querySelector('.nyx-tooltip__content')
    expect(content?.classList.contains('nyx-tooltip__content--open')).toBe(false)
  })

  it('opens tooltip on click (click trigger)', async () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info', trigger: 'click' },
      global: globalConfig
    })
    await wrapper.find('.nyx-tooltip').trigger('click')
    await nextTick()
    const content = document.body.querySelector('.nyx-tooltip__content')
    expect(content?.classList.contains('nyx-tooltip__content--open')).toBe(true)
  })

  it('renders text prop inside tooltip content', () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Tooltip text', modelValue: true },
      global: globalConfig
    })
    const content = document.body.querySelector('.nyx-tooltip__content')
    expect(content?.textContent?.trim()).toBe('Tooltip text')
  })

  it('renders tooltip-content slot when provided', () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { modelValue: true },
      slots: { 'tooltip-content': '<span class="custom-tip">Custom</span>' },
      global: globalConfig
    })
    expect(document.body.querySelector('.custom-tip')).not.toBeNull()
  })

  it('wrapper has aria-describedby pointing to tooltip content', () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info' },
      global: globalConfig
    })
    const describedById = wrapper.find('.nyx-tooltip').attributes('aria-describedby')
    expect(describedById).toBeTruthy()
  })

  it('tooltip content element has role="tooltip"', () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info', modelValue: true },
      global: globalConfig
    })
    const tooltipEl = document.body.querySelector('[role="tooltip"]')
    expect(tooltipEl).not.toBeNull()
  })

  it('teleports the tooltip into the nearest dialog when rendered inside one', async () => {
    const dialog = document.createElement('dialog')
    document.body.appendChild(dialog)

    wrapper = mount(NyxTooltip, {
      attachTo: dialog,
      props: { text: 'Info', modelValue: true },
      global: globalConfig
    })

    await nextTick()

    expect(dialog.querySelector('.nyx-tooltip__content')).not.toBeNull()
  })

  it('aria-describedby on wrapper matches id on tooltip content', () => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info', modelValue: true },
      global: globalConfig
    })
    const describedById = wrapper.find('.nyx-tooltip').attributes('aria-describedby')
    const tooltipEl = document.body.querySelector('[role="tooltip"]')
    expect(tooltipEl?.getAttribute('id')).toBe(describedById)
  })
})
