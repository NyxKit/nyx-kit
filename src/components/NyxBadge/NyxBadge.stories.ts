import { defineComponent } from 'vue'
import NyxBadge from './NyxBadge.vue'
import { NyxTheme, NyxVariant, NyxSize, type KeyDict, NyxShape } from '@/types'
import type { NyxBadgeProps } from './NyxBadge.types'
import { getKeyDictKeyByValue } from '@/utils'

export default {
  title: 'Components/NyxBadge',
  component: NyxBadge,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(NyxVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
    onClick: { action: 'click' },
  },
}

const Template = (args: NyxBadgeProps) => defineComponent({
  components: { NyxBadge },
  setup () {
    return { args }
  },
  template: `
    <nyx-badge v-bind="args" @click="onClick">NyxBadge</nyx-badge>
  `,
})

const TemplateAllProp = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxBadge },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    const onDismiss = () => alert('Dismiss')
    return { prop, values, getLabel, onDismiss }
  },
  template: `
    <div class="flex-col">
      <div class="flex">
        <nyx-badge
          v-for="value of values"
          :key="value"
          v-bind="{ [prop]: value }"
        >{{ getLabel(value) }}</nyx-badge>
      </div>
      <div class="flex">
        <nyx-badge
          v-for="value of values"
          :key="value"
          v-bind="{ [prop]: value }"
          hasClose
        >{{ getLabel(value) }}</nyx-badge>
      </div>
    </div>
  `,
})

export const Default = Template({})
export const Themes = TemplateAllProp('theme',  NyxTheme)
export const Variants = TemplateAllProp('variant', NyxVariant)
export const Sizes = TemplateAllProp('size', NyxSize)
