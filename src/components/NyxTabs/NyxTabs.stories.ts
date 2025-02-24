import { defineComponent } from 'vue'
import NyxTabs from './NyxTabs.vue'
import { NyxTheme, NyxSize, NyxTabsVariant } from '@/types'
import type { NyxTabsProps } from './NyxTabs.types'

const tabs = ['profile', 'account', 'settings']

export default {
  title: 'Components/NyxTabs',
  component: NyxTabs,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(NyxTabsVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
  },
  args: {
    tabs
  }
}

const Template = (args: NyxTabsProps) => defineComponent({
  components: { NyxTabs },
  setup () {
    return { args }
  },
  template: `
    <nyx-tabs v-bind="args"></nyx-tabs>
  `,
})

export const Default = Template({ tabs })
