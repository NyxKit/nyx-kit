import { defineComponent, ref } from 'vue'
import NyxModal from './NyxModal.vue'
import { NyxSize, NyxTheme, type KeyDict } from '@/types'
import type { NyxModalProps } from './NyxModal.types'
import { getKeyDictKeyByValue } from '@/utils'
import NyxButton from '../NyxButton/NyxButton.vue'
import { useNyxConfirm } from '@/composables/useNyxConfirm'

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
      ><template v-for="i in numLoops"><p>{{ lipsum }}</p></template></nyx-modal>
    </div>
  `,
})

const TemplatePixel = () => () => defineComponent({
  components: { NyxModal, NyxButton },
  setup () {
    const isOpen = ref(false)
    return { isOpen, lipsum }
  },
  template: `
    <div class="flex">
      <nyx-button pixel @click="isOpen = !isOpen">Pixel</nyx-button>
      <nyx-modal pixel title="Pixel" v-model="isOpen">
        <template v-for="i in 3"><p>{{ lipsum }}</p></template>
      </nyx-modal>
    </div>
  `
})

export const Default = Template({})
export const Sizes = TemplateAllProp('size', NyxSize)
export const Pixel = TemplatePixel()

const TemplateThemes = () => () => defineComponent({
  components: { NyxModal, NyxButton },
  setup () {
    const isOpen = ref(false)
    const currentTheme = ref(NyxTheme.Primary)
    const themes = Object.values(NyxTheme)

    const openWithTheme = (theme: NyxTheme) => {
      currentTheme.value = theme
      isOpen.value = true
    }

    return { isOpen, currentTheme, themes, openWithTheme, lipsum }
  },
  template: `
    <div class="flex">
      <nyx-button
        v-for="theme in themes"
        :key="theme"
        :theme="theme"
        @click="openWithTheme(theme)"
      >{{ theme }}</nyx-button>
      <nyx-modal
        :theme="currentTheme"
        title="Confirm"
        confirm-text="Confirm"
        cancel-text="Cancel"
        v-model="isOpen"
      ><p>{{ lipsum }}</p></nyx-modal>
    </div>
  `
})

const TemplateProgrammatic = () => () => defineComponent({
  components: { NyxButton },
  setup () {
    const { confirm } = useNyxConfirm()
    const lastResult = ref<string>('')

    const handleClick = async () => {
      const result = await confirm({
        theme: NyxTheme.Danger,
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      })
      lastResult.value = result.isSuccess ? 'Confirmed!' : 'Cancelled'
    }

    return { lastResult, handleClick }
  },
  template: `
    <div>
      <p class="mb-4">Click the button to trigger a programmatic confirmation via useNyxConfirm()</p>
      <nyx-button @click="handleClick">Open Confirm Dialog</nyx-button>
      <p v-if="lastResult" class="mt-4 text-sm">Result: {{ lastResult }}</p>
    </div>
  `
})

export const Themes = TemplateThemes()
export const Programmatic = TemplateProgrammatic()
