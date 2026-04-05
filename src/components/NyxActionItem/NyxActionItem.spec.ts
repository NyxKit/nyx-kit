import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxActionItem from './NyxActionItem.vue'
import { NyxTheme } from '@/types'

describe('NyxActionItem', () => {
  it('renders title and description', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: 'Test Title', action: 'Action' },
      slots: { default: 'Test description content' }
    })
    
    expect(wrapper.find('.nyx-action-item__title').text()).toBe('Test Title')
    expect(wrapper.find('.nyx-action-item__description').text()).toBe('Test description content')
  })

  it('renders default button when action prop is provided', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: 'Title', action: 'Click Me' },
      slots: { default: 'Description' }
    })
    
    expect(wrapper.findComponent({ name: 'NyxButton' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'NyxButton' }).text()).toBe('Click Me')
  })

  it('does not render button when action prop is empty', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: 'Title', action: '' },
      slots: { default: 'Description' }
    })
    
    expect(wrapper.findComponent({ name: 'NyxButton' }).exists()).toBe(false)
  })

  it('emits click when internal button is clicked', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: 'Title', action: 'Click Me' },
      slots: { default: 'Description' }
    })
    
    wrapper.findComponent({ name: 'NyxButton' }).trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('renders action slot content instead of default button', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: 'Title', action: 'Button' },
      slots: { 
        default: 'Description',
        action: '<span class="custom-action">Custom Action</span>'
      }
    })
    
    expect(wrapper.find('.custom-action').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'NyxButton' }).exists()).toBe(false)
  })

  it('does not emit click when slot content is clicked', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: 'Title', action: 'Button' },
      slots: { 
        default: 'Description',
        action: '<button class="slot-button">Custom</button>'
      }
    })
    
    wrapper.find('.slot-button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies theme class to root element', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: 'Title', action: 'Action', theme: NyxTheme.Danger },
      slots: { default: 'Description' }
    })
    
    expect(wrapper.find('.nyx-action-item').classes()).toContain('theme-danger')
  })

  it('does not render action area when action is empty and no slot provided', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: 'Title', action: '' },
      slots: { default: 'Description' }
    })
    
    expect(wrapper.find('.nyx-action-item__action').exists()).toBe(true)
    expect(wrapper.find('.nyx-action-item__action').text()).toBe('')
  })

  it('handles empty title without breaking layout', () => {
    const wrapper = mount(NyxActionItem, {
      props: { title: '', action: 'Action' },
      slots: { default: 'Description' }
    })
    
    expect(wrapper.find('.nyx-action-item__title').exists()).toBe(true)
    expect(wrapper.find('.nyx-action-item__title').text()).toBe('')
  })
})