<script setup lang="ts" generic="T extends number | [number, number]">
import { computed, watch, nextTick, ref, useTemplateRef } from "vue"
import './NyxSlider.scss'
import type { NyxSliderProps } from './NyxSlider.types'
import { NyxShape, NyxTheme, type CssVariablesDict } from '@/types'
import NyxTooltip from "../NyxTooltip/NyxTooltip.vue";

type CurrentThumb = 'min'|'max'|'curr'|null

const props = withDefaults(defineProps<NyxSliderProps>(), {
  theme: NyxTheme.Default,
  shape: NyxShape.Circle,
  min: 0,
  max: 100,
  tooltip: 'interact',
  direction: 'row'
})

const model = defineModel<T>({
  required: true
})

const valMin = ref<string>(Array.isArray(model.value) ? `${model.value[0]}` : `${model.value}`)
const valMax = ref<string>(Array.isArray(model.value) ? `${model.value[1]}` : `${model.value}`)

const iMinUpdate = ref(0)
const iMaxUpdate = ref(0)

const isTooltipMinVisible = ref(false)
const isTooltipMaxVisible = ref(false)

const propMin = computed(() => parseFloat(`${ props.min }`))
const propMax = computed(() => parseFloat(`${ props.max }`))

watch([valMin, valMax], ([newMin, newMax], [oldMin, oldMax]) => {
  if (!Array.isArray(model.value)) return
  const min = parseFloat(newMin)
  const max = parseFloat(newMax)
  if (min !== parseFloat(oldMin)) {
    iMinUpdate.value++
  } else if (max !== parseFloat(oldMax)) {
    iMaxUpdate.value++
  }
  const sorted = [min, max].sort((a, b) => a - b)
  // if (sorted[0] !== min) switchTooltipVisibile()
  model.value = sorted as T
})

const cssVars = computed<CssVariablesDict>(() => {
  if (!Array.isArray(model.value)) return {}

  const min = ((model.value[0] - propMin.value) / (propMax.value - propMin.value)) * 100
  const max = ((model.value[1] - propMin.value) / (propMax.value - propMin.value)) * 100

  return {
    '--nyx-slider-min': `${min}%`,
    '--nyx-slider-max': `${max}%`
  }
})

// const switchTooltipVisibile = () => {
//   const memMin = Boolean(isTooltipMinVisible.value)
//   isTooltipMinVisible.value = isTooltipMaxVisible.value
//   isTooltipMaxVisible.value = memMin
// }
</script>

<template>
  <div
    class="nyx-slider"
    :class="[`theme-${props.theme}`, `shape-${props.shape}`]"
    :style="cssVars"
  >
    <div class="nyx-slider__track" />
    <template v-if="Array.isArray(model)">
      <div class="nyx-slider__track nyx-slider__track--active" />
      <NyxTooltip
        v-if="props.tooltip !== 'never'"
        class="nyx-slider__thumb min"
        trigger="manual"
        v-model="isTooltipMinVisible"
        :theme="props.theme"
        :forceUpdate="iMinUpdate"
      >
        <template v-slot:tooltip-content>
          <slot name="tooltip-min"><span>{{ valMin }}</span></slot>
        </template>
      </NyxTooltip>
      <NyxTooltip
        v-if="props.tooltip !== 'never'"
        class="nyx-slider__thumb max"
        trigger="manual"
        v-model="isTooltipMaxVisible"
        :theme="props.theme"
        :forceUpdate="iMaxUpdate"
      >
        <template v-slot:tooltip-content>
          <slot name="tooltip-max"><span>{{ valMax }}</span></slot>
        </template>
      </NyxTooltip>
      <input
        type="range"
        :min="propMin"
        :max="propMax"
        :step="props.step"
        v-model="valMin"
        @mousedown="isTooltipMinVisible = true"
        @mouseup="isTooltipMinVisible = false"
      />
      <input
        type="range"
        :min="propMin"
        :max="propMax"
        :step="props.step"
        v-model="valMax"
        @mousedown="isTooltipMaxVisible = true"
        @mouseup="isTooltipMaxVisible = false"
      />
    </template>
    <template v-else>
      <div class="nyx-slider__thumb" />
      <input
        type="range"
        :min="propMin"
        :max="propMax"
        :step="props.step"
        v-model="model"
      />
    </template>
  </div>
</template>
