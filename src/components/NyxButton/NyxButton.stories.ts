import { defineComponent } from 'vue'
import NyxButton from './NyxButton.vue'
import { NyxTheme, NyxStyleVariant, NyxSize } from '@/types'
import type { NyxButtonProps } from './NyxButton.types'

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

const Template = (args: NyxButtonProps) => defineComponent({
  components: { NyxButton },
  setup () {
    return { args }
  },
  template: `
    <nyx-button v-bind="args" @click="onClick">Button</nyx-button>
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
  components: { NyxButton },
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
export const Themes = TemplateAll('theme', Object.values(NyxTheme))
export const Styles = TemplateAll('variant', Object.values(NyxStyleVariant))
export const Sizes = TemplateAll('size', Object.values(NyxSize))
