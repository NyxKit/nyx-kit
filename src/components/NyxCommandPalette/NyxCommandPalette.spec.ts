import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { matchesShortcut, parseShortcut } from './useCommandPaletteShortcut'
import { createSSRApp, h, nextTick, toRaw, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import NyxCommandPalette from './NyxCommandPalette.vue'
import { acceptGroups, filterGroups } from './commandPalette'
import type { NyxCommandPaletteGroup, NyxCommandPaletteSelectEvent } from './NyxCommandPalette.types'

const groups = [
  { id: 'actions', label: 'Actions', items: [
    { id: 'settings', label: 'Open settings', description: 'Workspace preferences', icon: 'settings', keywords: ['config'], command: 42 },
    { id: 'disabled', label: 'Disabled command', disabled: true, command: 0 },
    { id: 'file', label: 'Create file', command: 1 },
  ] },
  { id: 'pages', items: [{ id: 'cafe', label: 'Café dashboard', command: 2 }] },
]
const wrappers: ReturnType<typeof mount>[] = []
const render = (props = {}, slots = {}) => {
  const wrapper = mount(NyxCommandPalette, { props: { groups, inline: true, ...props }, slots, global: { provide: { libEnv: {} } } })
  wrappers.push(wrapper)
  return wrapper
}
afterEach(() => { wrappers.forEach(wrapper => wrapper.unmount()); wrappers.length = 0; vi.restoreAllMocks() })
const ids = (query: string, data = groups) => filterGroups(acceptGroups(data), query).flatMap(group => group.items.map(item => item.id))

describe('command discovery', () => {
  it('matches diacritics, subsequences, and tokens across fields without joining fields', () => {
    expect(ids('CAFE')).toEqual(['file', 'cafe'])
    expect(ids('opst')).toEqual(['settings'])
    expect(ids('  open  config ')).toEqual(['settings'])
    expect(ids('settingsworkspace')).toEqual([])
    expect(ids('Actions')).toEqual([])
    expect(ids('   ')).toEqual(['settings', 'disabled', 'file', 'cafe'])
    expect(filterGroups(acceptGroups([{ id: 'unicode', items: [{ id: 'rocket', label: 'Launch 🚀 project' }] }]), '🚀')).toHaveLength(1)
  })
  it('ranks equality, prefix, contiguous and subsequence matches with stable ties', () => {
    const data = [{ id: 'g', items: [
      { id: 'sub', label: 'A big cat' }, { id: 'contains', label: 'The abc' },
      { id: 'prefix', label: 'Abc tool' }, { id: 'exact', label: 'ABC' }, { id: 'tie', label: 'Other abc' },
    ] }]
    expect(filterGroups(acceptGroups(data), 'abc')[0].items.map(item => item.id)).toEqual(['exact', 'prefix', 'contains', 'tie', 'sub'])
    expect(filterGroups(acceptGroups([{ ...data[0], ignoreFilter: true }]), 'absent')[0].items).toEqual(data[0].items)
  })
  it('validates before filtering, skips entire duplicate groups, preserves original objects and never mutates input', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const item = Object.freeze({ id: ' quote:"[] ', label: 'Kept' })
    const original = Object.freeze({ id: 'g', items: Object.freeze([item]) })
    const accepted = acceptGroups(Object.freeze([
      original, { id: 'g', items: [{ id: 'later', label: 'Skipped group' }] },
      { id: 'two', items: [{ id: 'bad', label: ' ' }, { id: 'bad', label: 'Valid' }, item, { id: 'later', label: 'Accepted' }, { id: '', label: 'Blank' }] },
      { id: ' ', items: [] },
    ]))
    expect(accepted[0].group).toBe(original)
    expect(accepted[0].items[0]).toBe(item)
    expect(accepted[1].items.map(item => item.id)).toEqual(['bad', 'later'])
    expect(warn).toHaveBeenCalledTimes(5)
  })
})

