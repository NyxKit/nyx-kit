import { defineComponent, ref, watch } from 'vue'
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
  NyxAnnotation,
  NyxAnnotationAnchor,
} from '@/types/editor'

const showcaseContent = `# NyxEditor annotation showcase

Intro paragraph with **bold emphasis**, *italic nuance*, and \`inline code\` so the default Storybook example demonstrates the most common inline formatting patterns in one place.

## Editorial overview

This section introduces the document structure and explains how annotations should feel while reading and editing longer rich-text content.

- Bullet point one introduces the topic
- Bullet point two reinforces the visual hierarchy
- Bullet point three keeps the example grounded

## Review workflow

This section demonstrates a nested structure with two h3 subsections so the editor showcases deeper document outlines as well.

### Open questions

The team uses an ordered list here to capture follow-up questions before the content moves to final approval.

1. Who owns the final review?
2. Which comments block release?
3. When should unresolved notes expire?

### Approval checklist

The task list below highlights the last mile before publication.

- [ ] Confirm annotation remapping works
- [x] Verify toolbar actions in Storybook
- [ ] Review accessibility notes with design

## Implementation notes

This closing section keeps a final paragraph near a separate section heading so the story looks realistic for day-to-day editorial work inside NyxEditor.
`

const showcaseAnnotations: NyxAnnotation[] = [
  {
    id: 'annotation-draft',
    anchor: {
      text: 'bold emphasis',
      context: {
        prefix: 'ro paragraph with **',
        suffix: '**, *italic nuance*, and `inli',
      },
      range: {
        from: 57,
        to: 70,
      },
    },
    interaction: NyxAnnotationInteraction.Default,
    status: NyxAnnotationStatus.Draft,
    attachment: NyxAnnotationAttachment.Attached,
  },
  {
    id: 'annotation-unresolved',
    anchor: {
      text: 'visual hierarchy',
      context: {
        prefix: ' two reinforces the ',
        suffix: '\n- Bullet point three keeps th',
      },
      range: {
        from: 451,
        to: 467,
      },
    },
    interaction: NyxAnnotationInteraction.Default,
    status: NyxAnnotationStatus.Unresolved,
    attachment: NyxAnnotationAttachment.Attached,
  },
  {
    id: 'annotation-resolved',
    anchor: {
      text: 'toolbar actions in Storybook',
      context: {
        prefix: ' works\n- [x] Verify ',
        suffix: '\n- [ ] Review accessibility no',
      },
      range: {
        from: 1044,
        to: 1072,
      },
    },
    interaction: NyxAnnotationInteraction.Default,
    status: NyxAnnotationStatus.Resolved,
    attachment: NyxAnnotationAttachment.Attached,
  },
]

