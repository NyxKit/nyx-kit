import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import NyxBreadcrumbs from './NyxBreadcrumbs.vue'
import type { RouteLocationRaw } from 'vue-router'

const RouterLinkStub = defineComponent({
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
  template: '<a class="router-link-stub" :data-to="JSON.stringify(to)"><slot /></a>',
})

function mountBreadcrumbs (options: Parameters<typeof mount<typeof NyxBreadcrumbs>>[1] = {}) {
  return mount(NyxBreadcrumbs, {
    ...options,
    global: {
      ...(options.global ?? {}),
      stubs: {
        NyxIcon: {
          props: ['name'],
          template: '<i class="nyx-icon-stub" :data-name="name" />',
        },
        RouterLink: RouterLinkStub,
        ...(options.global?.stubs ?? {}),
      },
    },
  })
}

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxBreadcrumbs', () => {
  it('renders without errors', () => {
    const wrapper = mountBreadcrumbs({ props: { items: ['Home', 'About'] } })
    expect(wrapper.find('.nyx-breadcrumbs').exists()).toBe(true)
  })

  it('renders string items as readable static breadcrumb items', () => {
    const wrapper = mountBreadcrumbs({ props: { items: ['Home', 'About'] } })
    const items = wrapper.findAll('.nyx-breadcrumbs__item')

    expect(items).toHaveLength(2)
    expect(items[0].text()).toBe('Home')
    expect(items[1].text()).toBe('About')
    expect(wrapper.findAll('a')).toHaveLength(0)
  })

  it('renders object items with label and href as anchors', () => {
    const wrapper = mountBreadcrumbs({
      props: { items: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }] }
    })
    const links = wrapper.findAll('a')

    expect(links).toHaveLength(2)
    expect(links[0].text()).toContain('Home')
    expect(links[0].attributes('href')).toBe('/')
    expect(links[1].attributes('href')).toBe('/about')
  })

  it('renders route items as router links', () => {
    const route: RouteLocationRaw = { name: 'library', query: { tab: 'all' } }
    const wrapper = mountBreadcrumbs({
      props: { items: [{ label: 'Library', route }] }
    })
    const link = wrapper.find('.router-link-stub')

    expect(link.exists()).toBe(true)
    expect(link.text()).toContain('Library')
    expect(link.attributes('data-to')).toBe(JSON.stringify(route))
  })

  it('prefers route over href when both are provided', () => {
    const wrapper = mountBreadcrumbs({
      props: { items: [{ label: 'Library', href: '/library', route: '/app/library' }] }
    })

    expect(wrapper.find('.router-link-stub').exists()).toBe(true)
    expect(wrapper.find('.router-link-stub').attributes('href')).toBeUndefined()
  })

  it('renders breadcrumb items without navigation targets as non-links', () => {
    const wrapper = mountBreadcrumbs({
      props: { items: [{ label: 'Current page' }] }
    })

    expect(wrapper.find('.nyx-breadcrumbs__item--static').exists()).toBe(true)
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('renders separators between items and not after the last item', () => {
    const wrapper = mountBreadcrumbs({ props: { items: ['Home', 'About', 'Contact'] } })
    expect(wrapper.findAll('.nyx-breadcrumbs__separator')).toHaveLength(2)
  })

  it('uses a text separator prop', () => {
    const wrapper = mountBreadcrumbs({ props: { items: ['Home', 'About'], separator: '>' } })
    expect(wrapper.find('.nyx-breadcrumbs__separator').text()).toBe('>')
  })

  it('renders an icon separator from the separator prop', () => {
    const wrapper = mountBreadcrumbs({
      props: { items: ['Home', 'About'], separator: { icon: 'chevron-right' } }
    })

    expect(wrapper.find('.nyx-breadcrumbs__separator .nyx-icon-stub').attributes('data-name')).toBe('chevron-right')
  })

  it('renders separator slot content for every separator position', () => {
    const wrapper = mountBreadcrumbs({
      props: { items: ['Home', 'About', 'Contact'] },
      slots: { separator: '<span class="custom-sep">→</span>' }
    })

    expect(wrapper.findAll('.custom-sep')).toHaveLength(2)
  })

  it('gives the separator slot precedence over the separator prop', () => {
    const wrapper = mountBreadcrumbs({
      props: { items: ['Home', 'About'], separator: { icon: 'chevron-right' } },
      slots: { separator: '<span class="custom-sep">/</span>' }
    })

    expect(wrapper.find('.custom-sep').exists()).toBe(true)
    expect(wrapper.find('.nyx-breadcrumbs__separator .nyx-icon-stub').exists()).toBe(false)
  })

  it('renders icons only for breadcrumb items that define them', () => {
    const wrapper = mountBreadcrumbs({
      props: {
        items: [
          { label: 'Home', icon: 'house', href: '/' },
          { label: 'Library', href: '/library' },
          { label: 'Current', icon: 'folder' },
        ]
      }
    })

    const icons = wrapper.findAll('.nyx-breadcrumbs__item .nyx-icon-stub')
    expect(icons).toHaveLength(2)
    expect(icons[0].attributes('data-name')).toBe('house')
    expect(icons[1].attributes('data-name')).toBe('folder')
  })

  it('allows consumers to replace item content through the item slot', () => {
    const wrapper = mountBreadcrumbs({
      props: { items: [{ label: 'Home', icon: 'house', href: '/' }] },
      slots: {
        item: '<template #item="{ item }"><span class="custom-item">{{ item.label.toUpperCase() }}</span></template>',
      },
    })

    expect(wrapper.find('.custom-item').text()).toBe('HOME')
    expect(wrapper.find('.nyx-icon-stub').exists()).toBe(false)
  })

  it('emits click with item data when an anchor breadcrumb is clicked', async () => {
    const item = { label: 'About', href: '#' }
    const wrapper = mountBreadcrumbs({ props: { items: [item] } })

    await wrapper.find('a').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')![0][0]).toEqual(item)
  })

  it('emits click with item data when a route breadcrumb is clicked', async () => {
    const item = { label: 'Dashboard', route: '/dashboard' }
    const wrapper = mountBreadcrumbs({ props: { items: [item] } })

    await wrapper.find('.router-link-stub').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')![0][0]).toEqual(item)
  })

  it('renders as a nav element', () => {
    const wrapper = mountBreadcrumbs({ props: { items: ['Home'] } })
    expect(wrapper.element.tagName).toBe('NAV')
  })
})
