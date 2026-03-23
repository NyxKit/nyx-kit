import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxTree from './NyxTree.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

const flatModel = {
  Alpha: 'a',
  Beta: 'b',
  Gamma: 'c',
}

const nestedModel = {
  Fruits: {
    Apple: 'apple',
    Banana: 'banana',
  },
  Veggies: {
    Carrot: 'carrot',
  },
}

describe('NyxTree', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    expect(wrapper.find('.nyx-tree').exists()).toBe(true)
  })

  it('renders as a <ul> element', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    expect(wrapper.element.tagName).toBe('UL')
  })

  it('renders a tree node for each top-level key', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    expect(wrapper.findAll('.nyx-tree-node').length).toBe(3)
  })

  it('renders leaf node values', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    const text = wrapper.text()
    expect(text).toContain('a')
    expect(text).toContain('b')
    expect(text).toContain('c')
  })

  it('renders nested nodes for object values', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    expect(wrapper.findAll('.nyx-tree-node').length).toBeGreaterThan(2)
  })

  it('renders nested child values', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    const text = wrapper.text()
    expect(text).toContain('apple')
    expect(text).toContain('banana')
    expect(text).toContain('carrot')
  })
})
