/**
 * Public contract: NyxColourMode theming system
 *
 * This file documents the exact TypeScript surface that will be exported
 * from nyx-kit. It is the contract between the plan and the implementation.
 * Do not implement logic here — this is spec-only.
 */

// ── Enum ────────────────────────────────────────────────────────────────────

export enum NyxColourMode {
  Dark     = 'dark',
  Light    = 'light',
  /**
   * Adaptive: resolves to Dark or Light based on the local clock.
   * Day window: [adaptiveDayStart, adaptiveDayEnd) in local hours (0–23).
   * Defaults: 06:00 – 20:00.
   */
  Adaptive = 'adaptive',
}

// ── Plugin options extension ────────────────────────────────────────────────

/** Grouped colour-mode options. Nested under NyxKitOptions.colourMode. */
export interface NyxColourModeOptions {
  /**
   * Global colour mode. Default: NyxColourMode.Dark.
   * Applied to html[data-nyx-mode] on install.
   */
  mode?: NyxColourMode
  /**
   * Hour (0–23) at which Adaptive mode switches to Light. Default: 6.
   */
  adaptiveDayStart?: number
  /**
   * Hour (0–23) at which Adaptive mode switches back to Dark. Default: 20.
   */
  adaptiveDayEnd?: number
}

export interface NyxKitOptions {
  pixel?: boolean
  colourMode?: NyxColourModeOptions
  defaults?: Partial<Record<string, unknown>>
}

// ── Composable ──────────────────────────────────────────────────────────────

export interface UseNyxColourModeReturn {
  /** The configured setting — may be Adaptive. */
  setting: Readonly<Ref<NyxColourMode>>
  /** Resolved mode — always Dark or Light, never Adaptive. */
  mode: ComputedRef<NyxColourMode.Dark | NyxColourMode.Light>
  /** true when mode === Dark */
  isDark: ComputedRef<boolean>
  /** true when mode === Light */
  isLight: ComputedRef<boolean>
  /**
   * Override the current mode. Replaces the setting, updates data-nyx-mode,
   * starts or stops the adaptive clock watcher as appropriate.
   */
  setMode: (mode: NyxColourMode) => void
}

declare function useNyxColourMode(): UseNyxColourModeReturn

// ── CSS contract ────────────────────────────────────────────────────────────

/**
 * The library applies data-nyx-mode to document.documentElement.
 * Consumers may also set it directly for SSR or non-Vue contexts:
 *
 *   document.documentElement.setAttribute('data-nyx-mode', 'light')
 *
 * CSS override block (added to src/styles/variables.css):
 *
 *   html[data-nyx-mode="light"] {
 *     --nyx-c-bg:                  var(--nyx-c-white);
 *     --nyx-c-bg-soft:             var(--nyx-c-white-soft);
 *     --nyx-c-bg-mute:             var(--nyx-c-white-mute);
 *     --nyx-c-divider:             var(--nyx-c-divider-light-1);
 *     --nyx-c-divider-light:       var(--nyx-c-divider-light-2);
 *     --nyx-c-divider-inverse:     var(--nyx-c-divider-dark-1);
 *     --nyx-c-divider-inverse-light: var(--nyx-c-divider-dark-2);
 *     --nyx-c-text-1:              var(--nyx-c-text-light-1);
 *     --nyx-c-text-2:              var(--nyx-c-text-light-2);
 *     --nyx-c-text-3:              var(--nyx-c-text-light-3);
 *     --nyx-c-text-4:              var(--nyx-c-text-light-4);
 *     --nyx-c-text-inverse-1:      var(--nyx-c-text-dark-1);
 *     --nyx-c-text-inverse-2:      var(--nyx-c-text-dark-2);
 *     --nyx-c-text-inverse-3:      var(--nyx-c-text-dark-3);
 *     --nyx-c-text-inverse-4:      var(--nyx-c-text-dark-4);
 *   }
 *
 * No data-nyx-mode="dark" block is needed — `:root` is already dark.
 */
