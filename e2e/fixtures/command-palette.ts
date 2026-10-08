import { createApp } from 'vue'
import CommandPaletteFixture from './CommandPaletteFixture.vue'
import '../../src/styles/index.css'
createApp(CommandPaletteFixture).provide('libEnv', {}).mount('#app')
