import { defineComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import NyxTabs from './NyxTabs.vue'
import { NyxTheme, NyxSize, NyxTabsVariant } from '@/types'
import type { NyxTabsProps } from './NyxTabs.types'

const tabs = ['profile', 'account', 'settings']
const filler = Array.from({ length: 18 }, (_, index) => index + 1)
const checklist = [
  'Permissions review',
  'Connected devices',
  'Notification digest',
  'Security timeline',
  'Export history',
  'Automation rules',
]

const meta = {
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
    tabs,
  },
} satisfies Meta<typeof NyxTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: NyxTabsProps) => defineComponent({
    components: { NyxTabs },
    setup () {
      return { args, filler, checklist }
    },
    template: `
      <div style="height: 24rem; max-height: 24rem;">
        <nyx-tabs v-bind="args" style="height: 100%;">
          <template v-slot:tab-profile>
            <div>
              <h3>Profile overview</h3>
              <p>Scrollable content keeps the tabs usable when a panel grows taller than the available space.</p>
              <ul>
                <li v-for="item in checklist" :key="'profile-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'profile-' + item">
                Profile section {{ item }} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </template>

          <template v-slot:tab-account>
            <div>
              <h3>Account activity</h3>
              <p>Use the vertical scrollbar inside the active panel to review long account details without losing the tab navigation.</p>
              <ul>
                <li v-for="item in checklist" :key="'account-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'account-' + item">
                Account event {{ item }} - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </template>

          <template v-slot:tab-settings>
            <div>
              <h3>Settings audit</h3>
              <p>This panel intentionally overflows so the default Storybook example demonstrates the scroll behaviour.</p>
              <ul>
                <li v-for="item in checklist" :key="'settings-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'settings-' + item">
                Settings note {{ item }} - Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </template>
        </nyx-tabs>
      </div>
    `,
  }),
}
