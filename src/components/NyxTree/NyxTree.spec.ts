import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxTree from './NyxTree.vue'
import { NyxTreeNodeStatus } from './NyxTree.types'
import type { NyxTreeNodeBase } from './NyxTree.types'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

const flat: NyxTreeNodeBase[] = [
  { id: 'alpha', label: 'Alpha', children: [] },
  { id: 'beta', label: 'Beta', children: [] },
]

const nested: NyxTreeNodeBase[] = [
  {
    id: 'fruits',
    label: 'Fruits',
    children: [
      { id: 'apple', label: 'Apple', children: [] },
      { id: 'banana', label: 'Banana', children: [] },
    ],
  },
  {
    id: 'veggies',
    label: 'Veggies',
    children: [
      { id: 'carrot', label: 'Carrot', children: [] },
    ],
  },
]

function makeModel(nodes: NyxTreeNodeBase[]) {
  return JSON.parse(JSON.stringify(nodes)) as NyxTreeNodeBase[]
}

describe('NyxTree — Label rendering', () => {
  it('renders flat node labels', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flat } })
    expect(wrapper.text()).toContain('Alpha')
    expect(wrapper.text()).toContain('Beta')
  })

  it('renders nested node labels', () => {
    const model = makeModel(nested)
    model[0].status = NyxTreeNodeStatus.Open
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    expect(wrapper.text()).toContain('Fruits')
    expect(wrapper.text()).toContain('Apple')
    expect(wrapper.text()).toContain('Banana')
    expect(wrapper.text()).toContain('Veggies')
  })

  it('renders labels inside .nyx-tree-node__label', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flat } })
    const labels = wrapper.findAll('.nyx-tree-node__label')
    expect(labels.length).toBe(2)
    expect(labels[0].text()).toContain('Alpha')
    expect(labels[1].text()).toContain('Beta')
  })
})

describe('NyxTree — ARIA roles', () => {
  it('applies role="tree" to root <ul>', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flat } })
    expect(wrapper.find('ul.nyx-tree').attributes('role')).toBe('tree')
  })

  it('applies role="treeitem" to each node <li>', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flat } })
    const items = wrapper.findAll('[role="treeitem"]')
    expect(items.length).toBe(2)
  })

  it('applies role="group" to nested <ul>', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nested } })
    const groups = wrapper.findAll('[role="group"]')
    expect(groups.length).toBeGreaterThan(0)
  })
})

describe('NyxTree — Branch/leaf classes', () => {
  it('applies nyx-tree-node--branch to nodes with children', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nested } })
    const branches = wrapper.findAll('.nyx-tree-node--branch')
    expect(branches.length).toBe(2)
  })

  it('applies nyx-tree-node--leaf to nodes without children', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flat } })
    const leaves = wrapper.findAll('.nyx-tree-node--leaf')
    expect(leaves.length).toBe(2)
  })
})

describe('NyxTree — Expand/collapse', () => {
  it('branches are collapsed by default (no status)', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nested } })
    const expanded = wrapper.findAll('.nyx-tree-node--expanded')
    expect(expanded.length).toBe(0)
  })

  it('branch with status Open renders expanded', () => {
    const model = makeModel(nested)
    model[0].status = NyxTreeNodeStatus.Open
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const fruits = wrapper.findAll('.nyx-tree-node--branch')[0]
    expect(fruits.classes()).toContain('nyx-tree-node--expanded')
  })

  it('branch with status Active renders expanded', () => {
    const model = makeModel(nested)
    model[0].status = NyxTreeNodeStatus.Active
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const fruits = wrapper.findAll('.nyx-tree-node--branch')[0]
    expect(fruits.classes()).toContain('nyx-tree-node--expanded')
  })

  it('opening one branch does not expand sibling branches', () => {
    const model = makeModel(nested)
    model[0].status = NyxTreeNodeStatus.Open
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const veggies = wrapper.findAll('.nyx-tree-node--branch')[1]
    expect(veggies.classes()).not.toContain('nyx-tree-node--expanded')
  })

  it('sets aria-expanded on branch nodes', () => {
    const model = makeModel(nested)
    model[0].status = NyxTreeNodeStatus.Open
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const branches = wrapper.findAll('.nyx-tree-node--branch')
    expect(branches[0].attributes('aria-expanded')).toBe('true')
    expect(branches[1].attributes('aria-expanded')).toBe('false')
  })
})

