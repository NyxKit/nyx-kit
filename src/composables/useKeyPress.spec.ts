import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import useKeyPress from './useKeyPress'
import { KeyboardKey } from '@/types'

describe('useKeyPress', () => {
  it('calls the callback when the matching key is pressed', () => {
    const callback = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyPress(KeyboardKey.Esc, callback); return {} },
      render: () => h('div')
    }))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(callback).toHaveBeenCalledOnce()
    wrapper.unmount()
  })

  it('does not call the callback for a non-matching key', () => {
    const callback = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyPress(KeyboardKey.Esc, callback); return {} },
      render: () => h('div')
    }))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(callback).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('removes the listener after unmount', () => {
    const callback = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyPress(KeyboardKey.Esc, callback); return {} },
      render: () => h('div')
    }))

    wrapper.unmount()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(callback).not.toHaveBeenCalled()
  })

  it('passes the KeyboardEvent to the callback', () => {
    const callback = vi.fn()
    const wrapper = mount(defineComponent({
      setup() { useKeyPress(KeyboardKey.Esc, callback); return {} },
      render: () => h('div')
    }))

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    window.dispatchEvent(event)
    expect(callback).toHaveBeenCalledWith(event)
    wrapper.unmount()
  })
})
