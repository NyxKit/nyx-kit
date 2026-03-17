import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
    'storybook-dark-mode'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
}

export default config
