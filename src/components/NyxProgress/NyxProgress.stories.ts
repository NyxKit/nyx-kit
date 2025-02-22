import { defineComponent } from 'vue'
import NyxProgress from './NyxProgress.vue'
import { NyxTheme, NyxSize, NyxVariant, NyxShape } from '@/types'
import type { NyxProgressProps } from './NyxProgress.types'

export default {
  title: 'Components/NyxProgress',
  component: NyxProgress,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    gradient: {
      control: { type: 'select' },
      options: [true, false, ...Object.values(NyxTheme)]
    },
    backlight: {
      control: { type: 'select' },
      options: [true, false, ...Object.values(NyxTheme)]
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(NyxVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
    shape: {
      control: { type: 'select' },
      options: Object.values(NyxShape),
    },
    modelValue: {
      control: { type: 'number' }
    }
  },
  args: {
    modelValue: null
  }
}

const Template = (args: NyxProgressProps) => defineComponent({
  components: { NyxProgress },
  setup () {
    return { args }
  },
  template: `
    <nyx-progress v-bind="args" />
  `,
})

export const Default = Template({})
