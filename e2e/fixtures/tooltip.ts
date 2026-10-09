import { createApp } from 'vue'
import TooltipFixture from './TooltipFixture.vue'
import vClickOutside from '../../src/directives/vClickOutside'
import '../../src/styles/index.css'

createApp(TooltipFixture).provide('libEnv', {}).directive('click-outside', vClickOutside).mount('#app')
