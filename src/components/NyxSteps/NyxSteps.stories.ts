import { defineComponent } from 'vue'
import NyxSteps from './NyxSteps.vue'
import { NyxTheme, NyxSize, NyxVariant, NyxShape } from '@/types'
import type { NyxStepsProps } from './NyxSteps.types'

const steps = 5

export default {
  title: 'Components/NyxSteps',
  component: NyxSteps,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    themeComplete: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    themeIncomplete: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
    shape: {
      control: { type: 'select' },
      options: Object.values(NyxShape),
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column']
    },
    modelValue: {
      control: { type: 'number' }
    }
  },
  args: {
    steps,
    modelValue: 0
  }
}

const Template = (args: NyxStepsProps) => defineComponent({
  components: { NyxSteps },
  setup () {
    return { args }
  },
  template: `
    <nyx-steps v-bind="args" />
  `,
})

const TemplateWithSlots = () => () => defineComponent({
  components: { NyxSteps },
  setup () {
    const steps = ['one', 'two', 'three', 'four', 'five']
    return { steps }
  },
  template: `
    <nyx-steps :steps="steps" :readonly="false">
      <template v-slot:step-one #step="step"><span style="color: #EA6C92">L</span></template>
      <template v-slot:step-two #step="step"><span style="color: #F0A573">O</span></template>
      <template v-slot:step-three #step="step"><span style="color: #FFF6A3">R</span></template>
      <template v-slot:step-four #step="step"><span style="color: #ABEDA1">E</span></template>
      <template v-slot:step-five #step="step"><span style="color: #9EB8FF">M</span></template>
    </nyx-steps>
  `,
})

export const Default = Template({ steps })
export const WithSlots = TemplateWithSlots()
