import { defineComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import NyxBreadcrumbs from './NyxBreadcrumbs.vue'
import { NyxTheme, NyxSize, type NyxBreadcrumb, NyxVariant } from '@/types'
import type { NyxBreadcrumbsProps } from './NyxBreadcrumbs.types'

const breadcrumbsStrings: string[] = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
const breadcrumbs: NyxBreadcrumb[] = breadcrumbsStrings.map((b) => ({ label: b, href: '#' }))
const breadcrumbIcons: NyxBreadcrumb[] = [
  { label: 'Home', icon: 'house', href: '/' },
  { label: 'Library', icon: 'folder-open', href: '/library' },
  { label: 'Breadcrumbs', icon: 'file-text' },
]
const breadcrumbRoutes: NyxBreadcrumb[] = [
  { label: 'Home', icon: 'house', route: '/' },
  { label: 'Library', route: { name: 'library', query: { filter: 'all' } } },
  { label: 'Breadcrumbs', href: '/docs/breadcrumbs' },
]
const meta = {
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
  },
  args: {
    items: breadcrumbs,
  },
} satisfies Meta<typeof NyxBreadcrumbs>

export default meta

type Story = StoryObj<typeof meta>

function renderBreadcrumbs (template = '<nyx-breadcrumbs v-bind="args" />') {
  return (args: NyxBreadcrumbsProps) => defineComponent({
    components: { NyxBreadcrumbs },
    setup () {
      return { args }
    },
    template,
  })
}

export const Default: Story = {
  render: renderBreadcrumbs(),
  args: {
    items: breadcrumbs,
  },
}

export const WithIcons: Story = {
  render: renderBreadcrumbs(),
  args: {
    items: breadcrumbIcons,
  },
}

export const WithRouteItems: Story = {
  render: renderBreadcrumbs(),
  args: {
    items: breadcrumbRoutes,
  },
}

export const WithIconSeparator: Story = {
  render: () => defineComponent({
    components: { NyxBreadcrumbs },
    setup () {
      const args: NyxBreadcrumbsProps = {
        items: breadcrumbIcons,
        separator: { icon: 'chevron-right' },
      }

      return { args }
    },
    template: '<nyx-breadcrumbs v-bind="args" />',
  }),
}

export const WithCustomSeparator: Story = {
  render: renderBreadcrumbs(`
    <nyx-breadcrumbs v-bind="args">
      <template #separator>
        <span class="custom-separator">|</span>
      </template>
    </nyx-breadcrumbs>
  `),
  args: {
    items: breadcrumbIcons,
  },
}

export const WithCustomItemSlot: Story = {
  render: renderBreadcrumbs(`
    <nyx-breadcrumbs v-bind="args">
      <template #item="{ item }">
        <span style="display:inline-flex;align-items:center;gap:0.4rem;text-transform:uppercase;letter-spacing:0.08em;">
          <strong>{{ item.label }}</strong>
        </span>
      </template>
    </nyx-breadcrumbs>
  `),
  args: {
    items: breadcrumbIcons,
  },
}
