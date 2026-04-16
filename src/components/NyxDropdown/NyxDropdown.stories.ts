import { defineComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import NyxDropdown from './NyxDropdown.vue'
import { NyxTheme, NyxVariant, NyxSize, NyxTrigger, NyxPosition, type KeyDict } from '@/types'
import { getKeyDictKeyByValue } from '@/utils'
import type { NyxDropdownProps } from './NyxDropdown.types'
import NyxIcon from '../NyxIcon/NyxIcon.vue'

const sampleOptions = [
  { label: 'Edit', value: 'edit', icon: 'edit' },
  { label: 'Duplicate', value: 'duplicate', icon: 'plus' },
  { label: 'Delete', value: 'delete', disabled: true, icon: 'trash' },
]

const meta = {
  title: 'Components/NyxDropdown',
  component: NyxDropdown,
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
    },
    position: {
      control: { type: 'select' },
      options: Object.values(NyxPosition),
    },
    trigger: {
      control: { type: 'select' },
      options: Object.values(NyxTrigger),
    },
  },
} satisfies Meta<typeof NyxDropdown>

export default meta

type Story = StoryObj<typeof meta>

const Template = (args: NyxDropdownProps) => defineComponent({
  components: { NyxDropdown, NyxIcon },
  setup () {
    return { args }
  },
  template: `
    <nyx-dropdown v-bind="args">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="menu" />
        <span>Actions</span>
      </button>
    </nyx-dropdown>
  `,
})

export const Default: Story = {
  render: () => Template({
    options: sampleOptions,
    theme: NyxTheme.Primary,
    size: NyxSize.Medium,
    variant: NyxVariant.Filled,
    position: NyxPosition.Bottom,
    trigger: NyxTrigger.Click,
  }),
}

export const InteractivePreview: Story = {
  render: () => defineComponent({
  components: { NyxDropdown, NyxIcon },
  setup () {
    return { sampleOptions }
  },
  template: `
    <nyx-dropdown :options="sampleOptions" trigger="hover">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="chevron-down" />
        <span>Open menu</span>
      </button>
    </nyx-dropdown>
  `,
  }),
}

export const CustomDropdown: Story = {
  render: () => defineComponent({
  components: { NyxDropdown, NyxIcon },
  template: `
    <nyx-dropdown>
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="settings" />
        <span>Open menu</span>
      </button>
      <template #dropdown>
        <div style="padding: 1rem; min-width: 14rem; display:flex;align-items:center;gap:0.5rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md);">
          <nyx-icon name="settings" />
          Custom dropdown content
        </div>
      </template>
    </nyx-dropdown>
  `,
  }),
}

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxDropdown, NyxIcon },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel, sampleOptions }
  },
  template: `
    <div class="flex-col" style="gap: 1rem; align-items: flex-start;">
      <nyx-dropdown
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value, options: sampleOptions }"
      >
        <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
          <nyx-icon name="arrow-right" />
          <span>{{ getLabel(value) }}</span>
        </button>
      </nyx-dropdown>
    </div>
  `,
})

export const Themes: Story = { render: TemplateAll('theme', NyxTheme) }
export const Variants: Story = { render: TemplateAll('variant', NyxVariant) }
export const Sizes: Story = { render: TemplateAll('size', NyxSize) }
