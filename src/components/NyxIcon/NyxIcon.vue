<template>
  <component
    :is="resolvedIcon"
    class="nyx-icon"
    :class="themeClass"
    v-bind="lucideArgs"
  />
</template>

<script setup lang="ts">
import './NyxIcon.scss'
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
import { type NyxIconProps } from './NyxIcon.types'
import { NyxTheme, NyxSize } from '@/types'
import { toPascalCase } from '@/utils/string'

const props = withDefaults(defineProps<NyxIconProps>(), {
  name: ''
})

const SIZE_REM_MAP: Record<NyxSize, number> = {
  [NyxSize.XSmall]: 12,
  [NyxSize.Small]: 16,
  [NyxSize.Medium]: 20,
  [NyxSize.Large]: 24,
  [NyxSize.XLarge]: 32,
  [NyxSize.XXLarge]: 48,
}

const STROKE_REM_MAP: Record<NyxSize, number> = {
  [NyxSize.XSmall]: 0.5,
  [NyxSize.Small]: 0.75,
  [NyxSize.Medium]: 1,
  [NyxSize.Large]: 1.25,
  [NyxSize.XLarge]: 1.5,
  [NyxSize.XXLarge]: 2,
}

const FALLBACK_ICON = 'HelpCircle'

const resolvedIcon = computed(() => {
  const normalisedName = props.name ?? FALLBACK_ICON
  const baseName = toPascalCase(normalisedName)
  const icon = (LucideIcons as Record<string, unknown>)[baseName] as unknown as { name: string } | undefined
  return icon ?? (LucideIcons as Record<string, unknown>)[FALLBACK_ICON] as unknown as { name: string }
})

const themeClass = computed(() => {
  if (!props.theme) return undefined
  return `theme-${props.theme.toLowerCase()}`
})

const lucideArgs = computed(() => {
  const args: Record<string, unknown> = {}

  const size = getSize(props.size, SIZE_REM_MAP)
  if (size) args.size = size

  const strokeWidth = getSize(props.stroke, STROKE_REM_MAP)
  if (strokeWidth) args.strokeWidth = strokeWidth

  if (props.color) args.color = props.color

  return args
})

function getSize (size: NyxSize | number | undefined, map: Record<NyxSize, number>): number | undefined {
  if (size === undefined) return undefined
  if (typeof size === 'number') return size
  return map[size]
}
</script>
