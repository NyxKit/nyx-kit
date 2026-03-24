import { defineComponent, ref } from 'vue'
import NyxTree from './NyxTree.vue'
import type { NyxTreeModel } from './NyxTree.types'

const flatModel: NyxTreeModel = {
  Alpha: 'a',
  Beta: 'b',
  Gamma: 'c',
}

const nestedModel: NyxTreeModel = {
  Fruits: {
    Apple: 'apple',
    Banana: 'banana',
    Citrus: {
      Lemon: 'lemon',
      Orange: 'orange',
    },
  },
  Veggies: {
    Carrot: 'carrot',
    Broccoli: 'broccoli',
  },
  Grains: {
    Rice: 'rice',
  },
}

// Banana is a disabled leaf; Grains is a disabled branch
const modelWithDisabled: NyxTreeModel = {
  Fruits: {
    Apple: 'apple',
    Banana: 'banana',
    Citrus: {
      Lemon: 'lemon',
      Orange: 'orange',
    },
  },
  Veggies: {
    Carrot: 'carrot',
    Broccoli: 'broccoli',
  },
  Grains: {
    disabled: true,
    Rice: 'rice',
  },
}

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
    const model = ref<NyxTreeModel>(flatModel)
    const selected = ref<string[]>([])
    return { model, selected }
  },
  template: `
    <nyx-tree v-model="model" :selected="selected" @select="selected = $event" />
  `,
})

export const Nested = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>(nestedModel)
    const selected = ref<string[]>([])
    return { model, selected }
  },
  template: `
    <nyx-tree v-model="model" :selected="selected" @select="selected = $event" />
  `,
})

export const WithSelection = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>(nestedModel)
    const selected = ref<string[]>(['Fruits', 'Apple'])
    return { model, selected }
  },
  template: `
    <div>
      <p style="margin-bottom: 1rem; color: var(--nyx-c-gray)">Selected: {{ selected.join(' › ') || 'none' }}</p>
      <nyx-tree v-model="model" :selected="selected" @select="selected = $event" />
    </div>
  `,
})

export const TwoNodesOpen = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>(nestedModel)
    const selected = ref<string[]>([])
    // Fruits and Fruits › Citrus start expanded; everything else closed
    const open = [['Fruits'], ['Fruits', 'Citrus']]
    return { model, selected, open }
  },
  template: `
    <div>
      <p style="margin-bottom: 1rem; color: var(--nyx-c-gray)">Fruits and Citrus are open by default</p>
      <nyx-tree v-model="model" :open="open" :selected="selected" @select="selected = $event" />
    </div>
  `,
})

export const NodeDisabled = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>(modelWithDisabled)
    const selected = ref<string[]>([])
    const open = [['Fruits'], ['Veggies'], ['Grains']]
    return { model, selected, open }
  },
  template: `
    <div>
      <p style="margin-bottom: 1rem; color: var(--nyx-c-gray)">
        Grains branch is disabled via <code>disabled: true</code> in the model
      </p>
      <nyx-tree v-model="model" :open="open" :selected="selected" @select="selected = $event" />
    </div>
  `,
})

export const AutoExpandOnSelect = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>(nestedModel)
    const selected = ref<string[]>([])
    const options = [
      { label: 'none', path: [] },
      { label: 'Fruits › Citrus › Lemon', path: ['Fruits', 'Citrus', 'Lemon'] },
      { label: 'Fruits › Citrus › Orange', path: ['Fruits', 'Citrus', 'Orange'] },
      { label: 'Veggies › Broccoli', path: ['Veggies', 'Broccoli'] },
      { label: 'Grains › Rice', path: ['Grains', 'Rice'] },
    ]
    return { model, selected, options }
  },
  template: `
    <div>
      <p style="margin-bottom: 0.5rem; color: var(--nyx-c-gray)">
        Selecting a deep node auto-expands its ancestors — no <code>open</code> prop needed.
      </p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem">
        <button
          v-for="opt in options"
          :key="opt.label"
          @click="selected = opt.path"
          style="padding: 0.2rem 0.6rem; border-radius: 4px; cursor: pointer; border: 1px solid var(--nyx-c-gray-dark-2)"
        >{{ opt.label }}</button>
      </div>
      <nyx-tree v-model="model" :selected="selected" @select="selected = $event" />
    </div>
  `,
})

export const Disabled = () => defineComponent({
  components: { NyxTree },
  setup() {
    const model = ref<NyxTreeModel>(nestedModel)
    return { model }
  },
  template: `
    <nyx-tree v-model="model" :disabled="true" />
  `,
})
