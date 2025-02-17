import { defineComponent, ref } from 'vue'
import NyxForm from './NyxForm.vue'
import NyxFormField from './NyxFormField.vue'
import NyxInput from '../NyxInput/NyxInput.vue'
import NyxSwitch from '../NyxSwitch/NyxSwitch.vue'
import NyxSelect from '../NyxSelect/NyxSelect.vue'
import { NyxTheme } from '@/types'

export default {
  title: 'Components/NyxForm',
  component: NyxForm,
  argTypes: {},
}

const Template = (args: unknown) => defineComponent({
  components: { NyxForm },
  setup () {
    return { args }
  },
  template: `
    <nyx-form v-bind="args" @click="onClick">Form</nyx-form>
  `,
})

const TemplateFullExample = () => () => defineComponent({
  components: { NyxForm, NyxFormField, NyxInput, NyxSwitch, NyxSelect },
  setup () {
    return {
      options: ref(Object.values(NyxTheme).map((t) => ({ label: t, value: t })))
    }
  },
  template: `
    <nyx-form>
      <nyx-form-field label="Input">
        <template #default="{ id }">
          <nyx-input :id="id" />
        </template>
      </nyx-form-field>
      <nyx-form-field label="Select">
        <template #default="{ id }">
          <nyx-select :id="id" :options="options" />
        </template>
      </nyx-form-field>
      <nyx-form-field label="Switch">
        <template #default="{ id }">
          <nyx-switch :id="id" />
        </template>
      </nyx-form-field>
    </nyx-form>
  `,
})

export const Default = Template({})
export const ExampleForm = TemplateFullExample()
