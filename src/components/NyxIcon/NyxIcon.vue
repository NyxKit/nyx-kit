<template>
  <component
    :is="resolvedIcon"
    class="nyx-icon"
    :class="classList"
    :style="iconStyles"
    :size="iconSize"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
import { type NyxIconProps } from './NyxIcon.types'
import { NyxIconVariant, NyxTheme, NyxSize } from '@/types'

const props = withDefaults(defineProps<NyxIconProps>(), {
  name: '',
  variant: NyxIconVariant.Line
})

const SIZE_MAP: Record<NyxSize, number> = {
  [NyxSize.XSmall]: 16,
  [NyxSize.Small]: 20,
  [NyxSize.Medium]: 24,
  [NyxSize.Large]: 32,
  [NyxSize.XLarge]: 40,
  [NyxSize.XXLarge]: 48
}

const DEFAULT_SIZE = 24

function toPascalCase(str: string): string {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

const FALLBACK_ICON = 'HelpCircle'

const resolvedIcon = computed(() => {
  if (!props.name) return (LucideIcons as Record<string, unknown>)[FALLBACK_ICON] as unknown as { name: string }
  const baseName = toPascalCase(props.name)
  let iconName = baseName
  if (props.variant === NyxIconVariant.Filled) {
    iconName = `${baseName}Filled`
    const filledIcon = (LucideIcons as Record<string, unknown>)[iconName] as unknown as { name: string } | undefined
    if (!filledIcon) {
      iconName = baseName
    }
  }
  const icon = (LucideIcons as Record<string, unknown>)[iconName] as unknown as { name: string } | undefined
  return icon ?? (LucideIcons as Record<string, unknown>)[FALLBACK_ICON] as unknown as { name: string }
})

const iconSize = computed(() => {
  if (typeof props.size === 'number') {
    return props.size
  }
  if (typeof props.size === 'string') {
    const parsed = parseInt(props.size, 10)
    if (!Number.isNaN(parsed)) {
      return parsed
    }
  }
  if (props.size) {
    return SIZE_MAP[props.size]
  }
  return DEFAULT_SIZE
})

const iconStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.theme) {
    styles.color = `rgb(var(--nyx-rgb-${props.theme}))`
  } else {
    styles.color = 'var(--nyx-text)'
  }
  
  return styles
})

const classList = computed(() => {
  const list = ['nyx-icon']
  if (props.variant) list.push(`variant-${props.variant}`)
  return list
})
</script>

<style scoped>
.nyx-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
