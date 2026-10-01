<script setup lang="ts">
import { nextTick, ref } from 'vue'
import NyxMarkdown from '../../src/components/NyxMarkdown/NyxMarkdown.vue'
import NyxButton from '../../src/components/NyxButton/NyxButton.vue'
import { acceptance, citationRules, tablesAndCode, untrusted } from '../../src/components/NyxMarkdown/NyxMarkdown.examples'
const initial = acceptance + '\n\n' + tablesAndCode + '\n\n' + untrusted
const content = ref(initial)
const clicks = ref(0)
const measurement = ref('')
const typing = ref('')
function append() { content.value += '\n\nAn unrelated paragraph.' }
async function benchmark() {
  const fixture = Array.from({ length: 200 }, (_, i) => `## Section ${i}\n\nSynthetic **answer** with a citation [[p1:m2]].\n\n- A short item\n- A second item\n\n`).join('')
  const timings: number[] = []
  for (let i = 0; i < 20; i++) {
    const start = performance.now()
    content.value = fixture + '\nUpdate ' + i
    await nextTick()
    timings.push(performance.now() - start)
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  measurement.value = JSON.stringify({ characters: fixture.length, updates: timings.length, meanMs: timings.reduce((a, b) => a + b, 0) / timings.length, maxMs: Math.max(...timings) })
}
</script>
<template>
  <main style="width: min(100%, 320px); display: grid; gap: var(--nyx-gap-md); padding: var(--nyx-pad-md)">
    <label>Typing check <input aria-label="Typing check" v-model="typing"></label>
    <button id="append" @click="append">Append text</button>
    <button id="clear" @click="content = ''">Clear</button>
    <button id="replace" @click="content = 'Replacement **answer**'">Replace</button>
    <button id="benchmark" @click="benchmark">Measure long answer</button>
    <output id="measurement">{{ measurement }}</output>
    <output id="clicks">{{ clicks }}</output>
    <NyxMarkdown id="answer" :content="content" :inline-rules="citationRules">
      <template #inline="{ value }">
        <NyxButton :aria-label="value.accessibleLabel" @click="clicks++">{{ value.label }}</NyxButton>
      </template>
    </NyxMarkdown>
    <NyxMarkdown id="independent" content="**Independent** [[p1:m2]]" />
  </main>
</template>
