import { defineComponent } from 'vue'
import NyxSpinner from './NyxSpinner.vue'
import { NyxTheme, NyxVariant, NyxSize, type KeyDict } from '@/types'
import type { NyxSpinnerProps } from './NyxSpinner.types'
import { getKeyDictKeyByValue } from '@/utils'

export default {
  title: 'Components/NyxSpinner',
  component: NyxSpinner,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    }
  },
}

const Template = (args: NyxSpinnerProps) => defineComponent({
  components: { NyxSpinner },
  setup () {
    return { args }
  },
  template: `
    <nyx-spinner v-bind="args" />
  `,
})

const TemplateAllProp = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxSpinner },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <div class="flex">
      <nyx-spinner
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-spinner>
    </div>
  `,
})

export const Default = Template({})
