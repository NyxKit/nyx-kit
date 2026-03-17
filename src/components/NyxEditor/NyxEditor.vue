<script setup lang="ts">
import './NyxEditor.scss'
import { ref, watch, nextTick } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Markdown, type MarkdownStorage } from 'tiptap-markdown'
import type { NyxEditorProps, NyxEditorEmits } from './NyxEditor.types'
import { NyxEditorMode, NyxEditorFormat, NyxTheme, NyxVariant, NyxSize } from '@/types'
import useNyxProps from '@/composables/useNyxProps'
import NyxEditorBubbleMenu from './NyxEditorBubbleMenu/NyxEditorBubbleMenu.vue'

const props = withDefaults(defineProps<NyxEditorProps>(), {
  mode: NyxEditorMode.Zen,
  format: NyxEditorFormat.Markdown,
  theme: NyxTheme.Default,
  variant: NyxVariant.Outline,
  size: NyxSize.Medium,
  disabled: false,
  placeholder: '',
})

const emit = defineEmits<NyxEditorEmits>()

const model = defineModel<string>({ default: '' })
const sourceModel = defineModel<boolean>('source', { default: false })

const { classList } = useNyxProps(props)

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

// ── Content helpers ─────────────────────────────────────────────────
const getContent = () => {
  if (!editor.value) return ''
  return props.format === NyxEditorFormat.Markdown
    ? (editor.value.storage as unknown as { markdown: MarkdownStorage }).markdown.getMarkdown()
    : editor.value.getHTML()
}

const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
    TaskList,
    TaskItem.configure({ nested: true }),
    ...(props.format === NyxEditorFormat.Markdown ? [Markdown] : []),
  ],
  content: model.value,
  editable: !props.disabled,
  onUpdate: () => {
    const content = getContent()
    model.value = content
    emit('change', content)
  },
  onSelectionUpdate: updateBubble,
  onFocus: ({ event }) => emit('focus', event as FocusEvent),
  onBlur: ({ event }) => {
    bubbleVisible.value = false
    emit('blur', event as FocusEvent)
  },
})

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
</script>

<template>
  <div class="nyx-editor" :class="[...classList, `mode-${props.mode}`]">

    <!-- Toolbar mode: persistent top bar -->
    <div
      v-if="props.mode === 'toolbar'"
      class="nyx-editor__toolbar"
      role="toolbar"
      aria-label="Text formatting"
      @mousedown.prevent
    >
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('bold') }"
        @click="editor?.chain().focus().toggleBold().run()"
        aria-label="Bold"
      ><strong>B</strong></button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('italic') }"
        @click="editor?.chain().focus().toggleItalic().run()"
        aria-label="Italic"
      ><em>I</em></button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('underline') }"
        @click="editor?.chain().focus().toggleUnderline().run()"
        aria-label="Underline"
      ><u>U</u></button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('strike') }"
        @click="editor?.chain().focus().toggleStrike().run()"
        aria-label="Strikethrough"
      ><s>S</s></button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('code') }"
        @click="editor?.chain().focus().toggleCode().run()"
        aria-label="Inline code"
      >&lt;&gt;</button>

      <span class="nyx-editor__toolbar-sep" aria-hidden="true" />

      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('bulletList') }"
        @click="editor?.chain().focus().toggleBulletList().run()"
        aria-label="Bullet list"
      >UL</button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('orderedList') }"
        @click="editor?.chain().focus().toggleOrderedList().run()"
        aria-label="Ordered list"
      >OL</button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('taskList') }"
        @click="editor?.chain().focus().toggleTaskList().run()"
        aria-label="Task list"
      >☐</button>

      <span class="nyx-editor__toolbar-sep" aria-hidden="true" />

      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('heading', { level: 1 }) }"
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        aria-label="Heading 1"
      >H1</button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('heading', { level: 2 }) }"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        aria-label="Heading 2"
      >H2</button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('heading', { level: 3 }) }"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        aria-label="Heading 3"
      >H3</button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('paragraph') }"
        @click="editor?.chain().focus().setParagraph().run()"
        aria-label="Paragraph"
      >P</button>

      <span class="nyx-editor__toolbar-sep nyx-editor__toolbar-sep--grow" aria-hidden="true" />

      <button
        class="nyx-editor__toolbar-btn"
        :disabled="!editor?.can().undo()"
        @click="editor?.chain().focus().undo().run()"
        aria-label="Undo"
      >↩</button>
      <button
        class="nyx-editor__toolbar-btn"
        :disabled="!editor?.can().redo()"
        @click="editor?.chain().focus().redo().run()"
        aria-label="Redo"
      >↪</button>
    </div>

    <!-- Source toggle button -->
    <button
      class="nyx-editor__source-toggle"
      :class="{ active: sourceModel }"
      @click="sourceModel = !sourceModel"
      aria-label="Toggle source"
    >&lt;/&gt;</button>

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
      v-if="props.mode === 'zen'"
      :editor="editor ?? null"
      :visible="bubbleVisible"
      @mousedown="onBubbleMousedown"
    />

  </div>
</template>
