import { defineComponent, ref } from 'vue'
import NyxModal from './NyxModal.vue'
import { NyxSize } from '@/types'
import type { NyxModalProps } from './NyxModal.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxButton from '../NyxButton/NyxButton.vue'

export default {
  title: 'Components/NyxModal',
  component: NyxModal,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    }
  },
}

const Template = (args: NyxModalProps) => defineComponent({
  components: { NyxModal, NyxButton },
  setup () {
    const isOpen = ref(true)
    return { args, isOpen }
  },
  template: `
    <div>
      <nyx-button @click="isOpen = true">Open modal</nyx-button>
      <nyx-modal :value="true">My model</nyx-button>
    </div>
  `,
})

export const Default = Template({})
