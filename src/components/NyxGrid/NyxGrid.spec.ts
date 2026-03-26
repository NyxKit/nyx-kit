import { beforeAll, afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { NyxSize } from '@/types'
import NyxCard from '../NyxCard/NyxCard.vue'
import NyxGrid from './NyxGrid.vue'
import { NyxGridMode } from './NyxGrid.types'

const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', MockResizeObserver)
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    callback(0)
    return 1
  })
  vi.stubGlobal('cancelAnimationFrame', vi.fn())

  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get() {
      return this.classList.contains('nyx-grid__content') ? 900 : 0
    },
  })

  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      const ownHeight = Number(this.getAttribute('data-height'))
      const firstChildHeight = Number(this.firstElementChild?.getAttribute('data-height'))
      return ownHeight || firstChildHeight || 120
    },
  })

  HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
    const left = Number.parseFloat(this.style.left || '0')
    const top = Number.parseFloat(this.style.top || '0')
    const width = Number.parseFloat(this.style.width || '0') || this.clientWidth
    const height = this.offsetHeight

    return {
      x: left,
      y: top,
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
      toJSON() {
        return this
      },
    } as DOMRect
  }
})

afterAll(() => {
  if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
  if (originalOffsetHeight) Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
  vi.unstubAllGlobals()
})

beforeEach(() => {
  vi.restoreAllMocks()
})

async function flushLayout() {
  await nextTick()
  await nextTick()
}

