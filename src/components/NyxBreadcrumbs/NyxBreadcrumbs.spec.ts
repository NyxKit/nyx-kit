import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxBreadcrumbs from './NyxBreadcrumbs.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxBreadcrumbs', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxBreadcrumbs, { props: { items: ['Home', 'About'] } })
    expect(wrapper.find('.nyx-breadcrumbs').exists()).toBe(true)
  })

  it('renders a link for each item', () => {
    const wrapper = mount(NyxBreadcrumbs, { props: { items: ['Home', 'Products', 'Detail'] } })
    expect(wrapper.findAll('a').length).toBe(3)
  })

  it('renders string items as link labels', () => {
    const wrapper = mount(NyxBreadcrumbs, { props: { items: ['Home', 'About'] } })
    const links = wrapper.findAll('a')
    expect(links[0].text()).toBe('Home')
    expect(links[1].text()).toBe('About')
  })

  it('renders object items with label and href', () => {
    const wrapper = mount(NyxBreadcrumbs, {
      props: { items: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }] }
    })
    const links = wrapper.findAll('a')
    expect(links[0].text()).toBe('Home')
    expect(links[0].attributes('href')).toBe('/')
    expect(links[1].attributes('href')).toBe('/about')
  })

  it('renders separators between items', () => {
    const wrapper = mount(NyxBreadcrumbs, { props: { items: ['Home', 'About', 'Contact'] } })
    expect(wrapper.findAll('.nyx-breadcrumbs__separator').length).toBe(2)
  })

  it('does not render separator after last item', () => {
    const wrapper = mount(NyxBreadcrumbs, { props: { items: ['Home', 'About'] } })
    const separators = wrapper.findAll('.nyx-breadcrumbs__separator')
    expect(separators.length).toBe(1)
  })

  it('uses custom separator prop', () => {
    const wrapper = mount(NyxBreadcrumbs, { props: { items: ['Home', 'About'], separator: '>' } })
    expect(wrapper.find('.nyx-breadcrumbs__separator').text()).toBe('>')
  })

  it('renders separator slot content', () => {
    const wrapper = mount(NyxBreadcrumbs, {
      props: { items: ['Home', 'About'] },
      slots: { separator: '<span class="custom-sep">→</span>' }
    })
    expect(wrapper.find('.custom-sep').exists()).toBe(true)
  })

  it('emits click with item data when a link is clicked', async () => {
    const item = { label: 'About', href: '/about' }
    const wrapper = mount(NyxBreadcrumbs, { props: { items: [item] } })
    await wrapper.find('a').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')![0][0]).toEqual(item)
  })

  it('renders as a <nav> element', () => {
    const wrapper = mount(NyxBreadcrumbs, { props: { items: ['Home'] } })
    expect(wrapper.element.tagName).toBe('NAV')
  })
})
