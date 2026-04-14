import { defineComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import NyxInput from './NyxInput.vue'
import { NyxTheme, NyxVariant, NyxSize, NyxInputType, type KeyDict } from '@/types'
import type { NyxInputProps } from './NyxInput.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxForm from '../NyxForm/NyxForm.vue'
import NyxFormField from '../NyxForm/NyxFormField.vue'

const meta = {
  title: 'Components/NyxInput',
  component: NyxInput,
  argTypes: {
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: Object.values(NyxInputType),
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
} satisfies Meta<typeof NyxInput>

export default meta

type Story = StoryObj<typeof meta>

const Template = (args: NyxInputProps) => defineComponent({
  components: { NyxInput },
  setup () {
    return { args }
  },
  template: `
    <nyx-input v-bind="args" :placeholder="'NyxInput'" />
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxInput, NyxForm, NyxFormField },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-input
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `,
})

export const Default: Story = {
  render: () => Template({}),
}

export const WithPrefix: Story = {
  render: () => Template({ prefix: '$', placeholder: 'Amount' }),
}

export const WithSuffix: Story = {
  render: () => Template({ suffix: 'kg', placeholder: 'Weight' }),
}

export const WithPrefixAndSuffix: Story = {
  render: () => Template({ prefix: '$', suffix: 'USD', placeholder: 'Total' }),
}

export const Types: Story = {
  render: () => TemplateAll('type', NyxInputType)(),
}

export const Themes: Story = {
  render: () => TemplateAll('theme', NyxTheme)(),
}

export const Variants: Story = {
  render: () => TemplateAll('variant', NyxVariant)(),
}

export const Sizes: Story = {
  render: () => TemplateAll('size', NyxSize)(),
}
