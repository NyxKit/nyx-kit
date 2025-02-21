<script setup lang="ts" generic="T extends number | [number, number]">
import { computed, watch, nextTick, ref } from "vue"
import './NyxSlider.scss'
import type { NyxSliderProps } from './NyxSlider.types'

const props = withDefaults(defineProps<NyxSliderProps>(), {
  min: 0,
  max: 100
})

const model = defineModel<T>({ required: true })

const min = ref<number|string>(Array.isArray(model.value) ? model.value[0] : model.value)
const max = ref<number|string>(Array.isArray(model.value) ? model.value[1] : model.value)

watch([min, max], () => {
  if (!Array.isArray(model.value)) return
  model.value = [parseFloat(`${min.value}`), parseFloat(`${max.value}`)].sort() as T
})

// Compute positions for the track when using a range slider
const trackStyle = computed(() => {
  if (!Array.isArray(model.value)) return {}

  const minPercentage = ((model.value[0] - props.min) / (props.max - props.min)) * 100
  const maxPercentage = ((model.value[1] - props.min) / (props.max - props.min)) * 100

  return {
    left: `${minPercentage}%`,
    width: `${maxPercentage - minPercentage}%`
  }
})
</script>

<template>
  <div class="nyx-slider">
    <div v-if="Array.isArray(model)" class="nyx-slider__range">
      <!-- Custom track highlight -->
      <div class="nyx-slider__track" />
      <div class="nyx-slider__track nyx-slider__track--active" :style="trackStyle" />

      <!-- Two range inputs positioned absolutely -->
      <input
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        v-model="min"
      />
      <input
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        v-model="max"
      />
    </div>
    <div v-else>
      <input
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        v-model="model"
      />
    </div>
    <div class="nyx-slider__values">
      <pre>{{ model }}</pre>
    </div>
  </div>
</template>
