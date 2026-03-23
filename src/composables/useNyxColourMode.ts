import { computed, inject, onUnmounted, readonly, ref } from 'vue'
import NyxLog from '@/classes/NyxLog'
import { NyxColourMode } from '@/types'
import type { NyxKitOptions } from '@/types'

// ── Module-level singleton ────────────────────────────────────────────────────
// All useNyxColourMode() calls share the same reactive state.

const _setting = ref<NyxColourMode>(NyxColourMode.Dark)
let _dayStart = 6
let _dayEnd = 20
let _intervalId: ReturnType<typeof setInterval> | null = null
let _initialised = false

// ── Pure helpers ──────────────────────────────────────────────────────────────

/** Resolve the current setting to Dark or Light — never Adaptive. */
function resolveMode (): NyxColourMode.Dark | NyxColourMode.Light {
  if (_setting.value !== NyxColourMode.Adaptive) {
    return _setting.value as NyxColourMode.Dark | NyxColourMode.Light
  }
  const hour = new Date().getHours()
  return hour >= _dayStart && hour < _dayEnd
    ? NyxColourMode.Light
    : NyxColourMode.Dark
}

/** Apply the resolved mode to the DOM (SSR-safe). */
function applyToDOM (resolvedMode: NyxColourMode.Dark | NyxColourMode.Light): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-nyx-mode', resolvedMode)
  }
}

/** Start the adaptive minute-boundary watcher. */
function startAdaptiveWatcher (): void {
  applyToDOM(resolveMode())
  const now = new Date()
  const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()
  setTimeout(() => {
    applyToDOM(resolveMode())
    _intervalId = setInterval(() => applyToDOM(resolveMode()), 60_000)
  }, msToNextMinute)
}

/** Stop the adaptive watcher. */
function stopAdaptiveWatcher (): void {
  if (_intervalId !== null) {
    clearInterval(_intervalId)
    _intervalId = null
  }
}

// ── Plugin initialisation hook (called from main.ts install) ──────────────────

/**
 * Called by the plugin's install() to seed the singleton from plugin options.
 * Client-side only — caller must guard with `typeof document !== 'undefined'`.
 */
export function initColourMode (options: NyxKitOptions): void {
  const cm = options.colourMode ?? {}
  const dayStart = cm.adaptiveDayStart ?? 6
  const dayEnd   = cm.adaptiveDayEnd   ?? 20
  if (dayStart >= dayEnd) {
    NyxLog.warn('NyxColourMode', `adaptiveDayStart (${dayStart}) must be less than adaptiveDayEnd (${dayEnd}). Falling back to defaults (6, 20).`)
    _dayStart = 6
    _dayEnd   = 20
  } else {
    _dayStart = dayStart
    _dayEnd   = dayEnd
  }
  setMode(cm.mode ?? NyxColourMode.Dark)
  _initialised = true
}

// ── setMode (exported so initColourMode can call it) ─────────────────────────

function setMode (m: NyxColourMode): void {
  stopAdaptiveWatcher()
  _setting.value = m

  // Persist to localStorage (SSR-safe)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('nyx-colour-mode', m)
  }

  if (m === NyxColourMode.Adaptive) {
    startAdaptiveWatcher()
  } else {
    applyToDOM(m as NyxColourMode.Dark | NyxColourMode.Light)
  }
}

// ── Composable ────────────────────────────────────────────────────────────────

export function useNyxColourMode () {
  // Initialise singleton once, reading from localStorage → libEnv → Dark fallback
  if (!_initialised) {
    const libEnv = inject<NyxKitOptions>('libEnv', {})
    const cm = libEnv.colourMode ?? {}

    // Validate adaptive window from libEnv
    const dayStart = cm.adaptiveDayStart ?? 6
    const dayEnd   = cm.adaptiveDayEnd   ?? 20
    if (dayStart >= dayEnd) {
      NyxLog.warn('NyxColourMode', `adaptiveDayStart (${dayStart}) must be less than adaptiveDayEnd (${dayEnd}). Falling back to defaults (6, 20).`)
      _dayStart = 6
      _dayEnd   = 20
    } else {
      _dayStart = dayStart
      _dayEnd   = dayEnd
    }

    // Resolution order: localStorage → libEnv → Dark
    let resolved: NyxColourMode | null = null

    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('nyx-colour-mode')
      if (stored && Object.values(NyxColourMode).includes(stored as NyxColourMode)) {
        resolved = stored as NyxColourMode
      }
    }

    if (resolved === null) {
      resolved = cm.mode ?? NyxColourMode.Dark
    }

    setMode(resolved)
    _initialised = true
  }

  const mode    = computed(resolveMode)
  const isDark  = computed(() => mode.value === NyxColourMode.Dark)
  const isLight = computed(() => mode.value === NyxColourMode.Light)

  onUnmounted(() => stopAdaptiveWatcher())

  return {
    setting: readonly(_setting),
    mode,
    isDark,
    isLight,
    setMode,
  }
}
