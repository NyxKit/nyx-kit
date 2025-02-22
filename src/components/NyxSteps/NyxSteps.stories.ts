import { defineComponent } from 'vue'
import NyxSteps from './NyxSteps.vue'
import { NyxTheme, NyxSize, NyxVariant, NyxShape } from '@/types'
import type { NyxStepsProps } from './NyxSteps.types'

const steps = 5

export default {
  title: 'Components/NyxSteps',
  component: NyxSteps,
  argTypes: {
    // theme: {
    //   control: { type: 'select' },
    //   options: Object.values(NyxTheme),
    // },
    // gradient: {
    //   control: { type: 'select' },
    //   options: [true, false, ...Object.values(NyxTheme)]
    // },
    // backlight: {
    //   control: { type: 'select' },
    //   options: [true, false, ...Object.values(NyxTheme)]
    // },
    // variant: {
    //   control: { type: 'select' },
    //   options: Object.values(NyxVariant),
    // },
    // size: {
    //   control: { type: 'select' },
    //   options: Object.values(NyxSize),
    // },
    // shape: {
    //   control: { type: 'select' },
    //   options: Object.values(NyxShape),
    // },
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

export const Default = Template({ steps })
