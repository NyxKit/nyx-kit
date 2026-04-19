import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import NyxTable from './NyxTable.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

const rows = [
  { name: 'Alice', age: 30, role: 'Admin' },
  { name: 'Bob',   age: 25, role: 'User'  },
  { name: 'Carol', age: 35, role: 'Editor'},
]

const keyedRows = [
  { id: 'row-1', name: 'Alice', role: 'Admin' },
  { id: 'row-2', name: 'Bob', role: 'User' },
]

describe('NyxTable', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxTable, { props: { modelValue: rows } })
    expect(wrapper.find('.nyx-table').exists()).toBe(true)
  })

  it('renders a row for each data item', () => {
    const wrapper = mount(NyxTable, { props: { modelValue: rows } })
    expect(wrapper.findAll('tbody tr').length).toBe(3)
  })

  it('renders header columns derived from object keys', () => {
    const wrapper = mount(NyxTable, { props: { modelValue: rows } })
    const headers = wrapper.findAll('th')
    expect(headers.map(h => h.text())).toEqual(['name', 'age', 'role'])
  })

  it('renders custom columnTitles when provided', () => {
    const wrapper = mount(NyxTable, {
      props: { modelValue: rows, columnTitles: ['Name', 'Age', 'Role'] }
    })
    const headers = wrapper.findAll('th')
    expect(headers.map(h => h.text())).toEqual(['Name', 'Age', 'Role'])
  })

  it('hides header when header=false', () => {
    const wrapper = mount(NyxTable, { props: { modelValue: rows, header: false } })
    expect(wrapper.find('thead').exists()).toBe(false)
  })

  it('applies striped class when striped=true', () => {
    const wrapper = mount(NyxTable, { props: { modelValue: rows, striped: true } })
    expect(wrapper.find('.nyx-table').classes()).toContain('striped')
  })

  it('respects colInclude to limit visible columns', () => {
    const wrapper = mount(NyxTable, {
      props: { modelValue: rows, colInclude: ['name', 'role'] as unknown as (keyof object)[] }
    })
    const headers = wrapper.findAll('th')
    expect(headers.map(h => h.text())).toEqual(['name', 'role'])
  })

  it('respects colExclude to exclude columns', () => {
    const wrapper = mount(NyxTable, {
      props: { modelValue: rows, colExclude: ['age'] as unknown as (keyof object)[] }
    })
    const headers = wrapper.findAll('th')
    expect(headers.map(h => h.text())).not.toContain('age')
  })

  it('renders empty tbody when modelValue is empty', () => {
    const wrapper = mount(NyxTable, { props: { modelValue: [] } })
    expect(wrapper.findAll('tbody tr').length).toBe(0)
  })

  it('renders as a <table> element', () => {
    const wrapper = mount(NyxTable, { props: { modelValue: rows } })
    expect(wrapper.element.tagName).toBe('TABLE')
  })

  it('passes the original item to the default slot', () => {
    const wrapper = mount(NyxTable, {
      props: { modelValue: keyedRows, colInclude: ['name'] as unknown as (keyof object)[] },
      slots: {
        default: ({ item }) => h('td', { class: 'slot-id' }, (item as { id: string }).id)
      }
    })

    expect(wrapper.findAll('.slot-id').map(node => node.text())).toEqual(['row-1', 'row-2'])
  })
})
