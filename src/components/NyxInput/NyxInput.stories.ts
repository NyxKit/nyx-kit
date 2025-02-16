import { defineComponent } from 'vue'
import NyxInput from './NyxInput.vue'
import { NyxTheme, NyxStyleVariant, NyxSize, NyxInputType, type KeyDict } from '@/types'
import type { NyxInputProps } from './NyxInput.types'
import { getKeyDictKeyByValue } from '@/utils'

export default {
  title: 'Components/NyxInput',
  component: NyxInput,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(NyxInputType),
    },
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(NyxStyleVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    }
  },
}

const Template = (args: NyxInputProps) => defineComponent({
  components: { NyxInput },
  setup () {
    return { args }
  },
  template: `
    <nyx-input v-bind="args" :placeholder="'NyxInput'" />
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxInput },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <div class="flex-col">
      <nyx-input
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value }"
        :placeholder="getLabel(value)"
      />
    </div>
  `,
})

export const Default = Template({})
export const Types = TemplateAll('type', NyxInputType)
export const Themes = TemplateAll('theme', NyxTheme)
export const Styles = TemplateAll('variant', NyxStyleVariant)
export const Sizes = TemplateAll('size', NyxSize)
