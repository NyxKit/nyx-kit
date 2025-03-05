<script setup lang="ts">
import './NyxProgress.scss'
import { computed } from 'vue'
import type { NyxProgressProps } from './NyxProgress.types'
import { NyxShape, NyxVariant, type CssVariablesDict } from '@/types'
import useNyxProps from '@/compositions/useNyxProps';

const props = withDefaults(defineProps<NyxProgressProps>(), {
  max: 100,
  variant: NyxVariant.Solid,
  shape: NyxShape.Rectangle,
  gradient: false
})

const model = defineModel<number|null>({ default: null })

const { classList } = useNyxProps(props)

const progressWidth = computed(() => {
  if (model.value === null) return '100%'
  const percentage = Math.min(100, (model.value / props.max) * 100)
  return `${percentage}%`
})

const cssVars = computed<CssVariablesDict>(() => ({
  '--progress': progressWidth.value
}))
</script>

<template>
  <div
    class="nyx-progress"
    :class="classList"
    :style="cssVars"
  >
    <div
      class="nyx-progress__bar"
      :class="{ 'indeterminate': model === null }"
    />
    <span
      v-if="showValue && model !== null"
      class="nyx-progress__label"
      :class="`nyx-progress__label--${showValue}`"
    >{{ Math.round(model) }}</span>
  </div>
</template>
