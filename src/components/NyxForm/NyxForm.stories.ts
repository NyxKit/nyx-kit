import { defineComponent } from 'vue'
import NyxForm from './NyxForm.vue'
import NyxFormField from './NyxFormField.vue'
import NyxInput from '../NyxInput/NyxInput.vue'

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
  components: { NyxForm, NyxFormField, NyxInput },
  setup () {
    return {}
  },
  template: `
    <nyx-form>
      <nyx-form-field label="Label">
        <nyx-input />
      </nyx-form-field>
    </nyx-form>
  `,
})

export const Default = Template({})
export const FullExample = TemplateFullExample()
