import { defineComponent } from 'vue'
import NyxIcon from './NyxIcon.vue'
import { NyxTheme, NyxSize, type KeyDict } from '@/types'
import { getKeyDictKeyByValue } from '@/utils'

const ICONS = ['arrow-right', 'arrow-left', 'chevron-down', 'chevron-up', 'menu', 'x', 'plus', 'minus', 'edit', 'trash']

export default {
  title: 'Components/NyxIcon',
  component: NyxIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ICONS
    },
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme)
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize)
    },
    stroke: {
      control: { type: 'select' },
      options: Object.values(NyxSize)
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A wrapper component for Lucide Vue icons. Supports string-based icon names, optional theme coloring, and size control.\n\n[View all Lucide icons](https://lucide.dev/icons/)'
      }
    }
  }
}

const Template = (args: Record<string, unknown>) => defineComponent({
  components: { NyxIcon },
  setup () {
    return { args }
  },
  template: `<nyx-icon v-bind="args" />`,
})

export const Default = Template({ name: 'arrow-right' })

const TemplateAllProp = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxIcon },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <div class="flex">
      <nyx-icon
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-icon>
    </div>
  `,
})

export const Themes = TemplateAllProp('theme', NyxTheme as KeyDict<string>)
export const Sizes = TemplateAllProp('size', NyxSize as KeyDict<string>)
export const Strokes = TemplateAllProp('stroke', NyxSize as KeyDict<string>)

export const CustomSizes = () => defineComponent({
  components: { NyxIcon },
  setup () {
    const sizes = [10, 20, 32, 48, 64]
    return { sizes, ICONS }
  },
  template: `
    <div>
      <div v-for="size in sizes" :key="size" style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">{{ size }}px:</span>
        <nyx-icon v-for="icon in ICONS" :key="icon" :name="icon" :size="size" />
      </div>
    </div>
  `
})

export const IconGallery = () => defineComponent({
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