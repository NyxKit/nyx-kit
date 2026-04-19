import { defineComponent } from 'vue'
import NyxActionItem from './NyxActionItem.vue'
import { NyxTheme } from '@/types'

export default {
  title: 'Components/Data/NyxActionItem',
  component: NyxActionItem,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    onClick: { action: 'click' },
  },
}

export const Default = () => defineComponent({
  components: { NyxActionItem },
  template: `
    <div>
      <nyx-action-item title="Save Changes" action="Save">
        Save your changes to the database.
      </nyx-action-item>
    </div>
  `,
})

export const Themes = () => defineComponent({
  components: { NyxActionItem },
  setup () {
    const themes = Object.values(NyxTheme)
    return { themes }
  },
  template: `
    <div class="flex-col" style="gap: 1rem;">
      <nyx-action-item
        v-for="theme in themes"
        :key="theme"
        :title="'Action ' + theme"
        :action="theme"
        :theme="theme"
      >
        This is a description for {{ theme }} theme.
      </nyx-action-item>
    </div>
  `,
})

export const WithActionSlot = () => defineComponent({
  components: { NyxActionItem },
  template: `
    <div>
      <nyx-action-item title="Export Data">
        Export your data in various formats.
        <template #action>
          <div class="flex" style="gap: 0.5rem;">
            <button style="padding: 0.5rem 1rem; background: #333; color: white; border: 1px solid #555; border-radius: 4px; cursor: pointer;">CSV</button>
            <button style="padding: 0.5rem 1rem; background: #333; color: white; border: 1px solid #555; border-radius: 4px; cursor: pointer;">JSON</button>
          </div>
        </template>
      </nyx-action-item>
    </div>
  `,
})

export const EmptyAction = () => defineComponent({
  components: { NyxActionItem },
  template: `
    <div>
      <nyx-action-item title="Information">
        This action item has no action button.
      </nyx-action-item>
    </div>
  `,
})

export const LongText = () => defineComponent({
  components: { NyxActionItem },
  template: `
    <div>
      <nyx-action-item 
        title="Very Long Title That Should Truncate With Ellipsis" 
        action="Action"
      >
        This is a very long description that might wrap to multiple lines depending on the container width. It contains a lot of text to test the layout handling.
      </nyx-action-item>
    </div>
  `,
})
