import { defineComponent } from 'vue'
import NyxIcon from './NyxIcon.vue'
import { NyxTheme, NyxSize } from '@/types'

const ICONS = ['arrow-right', 'check-circle', 'x-circle', 'alert-circle', 'star', 'heart', 'user', 'settings', 'home', 'search']

export default {
  title: 'Components/NyxIcon',
  component: NyxIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ICONS
    },
    variant: {
      control: { type: 'select' },
      options: ['line', 'filled']
    },
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme)
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize)
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A wrapper component for Lucide Vue icons. Supports string-based icon names, variant switching (line/filled), optional theme coloring, and size control.\n\n[View all Lucide icons](https://lucide.dev/icons/)'
      }
    }
  }
}

export const Default = (args: Record<string, unknown>) => ({
  components: { NyxIcon },
  setup() {
    return { args }
  },
  template: `<nyx-icon v-bind="args" />`
})

export const Variants = () => ({
  components: { NyxIcon },
  template: `
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">Line:</span>
        <nyx-icon name="arrow-right" variant="line" />
        <nyx-icon name="check-circle" variant="line" />
        <nyx-icon name="x-circle" variant="line" />
        <nyx-icon name="alert-circle" variant="line" />
        <nyx-icon name="star" variant="line" />
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span style="min-width:60px">Filled:</span>
        <nyx-icon name="arrow-right" variant="filled" />
        <nyx-icon name="check-circle" variant="filled" />
        <nyx-icon name="x-circle" variant="filled" />
        <nyx-icon name="alert-circle" variant="filled" />
        <nyx-icon name="star" variant="filled" />
      </div>
    </div>
  `
})

export const WithTheme = () => ({
  components: { NyxIcon },
  template: `
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:80px">Primary:</span>
        <nyx-icon name="arrow-right" theme="Primary" />
        <nyx-icon name="check-circle" theme="Primary" />
        <nyx-icon name="star" theme="Primary" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:80px">Success:</span>
        <nyx-icon name="arrow-right" theme="Success" />
        <nyx-icon name="check-circle" theme="Success" />
        <nyx-icon name="star" theme="Success" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:80px">Danger:</span>
        <nyx-icon name="arrow-right" theme="Danger" />
        <nyx-icon name="check-circle" theme="Danger" />
        <nyx-icon name="star" theme="Danger" />
      </div>
    </div>
  `
})

export const Sizes = () => ({
  components: { NyxIcon },
  setup() {
    return { NyxSize }
  },
  template: `
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">XS:</span>
        <nyx-icon name="arrow-right" :size="NyxSize.XSmall" />
        <nyx-icon name="check-circle" :size="NyxSize.XSmall" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">SM:</span>
        <nyx-icon name="arrow-right" :size="NyxSize.Small" />
        <nyx-icon name="check-circle" :size="NyxSize.Small" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">MD:</span>
        <nyx-icon name="arrow-right" :size="NyxSize.Medium" />
        <nyx-icon name="check-circle" :size="NyxSize.Medium" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">LG:</span>
        <nyx-icon name="arrow-right" :size="NyxSize.Large" />
        <nyx-icon name="check-circle" :size="NyxSize.Large" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">XL:</span>
        <nyx-icon name="arrow-right" :size="NyxSize.XLarge" />
        <nyx-icon name="check-circle" :size="NyxSize.XLarge" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">2XL:</span>
        <nyx-icon name="arrow-right" :size="NyxSize.XXLarge" />
        <nyx-icon name="check-circle" :size="NyxSize.XXLarge" />
      </div>
    </div>
  `
})

export const CustomSizes = () => ({
  components: { NyxIcon },
  template: `
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">10px:</span>
        <nyx-icon name="arrow-right" :size="10" />
        <nyx-icon name="check-circle" :size="10" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">48px:</span>
        <nyx-icon name="arrow-right" :size="48" />
        <nyx-icon name="check-circle" :size="48" />
      </div>
    </div>
  `
})

export const IconGallery = () => ({
  components: { NyxIcon },
  template: `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px">
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="arrow-right" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">arrow-right</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="arrow-left" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">arrow-left</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="chevron-down" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">chevron-down</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="chevron-up" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">chevron-up</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="menu" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">menu</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="x" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">x</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="plus" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">plus</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="minus" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">minus</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="edit" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">edit</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="trash" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">trash</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="check-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">check-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="x-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">x-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="alert-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">alert-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="star" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">star</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="heart" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">heart</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="settings" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">settings</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="home" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">home</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="search" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">search</span>
      </div>
    </div>
  `
})