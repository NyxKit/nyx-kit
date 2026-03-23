import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import useTeleportPositionBase from './useTeleportPositionBase'
import { NyxPosition } from '@/types'

type CssVarMap = Record<string, string | number>

function useSetup<T>(fn: () => T): { result: T; wrapper: ReturnType<typeof mount> } {
  let result!: T
  const wrapper = mount(defineComponent({
    setup() {
      result = fn()
      return {}
    },
    render: () => h('div')
  }))
  return { result, wrapper }
}

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.stubGlobal('innerWidth', 1200)
  vi.stubGlobal('innerHeight', 800)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useTeleportPositionBase', () => {
  it('initialises with default CSS variables', () => {
    const elAbsolute = ref<HTMLElement | null>(null)
    const { result } = useSetup(() => useTeleportPositionBase(() => null, elAbsolute))
    expect(result.cssVariables.value).toHaveProperty('--top')
    expect(result.cssVariables.value).toHaveProperty('--left')
  })

  it('does not throw when getAnchorRect returns null', () => {
    const elAbsolute = ref<HTMLElement | null>(null)
    expect(() => {
      useSetup(() => useTeleportPositionBase(() => null, elAbsolute))
    }).not.toThrow()
  })

  it('does not throw when elAbsolute is null', () => {
    const elAbsolute = ref<HTMLElement | null>(null)
    expect(() => {
      useSetup(() => useTeleportPositionBase(
        () => ({ left: 0, top: 50, right: 100, bottom: 70, width: 100, height: 20, x: 0, y: 50, toJSON: () => ({}) } as DOMRect),
        elAbsolute
      ))
    }).not.toThrow()
  })

  it('calculates bottom-left position when anchor and absolute element are provided', async () => {
    const el = document.createElement('div')
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, right: 100, bottom: 0,
      width: 100, height: 50, x: 0, y: 0,
      toJSON: () => ({})
    } as DOMRect)
    const elAbsolute = ref<HTMLElement | null>(el)

    const anchorRect: DOMRect = {
      left: 10, top: 50, right: 110, bottom: 70,
      width: 100, height: 20, x: 10, y: 50,
      toJSON: () => ({})
    }

    const { result } = useSetup(() =>
      useTeleportPositionBase(() => anchorRect, elAbsolute, {
        position: ref(NyxPosition.BottomLeft)
      })
    )
    await nextTick()

    // BottomLeft: computedTop = bottom = 70, computedLeft = left = 10
    expect((result.cssVariables.value as CssVarMap)['--top']).toBe('70px')
    expect((result.cssVariables.value as CssVarMap)['--left']).toBe('10px')
  })

  it('mirrors to top when there is no space below', async () => {
    const el = document.createElement('div')
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      left: 10, top: 0, right: 110, bottom: 200,
      width: 100, height: 200, x: 10, y: 0,
      toJSON: () => ({})
    } as DOMRect)
    const elAbsolute = ref<HTMLElement | null>(el)

    // Anchor near bottom, viewport height=800, absHeight=200, bottom=700 → no space below (700+200=900>800)
    const anchorRect: DOMRect = {
      left: 10, top: 680, right: 110, bottom: 700,
      width: 100, height: 20, x: 10, y: 680,
      toJSON: () => ({})
    }

    const { result } = useSetup(() =>
      useTeleportPositionBase(() => anchorRect, elAbsolute, {
        position: ref(NyxPosition.Bottom)
      })
    )
    await nextTick()

    // Mirrored to Top: computedTop = top - absHeight = 680 - 200 = 480
    // (gap=0 since no CSS vars in jsdom)
    expect((result.cssVariables.value as CssVarMap)['--top']).toBe('480px')
  })

  it('does not update CSS variables when isUpdateAllowed is false', async () => {
    const el = document.createElement('div')
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, right: 100, bottom: 100,
      width: 100, height: 100, x: 0, y: 0,
      toJSON: () => ({})
    } as DOMRect)
    const elAbsolute = ref<HTMLElement | null>(el)
    const isUpdateAllowed = ref(false)

    const anchorRect: DOMRect = {
      left: 10, top: 50, right: 110, bottom: 70,
      width: 100, height: 20, x: 10, y: 50,
      toJSON: () => ({})
    }

    const { result } = useSetup(() =>
      useTeleportPositionBase(() => anchorRect, elAbsolute, { isUpdateAllowed })
    )
    await nextTick()

    // Should remain at default 0px since updates are blocked
    expect((result.cssVariables.value as CssVarMap)['--top']).toBe('0px')
    expect((result.cssVariables.value as CssVarMap)['--left']).toBe('0px')
  })

  it('exposes updateCssVariables function', () => {
    const elAbsolute = ref<HTMLElement | null>(null)
    const { result } = useSetup(() => useTeleportPositionBase(() => null, elAbsolute))
    expect(typeof result.updateCssVariables).toBe('function')
  })

  it('exposes computedPosition ref', () => {
    const elAbsolute = ref<HTMLElement | null>(null)
    const { result } = useSetup(() =>
      useTeleportPositionBase(() => null, elAbsolute, {
        position: ref(NyxPosition.Top)
      })
    )
    expect(result.computedPosition).toBeDefined()
  })
})
