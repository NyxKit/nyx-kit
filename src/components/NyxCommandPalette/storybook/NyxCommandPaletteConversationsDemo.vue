<script setup lang="ts">
import { NyxCommandPaletteViewportMode } from '../NyxCommandPalette.types'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { action } from 'storybook/actions'
import NyxCommandPalette from '../NyxCommandPalette.vue'
import type {
  NyxCommandPaletteGroup,
  NyxCommandPaletteItem,
  NyxCommandPaletteSelectEvent
} from '../NyxCommandPalette.types'

interface Conversation extends NyxCommandPaletteItem {
  to: string
  updated: string
}

const conversations: Conversation[] = [
  {
    id: 'release',
    label: 'Release planning',
    description: 'Maya: Shall we ship the search improvements on Friday?',
    icon: 'messages-square',
    to: '/conversations/release',
    updated: 'Today'
  },
  {
    id: 'design',
    label: 'Design feedback',
    description: 'Jonas: The quieter search focus feels much better.',
    icon: 'messages-square',
    to: '/conversations/design',
    updated: 'Yesterday'
  },
  {
    id: 'support',
    label: 'Customer support',
    description: 'Ari: How do I find an earlier conversation?',
    icon: 'messages-square',
    to: '/conversations/support',
    updated: 'Monday'
  }
]

const open = ref(false)
const query = ref('')
const loading = ref(false)
const matches = ref<Conversation[]>([])
const current = ref<Conversation>()
const path = ref('/conversations')

const groups = computed<NyxCommandPaletteGroup<Conversation>[]>(() => [
  { id: 'conversations', label: 'Conversations', ignoreFilter: true, items: matches.value }
])

let pending: ReturnType<typeof setTimeout> | undefined

watch(query, (value, _, cleanup) => {
  action('update:searchTerm')(value)
  loading.value = !!value.trim()
  if (!value.trim()) {
    matches.value = []
    return
  }
  // The consuming application owns debounce, requests and stale-response cleanup.
  pending = setTimeout(() => {
    const search = value.toLowerCase().trim()
    matches.value = conversations.filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(search))
    loading.value = false
  }, 250)
  cleanup(() => clearTimeout(pending))
})

onBeforeUnmount(() => clearTimeout(pending))

const navigate = ({ item }: NyxCommandPaletteSelectEvent<Conversation>) => {
  // Replace this local route state with router.push(item.to) in an application.
  path.value = item.to
  current.value = item
  open.value = false
  action('navigate')(item.to)
}
</script>
<template>
  <section style="display: grid; gap: var(--nyx-gap-lg)">
    <button
      type="button"
      @click="open = true"
    >
      Find a conversation
    </button>
    <NyxCommandPalette
      v-model:open="open"
      v-model:search-term="query"
      :groups="groups"
      :loading="loading"
      :viewport-mode="NyxCommandPaletteViewportMode.WhileSearching"
      label="Find conversations"
      placeholder="Search conversations..."
      closeable
      @select="navigate"
    >
      <template #item-trailing="{ item }"
        ><small>{{ item.updated }}</small></template
      >
      <template #footer>Search titles and messages. Try “release” or “design”.</template>
    </NyxCommandPalette>
    <code>{{ path }}</code>
    <article
      v-if="current"
      aria-live="polite"
    >
      <h2>{{ current.label }}</h2>
      <p>{{ current.description }}</p>
    </article>
    <p v-else>Open a conversation from search to view it here.</p>
  </section>
</template>
