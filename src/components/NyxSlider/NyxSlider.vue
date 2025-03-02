<script setup lang="ts">
import './NyxSlider.scss'
import { ref, computed, onBeforeUnmount } from 'vue'
import type { NyxSliderProps } from './NyxSlider.types'
import { NyxShape, NyxTheme } from '@/types'
import useNyxProps from '@/compositions/useNyxProps'
import { roundToStep } from '@/utils'

const props = withDefaults(defineProps<NyxSliderProps>(), {
  theme: NyxTheme.Default,
  shape: NyxShape.Circle,
  min: 0,
  max: 100,
  tooltip: 'interact',
  direction: 'row',
  pixel: false
})

const model = defineModel<number | [number, number]>()

const track = ref<HTMLDivElement | null>(null)
const draggingThumb = ref<number | null>(null)

const isRange = computed(() => Array.isArray(model.value))

const value1 = computed<number>(() => {
  return isRange.value ? (model.value as [number, number])[0] : model.value as number
})

const value2 = computed<number | null>(() => {
  return isRange.value ? (model.value as [number, number])[1] : null
})

const thumbPosition1 = computed(() => ((value1.value - props.min) / (props.max - props.min)) * 100)
const thumbPosition2 = computed(() => (!isRange.value ? 0 : (((value2.value as number) - props.min) / (props.max - props.min)) * 100))

const snapToStep = (value: number): number => {
  if (!props.step) return value
  return roundToStep(value, props.step, props.min)
}

const updateValue = (index: number, newValue: number) => {
  newValue = snapToStep(newValue)

  if (isRange.value) {
    let newValues: [number, number] = [...(model.value as [number, number])]
    newValues[index] = newValue

    if (newValues[0] > newValues[1]) {
      newValues = [newValues[1], newValues[0]]
      draggingThumb.value = draggingThumb.value === 0 ? 1 : 0
    }

    model.value = newValues
  } else {
    model.value = newValue
  }
}

const startDrag = (thumbIndex: number, event: MouseEvent) => {
  event.preventDefault()
  draggingThumb.value = thumbIndex
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (event: MouseEvent) => {
  if (draggingThumb.value === null || !track.value) return
  const rect = track.value.getBoundingClientRect()
  let newPosition = (event.clientX - rect.left) / rect.width
  newPosition = Math.min(Math.max(newPosition, 0), 1)
  const newValue = props.min + newPosition * (props.max - props.min)

  updateValue(draggingThumb.value, newValue)
}

const stopDrag = () => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  draggingThumb.value = null
}

const onTrackMouseDown = (event: MouseEvent) => {
  if (!track.value) return
  const rect = track.value.getBoundingClientRect()
  let clickPosition = (event.clientX - rect.left) / rect.width
  clickPosition = Math.min(Math.max(clickPosition, 0), 1)
  const newValue = props.min + clickPosition * (props.max - props.min)

  if (isRange.value) {
    const distToFirst = Math.abs(newValue - value1.value)
    const distToSecond = Math.abs(newValue - (value2.value as number))
    let thumbIndex = distToFirst < distToSecond ? 0 : 1

    updateValue(thumbIndex, newValue)
    draggingThumb.value = thumbIndex
  } else {
    model.value = newValue
  }
}

const onKeyDown = (event: KeyboardEvent, index: number) => {
  let newValue = isRange.value ? (model.value as [number, number])[index] : (model.value as number)
  const step = props.step ?? 1

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      newValue = Math.max(props.min, newValue - step)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      newValue = Math.min(props.max, newValue + step)
      break
    case 'Home':
      newValue = props.min
      break
    case 'End':
      newValue = props.max
      break
    default:
      return
  }

  event.preventDefault()
  updateValue(index, newValue)
}

const { classList } = useNyxProps(props)

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
  <div
    class="nyx-slider"
    :class="classList"
    ref="track"
    @mousedown="onTrackMouseDown"
  >
    <!-- Track highlight for range mode -->
    <div
      v-if="isRange"
      class="nyx-slider__track-highlight"
      :style="{
        left: Math.min(thumbPosition1, thumbPosition2) + '%',
        width: Math.abs(thumbPosition2 - thumbPosition1) + '%'
      }"
    ></div>

    <!-- First Thumb -->
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      :step="props.step || 'any'"
      v-model="model"
      @keydown="(e) => onKeyDown(e, 0)"
      aria-label="Slider value"
      :aria-valuenow="value1"
      :aria-valuemin="props.min"
      :aria-valuemax="props.max"
      class="sr-only"
    />
    <div
      class="nyx-slider__thumb"
      :style="{ left: thumbPosition1 + '%' }"
      role="slider"
      tabindex="0"
      :aria-valuenow="value1"
      :aria-valuemin="props.min"
      :aria-valuemax="props.max"
      @mousedown="(e) => startDrag(0, e)"
      @keydown="(e) => onKeyDown(e, 0)"
    ></div>

    <!-- Second Thumb (Only if range mode) -->
    <template v-if="isRange && Array.isArray(model) && model[1]">
      <input
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step || 'any'"
        v-model="model[1]"
        @keydown="(e) => onKeyDown(e, 1)"
        aria-label="Slider second value"
        :aria-valuenow="value2 ?? undefined"
        :aria-valuemin="props.min"
        :aria-valuemax="props.max"
        class="sr-only"
      />
      <div
        class="nyx-slider__thumb"
        :style="{ left: thumbPosition2 + '%' }"
        role="slider"
        tabindex="0"
        :aria-valuenow="value2 ?? undefined"
        :aria-valuemin="props.min"
        :aria-valuemax="props.max"
        @mousedown="(e) => startDrag(1, e)"
        @keydown="(e) => onKeyDown(e, 1)"
      ></div>
    </template>
  </div>
</template>
