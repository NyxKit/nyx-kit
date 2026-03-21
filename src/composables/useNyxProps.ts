import { NyxLoader, NyxLog } from '@/classes'
import type { NyxKitOptions } from '@/main'
import { NyxVariant, NyxSize, NyxTheme, type KeyDict } from '@/types'
import { computed, inject } from 'vue'

const propKeys = ['theme', 'size', 'shape', 'variant', 'gradient', 'backlight', 'position']

const useNyxProps = (props: KeyDict<unknown>, origin: string = 'Nyx') => {
  const libEnv = inject<NyxKitOptions>('libEnv') ?? {}

  const nyxTheme = computed<NyxTheme>(() => {
    return NyxLoader.loadEnum(props, 'theme', libEnv.defaults?.theme ?? NyxTheme.Primary, Object.values(NyxTheme))
  })

  const nyxSize = computed<NyxSize>(() => {
    return NyxLoader.loadEnum(props, 'size', libEnv.defaults?.size ?? NyxSize.Medium, Object.values(NyxSize))
  })

  const nyxVariant = computed<NyxVariant>(() => {
    return NyxLoader.loadEnum(props, 'variant', libEnv.defaults?.variant ?? NyxVariant.Soft, Object.values(NyxVariant))
  })

  const gradient = computed(() => {
    if (props.gradient !== false && nyxVariant.value !== NyxVariant.Filled) {
      NyxLog.error(origin, 'Gradients are only supported by NyxVariant.Filled')
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
    backlight
  }
}

export default useNyxProps
