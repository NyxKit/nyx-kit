import { defineComponent } from 'vue'
import NyxAvatar from './NyxAvatar.vue'
import { NyxShape, NyxSize } from '@/types'
import type { NyxAvatarProps } from './NyxAvatar.types'

export default {
  title: 'Components/NyxAvatar',
  component: NyxAvatar,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
    shape: {
      control: { type: 'select' },
      options: Object.values(NyxShape)
    }
  },
  args: {
    src: 'https://placehold.co/400',
    name: 'Arne Decant',
    color: '#34CCC1'
  }
}

const Template = (args: NyxAvatarProps) => defineComponent({
  components: { NyxAvatar },
  setup () {
    return { args }
  },
  template: `
    <nyx-avatar v-bind="args" />
  `,
})

export const Default = Template({})
