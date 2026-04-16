import { defineComponent, onMounted, ref } from 'vue'
import NyxDropdown from './NyxDropdown.vue'
import { NyxTheme, NyxVariant, NyxSize, NyxTrigger, NyxPosition, type KeyDict } from '@/types'
import { getKeyDictKeyByValue } from '@/utils'
import type { NyxDropdownProps } from './NyxDropdown.types'

const sampleOptions = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Delete', value: 'delete', disabled: true },
]

export default {
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
}

const Template = (args: NyxDropdownProps) => defineComponent({
  components: { NyxDropdown },
  setup () {
    return { args }
  },
  template: `
    <nyx-dropdown v-bind="args">
      <button type="button">Actions</button>
    </nyx-dropdown>
  `,
})

export const Default = Template({
  options: sampleOptions,
  theme: NyxTheme.Primary,
  size: NyxSize.Medium,
  variant: NyxVariant.Filled,
  position: NyxPosition.Bottom,
  trigger: NyxTrigger.Hover,
})

export const InteractivePreview = () => defineComponent({
  components: { NyxDropdown },
  setup () {
    const triggerRef = ref<HTMLButtonElement | null>(null)
    onMounted(() => {
      window.setTimeout(() => triggerRef.value?.click(), 0)
    })
    return { sampleOptions, triggerRef }
  },
  template: `
    <nyx-dropdown :options="sampleOptions" trigger="click">
      <button ref="triggerRef" type="button">Open menu</button>
    </nyx-dropdown>
  `,
})

export const CustomDropdown = () => defineComponent({
  components: { NyxDropdown },
  template: `
    <nyx-dropdown>
      <button type="button">Open menu</button>
      <template #dropdown>
        <div style="padding: 1rem; min-width: 14rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md);">
          Custom dropdown content
        </div>
      </template>
    </nyx-dropdown>
  `,
})

const TemplateAll = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxDropdown },
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
        <button type="button">{{ getLabel(value) }}</button>
      </nyx-dropdown>
    </div>
  `,
})

export const Themes = TemplateAll('theme', NyxTheme)
export const Variants = TemplateAll('variant', NyxVariant)
export const Sizes = TemplateAll('size', NyxSize)
