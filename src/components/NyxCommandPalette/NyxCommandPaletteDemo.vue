<script setup lang="ts">
import { ref, watch } from 'vue'
import { action } from 'storybook/actions'
import useKeyboardShortcuts from '@/composables/useKeyboardShortcuts'
import NyxCommandPalette from './NyxCommandPalette.vue'
import type { NyxCommandPaletteProps, NyxCommandPaletteSelectEvent } from './NyxCommandPalette.types'
const props = defineProps<{ args: NyxCommandPaletteProps & { open?: boolean }, controlled?: boolean, custom?: boolean, fullItem?: boolean }>()
const open = ref(false)
const query = ref('')
const selected = ref<string>()
const count = ref(0)
const last = ref('None')
const host = ref<HTMLElement | null>(null)
watch(() => props.args.open, value => { open.value = !!value })
watch(open, action('update:open'))
watch(query, action('update:searchTerm'))
watch(selected, action('update:modelValue'))
const select = (event: NyxCommandPaletteSelectEvent) => {
  action('select')(event)
  count.value++
  last.value = event.item.label
  if (!props.args.inline) open.value = false
}
const openFromShortcut = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement
  if (!host.value?.contains(target) || event.repeat || event.isComposing || target.closest('input, textarea, select, [contenteditable="true"]')) return
  open.value = true
}
// Keep the helper's existing CONTROL spelling compatible with SUPER's CTRL alias.
// Window tracking receives keyup after opening teleports focus out of the host.
useKeyboardShortcuts({ 'SUPER+K': openFromShortcut, 'CONTROL+K': openFromShortcut })
</script>
<template>
  <section ref="host" style="display: grid; gap: var(--nyx-gap-lg); max-width: 100%;">
    <button v-if="!args.inline" type="button" @click="open = true">Search commands (Ctrl / ⌘ K)</button>
    <div v-if="controlled">
      <button type="button" @click="query = 'settings'; selected = 'settings'">Choose settings externally</button>
      <button type="button" @click="query = ''">Clear query</button>
    </div>
    <NyxCommandPalette v-bind="args" v-model:open="open" v-model:search-term="query" v-model="selected" @select="select" @close="action('close')()">
      <template v-if="custom" #group-label="{ group }">{{ group.label || 'Commands' }} · Application</template>
      <template v-if="custom" #item-leading="{ index }"><span aria-hidden="true">{{ index + 1 }}.</span></template>
      <template v-if="custom" #item-label="{ item }"><strong>{{ item.label }}</strong><small style="display: block">{{ item.description }}</small></template>
      <template v-if="custom" #item-trailing="{ selected: chosen }">{{ chosen ? 'Last used' : 'Run' }}</template>
      <template v-if="fullItem" #item="{ item }">Custom command: {{ item.label }}</template>
      <template v-if="custom" #empty="{ searchTerm }">Try another phrase for “{{ searchTerm }}”.</template>
      <template v-if="custom" #loading>Looking up your commands…</template>
      <template #footer="{ resultCount }">{{ resultCount }} commands · ↑ ↓ navigate · Enter run <button type="button" @click="query = ''">Reset search</button></template>
    </NyxCommandPalette>
    <output aria-live="polite">Last command: {{ last }} · Selected: {{ selected || 'None' }} · Activations: {{ count }}</output>
  </section>
</template>
