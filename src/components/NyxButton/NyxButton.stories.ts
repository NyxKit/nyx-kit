import { defineComponent } from 'vue'
import NyxButton from './NyxButton.vue'
import { NyxTheme, NyxStyleVariant, NyxSize, type KeyDict } from '@/types'
import type { NyxButtonProps } from './NyxButton.types'
import { getKeyDictKeyByValue } from '@/utils'

export default {
  title: 'Components/NyxButton',
  component: NyxButton,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
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
    },
    onClick: { action: 'click' },
  },
}

const Template = (args: NyxButtonProps) => () => defineComponent({
  components: { NyxButton },
  setup () {
    return { args }
  },
  template: `
    <nyx-button v-bind="args" @click="onClick">Button</nyx-button>
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxButton },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <div class="flex">
      <nyx-button
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-button>
    </div>
  `,
})

export const Default = Template({})
export const Themes = TemplateAll('theme',  NyxTheme)
export const Styles = TemplateAll('variant', NyxStyleVariant)
export const Sizes = TemplateAll('size', NyxSize)