const showcaseStatusTheme = {
  [NyxAnnotationStatus.Draft]: NyxTheme.Info,
  [NyxAnnotationStatus.Unresolved]: NyxTheme.Warning,
  [NyxAnnotationStatus.InReview]: NyxTheme.Warning,
  [NyxAnnotationStatus.Approved]: NyxTheme.Success,
  [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
  [NyxAnnotationStatus.Archived]: NyxTheme.Secondary,
}

export default {
  title: 'Components/NyxEditor',
  component: NyxEditor,
  parameters: {
    docs: {
      description: {
        component: 'NyxEditor exposes three models: `v-model` for content, `v-model:source` for source-mode state, and `v-model:annotations` for the live annotation model.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Primary `v-model` binding for serialized editor content.',
      table: {
        category: 'Models',
      },
    },
    source: {
      control: { type: 'boolean' },
      description: 'Secondary `v-model:source` binding for source-mode visibility.',
      table: {
        category: 'Models',
      },
    },
    annotations: {
      control: { type: 'object' },
      description: 'Secondary `v-model:annotations` binding for the live annotation model.',
      table: {
        category: 'Models',
      },
    },
    annotationStatusTheme: {
      control: { type: 'object' },
      description: 'Partial status-to-theme map. Missing keys fall back to `NyxTheme.Primary`.',
      table: {
        defaultValue: {
          summary: 'built-in status map',
        },
      },
    },
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

export const Showcase = (args: NyxEditorProps & { modelValue?: string, annotations?: NyxAnnotation[] }) => defineComponent({
  components: { NyxEditor },
  setup() {
    const cloneAnnotations = (value: NyxAnnotation[] = showcaseAnnotations) => value.map((annotation) => ({
      ...annotation,
      anchor: {
        ...annotation.anchor,
        context: { ...annotation.anchor.context },
        range: { ...annotation.anchor.range },
      },
    }))

    const content = ref(args.modelValue ?? showcaseContent)
    const annotations = ref(cloneAnnotations(args.annotations))

    watch(() => args.modelValue, (value) => {
      content.value = value ?? showcaseContent
    })

    watch(() => args.annotations, (value) => {
      annotations.value = cloneAnnotations(value)
    }, { deep: true })

    return { args, content, annotations }
  },
  template: `
    <nyx-editor
      v-bind="args"
      v-model="content"
      v-model:annotations="annotations"
      style="max-height: 42dvh;"
    />
  `,
})

Showcase.args = {
  modelValue: showcaseContent,
  annotations: showcaseAnnotations,
  annotationStatusTheme: showcaseStatusTheme,
  hasFooter: true,
  mode: NyxEditorMode.Zen,
  format: NyxEditorFormat.Markdown,
  toolbar: NyxEditorToolbar.Full,
  theme: NyxTheme.Info,
  variant: NyxVariant.Text,
  size: NyxSize.Medium,
}

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
          text: 'Highlight any part',
          context: {
            prefix: '',
            suffix: ' of this content',
          },
          range: {
            from: 23,
            to: 41,
          },
        },
        interaction: NyxAnnotationInteraction.Default,
        status: NyxAnnotationStatus.Unresolved,
        attachment: NyxAnnotationAttachment.Attached,
      },
    ])
    const annotationStatusTheme = {
      [NyxAnnotationStatus.Unresolved]: NyxTheme.Warning,
      [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
      [NyxAnnotationStatus.Draft]: NyxTheme.Primary,
      [NyxAnnotationStatus.InReview]: NyxTheme.Warning,
      [NyxAnnotationStatus.Approved]: NyxTheme.Success,
      [NyxAnnotationStatus.Archived]: NyxTheme.Secondary,
    }

    const handleSelection = (value: NyxAnnotationAnchor) => {
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
        v-model:annotations="annotations"
        :mode="'${NyxEditorMode.Zen}'"
        :toolbar="'${NyxEditorToolbar.Full}'"
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

export const FooterSlot = () => defineComponent({
  components: { NyxEditor },
  setup() {
    const content = ref(showcaseContent)
    const annotations = ref(showcaseAnnotations.map((annotation) => ({
      ...annotation,
      anchor: {
        ...annotation.anchor,
        context: { ...annotation.anchor.context },
        range: { ...annotation.anchor.range },
      },
    })))

    return { content, annotations, showcaseStatusTheme }
  },
  template: `
    <nyx-editor
      v-model="content"
      v-model:annotations="annotations"
      :mode="'${NyxEditorMode.Zen}'"
      :toolbar="'${NyxEditorToolbar.Full}'"
      :annotation-status-theme="showcaseStatusTheme"
    >
      <template #footer="{ meta }">
        <div style="display: flex; width: 100%; justify-content: space-between; gap: 1rem; font-size: 0.875rem; opacity: 0.9;">
          <span>{{ meta.pathText }}</span>
          <strong>{{ meta.wordCount }} words</strong>
        </div>
      </template>
    </nyx-editor>
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
          text: 'Focus, resolved, and detached',
          context: {
            prefix: '',
            suffix: ' annotations remain',
          },
          range: {
            from: 21,
            to: 49,
          },
        },
        interaction: NyxAnnotationInteraction.Default,
        status: NyxAnnotationStatus.Unresolved,
        attachment: NyxAnnotationAttachment.Attached,
      },
      {
        id: 'annotation-focus',
        anchor: {
          text: 'consumer-owned',
          context: {
            prefix: ' annotations remain ',
            suffix: '.',
          },
          range: {
            from: 69,
            to: 83,
          },
        },
        interaction: NyxAnnotationInteraction.Focus,
        status: NyxAnnotationStatus.Resolved,
        attachment: NyxAnnotationAttachment.Detached,
      },
    ])

    const annotationStatusTheme = {
      [NyxAnnotationStatus.Unresolved]: NyxTheme.Warning,
      [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
      [NyxAnnotationStatus.Draft]: NyxTheme.Primary,
      [NyxAnnotationStatus.InReview]: NyxTheme.Warning,
      [NyxAnnotationStatus.Approved]: NyxTheme.Success,
      [NyxAnnotationStatus.Archived]: NyxTheme.Secondary,
    }

    return { content, annotations, annotationStatusTheme }
  },
  template: `
    <nyx-editor
      v-model="content"
      v-model:annotations="annotations"
      :mode="'${NyxEditorMode.Zen}'"
      :toolbar="'${NyxEditorToolbar.Full}'"
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
