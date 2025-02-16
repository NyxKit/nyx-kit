import { defineComponent } from 'vue'
import NyxSelect from './NyxSelect.vue'
import { NyxTheme, NyxStyleVariant, NyxSize, NyxSelectType, type KeyDict } from '@/types'
import type { NyxSelectProps } from './NyxSelect.types'
import { getKeyDictKeyByValue } from '@/utils'

const options = Object.values(NyxTheme).map((theme) => ({ label: theme, value: theme }))

export default {
  title: 'Components/NyxSelect',
  component: NyxSelect,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(NyxSelectType),
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
    options: {
      control: {
        disable: true
      }
    }
  },
}

const Template = (args: NyxSelectProps) => () => defineComponent({
  components: { NyxSelect },
  setup () {
    return { args }
  },
  template: `
    <nyx-select v-bind="args" :placeholder="'NyxSelect'" />
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxSelect },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel, options }
  },
  template: `
    <div class="flex-col">
      <nyx-select
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value }"
        :placeholder="getLabel(value)"
        :options="options"
      />
    </div>
  `,
})

export const Default = Template({ options })
export const Types = TemplateAll('type', NyxSelectType)
export const Themes = TemplateAll('theme', NyxTheme)
export const Styles = TemplateAll('variant', NyxStyleVariant)
export const Sizes = TemplateAll('size', NyxSize)