describe('palette state and semantics', () => {
  it('keeps highlighting separate, skips disabled rows and repeats activation exactly once', async () => {
    const wrapper = render()
    const input = wrapper.get('input')
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Create file')
    expect(wrapper.emitted('select')).toBeUndefined()
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toHaveLength(2)
    expect(wrapper.emitted('update:modelValue')).toEqual([['file']])
    expect(wrapper.get('[aria-selected="true"]').attributes('aria-label')).toBe('Create file')
  })
  it('emits original generic objects and event after selection update', async () => {
    let payload: NyxCommandPaletteSelectEvent<(typeof groups)[0]['items'][0]> | undefined
    const order: string[] = []
    const wrapper = render({ onSelect: (event: typeof payload) => { payload = event; order.push('select') }, 'onUpdate:modelValue': () => order.push('model') })
    await wrapper.get('[role="option"]').trigger('click')
    expect(toRaw(payload?.item)).toBe(groups[0].items[0])
    expect(toRaw(payload?.group)).toBe(groups[0])
    expect(payload?.item.command).toBe(42)
    expect(payload?.originalEvent).toBeInstanceOf(MouseEvent)
    expect(order).toEqual(['model', 'select'])
  })
  it('preserves exact search edits and does not echo parent updates or initial undefined', async () => {
    const wrapper = render()
    expect(wrapper.emitted('update:searchTerm')).toBeUndefined()
    await wrapper.get('input').setValue('  CAFE  ')
    expect(wrapper.emitted('update:searchTerm')).toEqual([['  CAFE  ']])
    await wrapper.setProps({ searchTerm: 'settings', modelValue: 'settings' })
    expect(wrapper.findAll('[role="option"]')).toHaveLength(1)
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('update:searchTerm')).toHaveLength(1)
  })
  it('preserves highlight on data replacement, resets on query and recovers from removed or disabled rows', async () => {
    const wrapper = render()
    await wrapper.get('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.setProps({ groups: [...groups].reverse() })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Create file')
    await wrapper.setProps({ groups: [groups[1]] })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Café dashboard')
    await wrapper.setProps({ groups, searchTerm: 'open' })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Open settings')
  })
  it('retains parent selection when removed but silently discards unbound removed selections', async () => {
    const controlled = render({ modelValue: 'settings' })
    await controlled.setProps({ groups: [] })
    expect(controlled.emitted('update:modelValue')).toBeUndefined()
    const local = render()
    await local.get('[role="option"]').trigger('click')
    await local.setProps({ groups: [] })
    await local.setProps({ groups })
    expect(local.find('[aria-selected="true"]').exists()).toBe(false)
    expect(local.emitted('update:modelValue')).toHaveLength(1)
    await local.get('[role="option"]').trigger('click')
    expect(local.emitted('update:modelValue')).toHaveLength(2)
  })
  it('retains filtered-out selection and accepts external selection without focus changes', async () => {
    const wrapper = render({ modelValue: 'file' })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Create file')
    await wrapper.setProps({ searchTerm: 'open' })
    await wrapper.setProps({ searchTerm: '' })
    expect(wrapper.get('[aria-selected="true"]').attributes('aria-label')).toBe('Create file')
    expect(wrapper.emitted('select')).toBeUndefined()
  })
  it.each([{ loading: true }, { disabled: true }, { groups: [{ id: 'g', items: [{ id: 'd', label: 'Disabled', disabled: true }] }] }])('blocks activation for %o', async props => {
    const wrapper = render(props)
    expect(wrapper.get('input').attributes('aria-activedescendant')).toBeUndefined()
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    await wrapper.get('[role="option"]').trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })
  it('loading retains results, announces even with custom content and restores first highlight', async () => {
    const wrapper = render({}, { loading: '<span>Custom busy</span>' })
    await wrapper.get('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.setProps({ loading: true })
    expect(wrapper.findAll('[role="option"]')).toHaveLength(4)
    expect(wrapper.get('[role="status"]').text()).toBe('Loading commands...')
    await wrapper.setProps({ loading: false })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Open settings')
  })
  it('supports slot precedence, accessible labels and empty slots without fallback', () => {
    const wrapper = render({}, { item: '<span>Entire item</span>', 'item-label': '<span>Not rendered</span>' })
    expect(wrapper.text()).not.toContain('Not rendered')
    expect(wrapper.get('[role="option"]').attributes('aria-label')).toBe('Open settings')
    expect(wrapper.find('[aria-describedby]').exists()).toBe(false)
    const empty = render({}, { item: () => [] })
    expect(empty.get('[role="option"]').text()).toBe('')
  })
  it('handles composition, native Home, edge clamping and local Escape', async () => {
    const wrapper = render({ loop: false, open: true })
    const input = wrapper.get('input')
    await input.trigger('compositionstart')
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('close')).toBeUndefined()
    await input.trigger('compositionend')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Open settings')
    await input.trigger('keydown', { key: 'End' })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Open settings')
    await input.trigger('keydown', { key: 'End', altKey: true })
    expect(wrapper.get('[data-active="true"]').attributes('aria-label')).toBe('Café dashboard')
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('update:open')).toBeUndefined()
  })
  it('keeps listbox mounted when empty and provides unique safe IDs', () => {
    const wrapper = mount({ render: () => h('div', [h(NyxCommandPalette, { groups: [], inline: true }), h(NyxCommandPalette, { groups: [], inline: true })]) }, { global: { provide: { libEnv: {} } } })
    wrappers.push(wrapper)
    const lists = wrapper.findAll('[role="listbox"]')
    expect(lists[0].attributes('id')).not.toBe(lists[1].attributes('id'))
    expect(wrapper.get('input').attributes('aria-controls')).toBe(lists[0].attributes('id'))
  })
})

