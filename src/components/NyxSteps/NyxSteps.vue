<script setup lang="ts">
import { computed } from 'vue'
import type { NyxStepsProps } from './NyxSteps.types'
import NyxButton from '../NyxButton/NyxButton.vue'
import { NyxShape } from '@/types'

const props = withDefaults(defineProps<NyxStepsProps>(), {
  completedColor: '#3498db',
  activeColor: '#e67e22',
  defaultColor: '#e0e0e0',
  readonly: true,
  direction: 'row'
})

const model = defineModel<number>({ default: 0 })

const stepStatus = (index: number) => {
  if (index < model.value) return props.completedColor
  if (index === model.value) return props.activeColor
  return props.defaultColor
}

const numSteps = computed(() => Array.isArray(props.steps) ? props.steps.length - 1 : props.steps - 1)

const onClick = (index: number) => {
  if (props.readonly) return
  model.value = index
}

</script>

<template>
  <div class="nyx-steps-container">
    <div class="nyx-steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="nyx-step"
      >
        <NyxButton
          class="nyx-step-circle"
          :shape="NyxShape.Circle"
          :style="{ backgroundColor: stepStatus(index) }"
          @click="onClick(index)"
        >{{ index + 1 }}</NyxButton>
        <div v-if="index < numSteps" class="nyx-step-line" :style="{ backgroundColor: stepStatus(index) }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nyx-steps-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.nyx-steps {
  display: flex;
  align-items: center;
  position: relative;
}

.nyx-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.nyx-step-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
}

.nyx-step-label {
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
}

.nyx-step-line {
  position: absolute;
  height: 4px;
  width: 50px;
  top: 50%;
  left: calc(100% + 5px);
  transform: translateY(-50%);
}
</style>
