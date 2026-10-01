<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import NyxMarkdown from './NyxMarkdown.vue'
import NyxButton from '../NyxButton/NyxButton.vue'
import { acceptance, citationRules } from './NyxMarkdown.examples'

interface Props { streaming?: boolean }
const props = defineProps<Props>()
const content = ref(acceptance)
const selected = ref('None')
let timer: ReturnType<typeof setInterval> | undefined
function stream() {
  clearInterval(timer)
  content.value = ''
  timer = setInterval(() => {
    content.value = acceptance.slice(0, content.value.length + 7)
    if (content.value.length === acceptance.length) clearInterval(timer)
  }, 40)
}
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div>
    <NyxButton v-if="props.streaming" @click="stream">Replay stream</NyxButton>
    <NyxMarkdown :content="content" :inline-rules="citationRules" :heading-offset="2">
      <template #inline="{ value }">
        <NyxButton type="button" :aria-label="value.accessibleLabel" @click="selected = value.reference">{{ value.label }}</NyxButton>
      </template>
    </NyxMarkdown>
    <p role="status">Selected reference: {{ selected }}</p>
  </div>
</template>
