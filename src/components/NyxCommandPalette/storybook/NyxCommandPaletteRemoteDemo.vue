<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { action } from 'storybook/actions'
import NyxCommandPalette from '../NyxCommandPalette.vue'
import type { NyxCommandPaletteGroup, NyxCommandPaletteSelectEvent } from '../NyxCommandPalette.types'
const query = ref('')
const loading = ref(false)
const groups = ref<NyxCommandPaletteGroup[]>([])
const selected = ref('None')
const requests = ref(0)
const timers = new Set<ReturnType<typeof setTimeout>>()
let generation = 0
const delay = (fn: () => void, ms: number) => {
  const timer = setTimeout(() => { timers.delete(timer); fn() }, ms)
  timers.add(timer)
  return timer
}
watch(query, (value, _, onCleanup) => {
  action('update:searchTerm')(value)
  const current = ++generation
  loading.value = true
  const debounce = delay(() => {
    requests.value++
    // One-character requests deliberately resolve after subsequent searches.
    delay(() => {
      if (current !== generation) return
      groups.value = value === 'none' ? [] : [{ id: 'remote', label: 'Remote matches', ignoreFilter: true,
        items: [{ id: `remote-${value}`, label: `Server result for ${value || 'all commands'}`, description: 'Order supplied by the server' }] }]
      loading.value = false
    }, value.length === 1 ? 900 : 100)
  }, 150)
  onCleanup(() => { clearTimeout(debounce); timers.delete(debounce) })
}, { immediate: true })
onBeforeUnmount(() => { generation++; timers.forEach(clearTimeout) })
const select = (event: NyxCommandPaletteSelectEvent) => { selected.value = event.item.id; action('select')(event) }
</script>
<template>
  <section>
    <p>Try “a”, then “ab” while loading. Only the latest response appears. Search “none” for no matches.</p>
    <NyxCommandPalette inline v-model:search-term="query" :groups="groups" :loading="loading" @select="select" />
    <output>Selected: {{ selected }} · Requests: {{ requests }}</output>
  </section>
</template>
