<script setup lang="ts">
import './NyxEditor.scss'
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import StarterKit from '@tiptap/starter-kit'
import { Markdown, type MarkdownStorage } from 'tiptap-markdown'
import type { NyxEditorProps, NyxEditorEmits } from './NyxEditor.types'
import { NyxEditorMode, NyxEditorFormat, NyxTheme, NyxVariant, NyxSize } from '@/types'
import useNyxProps from '@/composables/useNyxProps'

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

const { classList } = useNyxProps(props)

const getContent = () => {
  if (!editor.value) return ''
  return props.format === NyxEditorFormat.Markdown
    ? (editor.value.storage as unknown as { markdown: MarkdownStorage }).markdown.getMarkdown()
    : editor.value.getHTML()
}

const editor = useEditor({
  extensions: [
    StarterKit,
    ...(props.format === NyxEditorFormat.Markdown ? [Markdown] : []),
  ],
  content: model.value,
  editable: !props.disabled,
  onUpdate: () => {
    const content = getContent()
    model.value = content
    emit('change', content)
  },
  onFocus: ({ event }) => emit('focus', event as FocusEvent),
  onBlur: ({ event }) => emit('blur', event as FocusEvent),
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
    <div v-if="props.mode === NyxEditorMode.Toolbar" class="nyx-editor__toolbar" role="toolbar" aria-label="Text formatting">
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

      <span class="nyx-editor__toolbar-sep" aria-hidden="true" />

      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('bulletList') }"
        @click="editor?.chain().focus().toggleBulletList().run()"
        aria-label="Bullet list"
      >• List</button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('orderedList') }"
        @click="editor?.chain().focus().toggleOrderedList().run()"
        aria-label="Ordered list"
      >1. List</button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('blockquote') }"
        @click="editor?.chain().focus().toggleBlockquote().run()"
        aria-label="Blockquote"
      >"</button>
      <button
        class="nyx-editor__toolbar-btn"
        :class="{ active: editor?.isActive('codeBlock') }"
        @click="editor?.chain().focus().toggleCodeBlock().run()"
        aria-label="Code block"
      >{ }</button>

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

    <!-- Zen mode: bubble menu appears on text selection -->
    <BubbleMenu
      v-if="editor && props.mode === NyxEditorMode.Zen"
      :editor="editor"
      :tippy-options="{ duration: 100, placement: 'top' }"
    >
      <div class="nyx-editor__bubble" role="toolbar" aria-label="Text formatting">
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
          aria-label="Bold"
        ><strong>B</strong></button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
          aria-label="Italic"
        ><em>I</em></button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
          aria-label="Strikethrough"
        ><s>S</s></button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor.isActive('code') }"
          @click="editor.chain().focus().toggleCode().run()"
          aria-label="Inline code"
        >&lt;&gt;</button>

        <span class="nyx-editor__bubble-sep" aria-hidden="true" />

        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          aria-label="Heading 1"
        >H1</button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          aria-label="Heading 2"
        >H2</button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          aria-label="Heading 3"
        >H3</button>
      </div>
    </BubbleMenu>

    <EditorContent :editor="editor" class="nyx-editor__content" />
  </div>
</template>
