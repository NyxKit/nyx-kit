import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import NyxAccordion from './NyxAccordion.vue'
import NyxButton from '../NyxButton/NyxButton.vue'
import NyxInput from '../NyxInput/NyxInput.vue'
import NyxForm from '../NyxForm/NyxForm.vue'
import NyxFormField from '../NyxForm/NyxFormField.vue'
import NyxActionItem from '../NyxActionItem/NyxActionItem.vue'
import { NyxSize, NyxTheme } from '@/types'
import type { NyxAccordionModel } from './NyxAccordion.types'

const items = [
  { id: 'account', label: 'Account details' },
  { id: 'privacy', label: 'Privacy and permissions' },
  { id: 'notifications', label: 'Notifications' },
]
const content: Record<string, string> = {
  account: 'Manage the details you share with your team. Your edits stay here when you close this section.',
  privacy: 'Choose who can view your profile and which services can access your account.',
  notifications: 'Choose the updates you want to receive and how often they arrive.',
}
const body = `<template #default="{ item }"><p>{{ content[item.id] }}</p></template>`
const meta = {
  title: 'Components/Navigation/NyxAccordion',
  component: NyxAccordion,
  args: { items },
  argTypes: {
    theme: { control: 'select', options: Object.values(NyxTheme) },
    size: { control: 'select', options: Object.values(NyxSize) },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    headingLevel: { control: 'select', options: [2, 3, 4, 5, 6] },
  },
  render: args => ({
    components: { NyxAccordion, NyxButton, NyxInput },
    setup: () => ({ args, content }),
    template: `<NyxAccordion v-bind="args">${body}</NyxAccordion>`,
  }),
} satisfies Meta<typeof NyxAccordion>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const UnboundMultiple: Story = { args: { multiple: true } }

export const BoundSingle: Story = {
  render: args => ({
    components: { NyxAccordion, NyxButton, NyxInput, NyxForm, NyxFormField, NyxActionItem },
    setup: () => ({ args, content, open: ref<NyxAccordionModel>('account'), name: ref(''), isProfilePrivate: ref(true) }),
    template: `
      <div style="display: grid; gap: var(--nyx-gap-lg);">
        <NyxAccordion v-bind="args" v-model="open">
          ${body}
          <template #item-account>
            <NyxForm>
              <p>{{ content.account }}</p>
              <NyxFormField label="Display name" v-slot="{ id }">
                <NyxInput :id="id" v-model="name" autocomplete="name" placeholder="Your name" />
              </NyxFormField>
            </NyxForm>
          </template>
          <template #item-privacy>
            <NyxActionItem
              title="Profile visibility"
              :action="isProfilePrivate ? 'Make public' : 'Make private'"
              @click="isProfilePrivate = !isProfilePrivate"
            >
              {{ isProfilePrivate ? 'Your profile is only visible to you.' : 'Your profile is visible to other members.' }}
            </NyxActionItem>
          </template>
        </NyxAccordion>
        <p>Open section: {{ open || 'None' }}</p>
        <div style="display: flex; flex-wrap: wrap; gap: var(--nyx-gap-md);">
          <NyxButton @click="open = 'privacy'">Open privacy</NyxButton>
          <NyxButton @click="open = ''">Close all</NyxButton>
        </div>
      </div>`,
  }),
}

export const Multiple: Story = {
  args: { multiple: true },
  render: args => ({
    components: { NyxAccordion, NyxButton, NyxInput },
    setup: () => ({ args, content, open: ref<NyxAccordionModel>(['account', 'privacy']) }),
    template: `<div><NyxAccordion v-bind="args" v-model="open">${body}</NyxAccordion><p>Open sections: {{ open }}</p></div>`,
  }),
}

export const CustomSlots: Story = {
  render: args => ({
    components: { NyxAccordion, NyxButton, NyxInput },
    setup: () => ({ args, content }),
    template: `
      <NyxAccordion v-bind="args">
        <template #header="{ item, index }">{{ index + 1 }}. {{ item.label }}</template>
        <template #header-privacy>Privacy <small>(Review recommended)</small></template>
        ${body}
        <template #item-privacy>
          <p>Two connected services can access your profile.</p>
          <a href="#connected-services">Review connected services</a>
        </template>
      </NyxAccordion>`,
  }),
}

export const Disabled: Story = {
  args: { items: [items[0], { ...items[1], disabled: true }, items[2]] },
}
export const Empty: Story = {
  args: { items: [] },
  render: args => ({
    components: { NyxAccordion, NyxButton, NyxInput }, setup: () => ({ args }),
    template: '<NyxAccordion v-bind="args"><template #empty>No settings sections are available.</template></NyxAccordion>',
  }),
}

export const DynamicItemsAndMode: Story = {
  render: args => ({
    components: { NyxAccordion, NyxButton, NyxInput },
    setup() {
      const multiple = ref(true)
      const open = ref<NyxAccordionModel>(['account', 'privacy'])
      const sections = ref([...items])
      const toggleExpansionMode = () => {
        multiple.value = !multiple.value
        open.value = multiple.value ? open.value ? [String(open.value)] : []
          : Array.isArray(open.value) ? open.value[0] ?? '' : open.value
      }
      return { args, content, multiple, open, sections, toggleExpansionMode }
    },
    template: `
      <div style="display: grid; gap: var(--nyx-gap-lg);">
        <div style="display: flex; flex-wrap: wrap; gap: var(--nyx-gap-md);">
        <NyxButton @click="toggleExpansionMode">Switch to {{ multiple ? 'single' : 'multiple' }}</NyxButton>
        <NyxButton @click="sections = [...sections].reverse()">Reverse sections</NyxButton>
        <NyxButton @click="sections = sections.filter(item => item.id !== 'privacy')">Remove privacy</NyxButton>
        </div>
        <NyxAccordion v-bind="args" :items="sections" :multiple="multiple" v-model="open">${body}</NyxAccordion>
        <p>Open sections: {{ open }}</p>
      </div>`,
  }),
}
