import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import useKeyboardShortcuts from './useKeyboardShortcuts'

// Note: getNormalizedKeyName uses key.toUpperCase(), so 'a' → 'A', 'Control' → 'CONTROL'.
// The keyModifiers list contains 'CTRL'/'ALT'/etc., not 'CONTROL'/'ALTERNATE', so modifier
// sorting does not apply to real keyboard event keys. Combinations follow Set insertion order.

describe('useKeyboardShortcuts', () => {
  it('calls the handler for a single-key shortcut', () => {
    const handler = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyboardShortcuts({ 'A': handler }); return {} },
      render: () => h('div')
    }))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(handler).toHaveBeenCalledOnce()
    wrapper.unmount()
  })

  it('does not call the handler when no shortcut matches', () => {
    const handler = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyboardShortcuts({ 'A': handler }); return {} },
      render: () => h('div')
    }))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    expect(handler).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('builds a multi-key combination from sequential keydowns', () => {
    const handler = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyboardShortcuts({ 'CONTROL+A': handler }); return {} },
      render: () => h('div')
    }))

    // Press Control first, then 'a' — combination becomes 'CONTROL+A'
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Control' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(handler).toHaveBeenCalledOnce()
    wrapper.unmount()
  })

  it('removes a key from the history on keyup', () => {
    const handler = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyboardShortcuts({ 'CONTROL+A': handler }); return {} },
      render: () => h('div')
    }))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Control' }))
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Control' }))
    // Now only 'A' is in history — should not match 'CONTROL+A'
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(handler).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('removes listeners after unmount', () => {
    const handler = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyboardShortcuts({ 'A': handler }); return {} },
      render: () => h('div')
    }))

    wrapper.unmount()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(handler).not.toHaveBeenCalled()
  })

  it('passes the KeyboardEvent to the handler', () => {
    const handler = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyboardShortcuts({ 'A': handler }); return {} },
      render: () => h('div')
    }))

    const event = new KeyboardEvent('keydown', { key: 'a' })
    window.dispatchEvent(event)
    expect(handler).toHaveBeenCalledWith(event)
    wrapper.unmount()
  })
})
