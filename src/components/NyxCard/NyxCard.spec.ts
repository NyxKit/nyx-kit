import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxCard from './NyxCard.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxCard', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxCard)
    expect(wrapper.find('.nyx-card').exists()).toBe(true)
  })

  it('renders as an <article> element', () => {
    const wrapper = mount(NyxCard)
    expect(wrapper.find('article.nyx-card').exists()).toBe(true)
  })

  it('renders default slot content in body', () => {
    const wrapper = mount(NyxCard, {
      slots: { default: '<p class="card-body">Body content</p>' }
    })
    expect(wrapper.find('.card-body').exists()).toBe(true)
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(NyxCard, {
      slots: { header: '<h2 class="card-header">My Card</h2>' }
    })
    expect(wrapper.find('.card-header').exists()).toBe(true)
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(NyxCard, {
      slots: { footer: '<div class="card-footer">Footer</div>' }
    })
    expect(wrapper.find('.card-footer').exists()).toBe(true)
  })

  it('does not render header when no title or header slot', () => {
    const wrapper = mount(NyxCard)
    expect(wrapper.find('.nyx-card__header').exists()).toBe(false)
  })

  it('renders title in header when title prop is provided', () => {
    const wrapper = mount(NyxCard, { props: { title: 'Card Title' } })
    expect(wrapper.find('.nyx-card__header').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Card Title')
  })

  it('emits click event when card is clicked', async () => {
    const wrapper = mount(NyxCard)
    await wrapper.find('.nyx-card').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('renders body section always', () => {
    const wrapper = mount(NyxCard)
    expect(wrapper.find('.nyx-card__body').exists()).toBe(true)
  })
})
