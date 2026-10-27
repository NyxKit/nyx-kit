import { createApp } from 'vue'
import NyxSelectOptionContentDemo from '../../src/components/NyxSelect/storybook/NyxSelectOptionContentDemo.vue'
import vClickOutside from '../../src/directives/vClickOutside'
import '../../src/styles/index.css'

createApp(NyxSelectOptionContentDemo, { grouped: new URLSearchParams(location.search).has('grouped') })
  .provide('libEnv', {})
  .directive('click-outside', vClickOutside)
  .mount('#app')
