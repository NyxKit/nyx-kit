import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxTree from './NyxTree.vue'
import { NyxTreeNodeStatus } from './NyxTree.types'
import type { NyxTreeModel } from './NyxTree.types'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

function makeFlatModel(): NyxTreeModel {
  return [
    { id: 'alpha', label: 'Alpha', children: [] },
    { id: 'beta', label: 'Beta', children: [] },
    { id: 'gamma', label: 'Gamma', children: [] },
  ]
}

function makeNestedModel(): NyxTreeModel {
  return [
    { id: 'fruits', label: 'Fruits', children: [
      { id: 'apple', label: 'Apple', children: [] },
      { id: 'banana', label: 'Banana', children: [] },
    ]},
    { id: 'veggies', label: 'Veggies', children: [
      { id: 'carrot', label: 'Carrot', children: [] },
    ]},
  ]
}

function makeModelWithDisabledNode(): NyxTreeModel {
  return [
    { id: 'alpha', label: 'Alpha', children: [] },
    { id: 'beta', label: 'Beta', disabled: true, children: [{ id: 'rice', label: 'Rice', children: [] }] },
    { id: 'gamma', label: 'Gamma', children: [] },
  ]
}

// ─── NyxTree (smoke) ──────────────────────────────────────────────────────────

describe('NyxTree', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    expect(wrapper.find('.nyx-tree').exists()).toBe(true)
  })

  it('renders as a <ul> element', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    expect(wrapper.element.tagName).toBe('UL')
  })

  it('renders a node for each top-level item', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    expect(wrapper.findAll('.nyx-tree-node').length).toBe(3)
  })

  it('renders nested child labels', () => {
    const model = makeNestedModel()
    model[0].status = NyxTreeNodeStatus.Open
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const text = wrapper.text()
    expect(text).toContain('Apple')
    expect(text).toContain('Banana')
  })
})

// ─── Label rendering (US1) ────────────────────────────────────────────────────

describe('NyxTree — label rendering (US1)', () => {
  it('renders labels from label field', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    const text = wrapper.text()
    expect(text).toContain('Alpha')
    expect(text).toContain('Beta')
    expect(text).toContain('Gamma')
  })

  it('has role="tree" on root', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    expect(wrapper.attributes('role')).toBe('tree')
  })

  it('has role="treeitem" on each node', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    const nodes = wrapper.findAll('[role="treeitem"]')
    expect(nodes.length).toBe(3)
  })

  it('applies --leaf to nodes with no children', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    const leaves = wrapper.findAll('.nyx-tree-node--leaf')
    expect(leaves.length).toBe(3)
  })

  it('applies --branch to nodes with children', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeNestedModel() } })
    const branches = wrapper.findAll('.nyx-tree-node--branch')
    expect(branches.length).toBe(2)
  })
})

// ─── Expand/collapse (US2) ────────────────────────────────────────────────────

describe('NyxTree — expand/collapse (US2)', () => {
  it('does NOT show --expanded when status is Closed/undefined (default)', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeNestedModel() } })
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(false)
  })

  it('shows --expanded when status is Open', () => {
    const model = makeNestedModel()
    model[0].status = NyxTreeNodeStatus.Open
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(true)
  })

  it('shows --expanded when status is Active (Active branch is expanded)', () => {
    const model = makeNestedModel()
    model[0].status = NyxTreeNodeStatus.Active
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(true)
  })

  it('sets aria-expanded="false" on closed branch', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeNestedModel() } })
    const branch = wrapper.find('.nyx-tree-node--branch')
    expect(branch.attributes('aria-expanded')).toBe('false')
  })

  it('sets aria-expanded="true" on open branch', () => {
    const model = makeNestedModel()
    model[0].status = NyxTreeNodeStatus.Open
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const branch = wrapper.find('.nyx-tree-node--branch')
    expect(branch.attributes('aria-expanded')).toBe('true')
  })

  it('does not set aria-expanded on leaf nodes', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    const leaf = wrapper.find('.nyx-tree-node--leaf')
    expect(leaf.attributes('aria-expanded')).toBeUndefined()
  })
})

// ─── Selection (US3) ──────────────────────────────────────────────────────────

