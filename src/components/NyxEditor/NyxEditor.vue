<script setup lang="ts">
import './NyxEditor.scss'
import { computed, ref, shallowRef, watch, nextTick } from 'vue'
import { useEditor, EditorContent, type Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExtension from '@tiptap/extension-underline'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Markdown, type MarkdownStorage } from 'tiptap-markdown'
import type { NyxEditorProps, NyxEditorEmits } from './NyxEditor.types'
import type {
  NyxAnnotation,
  NyxAnnotationStatusTheme,
} from '@/types/editor'
import {
  NyxAnnotationStatus,
  NyxEditorMode,
  NyxEditorFormat,
  NyxEditorToolbar as NyxEditorToolbarMode,
  NyxTheme,
} from '@/types'
import { useNyxProps } from '@/composables'
import NyxEditorBubbleMenu from './NyxEditorBubbleMenu/NyxEditorBubbleMenu.vue'
import NyxEditorToolbar from './NyxEditorToolbar/NyxEditorToolbar.vue'
import useEditorAnnotations from './useEditorAnnotations'
import { FileCode } from 'lucide-vue-next'

const props = withDefaults(defineProps<NyxEditorProps>(), {
  mode: NyxEditorMode.Zen,
  format: NyxEditorFormat.Markdown,
  toolbar: NyxEditorToolbarMode.Default,
  disabled: false,
  placeholder: '',
  hasSourceToggle: false,
  annotationStatusTheme: (): NyxAnnotationStatusTheme => ({
    [NyxAnnotationStatus.Unresolved]: NyxTheme.Primary,
    [NyxAnnotationStatus.Draft]: NyxTheme.Primary,
    [NyxAnnotationStatus.InReview]: NyxTheme.Warning,
    [NyxAnnotationStatus.Approved]: NyxTheme.Success,
    [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
    [NyxAnnotationStatus.Archived]: NyxTheme.Secondary,
  }),
})

const emit = defineEmits<NyxEditorEmits>()

const model = defineModel<string>({ default: '' })
const sourceModel = defineModel<boolean>('source', { default: false })
const annotationsModel = defineModel<NyxAnnotation[]>('annotations', { default: () => [] })
const editorRef = shallowRef<Editor | null | undefined>(undefined)

const { classList } = useNyxProps(props, { origin: 'NyxEditor' })
const annotations = computed(() => annotationsModel.value)
const annotationStatusTheme = computed(() => props.annotationStatusTheme)

const {
  annotationExtension,
  clearFocusedAnnotation,
  getCurrentSelectionAnchor,
  onCreateAnnotation,
  remapAnnotations,
  syncAnnotationDecorations,
  syncAnnotations,
} = useEditorAnnotations({
  editor: editorRef,
  annotations,
  annotationStatusTheme,
  updateAnnotations: (nextAnnotations) => { annotationsModel.value = nextAnnotations },
  emitCreate: (anchor) => emit('annotation:create', anchor),
  emitFocus: (id) => emit('annotation:focus', id),
  emitBlur: (id) => emit('annotation:blur', id),
})

// ── Source textarea auto-resize ──────────────────────────────────────
const sourceRef = ref<HTMLTextAreaElement | null>(null)

const autoResizeSource = () => {
  const el = sourceRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

watch(sourceModel, (val) => { if (val) nextTick(autoResizeSource) })

// ── Custom bubble menu state ─────────────────────────────────────────
const bubbleVisible = ref(false)

// Prevent hiding the bubble while a bubble button is being clicked
let suppressNextHide = false

const updateBubble = () => {
  if (suppressNextHide) return
  if (!editor.value || props.mode !== NyxEditorMode.Zen) {
    bubbleVisible.value = false
    return
  }
  if (editor.value.state.selection.empty) {
    bubbleVisible.value = false
    return
  }
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) {
    bubbleVisible.value = false
    return
  }
  const rect = sel.getRangeAt(0).getBoundingClientRect()
  if (!rect.width && !rect.height) {
    bubbleVisible.value = false
    return
  }
  bubbleVisible.value = true
}

const onBubbleMousedown = () => {
  suppressNextHide = true
  // Allow the click handler to fire, then restore normal behaviour
  requestAnimationFrame(() => { suppressNextHide = false })
}

const getContent = () => {
  if (!editor.value) return ''
  return props.format === NyxEditorFormat.Markdown
    ? (editor.value.storage as unknown as { markdown: MarkdownStorage }).markdown.getMarkdown()
    : editor.value.getHTML()
}

const editor = useEditor({
  extensions: [
    StarterKit,
    UnderlineExtension,
    TaskList,
    TaskItem.configure({ nested: true }),
    annotationExtension,
    ...(props.format === NyxEditorFormat.Markdown ? [Markdown] : []),
  ],
  content: model.value,
  editable: !props.disabled,
  onCreate: () => {
    syncAnnotationDecorations()
  },
  onUpdate: () => {
    const content = getContent()
    model.value = content
    emit('change', content)
  },
  onTransaction: ({ transaction }) => {
    if (transaction.docChanged) {
      remapAnnotations(transaction)
    }
  },
  onSelectionUpdate: () => {
    updateBubble()

    const anchor = getCurrentSelectionAnchor()
    if (anchor) emit('selection', anchor)
  },
  onFocus: ({ event }) => emit('focus', event as FocusEvent),
  onBlur: ({ event }) => {
    bubbleVisible.value = false
    clearFocusedAnnotation()
    emit('blur', event as FocusEvent)
  },
})

watch(editor, (value) => {
  editorRef.value = value
}, { immediate: true })

watch(() => model.value, (value) => {
  if (!editor.value) return
  const current = getContent()
  if (value !== current) {
    editor.value.commands.setContent(value, { emitUpdate: false })
  }
})

watch(() => props.disabled, (val) => {
  editor.value?.setEditable(!val)
})

watch(() => annotationsModel.value, () => {
  syncAnnotations()
}, { deep: true, flush: 'post' })
</script>

<template>
  <div class="nyx-editor" :class="[...classList, `mode-${props.mode}`]">

    <!-- Toolbar mode: persistent top bar -->
    <NyxEditorToolbar
      v-if="props.mode === 'toolbar'"
      :editor="editor ?? null"
      :toolbar="props.toolbar"
      @create="onCreateAnnotation"
    />

    <!-- Source toggle button -->
    <button
      v-if="props.hasSourceToggle"
      class="nyx-editor__source-toggle"
      :class="{ active: sourceModel }"
      @click="sourceModel = !sourceModel"
      aria-label="Toggle source"
    ><FileCode :size="14" /></button>

    <!-- Source view -->
    <textarea
      v-if="sourceModel"
      ref="sourceRef"
      class="nyx-editor__source"
      v-model="model"
      :disabled="props.disabled"
      spellcheck="false"
      @input="autoResizeSource"
    />

    <!-- Formatted view -->
    <EditorContent v-else :editor="editor" class="nyx-editor__content" />

    <!-- Zen mode: custom bubble menu -->
    <NyxEditorBubbleMenu
      v-if="props.mode === NyxEditorMode.Zen && props.toolbar !== NyxEditorToolbarMode.None"
      :editor="editor ?? null"
      :visible="bubbleVisible"
      :toolbar="props.toolbar"
      @mousedown="onBubbleMousedown"
      @create="onCreateAnnotation"
    />

  </div>
</template>
