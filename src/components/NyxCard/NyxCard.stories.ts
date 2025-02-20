import { defineComponent } from 'vue'
import NyxCard from './NyxCard.vue'
import { NyxTheme, NyxVariant, NyxSize } from '@/types'
import type { NyxCardProps } from './NyxCard.types'
import NyxButton from '../NyxButton/NyxButton.vue'
import NyxMedia from '../NyxMedia/NyxMedia.vue'

const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis faucibus auctor pellentesque. Sed
  consectetur nulla eget metus consequat vulputate. Nulla venenatis diam dolor, nec ultricies elit cursus a.`

export default {
  title: 'Components/NyxCard',
  component: NyxCard,
  argTypes: {
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
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify']
    },
    layout: {
      control: { type: 'select' },
      options: ['media-first', 'header-first']
    }
  },
  args: {
    title: 'Lorem Ipsum',
    src: 'https://plus.unsplash.com/premium_photo-1739009671609-f28ec1b83346?q=80&w=3750&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    default: lipsum,
    theme: NyxTheme.Primary,
    gradient: NyxTheme.Success,
    textAlign: 'center',
    layout: 'header-first',
    blendMedia: true
  }
}

const Template = (args: NyxCardProps) => defineComponent({
  components: { NyxCard },
  setup () {
    return { args }
  },
  template: `
    <nyx-card v-bind="args">Card</nyx-card>
  `,
})

const TemplateExample = (args: NyxCardProps) => () => defineComponent({
  components: { NyxCard, NyxButton, NyxMedia },
  setup () {
    return { args, lipsum, NyxTheme, NyxSize, NyxVariant }
  },
  template: `
    <nyx-card
      v-bind="args"
      title="Lorem Ipsum"
      textAlign="center"
      layout="header-first"
      blendMedia
    >
      <template #media>
        <NyxMedia #media src="https://placehold.co/400x300" />
      </template>
      <p>{{ lipsum }}</p>
      <template #footer>
        <nyx-button :theme="NyxTheme.Primary" :size="NyxSize.Large" :variant="NyxVariant.Outline">View more</nyx-button>
      </template>
    </nyx-card>
  `,
})

export const Default = Template({})
export const Example = TemplateExample({})
