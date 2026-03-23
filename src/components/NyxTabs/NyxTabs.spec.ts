import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxTabs from './NyxTabs.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

const tabs = ['Alpha', 'Beta', 'Gamma']

describe('NyxTabs', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    expect(wrapper.find('.nyx-tabs').exists()).toBe(true)
  })

  it('renders a button for each tab', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    expect(wrapper.findAll('.nyx-tabs__button').length).toBe(3)
  })

  it('first tab button has active class by default', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    const buttons = wrapper.findAll('.nyx-tabs__button')
    expect(buttons[0].classes()).toContain('active')
    expect(buttons[1].classes()).not.toContain('active')
  })

  it('activates tab when its button is clicked', async () => {
    const wrapper = mount(NyxTabs, {
      props: {
        tabs,
        modelValue: 'Alpha',
        'onUpdate:modelValue': (val: string | undefined) => { wrapper.setProps({ modelValue: val }) }
      }
    })
    await wrapper.findAll('.nyx-tabs__button')[1].trigger('click')
    expect(wrapper.props('modelValue')).toBe('Beta')
  })

  it('emits update:modelValue with tab name on click', async () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    await wrapper.findAll('.nyx-tabs__button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('Gamma')
  })

  it('renders tab panels for each tab', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    expect(wrapper.findAll('.nyx-tabs__tab').length).toBe(3)
  })

  it('active tab panel has active class', () => {
    const wrapper = mount(NyxTabs, { props: { tabs, modelValue: 'Beta' } })
    const panels = wrapper.findAll('.nyx-tabs__tab')
    expect(panels[0].classes()).not.toContain('active')
    expect(panels[1].classes()).toContain('active')
    expect(panels[2].classes()).not.toContain('active')
  })

  it('renders slot content for each tab', () => {
    const wrapper = mount(NyxTabs, {
      props: { tabs },
      slots: { 'tab-Alpha': '<p class="alpha-content">Alpha content</p>' }
    })
    expect(wrapper.find('.alpha-content').exists()).toBe(true)
  })

  it('uses tabs[0] as default active tab when no modelValue', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    const panels = wrapper.findAll('.nyx-tabs__tab')
    expect(panels[0].classes()).toContain('active')
  })

  it('tablist has role="tablist"', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
  })

  it('tab buttons have role="tab"', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    const tabButtons = wrapper.findAll('[role="tab"]')
    expect(tabButtons.length).toBe(3)
  })

  it('active tab button has aria-selected=true', () => {
    const wrapper = mount(NyxTabs, { props: { tabs, modelValue: 'Beta' } })
    const tabButtons = wrapper.findAll('[role="tab"]')
    expect(tabButtons[1].attributes('aria-selected')).toBe('true')
    expect(tabButtons[0].attributes('aria-selected')).toBe('false')
  })

  it('active tab button has tabindex=0, others have tabindex=-1', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    const tabButtons = wrapper.findAll('[role="tab"]')
    expect(tabButtons[0].attributes('tabindex')).toBe('0')
    expect(tabButtons[1].attributes('tabindex')).toBe('-1')
  })

  it('tab panels have role="tabpanel"', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels.length).toBe(3)
  })

  it('tab button aria-controls matches panel id', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    const btn = wrapper.findAll('[role="tab"]')[0]
    const panelId = btn.attributes('aria-controls')
    expect(panelId).toBeTruthy()
    expect(wrapper.find(`#${panelId}`).exists()).toBe(true)
  })

  it('panel aria-labelledby matches its tab button id', () => {
    const wrapper = mount(NyxTabs, { props: { tabs } })
    const panel = wrapper.findAll('[role="tabpanel"]')[0]
    const labelId = panel.attributes('aria-labelledby')
    expect(labelId).toBeTruthy()
    expect(wrapper.find(`#${labelId}`).exists()).toBe(true)
  })
})
