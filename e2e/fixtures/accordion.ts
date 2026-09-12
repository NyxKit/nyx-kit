import { createApp } from 'vue'
import AccordionFixture from './AccordionFixture.vue'
import '../../src/styles/index.css'

createApp(AccordionFixture).provide('libEnv', {}).mount('#app')
