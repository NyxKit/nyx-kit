<script setup lang="ts" generic="T = unknown">
import { computed, type VNodeChild } from 'vue'
import useNyxProps from '@/composables/useNyxProps'
import type { NyxMarkdownProps, NyxMarkdownInlineSlotProps } from './NyxMarkdown.types'
import { parseMarkdown } from './markdownParser'
import { renderMarkdown } from './markdownRenderer'
import './NyxMarkdown.scss'

const props = withDefaults(defineProps<NyxMarkdownProps<T>>(), {
  content: '', inlineRules: () => [], headingOffset: 0,
})
const slots = defineSlots<{ inline?: (scope: NyxMarkdownInlineSlotProps<T>) => VNodeChild }>()
const { classList } = useNyxProps(props, { origin: 'NyxMarkdown' })
const parsed = computed(() => {
  try { return parseMarkdown(props.content, props.inlineRules) }
  catch { return null }
})
// Invoke consumer slots during rendering so their own reactive dependencies track.
const Content = () => parsed.value
  ? renderMarkdown(parsed.value, props.headingOffset, slots.inline)
  : props.content
</script>

<template>
  <div class="nyx-markdown" :class="classList"><Content /></div>
</template>
