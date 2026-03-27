import { defineComponent, ref } from 'vue'
import NyxEditor from './NyxEditor.vue'
import NyxTextarea from '../NyxTextarea/NyxTextarea.vue'
import {
  NyxAnnotationAttachment,
  NyxAnnotationInteraction,
  NyxAnnotationStatus,
  NyxEditorMode,
  NyxEditorFormat,
  NyxTheme,
  NyxVariant,
  NyxSize,
  NyxEditorToolbar,
} from '@/types'
import type { NyxEditorProps } from './NyxEditor.types'
import type {
  NyxAnnotationAnchor,
  NyxEditorSelection,
} from '@/types/editor'

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
    toolbar: {
      control: { type: 'select' },
      options: Object.values(NyxEditorToolbar),
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

export const SelectionAndAnnotationEvents = () => defineComponent({
  components: { NyxEditor, NyxTextarea },
  setup() {
    const content = ref('# Select some text\n\nHighlight any part of this content to see the `selection` payload update live.')
    const selectionOutput = ref('')
    const annotationCreateOutput = ref('')
    const annotationFocusOutput = ref('')
    const annotationBlurOutput = ref('')
    const annotations = ref([
      {
        id: 'annotation-1',
        anchor: {
          content: 'Highlight any part',
          prefixContext: '',
          suffixContext: ' of this content',
          startOffset: 23,
          endOffset: 41,
        },
        interaction: NyxAnnotationInteraction.Default,
        status: NyxAnnotationStatus.Unresolved,
        attachment: NyxAnnotationAttachment.Attached,
      },
    ])
    const annotationStatusTheme = {
      [NyxAnnotationStatus.Unresolved]: NyxTheme.Warning,
      [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
    }

    const handleSelection = (value: NyxEditorSelection) => {
      selectionOutput.value = JSON.stringify(value, null, 2)
    }

    const handleAnnotationCreate = (value: NyxAnnotationAnchor) => {
      annotationCreateOutput.value = JSON.stringify(value, null, 2)
    }

    const handleAnnotationFocus = (value: string) => {
      annotationFocusOutput.value = JSON.stringify(value, null, 2)
      annotationBlurOutput.value = ''
      annotations.value = annotations.value.map((annotation) => ({
        ...annotation,
        interaction: annotation.id === value
          ? NyxAnnotationInteraction.Focus
          : NyxAnnotationInteraction.Default,
      }))
    }

    const handleAnnotationBlur = (value: string) => {
      annotationBlurOutput.value = JSON.stringify(value, null, 2)
      annotations.value = annotations.value.map((annotation) => ({
        ...annotation,
        interaction: annotation.id === value
          ? NyxAnnotationInteraction.Default
          : annotation.interaction,
      }))
    }

    return {
      content,
      selectionOutput,
      annotationCreateOutput,
      annotationFocusOutput,
      annotationBlurOutput,
      annotations,
      annotationStatusTheme,
      handleSelection,
      handleAnnotationCreate,
      handleAnnotationFocus,
      handleAnnotationBlur,
    }
  },
  template: `
    <div style="display: grid; gap: 1rem;">
      <nyx-editor
        v-model="content"
        :mode="'${NyxEditorMode.Zen}'"
        :toolbar="'${NyxEditorToolbar.Full}'"
        :annotations="annotations"
        :annotation-status-theme="annotationStatusTheme"
        @selection="handleSelection"
        @annotation:create="handleAnnotationCreate"
        @annotation:focus="handleAnnotationFocus"
        @annotation:blur="handleAnnotationBlur"
      />
      <div style="font-weight: 600; font-size: 0.95rem;">Selection payload</div>
      <nyx-textarea
        v-model="selectionOutput"
        readonly
        placeholder="Selection event payload"
      />
      <div style="font-weight: 600; font-size: 0.95rem;">Annotation create payload</div>
      <nyx-textarea
        v-model="annotationCreateOutput"
        readonly
        placeholder="Annotation create event payload"
      />
      <div style="font-weight: 600; font-size: 0.95rem;">Annotation focus payload</div>
      <nyx-textarea
        v-model="annotationFocusOutput"
        readonly
        placeholder="Annotation focus event payload"
      />
      <div style="font-weight: 600; font-size: 0.95rem;">Annotation blur payload</div>
      <nyx-textarea
        v-model="annotationBlurOutput"
        readonly
        placeholder="Annotation blur event payload"
      />
    </div>
  `,
})

export const AnnotationStates = () => defineComponent({
  components: { NyxEditor },
  setup() {
    const content = ref('# Annotation states\n\nFocus, resolved, and detached annotations remain consumer-owned.')
    const annotations = ref([
      {
        id: 'annotation-default',
        anchor: {
          content: 'Focus, resolved, and detached',
          prefixContext: '',
          suffixContext: ' annotations remain',
          startOffset: 21,
          endOffset: 49,
        },
        interaction: NyxAnnotationInteraction.Default,
        status: NyxAnnotationStatus.Unresolved,
        attachment: NyxAnnotationAttachment.Attached,
      },
      {
        id: 'annotation-focus',
        anchor: {
          content: 'consumer-owned',
          prefixContext: ' annotations remain ',
          suffixContext: '.',
          startOffset: 69,
          endOffset: 83,
        },
        interaction: NyxAnnotationInteraction.Focus,
        status: NyxAnnotationStatus.Resolved,
        attachment: NyxAnnotationAttachment.Detached,
      },
    ])

    const annotationStatusTheme = {
      [NyxAnnotationStatus.Unresolved]: NyxTheme.Warning,
      [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
    }

    return { content, annotations, annotationStatusTheme }
  },
  template: `
    <nyx-editor
      v-model="content"
      :mode="'${NyxEditorMode.Zen}'"
      :toolbar="'${NyxEditorToolbar.Full}'"
      :annotations="annotations"
      :annotation-status-theme="annotationStatusTheme"
    />
  `,
})

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
