import { defineComponent } from 'vue'
import NyxSelect from './NyxSelect.vue'
import { NyxTheme, NyxStyleVariant, NyxSize, NyxSelectType, type KeyDict } from '@/types'
import type { NyxSelectProps } from './NyxSelect.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxForm from '../NyxForm/NyxForm.vue'
import NyxFormField from '../NyxForm/NyxFormField.vue'

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
        default: options,
        // disable: true
      }
    }
  },
  args: {
    options
  }
}

const Template = (args: NyxSelectProps) => defineComponent({
  components: { NyxSelect },
  setup () {
    return { args }
  },
  template: `
    <nyx-select v-bind="args" :placeholder="'NyxSelect'" />
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxSelect, NyxForm, NyxFormField },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel, options }
  },
  template: `
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-select
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
            :options="options"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `,
})

export const Default = Template({ options })
export const Types = TemplateAll('type', NyxSelectType)
export const Themes = TemplateAll('theme', NyxTheme)
export const Variants = TemplateAll('variant', NyxStyleVariant)
export const Sizes = TemplateAll('size', NyxSize)
