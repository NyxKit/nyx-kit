import { defineComponent } from 'vue'
import NyxStatusDot from './NyxStatusDot.vue'
import { NyxAnimationState, NyxTheme, NyxVariant, NyxSize, type KeyDict } from '@/types'
import type { NyxStatusDotProps } from './NyxStatusDot.types'
import { getKeyDictKeyByValue } from '@/utils'

export default {
  title: 'Components/Feedback/NyxStatusDot',
  component: NyxStatusDot,
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
    animation: {
      control: { type: 'select' },
      options: Object.values(NyxAnimationState),
    },
    backlight: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
  },
}

const Template = (args: NyxStatusDotProps) => defineComponent({
  components: { NyxStatusDot },
  setup () {
    return { args }
  },
  template: `
    <nyx-status-dot v-bind="args" />
  `,
})

const TemplateAllProp = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxStatusDot },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel }
  },
  template: `
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1rem; flex-wrap: wrap;">
        <div v-for="value of values" :key="value" class="flex" style="align-items: center; gap: 0.5rem; min-width: 8rem;">
          <nyx-status-dot v-bind="{ [prop]: value, label: getLabel(value) }" />
        </div>
      </div>
    </div>
  `,
})

const LabelsTemplate = () => () => defineComponent({
  components: { NyxStatusDot },
  template: `
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <nyx-status-dot label="Online" :backlight="true" />
        <nyx-status-dot :backlight="true">
          Custom slot label
        </nyx-status-dot>
        <nyx-status-dot theme="info" label="Offline" variant="soft" />
      </div>
    </div>
  `,
})

const AnimationTemplate = () => () => defineComponent({
  components: { NyxStatusDot },
  template: `
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <nyx-status-dot label="Paused" :backlight="true" animation="paused" />
        <nyx-status-dot label="Playing" :backlight="true" animation="playing" />
      </div>
    </div>
  `,
})

export const Default = Template({})
export const Labels = LabelsTemplate()
export const Animation = AnimationTemplate()
export const Themes = TemplateAllProp('theme', NyxTheme)
export const Variants = TemplateAllProp('variant', NyxVariant)
export const Sizes = TemplateAllProp('size', NyxSize)
export const Animations = TemplateAllProp('animation', NyxAnimationState)
