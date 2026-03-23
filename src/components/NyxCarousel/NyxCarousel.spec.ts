import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NyxCarousel from './NyxCarousel.vue'

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

const slides = ['Slide 1', 'Slide 2', 'Slide 3']

describe('NyxCarousel', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false } })
    expect(wrapper.find('.nyx-carousel').exists()).toBe(true)
  })

  it('renders duplicate slides for infinite loop (n+2 total)', () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false } })
    expect(wrapper.findAll('.nyx-carousel__slide').length).toBe(slides.length + 2)
  })

  it('renders prev and next control buttons by default', () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false } })
    expect(wrapper.find('.nyx-carousel__button.prev').exists()).toBe(true)
    expect(wrapper.find('.nyx-carousel__button.next').exists()).toBe(true)
  })

  it('hides controls when controls=false', () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false, controls: false } })
    expect(wrapper.find('.nyx-carousel__button').exists()).toBe(false)
  })

  it('renders dot navigation when dots=true', () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false, dots: true } })
    expect(wrapper.findAll('.nyx-carousel__dots span').length).toBe(slides.length)
  })

  it('does not render dots by default', () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false } })
    expect(wrapper.find('.nyx-carousel__dots').exists()).toBe(false)
  })

  it('first and last (cloned) slides have aria-hidden', () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false } })
    const slideEls = wrapper.findAll('.nyx-carousel__slide')
    expect(slideEls[0].attributes('aria-hidden')).toBe('true')
    expect(slideEls[slideEls.length - 1].attributes('aria-hidden')).toBe('true')
  })

  it('first and last (cloned) slides have tabindex=-1', () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false } })
    const slideEls = wrapper.findAll('.nyx-carousel__slide')
    expect(slideEls[0].attributes('tabindex')).toBe('-1')
    expect(slideEls[slideEls.length - 1].attributes('tabindex')).toBe('-1')
  })

  it('advances slide index on next button click', async () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false } })
    const initialIndex = wrapper.find('.nyx-carousel__container').attributes('style')
    await wrapper.find('.nyx-carousel__button.next').trigger('click')
    const newIndex = wrapper.find('.nyx-carousel__container').attributes('style')
    expect(newIndex).not.toBe(initialIndex)
  })

  it('decrements slide index on prev button click', async () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: false } })
    await wrapper.find('.nyx-carousel__button.next').trigger('click')
    const afterNext = wrapper.find('.nyx-carousel__container').attributes('style')
    await wrapper.find('.nyx-carousel__button.prev').trigger('click')
    const afterPrev = wrapper.find('.nyx-carousel__container').attributes('style')
    expect(afterPrev).not.toBe(afterNext)
  })

  it('autoplays on interval when autoplay=true', async () => {
    const wrapper = mount(NyxCarousel, { props: { slides, autoplay: true, interval: 1000 } })
    const before = wrapper.find('.nyx-carousel__container').attributes('style')
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    const after = wrapper.find('.nyx-carousel__container').attributes('style')
    expect(after).not.toBe(before)
    wrapper.unmount()
  })
})
