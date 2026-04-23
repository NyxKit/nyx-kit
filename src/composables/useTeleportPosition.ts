import { computed, type DefineComponent, type Ref, watch } from 'vue'
import useTeleportPositionBase, { type TeleportPositionOptions } from './useTeleportPositionBase'
import { resolveToHtmlElement } from '@/utils'

const useTeleportPosition = (
  elRelative: Ref<HTMLElement | DefineComponent | null>,
  elAbsolute: Ref<HTMLElement | DefineComponent | null>,
  options?: TeleportPositionOptions
) => {
  const getAnchorRect = (): DOMRect | null => {
    const relativeElement = resolveToHtmlElement(elRelative.value)
    return relativeElement?.getBoundingClientRect() ?? null
  }

  const result = useTeleportPositionBase(getAnchorRect, elAbsolute, options)
  const teleportTarget = computed(() => resolveToHtmlElement(elRelative.value)?.closest('dialog') ?? 'body')

  // Re-position when the anchor element itself changes
  watch(elRelative, result.updateCssVariables)

  return { ...result, teleportTarget }
}

export default useTeleportPosition