describe('NyxGrid', () => {
  it('renders as a section with title, content items, and footer', async () => {
    const wrapper = mount(NyxGrid, {
      props: {
        title: 'Overview',
      },
      slots: {
        default: '<div data-height="120">Alpha</div><div data-height="140">Beta</div>',
        footer: '<small class="grid-footer">2 items</small>',
      },
    })

    await flushLayout()

    expect(wrapper.find('section.nyx-grid').exists()).toBe(true)
    expect(wrapper.find('.nyx-grid__title').text()).toBe('Overview')
    expect(wrapper.find('.grid-footer').exists()).toBe(true)
    expect(wrapper.findAll('.nyx-grid__content > *')).toHaveLength(2)
  })

  it('omits header and footer wrappers when no related content is provided', async () => {
    const wrapper = mount(NyxGrid, {
      slots: {
        default: '<div data-height="120">Only content</div>',
      },
    })

    await flushLayout()

    expect(wrapper.find('.nyx-grid__header').exists()).toBe(false)
    expect(wrapper.find('.nyx-grid__footer').exists()).toBe(false)
  })

  it('prioritizes the header slot over the title prop', async () => {
    const wrapper = mount(NyxGrid, {
      props: {
        title: 'Fallback title',
      },
      slots: {
        header: '<div class="custom-header">Custom header</div>',
        default: '<div data-height="100">Body</div>',
      },
    })

    await flushLayout()

    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.nyx-grid__title').exists()).toBe(false)
  })

  it('sanitizes invalid columns and invalid gap values to documented defaults', async () => {
    const wrapper = mount(NyxGrid, {
      props: {
        columns: 0,
        gap: 'invalid' as NyxSize,
      },
      slots: {
        default: '<div data-height="120">One</div><div data-height="120">Two</div><div data-height="120">Three</div>',
      },
    })

    await flushLayout()

    expect(wrapper.attributes('style')).toContain('calc(var(--nyx-gap-md) * 1.5)')
    expect(wrapper.attributes('style')).toContain('--nyx-grid-columns: 3')
  })

  it('accepts numeric gap values as rem units, including zero', async () => {
    const wrapper = mount(NyxGrid, {
      props: {
        gap: 0,
      },
      slots: {
        default: '<div data-height="120">One</div><div data-height="120">Two</div>',
      },
    })

    await flushLayout()

    expect(wrapper.attributes('style')).toContain('--nyx-grid-gap: 0rem')
  })

  it('falls back to grid mode for invalid mode values', async () => {
    const wrapper = mount(NyxGrid, {
      props: {
        mode: 'tiles' as never,
      },
      slots: {
        default: '<div data-height="100">One</div>',
      },
    })

    await flushLayout()

    expect(wrapper.classes()).toContain('nyx-grid--grid')
    expect(wrapper.classes()).not.toContain('nyx-grid--masonry')
  })

  it('uses columns in masonry mode and recalculates positions when columns change', async () => {
    const wrapper = mount(NyxGrid, {
      props: {
        mode: NyxGridMode.Masonry,
        columns: 3,
      },
      slots: {
        default: [
          '<div data-height="100">One</div>',
          '<div data-height="180">Two</div>',
          '<div data-height="120">Three</div>',
          '<div data-height="140">Four</div>',
        ],
      },
    })

    await flushLayout()

    await wrapper.setProps({ columns: 2 })
    await flushLayout()

    const items = wrapper.findAll('.nyx-grid__content > *').map(node => node.element as HTMLElement)

    expect(wrapper.classes()).toContain('nyx-grid--masonry')
    expect(wrapper.attributes('style')).toContain('--nyx-grid-columns: 2')
    expect(items[0].style.getPropertyValue('--nyx-grid-item-left')).toBe('0px')
    expect(items[1].style.getPropertyValue('--nyx-grid-item-left')).not.toBe(items[0].style.getPropertyValue('--nyx-grid-item-left'))
  })

  it('lays out masonry items left to right before stacking downward', async () => {
    const wrapper = mount(NyxGrid, {
      props: {
        mode: NyxGridMode.Masonry,
        columns: 3,
      },
      slots: {
        default: [
          '<div data-height="100">One</div>',
          '<div data-height="140">Two</div>',
          '<div data-height="80">Three</div>',
          '<div data-height="120">Four</div>',
        ],
      },
    })

    await flushLayout()

    const items = wrapper.findAll('.nyx-grid__content > *').map(node => node.element as HTMLElement)

    expect(items[0].style.getPropertyValue('--nyx-grid-item-top')).toBe('0px')
    expect(items[1].style.getPropertyValue('--nyx-grid-item-top')).toBe('0px')
    expect(items[2].style.getPropertyValue('--nyx-grid-item-top')).toBe('0px')
    expect(Number.parseFloat(items[1].style.getPropertyValue('--nyx-grid-item-left'))).toBeGreaterThan(Number.parseFloat(items[0].style.getPropertyValue('--nyx-grid-item-left')))
    expect(Number.parseFloat(items[2].style.getPropertyValue('--nyx-grid-item-left'))).toBeGreaterThan(Number.parseFloat(items[1].style.getPropertyValue('--nyx-grid-item-left')))
    expect(Number.parseFloat(items[3].style.getPropertyValue('--nyx-grid-item-top'))).toBeGreaterThan(0)
    expect(items[3].style.getPropertyValue('--nyx-grid-item-left')).toBe(items[0].style.getPropertyValue('--nyx-grid-item-left'))
  })

  it('reflows keyed items when their order changes', async () => {
    const Demo = defineComponent({
      components: { NyxGrid },
      setup() {
        const items = ref([
          { id: 'a', label: 'Alpha', height: 120 },
          { id: 'b', label: 'Beta', height: 180 },
          { id: 'c', label: 'Gamma', height: 140 },
        ])

        return {
          items,
          NyxGridMode,
          reverse() {
            items.value = [...items.value].reverse()
          },
        }
      },
      template: `
        <NyxGrid :mode="NyxGridMode.Masonry" :columns="2">
          <div v-for="item in items" :key="item.id" :data-height="item.height">{{ item.label }}</div>
        </NyxGrid>
      `,
    })

    const wrapper = mount(Demo)

    await flushLayout()

    wrapper.vm.reverse()
    await flushLayout()

    const afterFirst = wrapper.findAll('.nyx-grid__content > *')[0].element as HTMLElement

    expect(afterFirst.textContent).toContain('Gamma')
    expect(wrapper.findAll('.nyx-grid__content > *')).toHaveLength(3)
  })

  it('renders component children such as NyxCard inside the grid', async () => {
    const Demo = defineComponent({
      components: { NyxGrid, NyxCard },
      data() {
        return {
          cards: [
            { id: 'a', title: 'Alpha' },
            { id: 'b', title: 'Beta' },
          ],
        }
      },
      template: `
        <NyxGrid title="Cards" :columns="2">
          <NyxCard v-for="card in cards" :key="card.id" :title="card.title">
            <p>{{ card.title }}</p>
          </NyxCard>
        </NyxGrid>
      `,
    })

    const wrapper = mount(Demo)

    await flushLayout()

    expect(wrapper.findAll('.nyx-card')).toHaveLength(2)
    expect(wrapper.text()).toContain('Alpha')
    expect(wrapper.text()).toContain('Beta')
  })
})
