<script setup lang="ts">
import './NyxSlider.scss'
import { ref, computed, onBeforeUnmount } from 'vue'
import type { NyxSliderProps } from './NyxSlider.types'
import { NyxShape, NyxTheme } from '@/types'

const props = withDefaults(defineProps<NyxSliderProps>(), {
  theme: NyxTheme.Default,
  shape: NyxShape.Circle,
  min: 0,
  max: 100,
  step: 1,
  marks: 4,
  snap: false,
  tooltip: 'interact',
  direction: 'row'
})

const model = defineModel<number|number[]>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | [number, number]): void
}>()

// Ref for the track element
const track = ref<HTMLDivElement | null>(null)
// Ref to keep track of the currently dragging thumb (0 or 1)
const draggingThumb = ref<number | null>(null)

// Determine whether we are in range mode (two values) or single value mode.
const isRange = computed(() => Array.isArray(model.value))

// Extract first value (or only value)
const value1 = computed<number>(() => {
  return isRange.value ? (model.value as [number, number])[0] : model.value as number
})
// In range mode, extract the second value.
const value2 = computed<number|null>(() => {
  return isRange.value ? (model.value as [number, number])[1] : null
})

// Calculate the thumb positions as a percentage of the track width.
const thumbPosition1 = computed(() => {
  return ((value1.value - props.min) / (props.max - props.min)) * 100
})
const thumbPosition2 = computed(() => {
  if (!isRange.value) return 0
  return (((value2.value as number) - props.min) / (props.max - props.min)) * 100
})

// Start dragging a thumb.
function startDrag(thumbIndex: number, event: MouseEvent) {
  event.preventDefault()
  draggingThumb.value = thumbIndex
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

// Handle mouse movements and update the slider value(s).
function onDrag(event: MouseEvent) {
  if (draggingThumb.value === null || !track.value) return
  const rect = track.value.getBoundingClientRect()
  let newPosition = (event.clientX - rect.left) / rect.width
  newPosition = Math.min(Math.max(newPosition, 0), 1)
  const newValue = props.min + newPosition * (props.max - props.min)

  if (isRange.value) {
    // Copy current values and update the dragging thumb.
    const newValues: [number, number] = [...(model.value as [number, number])]
    if (draggingThumb.value === 0) {
      newValues[0] = Math.min(newValue, newValues[1])
    } else {
      newValues[1] = Math.max(newValue, newValues[0])
    }
    emit('update:modelValue', newValues)
  } else {
    emit('update:modelValue', newValue)
  }
}

// Stop dragging and clean up event listeners.
function stopDrag() {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  draggingThumb.value = null
}

// When clicking on the track, move the closest thumb to the click position.
function onTrackMouseDown(event: MouseEvent) {
  if (!track.value) return
  const rect = track.value.getBoundingClientRect()
  let clickPosition = (event.clientX - rect.left) / rect.width
  clickPosition = Math.min(Math.max(clickPosition, 0), 1)
  const newValue = props.min + clickPosition * (props.max - props.min)

  if (isRange.value) {
    const distToFirst = Math.abs(newValue - value1.value)
    const distToSecond = Math.abs(newValue - (value2.value as number))
    const thumbIndex = distToFirst < distToSecond ? 0 : 1
    const newValues: [number, number] = [...(model.value as [number, number])]
    if (thumbIndex === 0) {
      newValues[0] = Math.min(newValue, newValues[1])
    } else {
      newValues[1] = Math.max(newValue, newValues[0])
    }
    emit('update:modelValue', newValues)
  } else {
    emit('update:modelValue', newValue)
  }
}

// Clean up the event listeners when the component is unmounted.
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
  <div
    class="nyx-slider"
    ref="track"
    @mousedown="onTrackMouseDown"
  >
    <div
      class="nyx-slider__thumb"
      :style="{ left: thumbPosition1 + '%' }"
      @mousedown="(e) => startDrag(0, e)"
    ></div>
    <div
      v-if="isRange"
      class="nyx-slider__thumb"
      :style="{ left: thumbPosition2 + '%' }"
      @mousedown="(e) => startDrag(1, e)"
    ></div>
  </div>
</template>
