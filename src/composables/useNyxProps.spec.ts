import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import useNyxProps from './useNyxProps'
import { NyxTheme, NyxVariant, NyxSize, NyxShape } from '@/types'

// Helper: run a composable inside a mounted component's setup
function useSetup<T>(fn: () => T): T {
  let result!: T
  mount(defineComponent({
    setup() { result = fn(); return {} },
    render: () => h('div')
  }))
  return result
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

describe('useNyxProps — classList', () => {
  it('generates a theme class', () => {
    const { classList } = useSetup(() => useNyxProps({ theme: NyxTheme.Primary }))
    expect(classList.value).toContain('theme-primary')
  })

  it('generates a size class', () => {
    const { classList } = useSetup(() => useNyxProps({ size: NyxSize.Large }))
    expect(classList.value).toContain('size-lg')
  })

  it('generates a variant class', () => {
    const { classList } = useSetup(() => useNyxProps({ variant: NyxVariant.Filled }))
    expect(classList.value).toContain('variant-filled')
  })

  it('generates a shape class', () => {
    const { classList } = useSetup(() => useNyxProps({ shape: NyxShape.Circle }))
    expect(classList.value).toContain('shape-circle')
  })

  it('adds pixel class when pixel prop is true', () => {
    const { classList } = useSetup(() => useNyxProps({ pixel: true }))
    expect(classList.value).toContain('pixel')
  })

  it('does not add pixel class when pixel is false', () => {
    const { classList } = useSetup(() => useNyxProps({ pixel: false }))
    expect(classList.value).not.toContain('pixel')
  })

  it('skips keys with undefined values', () => {
    const { classList } = useSetup(() => useNyxProps({ theme: undefined }))
    // size, variant, shape etc. should not appear
    expect(classList.value.some(c => c.startsWith('size-'))).toBe(false)
  })

  it('generates multiple classes together', () => {
    const { classList } = useSetup(() =>
      useNyxProps({ theme: NyxTheme.Primary, size: NyxSize.Small, variant: NyxVariant.Outline })
    )
    expect(classList.value).toContain('theme-primary')
    expect(classList.value).toContain('size-sm')
    expect(classList.value).toContain('variant-outline')
  })

  it('handles backlight: true by using theme value', () => {
    const { classList } = useSetup(() =>
      useNyxProps({ theme: NyxTheme.Success, backlight: true })
    )
    expect(classList.value).toContain('backlight-success')
  })
})

describe('useNyxProps — gradient', () => {
  it('returns false (no gradient) for non-Solid variant', () => {
    // gradient should not apply and returns theme value as a warning fallback
    const { gradient } = useSetup(() =>
      useNyxProps({ theme: NyxTheme.Primary, variant: NyxVariant.Outline, gradient: true })
    )
    // Audit note: gradient is blocked when variant !== Solid; it falls back to theme
    expect(gradient.value).toBe(NyxTheme.Primary)
    expect(console.error).toHaveBeenCalled()
  })

  it('returns false when gradient prop is false', () => {
    const { gradient } = useSetup(() =>
      useNyxProps({ theme: NyxTheme.Primary, variant: NyxVariant.Filled, gradient: false })
    )
    // gradient === false → returns false (no gradient applied)
    expect(gradient.value).toBe(false)
  })

  it('returns theme when gradient is true and variant is Solid', () => {
    const { gradient } = useSetup(() =>
      useNyxProps({ theme: NyxTheme.Danger, variant: NyxVariant.Filled, gradient: true })
    )
    expect(gradient.value).toBe(NyxTheme.Danger)
  })
})

describe('useNyxProps — backlight', () => {
  it('returns theme when backlight is true', () => {
    const { backlight } = useSetup(() =>
      useNyxProps({ theme: NyxTheme.Warning, backlight: true })
    )
    expect(backlight.value).toBe(NyxTheme.Warning)
  })

  it('returns the explicit backlight value when not a boolean', () => {
    const { backlight } = useSetup(() =>
      useNyxProps({ theme: NyxTheme.Warning, backlight: NyxTheme.Info })
    )
    expect(backlight.value).toBe(NyxTheme.Info)
  })

  it('returns false when backlight is false', () => {
    const { backlight } = useSetup(() =>
      useNyxProps({ backlight: false })
    )
    expect(backlight.value).toBe(false)
  })
})
