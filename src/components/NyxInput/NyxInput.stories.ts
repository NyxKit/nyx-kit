import { defineComponent } from 'vue'
import NyxInput from './NyxInput.vue'
import { NyxTheme, NyxStyleVariant, NyxSize, NyxInputType } from '@/types'
import type { NyxInputProps } from './NyxInput.types'

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
    },
    onClick: { action: 'click' },
  },
}

const Template = (args: NyxInputProps) => defineComponent({
  components: { NyxInput },
  setup () {
    return { args }
  },
  template: `
    <nyx-input v-bind="args" />
  `,
})

const sizeLabels: Record<NyxSize, string> = {
  [NyxSize.XSmall]: 'XSmall',
  [NyxSize.Small]: 'Small',
  [NyxSize.Medium]: 'Medium',
  [NyxSize.Large]: 'Large',
  [NyxSize.XLarge]: 'XLarge',
}

const TemplateAll = (prop: string, values: string[]) => () => defineComponent({
  components: { NyxInput },
  setup () {
    const getLabel = (value: string) => {
      if (prop === 'size') {
        return sizeLabels[value as NyxSize]
      } else {
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
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
export const Types = TemplateAll('type', Object.values(NyxInputType))
export const Themes = TemplateAll('theme', Object.values(NyxTheme))
export const Styles = TemplateAll('variant', Object.values(NyxStyleVariant))
export const Sizes = TemplateAll('size', Object.values(NyxSize))
