import { defineComponent, ref } from 'vue'
import NyxProgress from './NyxProgress.vue'
import { NyxTheme, NyxSize, NyxVariant, NyxShape, NyxProgressVariant } from '@/types'
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
      options: Object.values(NyxProgressVariant),
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

const TemplateDots = () => () => defineComponent({
  components: { NyxProgress },
  setup () {
    const currProgress = ref(2.25)
    return { currProgress, NyxProgressVariant, NyxSize }
  },
  template: `
    <nyx-progress
      v-model="currProgress"
      :max="5"
      :variant="NyxProgressVariant.Dots"
      :size="NyxSize.Large"
    />
  `
})

export const Default = Template({})
export const Dots = TemplateDots()
