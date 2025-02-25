import { NyxLog } from '@/classes'
import type { NyxKitOptions } from '@/main'
import { NyxVariant, type KeyDict } from '@/types'
import { computed, inject } from 'vue'

const libOptions = inject<NyxKitOptions>('nyxkit') ?? {}

const propKeys = ['theme', 'size', 'shape', 'variant', 'gradient', 'backlight', 'position']

const useNyxProps = (props: KeyDict<unknown>, origin: string = 'Nyx') => {
  const gradient = computed(() => {
    if (props.gradient !== false && props.variant !== NyxVariant.Solid) {
      NyxLog.error(origin, 'Gradients are only supported by NyxVariant.Solid')
      return props.theme
    }
    return props.gradient === true ? props.theme : props.gradient
  })

  const backlight = computed(() => props.backlight === true ? props.theme : props.backlight)

  const classList = computed(() => {
    const list = []
    for (const key of propKeys) {
      if (props[key] === undefined || props[key] === false) continue
      if (props[key] === true && props.theme !== undefined) {
        list.push(`${key}-${props.theme}`)
      } else {
        list.push(`${key}-${props[key]}`)
      }
    }
    const isPixel = !!props.pixel || !!libOptions.pixel
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
