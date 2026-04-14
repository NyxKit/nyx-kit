import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { NyxInputNumberControls, NyxInputType, NyxVariant } from '@/types'
import useNyxInputNumber from './useNyxInputNumber'

function useSetup<T>(fn: () => T): T {
  let result!: T
  mount(defineComponent({
    setup () {
      result = fn()
      return {}
    },
    render: () => h('div'),
  }))
  return result
}

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useNyxInputNumber', () => {
  it('disables number controls for non-number inputs', () => {
    const model = ref<string | undefined>('1')
    const { normalizedNumberControls } = useSetup(() =>
      useNyxInputNumber({ type: NyxInputType.Text }, model, ref(NyxVariant.Ghost))
    )

    expect(normalizedNumberControls.value).toBe(NyxInputNumberControls.None)
  })

  it('defaults number controls to stacked for number inputs', () => {
    const model = ref<string | undefined>('1')
    const { normalizedNumberControls } = useSetup(() =>
      useNyxInputNumber({ type: NyxInputType.Number }, model, ref(NyxVariant.Ghost))
    )

    expect(normalizedNumberControls.value).toBe(NyxInputNumberControls.Stacked)
  })

  it('maps filled variants to soft number buttons', () => {
    const model = ref<string | undefined>('1')
    const { numberButtonVariant } = useSetup(() =>
      useNyxInputNumber({ type: NyxInputType.Number }, model, ref(NyxVariant.Filled))
    )

    expect(numberButtonVariant.value).toBe(NyxVariant.Soft)
  })

  it('repeats the same step while the button is held down', async () => {
    vi.useFakeTimers()

    const model = ref<string | undefined>('0')
    const { onNumberButtonPointerDown, onNumberButtonPointerUp } = useSetup(() =>
      useNyxInputNumber({ type: NyxInputType.Number, step: 1 }, model, ref(NyxVariant.Ghost))
    )

    onNumberButtonPointerDown(1, {
      button: 0,
      pointerId: 1,
      currentTarget: { setPointerCapture: vi.fn() },
    } as unknown as PointerEvent)

    expect(model.value).toBe('1')

    await vi.advanceTimersByTimeAsync(400)
    expect(model.value).toBe('1')

    await vi.advanceTimersByTimeAsync(120)
    expect(model.value).toBe('2')

    await vi.advanceTimersByTimeAsync(120)
    expect(model.value).toBe('3')

    await vi.advanceTimersByTimeAsync(240)
    expect(model.value).toBe('5')

    onNumberButtonPointerUp()
    await vi.advanceTimersByTimeAsync(480)
    expect(model.value).toBe('5')
  })

  it('skips mouse click repeat events after pointer activation', () => {
    const model = ref<string | undefined>('0')
    const { onNumberButtonClick } = useSetup(() =>
      useNyxInputNumber({ type: NyxInputType.Number, step: 1 }, model, ref(NyxVariant.Ghost))
    )

    onNumberButtonClick(1, { detail: 1 } as MouseEvent)
    expect(model.value).toBe('0')
  })

  it('does not double-step on a normal pointer click', () => {
    vi.useFakeTimers()

    const model = ref<string | undefined>('0')
    const { onNumberButtonPointerDown, onNumberButtonPointerUp, onNumberButtonClick } = useSetup(() =>
      useNyxInputNumber({ type: NyxInputType.Number, step: 1 }, model, ref(NyxVariant.Ghost))
    )

    onNumberButtonPointerDown(1, {
      button: 0,
      pointerId: 1,
      currentTarget: { setPointerCapture: vi.fn() },
    } as unknown as PointerEvent)

    onNumberButtonPointerUp()
    onNumberButtonClick(1)

    expect(model.value).toBe('1')
  })

  it('steps from an empty value after the input is cleared', () => {
    const model = ref<string | undefined>('')
    const { onNumberButtonClick } = useSetup(() =>
      useNyxInputNumber({ type: NyxInputType.Number, step: 1 }, model, ref(NyxVariant.Ghost))
    )

    onNumberButtonClick(1)
    expect(model.value).toBe('1')

    model.value = ''
    onNumberButtonClick(-1)
    expect(model.value).toBe('-1')
  })
})
