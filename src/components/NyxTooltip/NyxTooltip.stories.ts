import { defineComponent } from 'vue'
import NyxTooltip from './NyxTooltip.vue'
import { NyxPosition, NyxTheme, NyxSize, type KeyDict, NyxVariant } from '@/types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxButton from '../NyxButton/NyxButton.vue'

export default {
  title: 'Components/NyxTooltip',
  component: NyxTooltip,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    position: {
      control: { type: 'select' },
      options: Object.values(NyxPosition),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    }
  },
}

const Template = (args: any) => defineComponent({
  components: { NyxTooltip, NyxButton },
  setup () {
    return { args }
  },
  template: `
    <nyx-tooltip v-bind="args" :text="'Tooltip content'">
      <nyx-button>{{ Hover me }}</nyx-button>
    </nyx-tooltip>
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxTooltip, NyxButton },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <div class="flex wrap">
      <nyx-tooltip
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value }"
        :text="getLabel(value)"
      ><nyx-button v-bind="{ [prop]: value }">{{ getLabel(value) }}</nyx-button></nyx-tooltip>
    </div>
  `,
})

export const Default = Template({})
export const Themes = TemplateAll('theme', NyxTheme)
export const Positions = TemplateAll('position', NyxPosition)
export const Variants = TemplateAll('variant', NyxVariant)
export const Sizes = TemplateAll('size', NyxSize)
