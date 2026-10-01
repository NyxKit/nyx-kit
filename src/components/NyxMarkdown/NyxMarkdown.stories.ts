import { onUnmounted, ref, type ConcreteComponent } from 'vue'
import type { NyxMarkdownProps } from './NyxMarkdown.types'
import type { Meta, StoryObj } from '@storybook/vue3'
import NyxMarkdown from './NyxMarkdown.vue'
import NyxMarkdownExample from './NyxMarkdownExample.vue'
import { acceptance, tablesAndCode, untrusted } from './NyxMarkdown.examples'
import { NyxSize, NyxTheme } from '@/types'

const meta = {
  title: 'Components/Data/NyxMarkdown',
  component: NyxMarkdown as ConcreteComponent<NyxMarkdownProps>,
  args: { content: 'A **short introduction** with *emphasis*, ~~a correction~~, and a [link](https://example.com).' },
  argTypes: {
    content: { control: 'text' },
    headingOffset: { control: { type: 'number', min: -5, max: 5 } },
    theme: { control: 'select', options: Object.values(NyxTheme) },
    size: { control: 'select', options: Object.values(NyxSize) },
  },
} satisfies Meta<NyxMarkdownProps>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const BasicProse: Story = {}
export const ListsAndBreaks: Story = { args: { content: acceptance + '\n\n3. First numbered item\n4. Second item\n   - Nested bullet\n\n   A continuation paragraph.' } }
export const HeadingsAndQuotes: Story = { args: { headingOffset: 1, content: '# Rehearsal notes\n\n## Preparation\n\n> Bring a notebook.\n>\n> **Check the start time.**\n\n### On arrival\n\nFind your seat.\n\n---\n\nClosing notes.' } }
export const TablesAndCode: Story = { args: { content: tablesAndCode } }
export const InlineExtensions: Story = { render: () => ({ components: { NyxMarkdownExample }, template: '<NyxMarkdownExample />' }) }
export const Streaming: Story = { render: () => ({ components: { NyxMarkdownExample }, template: '<NyxMarkdownExample streaming />' }) }
export const UntrustedContent: Story = { args: { content: untrusted } }
export const NarrowContainer: Story = {
  args: { content: tablesAndCode + '\n\nhttps://example.com/' + 'long-path-'.repeat(30) },
  render: args => ({ components: { NyxMarkdown }, setup: () => ({ args }), template: '<div style="display: grid; width: min(100%, 20rem)"><NyxMarkdown v-bind="args" /></div>' }),
}
export const IndependentInstances: Story = {
  render: () => ({ components: { NyxMarkdown, NyxMarkdownExample }, template: '<div><NyxMarkdownExample /><NyxMarkdown content="An independent **response**: [[p1:m2]]" /></div>' }),
}
export const SizesAndThemes: Story = {
  render: () => ({ components: { NyxMarkdown }, setup: () => ({ sizes: Object.values(NyxSize), themes: Object.values(NyxTheme) }), template: '<div><NyxMarkdown v-for="(size, index) in sizes" :key="size" :size="size" :theme="themes[index]" content="Readable **prose** and a [link](https://example.com)." /></div>' }),
}
export const ColourModes: Story = {
  args: { content: acceptance + '\n\n' + tablesAndCode },
  render: args => ({
    components: { NyxMarkdown },
    setup() {
      const previous = document.documentElement.getAttribute('data-nyx-mode')
      const light = ref(previous === 'light')
      const toggle = () => {
        light.value = !light.value
        document.documentElement.setAttribute('data-nyx-mode', light.value ? 'light' : 'dark')
      }
      onUnmounted(() => {
        if (previous === null) document.documentElement.removeAttribute('data-nyx-mode')
        else document.documentElement.setAttribute('data-nyx-mode', previous)
      })
      return { args, light, toggle }
    },
    template: '<div style="background: var(--nyx-c-bg); color: var(--nyx-c-text-1); padding: var(--nyx-pad-lg)"><button @click="toggle">Switch to {{ light ? "dark" : "light" }} mode</button><NyxMarkdown v-bind="args" /></div>',
  }),
}
