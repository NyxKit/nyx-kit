import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { NyxColourMode } from '@/types'

// Each test gets a fresh module so the singleton is reset
async function freshComposable () {
  vi.resetModules()
  const mod = await import('./useNyxColourMode')
  return mod
}

function mountWith (setupFn: () => void) {
  return mount(defineComponent({
    setup () { setupFn(); return {} },
    render: () => h('div'),
  }))
}

describe('useNyxColourMode', () => {
  let setAttributeSpy: ReturnType<typeof vi.spyOn>
  let storageMock: Record<string, string>

  beforeEach(() => {
    // jsdom 26 does not support localStorage on opaque origins — stub it
    storageMock = {}
    vi.stubGlobal('localStorage', {
      getItem:    (k: string) => storageMock[k] ?? null,
      setItem:    (k: string, v: string) => { storageMock[k] = v },
      removeItem: (k: string) => { delete storageMock[k] },
      clear:      () => { storageMock = {} },
    })
    setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    setAttributeSpy?.mockRestore()
  })

  it('defaults to Dark when no localStorage and no libEnv', async () => {
    const { useNyxColourMode } = await freshComposable()
    let isDark = false
    const wrapper = mountWith(() => {
      const cm = useNyxColourMode()
      isDark = cm.isDark.value
    })
    expect(isDark).toBe(true)
    expect(setAttributeSpy).toHaveBeenCalledWith('data-nyx-mode', NyxColourMode.Dark)
    wrapper.unmount()
  })

  it('setMode(Light) applies data-nyx-mode="light" and writes localStorage', async () => {
    const { useNyxColourMode } = await freshComposable()
    let setMode!: (m: NyxColourMode) => void
    const wrapper = mountWith(() => {
      const cm = useNyxColourMode()
      setMode = cm.setMode
    })
    setMode(NyxColourMode.Light)
    expect(setAttributeSpy).toHaveBeenCalledWith('data-nyx-mode', NyxColourMode.Light)
    expect(localStorage.getItem('nyx-colour-mode')).toBe(NyxColourMode.Light)
    wrapper.unmount()
  })

  it('Adaptive resolves to Light when current hour is inside the day window', async () => {
    // Mock time to 12:00 (inside default 06:00–20:00 window)
    vi.setSystemTime(new Date('2026-03-23T12:00:00'))
    const { useNyxColourMode } = await freshComposable()
    let mode = ''
    const wrapper = mountWith(() => {
      const cm = useNyxColourMode()
      cm.setMode(NyxColourMode.Adaptive)
      mode = cm.mode.value
    })
    expect(mode).toBe(NyxColourMode.Light)
    expect(setAttributeSpy).toHaveBeenCalledWith('data-nyx-mode', NyxColourMode.Light)
    wrapper.unmount()
  })

  it('Adaptive resolves to Dark when current hour is outside the day window', async () => {
    // Mock time to 02:00 (outside default 06:00–20:00 window)
    vi.setSystemTime(new Date('2026-03-23T02:00:00'))
    const { useNyxColourMode } = await freshComposable()
    let mode = ''
    const wrapper = mountWith(() => {
      const cm = useNyxColourMode()
      cm.setMode(NyxColourMode.Adaptive)
      mode = cm.mode.value
    })
    expect(mode).toBe(NyxColourMode.Dark)
    expect(setAttributeSpy).toHaveBeenCalledWith('data-nyx-mode', NyxColourMode.Dark)
    wrapper.unmount()
  })

  it('setMode(Dark) stops the adaptive interval', async () => {
    vi.setSystemTime(new Date('2026-03-23T12:00:00'))
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { useNyxColourMode } = await freshComposable()
    let setMode!: (m: NyxColourMode) => void
    const wrapper = mountWith(() => {
      const cm = useNyxColourMode()
      setMode = cm.setMode
    })
    setMode(NyxColourMode.Adaptive)
    // Advance past the setTimeout boundary so setInterval is registered
    vi.advanceTimersByTime(61_000)
    setMode(NyxColourMode.Dark)
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
    wrapper.unmount()
  })

  it('onUnmounted clears the adaptive interval', async () => {
    vi.setSystemTime(new Date('2026-03-23T12:00:00'))
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { useNyxColourMode } = await freshComposable()
    let setMode!: (m: NyxColourMode) => void
    const wrapper = mountWith(() => {
      const cm = useNyxColourMode()
      setMode = cm.setMode
    })
    setMode(NyxColourMode.Adaptive)
    vi.advanceTimersByTime(61_000)
    wrapper.unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })

  it('invalid adaptiveDayStart >= adaptiveDayEnd emits NyxLog.warn and falls back to (6, 20)', async () => {
    const { initColourMode } = await freshComposable()
    const NyxLog = (await import('@/classes/NyxLog')).default
    const warnSpy = vi.spyOn(NyxLog, 'warn')
    initColourMode({ colourMode: { mode: NyxColourMode.Dark, adaptiveDayStart: 20, adaptiveDayEnd: 6 } })
    expect(warnSpy).toHaveBeenCalledWith(
      'NyxColourMode',
      expect.stringContaining('Falling back to defaults')
    )
    warnSpy.mockRestore()
  })
})
