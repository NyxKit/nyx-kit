import { defineComponent } from 'vue'
import NyxSwitch from './NyxSwitch.vue'
import { NyxTheme, NyxStyleVariant, NyxSize, type KeyDict } from '@/types'
import type { NyxSwitchProps } from './NyxSwitch.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxForm from '../NyxForm/NyxForm.vue'
import NyxFormField from '../NyxForm/NyxFormField.vue'

export default {
  title: 'Components/NyxSwitch',
  component: NyxSwitch,
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
}

const Template = (args: NyxSwitchProps) => defineComponent({
  components: { NyxSwitch },
  setup () {
    return { args }
  },
  template: `
    <nyx-switch v-bind="args" />
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxForm, NyxFormField, NyxSwitch },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-switch v-bind="{ [prop]: value }" :id="id" />
        </template>
      </nyx-form-field>
    </nyx-form>
  `,
})

export const Default = Template({})
export const Themes = TemplateAll('theme', NyxTheme)
export const Sizes = TemplateAll('size', NyxSize)
