import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import NyxAccordion from './NyxAccordion.vue'
import { NyxSize, NyxTheme } from '@/types'

const items = [{ id: 'a', label: 'Account' }, { id: 'b', label: 'Billing' }, { id: 'c', label: 'Contact' }]
const global = { provide: { libEnv: {} } }
const openIds = (wrapper: ReturnType<typeof mount>) => wrapper.findAll('.nyx-accordion__trigger')
  .filter(button => button.attributes('aria-expanded') === 'true').map(button => button.text())
const mounted: ReturnType<typeof mount>[] = []
afterEach(() => { mounted.splice(0).forEach(wrapper => wrapper.unmount()); vi.restoreAllMocks() })

describe('NyxAccordion', () => {
  it('works unbound, starts collapsed, closes siblings and the last item', async () => {
    const wrapper = mount(NyxAccordion, { props: { items }, global })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(openIds(wrapper)).toEqual([])
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    expect(openIds(wrapper)).toEqual(['Billing'])
    await buttons[1].trigger('click')
    expect(openIds(wrapper)).toEqual([])
    expect(wrapper.emitted('update:modelValue')).toEqual([['a'], ['b'], ['']])
  })

  it('supports unbound multiple mode and emits fresh arrays', async () => {
    const wrapper = mount(NyxAccordion, { props: { items, multiple: true }, global })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    expect(openIds(wrapper)).toEqual(['Account', 'Billing'])
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[['a']], [['a', 'b']], [['b']]])
  })

  it.each([false, true])('honors a two-way model and external resets (multiple=%s)', async multiple => {
    const state = ref<string | string[] | undefined>(multiple ? ['a'] : 'a')
    const wrapper = mount(defineComponent({ setup: () => () => h(NyxAccordion, {
      items, multiple, modelValue: state.value, 'onUpdate:modelValue': (value: string | string[] | undefined) => { state.value = value },
    }) }), { global })
    const accordion = wrapper.findComponent(NyxAccordion)
    await wrapper.findAll('button')[1].trigger('click')
    expect(state.value).toEqual(multiple ? ['a', 'b'] : 'b')
    state.value = undefined
    await nextTick()
    expect(openIds(wrapper)).toEqual([])
    expect(accordion.emitted('update:modelValue')).toHaveLength(1)
  })

  it('normalizes invalid/duplicate IDs without mutating or echoing parent state', async () => {
    const original = ['missing', 'b', 'b', 'a']
    const wrapper = mount(NyxAccordion, { props: { items, multiple: true, modelValue: original,
      'onUpdate:modelValue': vi.fn() }, global })
    expect(openIds(wrapper)).toEqual(['Account', 'Billing'])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[['a']]])
    expect(original).toEqual(['missing', 'b', 'b', 'a'])
  })

  it.each([
    [false, ['missing', 'b', 'a'], ['Billing']], [true, 'b', ['Billing']],
    [false, ['missing'], []], [true, '', []],
  ] as const)('normalizes model shape for mode %s', (multiple, value, expected) => {
    const modelValue = typeof value === 'string' ? value : [...value]
    const wrapper = mount(NyxAccordion, { props: { items, multiple, modelValue }, global })
    expect(openIds(wrapper)).toEqual(expected)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('silently discards unbound IDs across mode changes and item removal', async () => {
    const wrapper = mount(NyxAccordion, { props: { items, multiple: true }, global })
    await wrapper.findAll('button')[1].trigger('click')
    await wrapper.findAll('button')[0].trigger('click')
    await wrapper.setProps({ multiple: false })
    await wrapper.setProps({ multiple: true })
    expect(openIds(wrapper)).toEqual(['Billing'])
    await wrapper.setProps({ items: [items[0]] })
    await wrapper.setProps({ items })
    expect(openIds(wrapper)).toEqual([])
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
  })

  it('preserves the parent model when bound mode/items change', async () => {
    const value = ['b', 'a']
    const wrapper = mount(NyxAccordion, { props: { items, multiple: true, modelValue: value,
      'onUpdate:modelValue': vi.fn() }, global })
    await wrapper.setProps({ multiple: false })
    expect(openIds(wrapper)).toEqual(['Billing'])
    await wrapper.setProps({ items: [items[0]] })
    expect(openIds(wrapper)).toEqual(['Account'])
    await wrapper.setProps({ items, multiple: true })
    expect(openIds(wrapper)).toEqual(['Account', 'Billing'])
    expect(value).toEqual(['b', 'a'])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('emits when reopening an ID that silent local normalization discarded', async () => {
    const wrapper = mount(NyxAccordion, { props: { items }, global })
    await wrapper.find('button').trigger('click')
    await wrapper.setProps({ items: [] })
    await wrapper.setProps({ items })
    await wrapper.find('button').trigger('click')
    expect(openIds(wrapper)).toEqual(['Account'])
    expect(wrapper.emitted('update:modelValue')).toEqual([['a'], ['a']])
  })

  it('validates item identities and renders empty content without fake controls', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(NyxAccordion, { props: { items: [items[0], items[0], { id: ' ', label: 'Invalid' }] }, global })
    expect(wrapper.findAll('button')).toHaveLength(1)
    expect(warn).toHaveBeenCalled()
    const empty = mount(NyxAccordion, { props: { items: [] }, slots: { empty: 'No sections' }, global })
    expect(empty.text()).toBe('No sections')
    expect(empty.find('button').exists()).toBe(false)
  })

  it('prevents disabled toggles but permits auto-closing disabled open siblings', async () => {
    const wrapper = mount(NyxAccordion, { props: { items: [{ ...items[0], disabled: true }, items[1]], modelValue: 'a' }, global })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.findAll('button')[1].trigger('click')
    expect(openIds(wrapper)).toEqual(['Billing'])
    await wrapper.setProps({ disabled: true })
    expect(wrapper.findAll('button').every(button => button.attributes('disabled') !== undefined)).toBe(true)
  })

  it('uses scoped shared slots and named overrides, including intentionally empty slots', () => {
    const wrapper = mount(NyxAccordion, { props: { items, modelValue: 'b' }, global, slots: {
      header: ({ item, index, open, disabled }) => `${item.label}/${index}/${open}/${disabled}`,
      default: ({ item }) => `Shared ${item.id}`,
      'header-a': () => 'Custom header', 'item-b': () => 'Custom body',
      'header-c': () => [], 'item-c': () => [],
    } })
    expect(wrapper.findAll('button').map(button => button.text())).toEqual(['Custom header', 'Billing/1/true/false', ''])
    expect(wrapper.findAll('.nyx-accordion__body').map(body => body.text())).toEqual(['Shared a', 'Custom body', ''])
  })

  it('keeps body state and stable ARIA relationships through reorder and collapse', async () => {
    const wrapper = mount(NyxAccordion, { props: { items }, slots: { 'item-a': '<input aria-label="Name">' }, global })
    const triggerId = wrapper.find('button').attributes('id')
    const panelId = wrapper.find('button').attributes('aria-controls')
    await wrapper.find('button').trigger('click')
    await wrapper.find('input').setValue('Ada')
    await wrapper.setProps({ items: [...items].reverse() })
    const button = wrapper.findAll('button')[2]
    expect(button.attributes('id')).toBe(triggerId)
    expect(button.attributes('aria-controls')).toBe(panelId)
    await button.trigger('click')
    expect(wrapper.find('input').element.value).toBe('Ada')
    expect(wrapper.find('input').element.closest('[inert][aria-hidden="true"]')).not.toBeNull()
    expect(wrapper.find('input').isVisible()).toBe(false)
  })

  it('keeps header/body slot namespaces distinct for prefixed IDs', () => {
    const wrapper = mount(NyxAccordion, { props: { items: [items[0], { id: 'header-a', label: 'Other' }] }, global,
      slots: { 'header-a': 'Account header', 'item-header-a': 'Other body' } })
    expect(wrapper.findAll('button').map(button => button.text())).toEqual(['Account header', 'Other'])
    expect(wrapper.findAll('.nyx-accordion__body')[1].text()).toBe('Other body')
  })

  it('moves header focus without activation and ignores body keys', async () => {
    const wrapper = mount(NyxAccordion, { attachTo: document.body, props: { items: [items[0], { ...items[1], disabled: true }, items[2]] }, global,
      slots: { 'item-a': '<input>' } })
    mounted.push(wrapper)
    const buttons = wrapper.findAll('button')
    buttons[0].element.focus()
    await buttons[0].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(buttons[2].element)
    await buttons[2].trigger('keydown', { key: 'Home' })
    expect(document.activeElement).toBe(buttons[0].element)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await buttons[0].trigger('click')
    wrapper.find('input').element.focus()
    await wrapper.find('input').trigger('keydown', { key: 'End' })
    expect(document.activeElement).toBe(wrapper.find('input').element)
  })

  it('recovers focus after external collapse/removal and does not steal outside focus', async () => {
    const wrapper = mount(NyxAccordion, { attachTo: document.body, props: { items, modelValue: 'a',
      'onUpdate:modelValue': vi.fn() }, global, slots: { default: '<input>' } })
    mounted.push(wrapper)
    wrapper.find('input').element.focus()
    await wrapper.setProps({ modelValue: '' })
    await nextTick()
    expect(document.activeElement).toBe(wrapper.find('button').element)
    await wrapper.setProps({ modelValue: 'a' })
    wrapper.find('input').element.focus()
    await wrapper.setProps({ items: items.slice(1) })
    await nextTick()
    expect(document.activeElement).toBe(wrapper.find('button').element)
    await wrapper.setProps({ items: [] })
    await nextTick()
    expect(document.activeElement).toBe(wrapper.element)
  })

  it('resolves shared visual defaults and explicit overrides', () => {
    const wrapper = mount(NyxAccordion, { props: { items, size: NyxSize.Small }, global: { provide: {
      libEnv: { defaults: { all: { theme: NyxTheme.Success, size: NyxSize.Large } } },
    } } })
    expect(wrapper.classes()).toContain('theme-success')
    expect(wrapper.classes()).toContain('size-sm')
  })

  it('renders unique safe IDs on the server for multiple instances and unusual keys', async () => {
    const app = createSSRApp({ render: () => h('main', [h(NyxAccordion, { items: [{ id: 'a / 🔑', label: 'A' }] }), h(NyxAccordion, { items })]) })
    app.provide('libEnv', {})
    const html = await renderToString(app)
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.every(id => !/\s/.test(id))).toBe(true)
    for (const [, id] of html.matchAll(/aria-controls="([^"]+)"/g)) expect(ids).toContain(id)
  })
})
