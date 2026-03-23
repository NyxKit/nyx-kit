import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import oxlint from 'eslint-plugin-oxlint'

/**
 * Nyx Kit base ESLint flat config.
 *
 * Includes: Vue 3 essential rules, TypeScript recommended rules,
 * and oxlint compatibility shims (disables rules that oxlint handles).
 *
 * Usage in your eslint.config.ts:
 *
 *   import nyxConfig from 'nyx-kit/eslint'
 *   export default [...nyxConfig, { /* your overrides *\/ }]
 *
 * Peer dependencies required in your project:
 *   eslint, eslint-plugin-vue, @vue/eslint-config-typescript,
 *   eslint-plugin-oxlint
 */
export default defineConfigWithVueTs(
  {
    name: 'nyx-kit/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'nyx-kit/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  oxlint.configs['flat/recommended'],
)
