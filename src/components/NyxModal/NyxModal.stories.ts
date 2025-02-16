import { defineComponent, ref } from 'vue'
import NyxModal from './NyxModal.vue'
import { NyxSize, type KeyDict } from '@/types'
import type { NyxModalProps } from './NyxModal.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxButton from '../NyxButton/NyxButton.vue'

const lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices ac enim ut, placerat facilisis mauris. Cras luctus ante ante, viverra interdum mauris bibendum et. '

export default {
  title: 'Components/NyxModal',
  component: NyxModal,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
    modelValue: {
      control: { type: 'boolean' }
    }
  },
  args: {
    title: 'My Model'
  }
}

const Template = (args: NyxModalProps) => defineComponent({
  components: { NyxModal },
  setup () {
    const isOpen = ref(true)
    const onClick = () => isOpen.value = true
    return { args, isOpen, onClick }
  },
  template: `
    <div>
      <nyx-modal v-bind="args">My model</nyx-button>
    </div>
  `,
})

const TemplateAllProp = (prop: string, dict: KeyDict<string>) => () => defineComponent({
  components: { NyxModal, NyxButton },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    const isOpen = ref(false)
    const currentValue = ref(values[0])
    const numLoops = ref(1)
    const openModal = (v: string, i: number) => {
      currentValue.value = v
      numLoops.value = i + 1
      isOpen.value = true
    }
    return { prop, values, getLabel, isOpen, openModal, currentValue, lipsum, numLoops }
  },
  template: `
    <div class="flex">
      <nyx-button
        v-for="(value, i) of values"
        :key="value"
        v-bind="{ [prop]: value }"
        @click="openModal(value, i)"
      >{{ getLabel(value) }}</nyx-button>
      <nyx-modal
        v-bind="{ [prop]: currentValue }"
        :title="getLabel(currentValue)"
        v-model="isOpen"
      ><template v-for="i in numLoops">{{ lipsum }}</template></nyx-modal>
    </div>
  `,
})

export const Default = Template({})
export const Sizes = TemplateAllProp('size', NyxSize)
