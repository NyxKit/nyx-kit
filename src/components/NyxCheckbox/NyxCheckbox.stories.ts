import { defineComponent } from 'vue'
import NyxCheckbox from './NyxCheckbox.vue'
import { NyxTheme, NyxVariant, NyxSize, type KeyDict } from '@/types'
import type { NyxCheckboxProps } from './NyxCheckbox.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxForm from '../NyxForm/NyxForm.vue'
import NyxFormField from '../NyxForm/NyxFormField.vue'

export default {
  title: 'Components/NyxCheckbox',
  component: NyxCheckbox,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    // variant: {
    //   control: { type: 'select' },
    //   options: Object.values(NyxVariant),
    // },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    }
  },
}

const Template = (args: NyxCheckboxProps) => defineComponent({
  components: { NyxCheckbox },
  setup () {
    return { args }
  },
  template: `
    <nyx-checkbox v-bind="args" :placeholder="'NyxCheckbox'" />
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxCheckbox, NyxForm, NyxFormField },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-checkbox
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
            :label="'I agree for the terms and conditions for ' + getLabel(value)"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `,
})

export const Default = Template({})
export const Themes = TemplateAll('theme', NyxTheme)
// export const Variants = TemplateAll('variant', NyxVariant)
export const Sizes = TemplateAll('size', NyxSize)
