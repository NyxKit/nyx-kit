// Surface motion reads the current frame before canceling, preserving rapid reversals.
export function createPaletteMotion() {
  let animation: Animation | undefined
  const cancel = () => { animation?.cancel(); animation = undefined }
  const finish = () => animation?.finish()
  const play = (element: HTMLElement, entering: boolean, fresh = false) => {
    const window = element.ownerDocument.defaultView
    if (!window || !element.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cancel(); return Promise.resolve()
    }
    const style = window.getComputedStyle(element)
    const opacity = fresh ? '0' : style.opacity
    const transform = fresh ? `translateY(${style.getPropertyValue('--nyx-gap-lg').trim() || '0px'}) scale(0.97)` : style.transform
    const duration = style.getPropertyValue(entering ? '--nyx-command-palette-enter-duration' : '--nyx-command-palette-exit-duration').trim()
    const ms = Number.parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000)
    cancel()
    animation = element.animate([
      { opacity, transform },
      { opacity: entering ? 1 : 0, transform: entering ? 'translateY(0) scale(1)' : 'translateY(0) scale(0.98)' },
    ], { duration: Number.isFinite(ms) ? ms : 0, easing: entering ? 'cubic-bezier(0.22, 1, 0.36, 1)' : 'cubic-bezier(0.4, 0, 1, 1)', fill: 'both' })
    return animation.finished.catch(() => {})
  }
  return { play, cancel, finish }
}