it.each([false, true])('server renders and hydrates an overlay with initial open=%s', async open => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.setAttribute('open', '') } })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.removeAttribute('open') } })
  const component = { render: () => h(NyxCommandPalette, { groups: groups as NyxCommandPaletteGroup[], open }) }
  const server = createSSRApp(component).provide('libEnv', {})
  const html = await renderToString(server)
  expect(html).not.toMatch(/<dialog[^>]*\sopen[=> ]/)
  const container = document.createElement('div')
  document.body.append(container)
  container.innerHTML = html
  const before = container.querySelector('input')!.id
  const client = createSSRApp(component).provide('libEnv', {})
  client.mount(container)
  await nextTick(); await nextTick()
  expect(document.getElementById(before)).not.toBeNull()
  expect(document.querySelector('dialog')?.open).toBe(open)
  expect([...warn.mock.calls, ...error.mock.calls].flat().join(' ')).not.toMatch(/hydration/i)
  client.unmount(); container.remove()
  expect(document.body.style.overflow).toBe('')
})


it('hydrates multiple inline instances with stable relationships', async () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  const component = { render: () => h('div', [h(NyxCommandPalette, { groups, inline: true }), h(NyxCommandPalette, { groups, inline: true })]) }
  const container = document.createElement('div')
  document.body.append(container)
  container.innerHTML = await renderToString(createSSRApp(component).provide('libEnv', {}))
  const ids = Array.from(container.querySelectorAll('input')).map(el => el.getAttribute('aria-controls'))
  const client = createSSRApp(component).provide('libEnv', {})
  client.mount(container)
  await nextTick()
  expect(Array.from(container.querySelectorAll('input')).map(el => el.getAttribute('aria-controls'))).toEqual(ids)
  expect(new Set(ids).size).toBe(2)
  expect(error).not.toHaveBeenCalled()
  client.unmount(); container.remove()
})


