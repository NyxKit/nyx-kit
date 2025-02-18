import { defineComponent } from 'vue'
import NyxBreadcrumbs from './NyxBreadcrumbs.vue'
import { NyxTheme, NyxSize, type NyxBreadcrumb, NyxVariant } from '@/types'
import type { NyxBreadcrumbsProps } from './NyxBreadcrumbs.types'

const breadcrumbsStrings: string[] = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
const breadcrumbs: NyxBreadcrumb[] = breadcrumbsStrings.map((b) => ({ label: b, href: '#' }))

export default {
  title: 'Components/NyxBreadcrumbs',
  component: NyxBreadcrumbs,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(NyxVariant),
    },
    onClick: { action: 'click' },
  },
  args: {
    items: breadcrumbs
  }
}

const Template = (args: NyxBreadcrumbsProps) => defineComponent({
  components: { NyxBreadcrumbs },
  setup () {
    return { args }
  },
  template: `
    <nyx-breadcrumbs v-bind="args" @click="onClick">Button</nyx-breadcrumbs>
  `,
})

export const Default = Template({ items: breadcrumbs })
