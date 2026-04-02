import { defineComponent, ref } from 'vue'
import NyxSelect from './NyxSelect.vue'
import { NyxTheme, NyxVariant, NyxSize, NyxSelectType, type KeyDict } from '@/types'
import type { NyxSelectProps } from './NyxSelect.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxForm from '../NyxForm/NyxForm.vue'
import NyxFormField from '../NyxForm/NyxFormField.vue'

const options = Object.values(NyxTheme).map((theme) => ({ label: theme, value: theme }))

const groupedOptions = [
  {
    label: 'Brand',
    options: [
      { label: 'Primary', value: NyxTheme.Primary },
      { label: 'Secondary', value: NyxTheme.Secondary },
    ]
  },
  {
    label: 'Status',
    options: [
      { label: 'Info', value: NyxTheme.Info },
      { label: 'Success', value: NyxTheme.Success },
      { label: 'Warning', value: NyxTheme.Warning },
      { label: 'Danger', value: NyxTheme.Danger },
    ]
  }
]

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
      options: Object.values(NyxVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    }
  },
  args: {
    options
  }
}

const Template = (args: NyxSelectProps) => defineComponent({
  components: { NyxSelect },
  inheritAttrs: false,
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
export const WithGroups = () => defineComponent({
  components: { NyxSelect },
  setup () {
    return { options: groupedOptions }
  },
  template: `<nyx-select :options="options" placeholder="NyxSelect" />`,
})
export const ExternalModelSync = () => defineComponent({
  components: { NyxSelect },
  setup () {
    const modelValue = ref<string>(NyxTheme.Primary)
    const cycleValue = () => {
      modelValue.value = modelValue.value === NyxTheme.Primary ? NyxTheme.Danger : NyxTheme.Primary
    }
    const clearValue = () => {
      modelValue.value = ''
    }
    return { modelValue, options, cycleValue, clearValue }
  },
  template: `
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <div style="display:flex;gap:0.5rem;">
        <button type="button" @click="cycleValue">Toggle value</button>
        <button type="button" @click="clearValue">Clear</button>
      </div>
      <nyx-select v-model="modelValue" :options="options" placeholder="NyxSelect" />
      <p>External value: {{ modelValue }}</p>
    </div>
  `,
})
export const Types = TemplateAll('type', NyxSelectType)
export const Themes = TemplateAll('theme', NyxTheme)
export const Variants = TemplateAll('variant', NyxVariant)
export const Sizes = TemplateAll('size', NyxSize)
