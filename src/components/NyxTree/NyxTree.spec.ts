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

// ─── Existing rendering tests ────────────────────────────────────────────────

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
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, open: [['Fruits'], ['Veggies']] },
    })
    expect(wrapper.findAll('.nyx-tree-node').length).toBeGreaterThan(2)
  })

  it('renders nested child values', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, open: [['Fruits'], ['Veggies']] },
    })
    const text = wrapper.text()
    expect(text).toContain('apple')
    expect(text).toContain('banana')
    expect(text).toContain('carrot')
  })
})

// ─── T008: Label rendering & ARIA roles ──────────────────────────────────────

describe('NyxTree — label rendering (US1)', () => {
  it('renders key labels for flat nodes', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    const text = wrapper.text()
    expect(text).toContain('Alpha')
    expect(text).toContain('Beta')
    expect(text).toContain('Gamma')
  })

  it('renders branch and leaf labels for nested model', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, open: [['Fruits'], ['Veggies']] },
    })
    const text = wrapper.text()
    expect(text).toContain('Fruits')
    expect(text).toContain('Apple')
    expect(text).toContain('Veggies')
    expect(text).toContain('Carrot')
  })

  it('has role="tree" on the root element', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    expect(wrapper.attributes('role')).toBe('tree')
  })

  it('has role="treeitem" on each node', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    const nodes = wrapper.findAll('[role="treeitem"]')
    expect(nodes.length).toBe(3)
  })

  it('applies nyx-tree-node--leaf class to leaf nodes', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    const leaves = wrapper.findAll('.nyx-tree-node--leaf')
    expect(leaves.length).toBe(3)
  })

  it('applies nyx-tree-node--branch class to branch nodes', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    const branches = wrapper.findAll('.nyx-tree-node--branch')
    expect(branches.length).toBe(2)
  })
})

// ─── T013: Expand/collapse ────────────────────────────────────────────────────

describe('NyxTree — expand/collapse (US2)', () => {
  it('renders branch children closed by default', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(false)
  })

  it('opens children when branch label is clicked', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    const branchLabel = wrapper.find('.nyx-tree-node--branch .nyx-tree-node__label')
    await branchLabel.trigger('click')
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(true)
  })

  it('collapses children on second click', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    const branchLabel = wrapper.find('.nyx-tree-node--branch .nyx-tree-node__label')
    await branchLabel.trigger('click')
    await branchLabel.trigger('click')
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(false)
  })

  it('does not affect sibling branches when one is opened', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    const branches = wrapper.findAll('.nyx-tree-node--branch .nyx-tree-node__label')
    await branches[0].trigger('click') // open Fruits
    // Veggies remains closed — only one --expanded node
    expect(wrapper.findAll('.nyx-tree-node--expanded').length).toBe(1)
  })

  it('applies nyx-tree-node--expanded to opened branches', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    await wrapper.find('.nyx-tree-node--branch .nyx-tree-node__label').trigger('click')
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(true)
  })

  it('expands nodes listed in the open prop', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, open: [['Fruits']] },
    })
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(true)
  })

  it('expands multiple nodes listed in the open prop', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, open: [['Fruits'], ['Veggies']] },
    })
    expect(wrapper.findAll('.nyx-tree-node--expanded').length).toBe(2)
  })

  it('sets aria-expanded="false" on closed branch', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    const branch = wrapper.find('.nyx-tree-node--branch')
    expect(branch.attributes('aria-expanded')).toBe('false')
  })

  it('sets aria-expanded="true" on opened branch', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    const branch = wrapper.find('.nyx-tree-node--branch')
    await wrapper.find('.nyx-tree-node--branch .nyx-tree-node__label').trigger('click')
    expect(branch.attributes('aria-expanded')).toBe('true')
  })

  it('does not set aria-expanded on leaf nodes', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    const leaf = wrapper.find('.nyx-tree-node--leaf')
    expect(leaf.attributes('aria-expanded')).toBeUndefined()
  })

  it('auto-expands ancestors of the selected node on mount', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, selected: ['Fruits', 'Apple'] },
    })
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(true)
  })

  it('auto-expands when selected prop changes to a deep node', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, selected: [] },
    })
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(false)
    await wrapper.setProps({ selected: ['Fruits', 'Apple'] })
    expect(wrapper.find('.nyx-tree-node--expanded').exists()).toBe(true)
  })
})

// ─── T018: Selection & path emit ─────────────────────────────────────────────

