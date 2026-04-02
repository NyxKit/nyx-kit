import '../src/styles/index.css'
import { type Preview, setup } from '@storybook/vue3'
import { themes } from 'storybook/theming'
import { createMemoryHistory, createRouter } from 'vue-router'
import { vClickOutside } from '../src/directives'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div />' } },
    { path: '/library', name: 'library', component: { template: '<div />' } },
    { path: '/docs/breadcrumbs', name: 'breadcrumbs', component: { template: '<div />' } },
    { path: '/:pathMatch(.*)*', name: 'fallback', component: { template: '<div />' } },
  ],
})

setup((app) => {
  app.directive('click-outside', vClickOutside)
  app.use(router)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark
    },
    // darkMode: {
    //   dark: { ...themes.dark },
    //   light: { ...themes.light },
    //   stylePreview: true,
    //   darkClass: 'dark'
    // },
  },
  //👇 Enables auto-generated documentation for all stories
  tags: ['autodocs'],
}

export default preview
