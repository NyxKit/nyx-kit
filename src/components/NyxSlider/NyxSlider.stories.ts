import { defineComponent, ref } from 'vue'
import NyxSlider from './NyxSlider.vue'
import type { NyxSliderProps } from './NyxSlider.types'
import { NyxTheme } from '@/types'

export default {
  title: 'Components/NyxSlider',
  component: NyxSlider,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
  },
  args: {}
}

const Template = (args: NyxSliderProps) => defineComponent({
  components: { NyxSlider },
  setup () {
    return { args }
  },
  template: `
    <nyx-slider v-bind="args"></nyx-slider>
  `,
})

const TemplateRange = (args: NyxSliderProps) => () => defineComponent({
  components: { NyxSlider },
  setup () {
    const range = ref([30, 70])
    return { args, range }
  },
  template: `
    <div class="flex-col gap-xl">
      <nyx-slider v-model="range"></nyx-slider>
      <pre>{{ range }}</pre>
    </div>
  `,
})

export const Default = Template({})
export const Range = TemplateRange({})
