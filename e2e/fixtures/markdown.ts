import { createApp } from 'vue'
import MarkdownFixture from './MarkdownFixture.vue'
import '../../src/styles/index.css'
createApp(MarkdownFixture).provide('libEnv', {}).mount('#app')
