import { NyxLoader, NyxLog } from '@/classes'
import type { NyxKitDefaults, NyxKitOptions, NyxKitPrimitive } from '@/main'
import { NyxVariant, NyxSize, NyxTheme, type KeyDict } from '@/types'
import { computed, inject } from 'vue'

const propKeys = ['theme', 'size', 'shape', 'variant', 'gradient', 'backlight', 'position']

const useNyxProps = (props: KeyDict<unknown>, args?: { origin?: string, primitive?: NyxKitPrimitive }) => {
  const libEnv = inject<NyxKitOptions>('libEnv') ?? {}

  const getFallback = <T>(key: keyof NyxKitDefaults, absoluteFallback: T): T => {
    const primitive = args?.primitive
    const libPrimitiveFallback = primitive ? libEnv.defaults?.[primitive]?.[key] as T : undefined
    if (libPrimitiveFallback !== undefined) return libPrimitiveFallback
    return libEnv.defaults?.all?.[key] as T ?? absoluteFallback
  }

  const nyxTheme = computed<NyxTheme>(() => {
    const fallback = getFallback('theme', NyxTheme.Primary)
    return NyxLoader.loadEnum(props, 'theme', fallback, Object.values(NyxTheme))
  })

  const nyxSize = computed<NyxSize>(() => {
    const fallback = getFallback('size', NyxSize.Medium)
    return NyxLoader.loadEnum(props, 'size', fallback, Object.values(NyxSize))
  })

  const nyxVariant = computed<NyxVariant>(() => {
    const fallback = getFallback('variant', NyxVariant.Soft)
    return NyxLoader.loadEnum(props, 'variant', fallback, Object.values(NyxVariant))
  })

  const gradient = computed(() => {
    if (props.gradient !== false && nyxVariant.value !== NyxVariant.Filled) {
      NyxLog.error(args?.origin ?? 'Nyx', 'Gradients are only supported by NyxVariant.Filled')
      return nyxTheme.value
    }
    return props.gradient === true ? nyxTheme.value : props.gradient
  })

  const backlight = computed(() => props.backlight === true ? nyxTheme.value : props.backlight)

  const classList = computed(() => {
    const list = []
    const resolved: KeyDict<unknown> = {
      ...props,
      theme: nyxTheme.value,
      size: nyxSize.value,
      variant: nyxVariant.value,
    }
    for (const key of propKeys) {
      if (resolved[key] === undefined || resolved[key] === false) continue
      if (resolved[key] === true && resolved.theme !== undefined) {
        list.push(`${key}-${resolved.theme}`)
      } else {
        list.push(`${key}-${resolved[key]}`)
      }
    }
    const isPixel = !!props.pixel || !!libEnv.pixel
    if (isPixel) list.push('pixel')
    return list
  })

  return {
    classList,
    gradient,
    backlight,
    nyxTheme,
    nyxSize,
    nyxVariant,
  }
}

export default useNyxProps
