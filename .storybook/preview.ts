import '../src/styles/index.css'
import { type Preview, setup } from '@storybook/vue3'
import { themes } from '@storybook/theming'
import { vClickOutside } from '../src/directives'

setup((app) => {
  app.directive('click-outside', vClickOutside)
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