describe('NyxTree — selection (US3)', () => {
  it('emits select with the node object on click', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    await wrapper.find('.nyx-tree-node__label').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('emitted payload has correct id and label', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    await wrapper.find('.nyx-tree-node__label').trigger('click')
    expect(wrapper.emitted('select')![0][0]).toMatchObject({ id: 'alpha', label: 'Alpha' })
  })

  it('sets status: Active on the clicked node and emits update:modelValue', async () => {
    const model = makeFlatModel()
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    await wrapper.find('.nyx-tree-node__label').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const updatedModel = wrapper.emitted('update:modelValue')![0][0] as typeof model
    expect(updatedModel[0].status).toBe(NyxTreeNodeStatus.Active)
  })

  it('clicking a second node clears the first and activates the second', async () => {
    const model = makeFlatModel()
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const labels = wrapper.findAll('.nyx-tree-node__label')
    await labels[0].trigger('click')
    await labels[1].trigger('click')
    const updatedModel = wrapper.emitted('update:modelValue')![1][0] as typeof model
    expect(updatedModel[0].status).not.toBe(NyxTreeNodeStatus.Active)
    expect(updatedModel[1].status).toBe(NyxTreeNodeStatus.Active)
  })

  it('applies --active to node with status: Active', () => {
    const model = makeFlatModel()
    model[0].status = NyxTreeNodeStatus.Active
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    expect(wrapper.find('.nyx-tree-node--active').exists()).toBe(true)
  })

  it('does not apply --active when no node has Active status', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    expect(wrapper.find('.nyx-tree-node--active').exists()).toBe(false)
  })

  it('sets aria-selected="true" on Active node', () => {
    const model = makeFlatModel()
    model[0].status = NyxTreeNodeStatus.Active
    const wrapper = mount(NyxTree, { props: { modelValue: model } })
    const selected = wrapper.find('[aria-selected="true"]')
    expect(selected.exists()).toBe(true)
  })

  it('emits update:modelValue on keyboard Enter activation', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeFlatModel() },
      attachTo: document.body,
    })
    const firstItem = wrapper.find('[role="treeitem"]')
    ;(firstItem.element as HTMLElement).focus()
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    wrapper.unmount()
  })
})

// ─── Keyboard navigation (US4) ───────────────────────────────────────────────

describe('NyxTree — keyboard navigation (US4)', () => {
  it('moves focus to next node on ArrowDown', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeFlatModel() },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[0].element as HTMLElement).focus()
    await wrapper.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[1].element)
    wrapper.unmount()
  })

  it('moves focus to previous node on ArrowUp', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeFlatModel() },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[1].element as HTMLElement).focus()
    await wrapper.trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(items[0].element)
    wrapper.unmount()
  })

  it('does not move past last node on ArrowDown', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeFlatModel() },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[2].element as HTMLElement).focus()
    await wrapper.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[2].element)
    wrapper.unmount()
  })

  it('Enter triggers click on focused item (emits select)', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeFlatModel() },
      attachTo: document.body,
    })
    const firstItem = wrapper.find('[role="treeitem"]')
    ;(firstItem.element as HTMLElement).focus()
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toBeTruthy()
    wrapper.unmount()
  })
})

// ─── Disabled state ───────────────────────────────────────────────────────────

describe('NyxTree — disabled state', () => {
  it('does not emit select or update:modelValue when tree-level disabled=true', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeFlatModel(), disabled: true },
    })
    await wrapper.find('.nyx-tree-node__label').trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('sets aria-disabled="true" on root when disabled', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeFlatModel(), disabled: true },
    })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('does not set aria-disabled when not disabled', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: makeFlatModel() } })
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
  })

  it('does not emit select when node.disabled=true', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeModelWithDisabledNode() },
    })
    const labels = wrapper.findAll('.nyx-tree-node__label')
    await labels[1].trigger('click') // click Beta (disabled)
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('applies --disabled to node with disabled=true', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeModelWithDisabledNode() },
    })
    expect(wrapper.find('.nyx-tree-node--disabled').exists()).toBe(true)
  })

  it('sets aria-disabled on individually disabled node', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: makeModelWithDisabledNode() },
    })
    const betaNode = wrapper.findAll('[role="treeitem"]')[1]
    expect(betaNode.attributes('aria-disabled')).toBe('true')
  })
})
