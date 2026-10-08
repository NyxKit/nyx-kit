// Share line-length enforcement between this repository and consuming projects.
export default [
  {
    name: 'nyx-kit/line-length',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      'max-len': ['error', { code: 120, tabWidth: 2, ignoreUrls: true }]
    }
  },
  {
    name: 'nyx-kit/vue-line-length',
    files: ['**/*.vue'],
    rules: {
      'max-len': 'off',
      'vue/max-len': ['error', { code: 120, template: 120, tabWidth: 2, ignoreUrls: true }]
    }
  }
]
