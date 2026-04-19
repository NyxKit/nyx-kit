import { defineComponent } from 'vue'
import NyxDropdownMenu from './NyxDropdownMenu.vue'
import { NyxTheme, NyxVariant, NyxSize, type KeyDict } from '@/types'
import { getKeyDictKeyByValue } from '@/utils'
import type { NyxDropdownMenuProps } from './NyxDropdown.types'

const sampleOptions = [
  { label: 'View', value: 'view', icon: 'search' },
  { label: 'Rename', value: 'rename', icon: 'edit' },
  { label: 'Archive', value: 'archive', disabled: true, icon: 'alert-circle' },
]

export default {
  title: 'Components/Navigation/NyxDropdownMenu',
  component: NyxDropdownMenu,
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
  },
}

const Template = (args: NyxDropdownMenuProps) => defineComponent({
  components: { NyxDropdownMenu },
  setup () {
    return { args }
  },
  template: `
    <div style="padding: 1rem; background: var(--nyx-c-bg-soft);">
      <nyx-dropdown-menu v-bind="args" />
    </div>
  `,
})

export const Default = Template({
  options: sampleOptions,
  theme: NyxTheme.Primary,
  size: NyxSize.Medium,
  variant: NyxVariant.Filled,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxDropdownMenu },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel, sampleOptions }
  },
  template: `
    <div class="flex-col" style="gap: 1rem; align-items: flex-start;">
      <div
        v-for="value of values"
        :key="value"
        :class="{ 'flex-col': true }"
        style="gap: 0.5rem;"
      >
        <strong>{{ getLabel(value) }}</strong>
        <nyx-dropdown-menu v-bind="{ [prop]: value, options: sampleOptions }" />
      </div>
    </div>
  `,
})

export const Themes = TemplateAll('theme', NyxTheme)
export const Variants = TemplateAll('variant', NyxVariant)
export const Sizes = TemplateAll('size', NyxSize)
