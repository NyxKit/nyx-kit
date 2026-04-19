import { defineComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import NyxButtonGroup from './NyxButtonGroup.vue'
import NyxButton from '../NyxButton/NyxButton.vue'
import { NyxDirection, NyxVariant } from '@/types'
import type { NyxButtonGroupProps } from './NyxButtonGroup.types'

const labels = ['Primary', 'Secondary', 'Tertiary']

const meta = {
  title: 'Components/Basic/NyxButtonGroup',
  component: NyxButtonGroup,
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: Object.values(NyxDirection),
    },
    variant: {
      control: { type: 'select' },
      options: [NyxVariant.Soft, NyxVariant.Ghost],
    },
  },
  args: {
    direction: NyxDirection.Horizontal,
    variant: NyxVariant.Ghost,
  },
} satisfies Meta<typeof NyxButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

const renderGroup = (args: NyxButtonGroupProps) => defineComponent({
  components: { NyxButtonGroup, NyxButton },
  setup () {
    return { args, labels }
  },
  template: `
    <nyx-button-group v-bind="args">
      <nyx-button v-for="label in labels" :key="label">
        {{ label }}
      </nyx-button>
    </nyx-button-group>
  `,
})

export const Default: Story = {
  render: (args: NyxButtonGroupProps) => renderGroup(args),
}

export const Vertical: Story = {
  args: {
    direction: NyxDirection.Vertical,
  },
  render: (args: NyxButtonGroupProps) => renderGroup(args),
}

export const Soft: Story = {
  args: {
    variant: NyxVariant.Soft,
  },
  render: (args: NyxButtonGroupProps) => renderGroup(args),
}
