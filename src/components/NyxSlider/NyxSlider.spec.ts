import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NyxSlider from './NyxSlider.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('NyxSlider', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxSlider, { props: { modelValue: 50 } })
    expect(wrapper.find('.nyx-slider').exists()).toBe(true)
  })

  it('positions first thumb at 50% for value=50 on [0,100]', () => {
    const wrapper = mount(NyxSlider, { props: { modelValue: 50, min: 0, max: 100 } })
    const thumb = wrapper.find('.nyx-slider__thumb')
    expect(thumb.attributes('style')).toContain('left: 50%')
  })

  it('positions first thumb at 25% for value=25 on [0,100]', () => {
    const wrapper = mount(NyxSlider, { props: { modelValue: 25, min: 0, max: 100 } })
    const thumb = wrapper.find('.nyx-slider__thumb')
    expect(thumb.attributes('style')).toContain('left: 25%')
  })

  it('positions first thumb at 50% for value=50 on [40,60]', () => {
    const wrapper = mount(NyxSlider, { props: { modelValue: 50, min: 40, max: 60 } })
    const thumb = wrapper.find('.nyx-slider__thumb')
    expect(thumb.attributes('style')).toContain('left: 50%')
  })

  it('renders two thumbs in range mode', () => {
    const wrapper = mount(NyxSlider, { props: { modelValue: [10, 90] } })
    expect(wrapper.findAll('.nyx-slider__thumb').length).toBe(2)
  })

  it('renders second thumb when range starts at zero (M5 regression)', () => {
    // model[1] = 50 (truthy), but also test model[1] = 0 if possible
    const wrapper = mount(NyxSlider, { props: { modelValue: [0, 50] } })
    expect(wrapper.findAll('.nyx-slider__thumb').length).toBe(2)
  })

  it('renders single thumb in scalar mode', () => {
    const wrapper = mount(NyxSlider, { props: { modelValue: 30 } })
    expect(wrapper.findAll('.nyx-slider__thumb').length).toBe(1)
  })

  it('increases value on ArrowRight key', async () => {
    const wrapper = mount(NyxSlider, {
      props: {
        modelValue: 50,
        min: 0,
        max: 100,
        'onUpdate:modelValue': (val: number | [number, number] | undefined) => { wrapper.setProps({ modelValue: val }) }
      }
    })
    await wrapper.find('.nyx-slider__thumb').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.props('modelValue')).toBe(51)
  })

  it('decreases value on ArrowLeft key', async () => {
    const wrapper = mount(NyxSlider, {
      props: {
        modelValue: 50,
        min: 0,
        max: 100,
        'onUpdate:modelValue': (val: number | [number, number] | undefined) => { wrapper.setProps({ modelValue: val }) }
      }
    })
    await wrapper.find('.nyx-slider__thumb').trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.props('modelValue')).toBe(49)
  })

  it('respects step on ArrowRight key', async () => {
    const wrapper = mount(NyxSlider, {
      props: {
        modelValue: 50,
        min: 0,
        max: 100,
        step: 10,
        'onUpdate:modelValue': (val: number | [number, number] | undefined) => { wrapper.setProps({ modelValue: val }) }
      }
    })
    await wrapper.find('.nyx-slider__thumb').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.props('modelValue')).toBe(60)
  })

  it('jumps to min on Home key', async () => {
    const wrapper = mount(NyxSlider, {
      props: {
        modelValue: 50,
        min: 10,
        max: 100,
        'onUpdate:modelValue': (val: number | [number, number] | undefined) => { wrapper.setProps({ modelValue: val }) }
      }
    })
    await wrapper.find('.nyx-slider__thumb').trigger('keydown', { key: 'Home' })
    expect(wrapper.props('modelValue')).toBe(10)
  })

  it('jumps to max on End key', async () => {
    const wrapper = mount(NyxSlider, {
      props: {
        modelValue: 50,
        min: 0,
        max: 100,
        'onUpdate:modelValue': (val: number | [number, number] | undefined) => { wrapper.setProps({ modelValue: val }) }
      }
    })
    await wrapper.find('.nyx-slider__thumb').trigger('keydown', { key: 'End' })
    expect(wrapper.props('modelValue')).toBe(100)
  })

  it('updates value on track pointerdown', async () => {
    const wrapper = mount(NyxSlider, {
      props: {
        modelValue: 0,
        min: 0,
        max: 100,
        'onUpdate:modelValue': (val: number | [number, number] | undefined) => { wrapper.setProps({ modelValue: val }) }
      }
    })
    const track = wrapper.find('.nyx-slider')
    vi.spyOn(track.element, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, right: 200, bottom: 20,
      width: 200, height: 20, x: 0, y: 0,
      toJSON: () => ({})
    } as DOMRect)

    await track.trigger('pointerdown', { clientX: 100, clientY: 10 })
    await nextTick()
    // 100/200 * 100 = 50
    expect(wrapper.props('modelValue')).toBe(50)
  })

  it('uses clientY for vertical direction', async () => {
    const wrapper = mount(NyxSlider, {
      props: {
        modelValue: 0,
        min: 0,
        max: 100,
        direction: 'column',
        'onUpdate:modelValue': (val: number | [number, number] | undefined) => { wrapper.setProps({ modelValue: val }) }
      }
    })
    const track = wrapper.find('.nyx-slider')
    vi.spyOn(track.element, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, right: 20, bottom: 200,
      width: 20, height: 200, x: 0, y: 0,
      toJSON: () => ({})
    } as DOMRect)

    await track.trigger('pointerdown', { clientX: 10, clientY: 50 })
    await nextTick()
    // 50/200 * 100 = 25
    expect(wrapper.props('modelValue')).toBe(25)
  })
})
