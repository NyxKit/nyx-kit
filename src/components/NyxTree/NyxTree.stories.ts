import { defineComponent, ref } from 'vue'
import NyxTree from './NyxTree.vue'
import { NyxTreeNodeStatus } from './NyxTree.types'
import type { NyxTreeNodeBase } from './NyxTree.types'

export default {
  title: 'Components/Data/NyxTree',
  component: NyxTree,
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    onSelect: { action: 'select' },
  },
}

const flatModel: NyxTreeNodeBase[] = [
  { id: 'alpha', label: 'Alpha', children: [] },
  { id: 'beta', label: 'Beta', children: [] },
  { id: 'gamma', label: 'Gamma', children: [] },
]

const nestedModel: NyxTreeNodeBase[] = [
  {
    id: 'fruits',
    label: 'Fruits',
    children: [
      {
        id: 'tropical',
        label: 'Tropical',
        children: [
          { id: 'mango', label: 'Mango', children: [] },
          { id: 'pineapple', label: 'Pineapple', children: [] },
          { id: 'papaya', label: 'Papaya', children: [] },
        ],
      },
      {
        id: 'berries',
        label: 'Berries',
        children: [
          { id: 'strawberry', label: 'Strawberry', children: [] },
          { id: 'blueberry', label: 'Blueberry', children: [] },
          { id: 'raspberry', label: 'Raspberry', children: [] },
        ],
      },
      { id: 'apple', label: 'Apple', children: [] },
      { id: 'banana', label: 'Banana', children: [] },
    ],
  },
  {
    id: 'veggies',
    label: 'Vegetables',
    children: [
      {
        id: 'root-veg',
        label: 'Root Vegetables',
        children: [
          { id: 'carrot', label: 'Carrot', children: [] },
          { id: 'parsnip', label: 'Parsnip', children: [] },
          { id: 'beetroot', label: 'Beetroot', children: [] },
        ],
      },
      { id: 'broccoli', label: 'Broccoli', children: [] },
      { id: 'spinach', label: 'Spinach', children: [] },
    ],
  },
  {
    id: 'grains',
    label: 'Grains',
    children: [
      { id: 'wheat', label: 'Wheat', children: [] },
      { id: 'rice', label: 'Rice', children: [] },
      { id: 'oats', label: 'Oats', children: [] },
    ],
  },
]

export const Default = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeNodeBase[]>(JSON.parse(JSON.stringify(flatModel)))
    return { model }
  },
  template: `<NyxTree v-model="model" />`,
})

export const Nested = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeNodeBase[]>(JSON.parse(JSON.stringify(nestedModel)))
    return { model }
  },
  template: `<NyxTree v-model="model" />`,
})

export const WithStatus = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeNodeBase[]>([
      {
        id: 'fruits',
        label: 'Fruits',
        status: NyxTreeNodeStatus.Open,
        children: [
          { id: 'apple', label: 'Apple', status: NyxTreeNodeStatus.Active, children: [] },
          { id: 'banana', label: 'Banana', children: [] },
        ],
      },
      {
        id: 'veggies',
        label: 'Veggies',
        children: [
          { id: 'carrot', label: 'Carrot', children: [] },
        ],
      },
    ])
    return { model }
  },
  template: `<NyxTree v-model="model" />`,
})

export const NodeDisabled = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeNodeBase[]>([
      {
        id: 'fruits',
        label: 'Fruits (disabled)',
        disabled: true,
        children: [
          { id: 'apple', label: 'Apple', children: [] },
        ],
      },
      { id: 'beta', label: 'Beta', children: [] },
    ])
    return { model }
  },
  template: `<NyxTree v-model="model" />`,
})

export const Disabled = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeNodeBase[]>(JSON.parse(JSON.stringify(nestedModel)))
    return { model }
  },
  template: `<NyxTree v-model="model" :disabled="true" />`,
})
