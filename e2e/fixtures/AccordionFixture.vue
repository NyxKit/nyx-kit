<script setup lang="ts">
import { ref } from 'vue'
import NyxAccordion from '../../src/components/NyxAccordion/NyxAccordion.vue'
import type { NyxAccordionItem, NyxAccordionModel } from '../../src/components/NyxAccordion/NyxAccordion.types'

const items = ref<NyxAccordionItem[]>([
  { id: 'account', label: 'Account' },
  { id: 'disabled', label: 'Disabled', disabled: true },
  { id: 'privacy', label: 'Privacy' },
])
const model = ref<NyxAccordionModel>('')
const multiple = ref(false)
const submissions = ref(0)
const fixture = {
  collapse: () => { model.value = '' },
  removeAccount: () => { items.value = items.value.filter(item => item.id !== 'account') },
  removeAll: () => { items.value = [] },
  disableAll: () => { items.value = items.value.map(item => ({ ...item, disabled: true })) },
}
Object.assign(window, { accordionFixture: fixture })
</script>

<template>
  <main>
    <h1>Account settings</h1>
    <label><input v-model="multiple" type="checkbox">Multiple sections</label>
    <form @submit.prevent="submissions++">
      <NyxAccordion id="outer" v-model="model" :items="items" :multiple="multiple">
        <template #item-account><label>Display name <input aria-label="Display name"></label></template>
        <template #item-privacy>
          <a href="#settings">Privacy policy</a>
          <NyxAccordion id="nested" :items="[{ id: 'nested', label: 'Nested section' }, { id: 'another', label: 'Another nested section' }]">
            <template #default><input aria-label="Nested input"></template>
          </NyxAccordion>
        </template>
      </NyxAccordion>
      <button type="button">After accordion</button>
    </form>
    <output aria-label="Submissions">{{ submissions }}</output>
    <output aria-label="Open model">{{ JSON.stringify(model) }}</output>
  </main>
</template>
