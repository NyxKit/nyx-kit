import { defineComponent, ref } from 'vue'
import NyxEditor from './NyxEditor.vue'
import { NyxEditorMode, NyxEditorFormat, NyxTheme, NyxVariant, NyxSize } from '@/types'
import type { NyxEditorProps } from './NyxEditor.types'

export default {
  title: 'Components/NyxEditor',
  component: NyxEditor,
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: Object.values(NyxEditorMode),
    },
    format: {
      control: { type: 'select' },
      options: Object.values(NyxEditorFormat),
    },
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(NyxVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NyxSize),
    },
  },
}

const Template = (args: NyxEditorProps) => defineComponent({
  components: { NyxEditor },
  setup() {
    const content = ref('')
    return { args, content }
  },
  template: `<nyx-editor v-bind="args" v-model="content" />`,
})

const TemplateWithContent = (args: NyxEditorProps, initialContent: string) => defineComponent({
  components: { NyxEditor },
  setup() {
    const content = ref(initialContent)
    return { args, content }
  },
  template: `<nyx-editor v-bind="args" v-model="content" />`,
})

export const Zen = Template({ mode: NyxEditorMode.Zen })

export const Toolbar = Template({ mode: NyxEditorMode.Toolbar })

export const ZenWithContent = TemplateWithContent(
  { mode: NyxEditorMode.Zen },
  '# Hello\n\nThis is a **rich text** editor in *zen* mode.\n\n- Item one\n- Item two',
)

export const ToolbarWithContent = TemplateWithContent(
  { mode: NyxEditorMode.Toolbar },
  '# Hello\n\nThis is a **rich text** editor in *toolbar* mode.',
)

export const HtmlFormat = TemplateWithContent(
  { mode: NyxEditorMode.Toolbar, format: NyxEditorFormat.Html },
  '<h1>Hello</h1><p>This editor outputs <strong>HTML</strong>.</p>',
)

export const Disabled = TemplateWithContent(
  { mode: NyxEditorMode.Toolbar, disabled: true },
  '# Read-only\n\nThis editor is disabled.',
)

export const Themes = () => defineComponent({
  components: { NyxEditor },
  setup() {
    const themes = Object.values(NyxTheme)
    const contents = Object.fromEntries(themes.map(t => [t, ref('')]))
    return { themes, contents }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <nyx-editor
        v-for="theme in themes"
        :key="theme"
        :theme="theme"
        :mode="'${NyxEditorMode.Toolbar}'"
        :placeholder="theme"
        v-model="contents[theme].value"
      />
    </div>
  `,
})

export const Sizes = () => defineComponent({
  components: { NyxEditor },
  setup() {
    const sizes = Object.values(NyxSize)
    const contents = Object.fromEntries(sizes.map(s => [s, ref('')]))
    return { sizes, contents }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <nyx-editor
        v-for="size in sizes"
        :key="size"
        :size="size"
        :mode="'${NyxEditorMode.Toolbar}'"
        :placeholder="size"
        v-model="contents[size].value"
      />
    </div>
  `,
})
