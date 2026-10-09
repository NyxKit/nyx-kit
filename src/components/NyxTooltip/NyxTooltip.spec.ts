import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import vClickOutside from '@/directives/vClickOutside'
import NyxTooltip from './NyxTooltip.vue'

const globalConfig = {
  directives: { clickOutside: vClickOutside }
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

let wrapper: ReturnType<typeof mount>

afterEach(() => {
  wrapper?.unmount()
  vi.useRealTimers()
  vi.restoreAllMocks()
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
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await vi.advanceTimersByTimeAsync(149)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await vi.advanceTimersByTimeAsync(1)
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
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await vi.advanceTimersByTimeAsync(150)
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

describe('NyxTooltip delay lifecycle', () => {
  const mountTooltip = (props = {}) => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Info', ...props },
      global: globalConfig,
    })
    return wrapper.find('.nyx-tooltip')
  }

  it('uses a custom delay without restarting for repeated mouseover events', async () => {
    const trigger = mountTooltip({ delay: 500 })
    await trigger.trigger('mouseover')
    await vi.advanceTimersByTimeAsync(300)
    await trigger.trigger('mouseover')
    await vi.advanceTimersByTimeAsync(199)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    await trigger.trigger('mouseleave')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true], [false]])
  })

  it.each([0, -10, NaN, Infinity])('opens immediately with delay %s', async (delay) => {
    const trigger = mountTooltip({ delay })
    await trigger.trigger('mouseover')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('cancels on leave and starts a fresh delay on re-entry', async () => {
    const trigger = mountTooltip()
    await trigger.trigger('mouseover')
    await vi.advanceTimersByTimeAsync(100)
    await trigger.trigger('mouseleave')
    await vi.advanceTimersByTimeAsync(150)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await trigger.trigger('mouseover')
    await vi.advanceTimersByTimeAsync(149)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('cancels a pending click opening on outside click', async () => {
    const trigger = mountTooltip({ trigger: 'click' })
    await trigger.trigger('click')
    document.body.click()
    await vi.advanceTimersByTimeAsync(150)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it.each([{ trigger: 'manual' }, { delay: 500 }])('cancels when configuration changes: %o', async (props) => {
    const trigger = mountTooltip()
    await trigger.trigger('mouseover')
    await wrapper.setProps(props)
    await vi.advanceTimersByTimeAsync(1000)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('keeps external model changes immediate and cancels pending opening', async () => {
    const trigger = mountTooltip()
    await trigger.trigger('mouseover')
    await wrapper.setProps({ modelValue: true })
    expect(document.body.querySelector('.nyx-tooltip__content--open')).not.toBeNull()
    await wrapper.setProps({ modelValue: false })
    await vi.advanceTimersByTimeAsync(150)
    expect(document.body.querySelector('.nyx-tooltip__content--open')).toBeNull()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('ignores automatic events in manual mode', async () => {
    const trigger = mountTooltip({ trigger: 'manual' })
    await trigger.trigger('mouseover')
    await trigger.trigger('click')
    await vi.advanceTimersByTimeAsync(150)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ modelValue: true })
    await trigger.trigger('mouseleave')
    document.body.click()
    expect(document.body.querySelector('.nyx-tooltip__content--open')).not.toBeNull()
  })

  it('clears pending opening on unmount', async () => {
    const trigger = mountTooltip()
    await trigger.trigger('mouseover')
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
    await vi.advanceTimersByTimeAsync(150)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('NyxTooltip positioning on opening', () => {
  let anchorTop: number
  let content: HTMLElement

  beforeEach(() => {
    anchorTop = 300
    document.body.style.setProperty('--nyx-gap-md', '8px')
    vi.stubGlobal('innerHeight', 800)
    vi.stubGlobal('innerWidth', 1200)
  })

  afterEach(() => {
    document.body.style.removeProperty('--nyx-gap-md')
    vi.unstubAllGlobals()
  })

  const mountPositionedTooltip = (props = {}) => {
    wrapper = mount(NyxTooltip, {
      attachTo: document.body,
      props: { text: 'Short', ...props },
      global: globalConfig,
    })
    const trigger = wrapper.find('.nyx-tooltip')
    content = document.body.querySelector<HTMLElement>('[role="tooltip"]')!
    vi.spyOn(trigger.element, 'getBoundingClientRect').mockImplementation(
      () => new DOMRect(200, anchorTop, 80, 20),
    )
    vi.spyOn(content, 'getBoundingClientRect').mockImplementation(
      () => new DOMRect(0, 0, 120, content.textContent?.trim() === 'Expanded' ? 80 : 40),
    )
    return trigger
  }

  it.each([
    { trigger: 'hover' as const, delay: 0 },
    { trigger: 'hover' as const, delay: 150 },
    { trigger: 'click' as const, delay: 150 },
  ])('remeasures a moved trigger on reopening: %o', async (props) => {
    const trigger = mountPositionedTooltip(props)
    const event = props.trigger === 'hover' ? 'mouseover' : 'click'
    await trigger.trigger(event)
    await vi.advanceTimersByTimeAsync(props.delay)
    expect(content.style.getPropertyValue('--top')).toBe('252px')
    expect(content.dataset.position).toBe('top')

    await trigger.trigger('mouseleave')
    anchorTop = 180
    await trigger.trigger(event)
    // Layout can change during the delay too: measure when opening, not when scheduling it.
    if (props.delay) anchorTop = 160
    await vi.advanceTimersByTimeAsync(props.delay)
    expect(content.style.getPropertyValue('--top')).toBe(`${anchorTop - 48}px`)
    expect(content.style.getPropertyValue('--left')).toBe('180px')
    expect(content.dataset.position).toBe('top')
  })

  it('measures updated content after the DOM patch on manual reopening', async () => {
    mountPositionedTooltip({ trigger: 'manual', delay: 500 })
    await wrapper.setProps({ modelValue: true })
    expect(content.style.getPropertyValue('--top')).toBe('252px')
    await wrapper.setProps({ modelValue: false })
    anchorTop = 180
    await wrapper.setProps({ modelValue: true, text: 'Expanded' })
    expect(content.style.getPropertyValue('--top')).toBe('92px')
    expect(content.dataset.position).toBe('top')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('flips at the viewport edge and restores the preferred side on the next opening', async () => {
    const trigger = mountPositionedTooltip({ delay: 0 })
    await trigger.trigger('mouseover')
    expect(content.dataset.position).toBe('top')
    await trigger.trigger('mouseleave')

    anchorTop = 10
    await trigger.trigger('mouseover')
    expect(content.style.getPropertyValue('--top')).toBe('38px')
    expect(content.dataset.position).toBe('bottom')
    await trigger.trigger('mouseleave')

    anchorTop = 300
    await trigger.trigger('mouseover')
    expect(content.style.getPropertyValue('--top')).toBe('252px')
    expect(content.dataset.position).toBe('top')
  })
})