describe('optional shortcut and search-only viewport', () => {
  it('normalizes real modifier flags and rejects extra modifiers or malformed chords', () => {
    for (const shortcut of ['SUPER+K', 'mod+k', 'Control+k']) {
      expect(matchesShortcut(parseShortcut(shortcut)!, new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))).toBe(true)
    }
    expect(matchesShortcut(parseShortcut('SUPER+K')!, new KeyboardEvent('keydown', { key: 'k', metaKey: true }))).toBe(true)
    expect(matchesShortcut(parseShortcut('Cmd+Shift+P')!, new KeyboardEvent('keydown', { key: 'P', metaKey: true, shiftKey: true }))).toBe(true)
    expect(matchesShortcut(parseShortcut('SUPER+K')!, new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, shiftKey: true }))).toBe(false)
    for (const chord of ['', 'Ctrl+', 'Super+Ctrl+K', 'Ctrl+K+P', 'Ctrl+Ctrl+K']) expect(parseShortcut(chord)).toBeUndefined()
  })
  it('toggles once per eligible event, reacts to changes and removes its listener', async () => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.setAttribute('open', '') } })
    Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.removeAttribute('open') } })
    const wrapper = render({ inline: false, shortcut: 'SUPER+K' })
    const key = (init: KeyboardEventInit = {}) => {
      const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true, ...init })
      document.body.dispatchEvent(event)
      return event
    }
    expect(key({ repeat: true }).defaultPrevented).toBe(false)
    expect(key({ isComposing: true }).defaultPrevented).toBe(false)
    expect(wrapper.emitted('update:open')).toBeUndefined()
    expect(key().defaultPrevented).toBe(true)
    await flushPromises()
    expect(wrapper.emitted('update:open')).toEqual([[true]])
    key({ ctrlKey: false, metaKey: true })
    await flushPromises()
    expect(wrapper.emitted('close')).toHaveLength(1)
    await wrapper.setProps({ shortcut: 'Alt+P' })
    expect(key().defaultPrevented).toBe(false)
    expect(key({ key: 'p', ctrlKey: false, altKey: true }).defaultPrevented).toBe(true)
    await flushPromises()
    wrapper.unmount()
    expect(key({ key: 'p', ctrlKey: false, altKey: true }).defaultPrevented).toBe(false)
  })
  it('ignores inline, disabled, omitted shortcuts and external editable targets', async () => {
    const wrapper = render({ shortcut: 'SUPER+K' })
    const dispatch = (target: HTMLElement = document.body) => {
      const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true })
      target.dispatchEvent(event)
      return event.defaultPrevented
    }
    expect(dispatch()).toBe(false)
    await wrapper.setProps({ inline: false, disabled: true })
    expect(dispatch()).toBe(false)
    await wrapper.setProps({ disabled: false, shortcut: undefined })
    expect(dispatch()).toBe(false)
    await wrapper.setProps({ shortcut: 'SUPER+K' })
    const input = document.createElement('input')
    document.body.append(input)
    expect(dispatch(input)).toBe(false)
    input.remove()
    expect(wrapper.emitted('update:open')).toBeUndefined()
  })
  it('keeps hidden results inert, unannounced and non-activatable until a nonblank query', async () => {
    const wrapper = render({ showResultsOnEmpty: false })
    expect(wrapper.get('input').attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('.nyx-command-palette__results').attributes('inert')).toBeDefined()
    expect(wrapper.get('[role="status"]').text()).toBe('')
    expect(wrapper.get('input').attributes('aria-activedescendant')).toBeUndefined()
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    await wrapper.get('[role="option"]').trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
    await wrapper.setProps({ searchTerm: 'settings' })
    expect(wrapper.get('input').attributes('aria-expanded')).toBe('true')
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toHaveLength(1)
    await wrapper.setProps({ searchTerm: '  ', loading: true })
    expect(wrapper.get('input').attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('[role="status"]').text()).toBe('')
    await wrapper.setProps({ showResultsOnEmpty: true })
    expect(wrapper.get('input').attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('[role="status"]').text()).toBe('Loading commands...')
  })
})


it('arbitrates duplicate shortcuts and releases ownership on unmount', async () => {
  const first = ref(false)
  const second = ref(false)
  const showSecond = ref(true)
  const wrapper = mount({ render: () => h('div', [
    h(NyxCommandPalette, { groups, shortcut: 'SUPER+K', open: first.value, 'onUpdate:open': value => { first.value = value } }),
    showSecond.value && h(NyxCommandPalette, { groups, shortcut: 'SUPER+K', open: second.value, 'onUpdate:open': value => { second.value = value } }),
  ]) }, { global: { provide: { libEnv: {} } } })
  wrappers.push(wrapper)
  const toggle = () => document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true }))
  toggle()
  await flushPromises()
  expect([first.value, second.value]).toEqual([false, true])
  toggle()
  await flushPromises()
  expect([first.value, second.value]).toEqual([false, false])
  showSecond.value = false
  await nextTick()
  toggle()
  await flushPromises()
  expect(first.value).toBe(true)
})
