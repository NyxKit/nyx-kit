<template>
  <component
    :is="resolvedIcon"
    class="nyx-icon"
    v-bind="lucideArgs"
  />
</template>

<script setup lang="ts">
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

const THEME_COLOR_MAP: Record<NyxTheme, string> = {
  [NyxTheme.Primary]: 'var(--nyx-c-primary)',
  [NyxTheme.Secondary]: 'var(--nyx-c-secondary)',
  [NyxTheme.Success]: 'var(--nyx-c-success)',
  [NyxTheme.Warning]: 'var(--nyx-c-warning)',
  [NyxTheme.Danger]: 'var(--nyx-c-danger)',
  [NyxTheme.Info]: 'var(--nyx-c-info)',
}

const FALLBACK_ICON = 'HelpCircle'

const resolvedIcon = computed(() => {
  const normalisedName = props.name ?? FALLBACK_ICON
  const baseName = toPascalCase(normalisedName)
  const icon = (LucideIcons as Record<string, unknown>)[baseName] as unknown as { name: string } | undefined
  return icon ?? (LucideIcons as Record<string, unknown>)[FALLBACK_ICON] as unknown as { name: string }
})

const lucideArgs = computed(() => {
  const args: Record<string, unknown> = {}

  const size = getSize(props.size, SIZE_REM_MAP)
  if (size) args.size = size

  const strokeWidth = getSize(props.stroke, STROKE_REM_MAP)
  if (strokeWidth) args.strokeWidth = strokeWidth

  const color = getColor(props.theme, props.color)
  if (color) args.color = color

  return args
})

function getColor (theme: NyxTheme | undefined, color: string | undefined): string | undefined {
  if (theme) return THEME_COLOR_MAP[theme]
  if (color) return color
  return undefined
}

function getSize (size: NyxSize | number | undefined, map: Record<NyxSize, number>): number | undefined {
  if (size === undefined) return undefined
  if (typeof size === 'number') return size
  return map[size]
}
</script>
