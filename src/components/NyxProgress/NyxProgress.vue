<script setup lang="ts">
import './NyxProgress.scss'
import { computed } from 'vue'
import type { NyxProgressProps } from './NyxProgress.types'
import { NyxProgressVariant, NyxShape, NyxSize, NyxVariant, type CssVariablesDict } from '@/types'
import useNyxProps from '@/compositions/useNyxProps';
import { clamp } from '@/utils';

const props = withDefaults(defineProps<NyxProgressProps>(), {
  min: 0,
  max: 100,
  variant: NyxProgressVariant.Line,
  shape: NyxShape.Rectangle,
  size: NyxSize.Small,
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

const getDotCssVars = (i: number): CssVariablesDict => {
  if (model.value === null) return { '--dot-progress': '0%' }
  const progress = model.value - (i - 1)
  return { '--dot-progress': `${clamp(progress, 0, 1) * 100}%` }
}
</script>

<template>
  <div
    class="nyx-progress"
    :class="[...classList, `variant--${props.variant}`]"
    :style="cssVars"
  >
    <template v-if="props.variant === NyxProgressVariant.Dots">
      <div
        class="nyx-progress__dot"
        v-for="i in props.max"
        :key="i"
        :style="getDotCssVars(i)"
      >{{ i }}</div>
    </template>
    <div
      v-else
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
