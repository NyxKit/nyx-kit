import { defineComponent } from 'vue'
import NyxTextarea from './NyxTextarea.vue'
import { NyxTheme, NyxVariant, NyxSize, type KeyDict } from '@/types'
import type { NyxTextareaProps } from './NyxTextarea.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxForm from '../NyxForm/NyxForm.vue'
import NyxFormField from '../NyxForm/NyxFormField.vue'

export default {
  title: 'Components/NyxTextarea',
  component: NyxTextarea,
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
    }
  },
}

const Template = (args: NyxTextareaProps) => defineComponent({
  components: { NyxTextarea },
  setup () {
    return { args }
  },
  template: `
    <nyx-textarea v-bind="args" :placeholder="'NyxTextarea'" />
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxTextarea, NyxForm, NyxFormField },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-textarea
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `,
})

export const Default = Template({})
export const Themes = TemplateAll('theme', NyxTheme)
export const Variants = TemplateAll('variant', NyxVariant)
export const Sizes = TemplateAll('size', NyxSize)
