import { defineComponent } from 'vue'
import NyxDropdownItem from './NyxDropdownItem.vue'

export default {
  title: 'Components/NyxDropdownItem',
  component: NyxDropdownItem,
}

export const Default = () => defineComponent({
  components: { NyxDropdownItem },
  template: `
    <div style="min-width: 12rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md); overflow: hidden;">
      <nyx-dropdown-item :option="{ label: 'Open', value: 'open', icon: 'check-circle' }" />
      <nyx-dropdown-item :option="{ label: 'Disabled', value: 'disabled', disabled: true, icon: 'x-circle' }" />
    </div>
  `,
})

export const LongLabel = () => defineComponent({
  components: { NyxDropdownItem },
  template: `
    <div style="min-width: 18rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md); overflow: hidden;">
      <nyx-dropdown-item :option="{ label: 'A very long menu label that should still read cleanly', value: 'long', icon: 'home' }" />
    </div>
  `,
})
