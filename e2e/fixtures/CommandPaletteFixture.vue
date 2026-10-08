<script setup lang="ts">
import { NyxCommandPaletteViewportMode } from '../../src/components/NyxCommandPalette/NyxCommandPalette.types'
import { ref } from 'vue'
import NyxCommandPalette from '../../src/components/NyxCommandPalette/NyxCommandPalette.vue'
import NyxCommandPaletteRemoteDemo from '../../src/components/NyxCommandPalette/NyxCommandPaletteRemoteDemo.vue'
const open = ref(false)
const secondOpen = ref(false)
const inline = ref(false)
const mounted = ref(true)
const disabled = ref(false)
const shortcut = ref('SUPER+K')
const viewportMode = ref(NyxCommandPaletteViewportMode.Always)
const query = ref('')
const count = ref(0)
const closes = ref(0)
const selected = ref<string>()
const groups = ref(Array.from({ length: 5 }, (_, group) => ({ id: `group-${group}`, label: `Group ${group}`, items: Array.from({ length: 20 }, (_, index) => ({ id: `${group}-${index}`, label: `Command ${group}-${index}`, disabled: index === 1 })) })))
</script>
<template>
  <main style="min-height: 200vh; padding: var(--nyx-pad-md)">
    <button id="trigger" @click="open = true">Open palette</button>
    <button @click="disabled = !disabled">Toggle disabled</button>
    <button @click="open = false">Parent close</button>
    <button id="after">After</button>
    <label>External editor<input id="external-editor"></label>
    <label>Shortcut<input id="shortcut-setting" v-model="shortcut"></label>
    <button @click="viewportMode = NyxCommandPaletteViewportMode.WhileSearching">Toggle initial results</button>
    <button @click="viewportMode = NyxCommandPaletteViewportMode.AfterInteraction">Use persistent results</button>
    <button @click="selected = '4-19'; open = true">Open with selection</button>
    <output id="result">{{ selected }} / {{ count }} / {{ closes }}</output>
    <NyxCommandPalette v-if="mounted" v-model:open="open" v-model="selected" v-model:search-term="query" :inline="inline" :disabled="disabled" :shortcut="shortcut" :viewport-mode="viewportMode" :groups="groups" closeable @select="count++" @close="closes++">
      <template #footer>
        <button @click="inline = !inline">Switch mode</button>
        <button @click="mounted = false">Unmount</button>
        <button @click="open = false">Close from parent</button>
        <button @click="secondOpen = true">Second overlay</button>
        <button @click="groups = [{ id: 'replacement', label: 'New', items: [{ id: 'new', label: 'New command', disabled: false }] }]">Replace results</button>
      </template>
    </NyxCommandPalette>
    <NyxCommandPalette v-model:open="secondOpen" :groups="groups" label="Second overlay" :shortcut="secondOpen ? shortcut : undefined" closeable />
    <form @submit.prevent="count += 1000">
      <NyxCommandPalette inline :viewport-mode="NyxCommandPaletteViewportMode.Always" :groups="groups" label="Inline first" @select="count++"><template #footer><button type="button">Inline footer</button></template></NyxCommandPalette>
      <NyxCommandPalette inline :viewport-mode="NyxCommandPaletteViewportMode.Always" :groups="groups" label="Inline second" />
    </form>
    <NyxCommandPaletteRemoteDemo />
  </main>
</template>
