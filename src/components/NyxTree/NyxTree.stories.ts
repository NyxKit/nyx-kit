import { defineComponent, ref } from 'vue'
import NyxTree from './NyxTree.vue'
import { NyxTreeNodeStatus } from './NyxTree.types'
import type { NyxTreeModel } from './NyxTree.types'

export default {
  title: 'Components/NyxTree',
  component: NyxTree,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    onSelect: { action: 'select' },
  },
}

export const Default = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>([
      { id: 'alpha', label: 'Alpha', children: [] },
      { id: 'beta', label: 'Beta', children: [] },
      { id: 'gamma', label: 'Gamma', children: [] },
    ])
    return { model }
  },
  template: `
    <nyx-tree v-model="model" />
  `,
})

export const Nested = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>([
      { id: 'fruits', label: 'Fruits', children: [
        { id: 'apple', label: 'Apple', children: [] },
        { id: 'banana', label: 'Banana', children: [] },
      ]},
      { id: 'veggies', label: 'Veggies', children: [
        { id: 'carrot', label: 'Carrot', children: [] },
        { id: 'broccoli', label: 'Broccoli', children: [] },
      ]},
      { id: 'grains', label: 'Grains', children: [
        { id: 'rice', label: 'Rice', children: [] },
      ]},
    ])
    return { model }
  },
  template: `
    <nyx-tree v-model="model" />
  `,
})

export const WithStatus = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>([
      { id: 'fruits', label: 'Fruits', status: NyxTreeNodeStatus.Open, children: [
        { id: 'apple', label: 'Apple', status: NyxTreeNodeStatus.Active, children: [] },
        { id: 'banana', label: 'Banana', children: [] },
      ]},
      { id: 'veggies', label: 'Veggies', children: [
        { id: 'carrot', label: 'Carrot', children: [] },
      ]},
    ])
    return { model }
  },
  template: `
    <nyx-tree v-model="model" />
  `,
})

export const Interactive = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>([
      { id: 'fruits', label: 'Fruits', children: [
        { id: 'apple', label: 'Apple', children: [] },
        { id: 'banana', label: 'Banana', children: [] },
        { id: 'citrus', label: 'Citrus', children: [
          { id: 'lemon', label: 'Lemon', children: [] },
          { id: 'orange', label: 'Orange', children: [] },
        ]},
      ]},
      { id: 'veggies', label: 'Veggies', children: [
        { id: 'carrot', label: 'Carrot', children: [] },
        { id: 'broccoli', label: 'Broccoli', children: [] },
      ]},
      { id: 'grains', label: 'Grains', children: [
        { id: 'rice', label: 'Rice', children: [] },
      ]},
    ])

    return { model }
  },
  template: `
    <nyx-tree v-model="model" />
  `,
})

export const NodeDisabled = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>([
      { id: 'fruits', label: 'Fruits', children: [
        { id: 'apple', label: 'Apple', children: [] },
        { id: 'banana', label: 'Banana', children: [] },
      ]},
      { id: 'veggies', label: 'Veggies', disabled: true, children: [
        { id: 'carrot', label: 'Carrot', children: [] },
      ]},
      { id: 'grains', label: 'Grains', children: [
        { id: 'rice', label: 'Rice', children: [] },
      ]},
    ])
    return { model }
  },
  template: `
    <div>
      <p style="margin-bottom: 1rem; color: var(--nyx-c-gray)">
        Veggies branch has <code>disabled: true</code>
      </p>
      <nyx-tree v-model="model" />
    </div>
  `,
})

export const Disabled = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>([
      { id: 'fruits', label: 'Fruits', children: [
        { id: 'apple', label: 'Apple', children: [] },
        { id: 'banana', label: 'Banana', children: [] },
      ]},
      { id: 'veggies', label: 'Veggies', children: [
        { id: 'carrot', label: 'Carrot', children: [] },
      ]},
    ])
    return { model }
  },
  template: `
    <nyx-tree v-model="model" :disabled="true" />
  `,
})