describe('NyxTree — selection (US3)', () => {
  it('emits select with top-level path on flat leaf click', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    await wrapper.find('.nyx-tree-node__label').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0][0]).toEqual(['Alpha'])
  })

  it('emits select with nested path on leaf click', async () => {
    // Open Fruits first so its children are visible
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, open: [['Fruits']] },
    })
    const leaves = wrapper.findAll('.nyx-tree-node--leaf .nyx-tree-node__label')
    await leaves[0].trigger('click')
    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect(emitted![emitted!.length - 1][0]).toEqual(['Fruits', 'Apple'])
  })

  it('emits select with branch path on branch click', async () => {
    const wrapper = mount(NyxTree, { props: { modelValue: nestedModel } })
    await wrapper.find('.nyx-tree-node--branch .nyx-tree-node__label').trigger('click')
    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toEqual(['Fruits'])
  })

  it('applies nyx-tree-node--selected to node matching selected prop', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, selected: ['Fruits', 'Apple'], open: [['Fruits']] },
    })
    expect(wrapper.find('.nyx-tree-node--selected').exists()).toBe(true)
  })

  it('does not apply nyx-tree-node--selected when selected prop does not match', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: nestedModel, selected: ['Fruits', 'Mango'] },
    })
    expect(wrapper.find('.nyx-tree-node--selected').exists()).toBe(false)
  })

  it('sets aria-selected="true" on selected node', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: flatModel, selected: ['Alpha'] },
    })
    const selected = wrapper.find('[aria-selected="true"]')
    expect(selected.exists()).toBe(true)
  })
})

// ─── T021: Keyboard navigation ───────────────────────────────────────────────

describe('NyxTree — keyboard navigation (US4)', () => {
  it('moves focus to next node on ArrowDown', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: flatModel, selected: ['Alpha'] },
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
      props: { modelValue: flatModel, selected: ['Alpha'] },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[1].element as HTMLElement).focus()
    await wrapper.trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(items[0].element)
    wrapper.unmount()
  })

  it('does not move focus below last node on ArrowDown', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: flatModel },
      attachTo: document.body,
    })
    const items = wrapper.findAll('[role="treeitem"]')
    ;(items[2].element as HTMLElement).focus()
    await wrapper.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[2].element)
    wrapper.unmount()
  })

  it('triggers click on label on Enter', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: flatModel, selected: ['Alpha'] },
      attachTo: document.body,
    })
    const firstItem = wrapper.find('[role="treeitem"]')
    ;(firstItem.element as HTMLElement).focus()
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toBeTruthy()
    wrapper.unmount()
  })
})

// ─── T024: Disabled state ────────────────────────────────────────────────────

describe('NyxTree — disabled state (US4/Polish)', () => {
  it('does not emit select when disabled', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: flatModel, disabled: true },
    })
    await wrapper.find('.nyx-tree-node__label').trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('sets aria-disabled="true" on root when disabled', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: flatModel, disabled: true },
    })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('does not set aria-disabled when not disabled', () => {
    const wrapper = mount(NyxTree, { props: { modelValue: flatModel } })
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
  })
})

// ─── Per-node disabled (model-embedded disabled key) ─────────────────────────

const modelWithDisabledBranch = {
  Alpha: 'a',
  Beta: { disabled: true, Rice: 'rice' },
  Gamma: 'c',
}

describe('NyxTree — per-node disabled state', () => {
  it('does not emit select when a branch node has disabled:true in model', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: modelWithDisabledBranch },
    })
    const labels = wrapper.findAll('.nyx-tree-node__label')
    await labels[1].trigger('click') // click Beta
    const emitted = wrapper.emitted('select')
    expect(emitted).toBeFalsy()
  })

  it('still emits select for nodes without disabled in model', async () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: modelWithDisabledBranch },
    })
    await wrapper.findAll('.nyx-tree-node__label')[0].trigger('click') // click Alpha
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('applies nyx-tree-node--disabled class to disabled branch nodes', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: modelWithDisabledBranch },
    })
    const disabled = wrapper.find('.nyx-tree-node--disabled')
    expect(disabled.exists()).toBe(true)
  })

  it('sets aria-disabled on individually disabled branch nodes', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: modelWithDisabledBranch },
    })
    const betaNode = wrapper.findAll('[role="treeitem"]')[1]
    expect(betaNode.attributes('aria-disabled')).toBe('true')
  })

  it('does not render disabled key as a child node', () => {
    const wrapper = mount(NyxTree, {
      props: { modelValue: modelWithDisabledBranch, open: [['Beta']] },
    })
    expect(wrapper.text()).not.toContain('disabled')
  })
})