describe('NyxTree — Select emit', () => {
  it('emits select with the clicked leaf node', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeModel(flat) } })
    await wrapper.findAll('.nyx-tree-node__label')[0].trigger('click')
    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect((emitted![0][0] as NyxTreeNodeBase).id).toBe('alpha')
  })

  it('emits select with the clicked branch node', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nested } })
    await wrapper.findAll('.nyx-tree-node__label')[0].trigger('click')
    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect((emitted![0][0] as NyxTreeNodeBase).id).toBe('fruits')
  })

  it('emits the full node object on select', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeModel(flat) } })
    await wrapper.findAll('.nyx-tree-node__label')[1].trigger('click')
    const node = wrapper.emitted('select')![0][0] as NyxTreeNodeBase
    expect(node.id).toBe('beta')
    expect(node.label).toBe('Beta')
  })
})

describe('NyxTree — Active state', () => {
  it('applies nyx-tree-node--active to node with status Active', () => {
    const model = makeModel(flat)
    model[0].status = NyxTreeNodeStatus.Active
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const activeNodes = wrapper.findAll('.nyx-tree-node--active')
    expect(activeNodes.length).toBe(1)
    expect(activeNodes[0].attributes('id')).toBeUndefined()
  })

  it('applies aria-selected to active node', () => {
    const model = makeModel(flat)
    model[0].status = NyxTreeNodeStatus.Active
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const treeitems = wrapper.findAll('[role="treeitem"]')
    expect(treeitems[0].attributes('aria-selected')).toBe('true')
    expect(treeitems[1].attributes('aria-selected')).toBe('false')
  })
})

describe('NyxTree — Disabled state', () => {
  it('does not emit select when tree is disabled', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeModel(flat), disabled: true } })
    await wrapper.findAll('.nyx-tree-node__label')[0].trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('applies aria-disabled to root when tree is disabled', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeModel(flat), disabled: true } })
    expect(wrapper.find('.nyx-tree').attributes('aria-disabled')).toBe('true')
  })

  it('does not emit select when node-level disabled is true', async () => {
    const model = makeModel(flat)
    model[0].disabled = true
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    await wrapper.findAll('.nyx-tree-node__label')[0].trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('applies nyx-tree-node--disabled to disabled nodes', () => {
    const model = makeModel(flat)
    model[0].disabled = true
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const disabled = wrapper.findAll('.nyx-tree-node--disabled')
    expect(disabled.length).toBe(1)
  })
})

describe('NyxTree — Keyboard navigation', () => {
  it('ArrowDown moves focus to the next treeitem', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeModel(flat) },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[0].element as HTMLElement).focus()
    await wrapper.find('.nyx-tree').trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[1].element)
    wrapper.unmount()
  })

  it('ArrowUp moves focus to the previous treeitem', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeModel(flat) },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[1].element as HTMLElement).focus()
    await wrapper.find('.nyx-tree').trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(items[0].element)
    wrapper.unmount()
  })

  it('Enter on focused node triggers select emit', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeModel(flat) },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[0].element as HTMLElement).focus()
    await wrapper.find('.nyx-tree').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toBeTruthy()
    wrapper.unmount()
  })

  it('does not navigate when tree is disabled', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeModel(flat), disabled: true },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[0].element as HTMLElement).focus()
    await wrapper.find('.nyx-tree').trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[0].element)
    wrapper.unmount()
  })
})
