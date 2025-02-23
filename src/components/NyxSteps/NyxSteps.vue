<script setup lang="ts">
import './NyxSteps.scss'
import { computed } from 'vue'
import type { NyxStepsProps } from './NyxSteps.types'
import NyxButton from '../NyxButton/NyxButton.vue'
import { type CssVariablesDict, NyxShape, NyxSize, NyxTheme } from '@/types'
import { NyxLog } from '@/classes'

const props = withDefaults(defineProps<NyxStepsProps>(), {
  theme: NyxTheme.Default,
  shape: NyxShape.Circle,
  size: NyxSize.Medium,
  readonly: true,
  direction: 'row'
})

const model = defineModel<number|string>({ default: 0 })

const currentStep = computed(() => {
  if (typeof model.value === 'number') return model.value
  if (Array.isArray(props.steps)) return props.steps.indexOf(model.value)
  NyxLog.error('NyxSteps', 'Incorrect type combination of modelValue and steps')
  return 0
})

const numSteps = computed(() => Array.isArray(props.steps) ? props.steps.length - 1 : props.steps - 1)

const cssVars = computed<CssVariablesDict>(() => ({
  '--current-step': currentStep.value,
  '--total-steps': numSteps.value
}))

const getStepStatus = (index: number): string => {
  if (index < currentStep.value) return 'complete'
  if (index > currentStep.value) return 'incomplete'
  return 'current'
}

const getButtonTheme = (index: number): NyxTheme => {
  if (index < currentStep.value) return props.themeComplete ?? props.theme
  if (index > currentStep.value) return props.themeIncomplete ?? props.theme
  return props.theme
}

const onClick = (index: number) => {
  if (props.readonly) return
  if (typeof model.value === 'number') {
    model.value = index
  } else if (Array.isArray(props.steps)) {
    model.value = props.steps[index]
  } else {
    NyxLog.error('NyxSteps', 'Incorrect type combination of modelValue and steps')
    model.value = index
  }
}

</script>

<template>
  <div
    class="nyx-steps"
    :class="[
      `theme-${props.theme}`,
      `size-${props.size}`,
      props.themeComplete && `theme-complete-${props.themeComplete}`,
      props.themeIncomplete && `theme-incomplete-${props.themeIncomplete}`,
      { 'nyx-steps--readonly': props.readonly },
      { 'nyx-steps--column': props.direction === 'column' }
    ]"
    :style="cssVars"
  >
    <NyxButton
      v-for="(step, index) in steps"
      :key="index"
      class="nyx-steps__step"
      :class="`nyx-steps__step--status-${ getStepStatus(index) }`"
      :theme="getButtonTheme(index)"
      :shape="props.shape"
      :size="props.size"
      @click="onClick(index)"
    ><slot :name="`step-${step}`" :step>{{ index + 1 }}</slot></NyxButton>
  </div>
</template>
