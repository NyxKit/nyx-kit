import { defineComponent } from 'vue'
import NyxTable from './NyxTable.vue'
import { NyxTheme, NyxStyleVariant, NyxSize, type KeyDict } from '@/types'
import type { NyxTableProps } from './NyxTable.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxButton from '../NyxButton/NyxButton.vue'

const data = [
  { id: '0', name: 'Lorem', description: 'Lorem ipsum dolor sit amet' },
  { id: '1', name: 'Ipsum', description: 'Lorem ipsum dolor sit amet' },
  { id: '2', name: 'Dolor', description: 'Lorem ipsum dolor sit amet' },
  { id: '3', name: 'Sit', description: 'Lorem ipsum dolor sit amet' },
  { id: '4', name: 'Amet', description: 'Lorem ipsum dolor sit amet' },
  { id: '5', name: 'Lorem', description: 'Lorem ipsum dolor sit amet' },
]

export default {
  title: 'Components/NyxTable',
  component: NyxTable,
  argTypes: {
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
  args: {
    modelValue: data
  }
}

const Template = (args: NyxTableProps<unknown>) => defineComponent({
  components: { NyxTable },
  setup () {
    return { args }
  },
  template: `
    <nyx-table v-bind="args" />
  `,
})

const TemplateActions = () => () => defineComponent({
  components: { NyxTable, NyxButton },
  setup () {
    return { data, NyxSize, NyxTheme }
  },
  template: `
    <nyx-table v-model="data">
      <template #actions="{ item }">
        <nyx-button :size="NyxSize.Xsmall" :theme="NyxTheme.Danger">{{ item.name }}</nyx-button>
      </template>
    </nyx-table>
  `
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxTable, NyxButton },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel, data, NyxSize, NyxTheme, NyxStyleVariant }
  },
  template: `
    <div class="flex-col gap-xl">
      <nyx-table v-model="data" v-bind="{ [prop]: value }" v-for="value of values">
        <template #actions="{ item }">
          <nyx-button
            :variant="prop === 'variant' ? value : NyxStyleVariant.Solid"
            :size="prop === 'size' ? value : NyxSize.Xsmall"
            :theme="prop === 'theme' ? value : NyxTheme.Danger"
          >{{ getLabel(value) }}</nyx-button>
        </template>
      </nyx-table>
    </div>
  `,
})

export const Default = Template({})
export const WithActions = TemplateActions()
export const Themes = TemplateAll('theme', NyxTheme)
export const Variants = TemplateAll('variant', NyxStyleVariant)
export const Sizes = TemplateAll('size', NyxSize)
