import { computed, defineComponent } from 'vue'
import NyxButton from './NyxButton.vue'
import { NyxTheme, NyxVariant, NyxSize, type KeyDict, NyxShape } from '@/types'
import type { NyxButtonProps } from './NyxButton.types'
import { getKeyDictKeyByValue } from '@/utils'

export default {
  title: 'Components/NyxButton',
  component: NyxButton,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    gradient: {
      control: { type: 'select' },
      options: [true, false, ...Object.values(NyxTheme)]
    },
    backlight: {
      control: { type: 'select' },
      options: [true, false, ...Object.values(NyxTheme)]
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(NyxVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
    shape: {
      control: { type: 'select' },
      options: Object.values(NyxShape),
    },
    onClick: { action: 'click' },
  },
}

const Template = (args: NyxButtonProps) => defineComponent({
  components: { NyxButton },
  setup () {
    return { args }
  },
  template: `
    <nyx-button v-bind="args" @click="onClick">Button</nyx-button>
  `,
})

const TemplateAllProp = (prop: string, dict: KeyDict<string>) => (args: NyxButtonProps) => defineComponent({
  components: { NyxButton },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    const isTheme = computed(() => dict === NyxTheme)
    return { prop, values, getLabel, isTheme }
  },
  template: `
    <div class="flex">
      <nyx-button
        v-for="value of values"
        :key="value"
        :theme="isTheme ? value : undefined"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-button>
    </div>
  `,
})

const TemplateAll = () => () => defineComponent({
  components: { NyxButton },
  setup () {
    const themes = Object.values(NyxTheme)
    const variants = Object.values(NyxVariant)
    const sizes = Object.values(NyxSize)
    const shapes = Object.values(NyxShape)
    return { themes, variants, sizes, shapes }
  },
  template: `
    <div class="flex-col">
      <div class="flex-col" v-for="shape of shapes" style="margin-bottom: 4rem">
        <div class="flex-col" v-for="size of sizes" style="margin-bottom: 2rem">
          <div class="flex" v-for="variant of variants">
            <nyx-button
              v-for="theme of themes"
              :key="value"
              :variant="variant"
              :theme="theme"
              :shape="shape"
              :size="size"
            >Click me</nyx-button>
          </div>
        </div>
      </div>
    </div>
  `,
})

export const Default = Template({})
export const Themes = TemplateAllProp('theme',  NyxTheme)
export const Variants = TemplateAllProp('variant', NyxVariant)
export const Shapes = TemplateAllProp('shape', NyxShape)
export const Sizes = TemplateAllProp('size', NyxSize)
export const Backlights = TemplateAllProp('backlight', NyxTheme)
export const Gradients = TemplateAllProp('gradient', NyxTheme)
export const All = TemplateAll()
