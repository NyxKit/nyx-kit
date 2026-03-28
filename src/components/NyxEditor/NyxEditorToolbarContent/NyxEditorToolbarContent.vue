<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import { NyxEditorToolbar } from '@/types'
import {
  Bold, Italic, Underline, Strikethrough, Code,
  List, ListOrdered, ListChecks,
  Heading1, Heading2, Heading3, Pilcrow,
  Undo2, Redo2, MessageSquare,
} from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  editor: Editor | null
  toolbar: NyxEditorToolbar
  surface: 'bubble' | 'toolbar'
  showUndoRedo?: boolean
}>(), {
  showUndoRedo: false,
})

const emit = defineEmits<{
  'annotation:create': []
}>()

const hasFormatting = computed(() => [NyxEditorToolbar.Default, NyxEditorToolbar.Full].includes(props.toolbar))
const hasComments = computed(() => [NyxEditorToolbar.CommentOnly, NyxEditorToolbar.Full].includes(props.toolbar))

const iconSize = computed(() => props.surface === 'bubble' ? 14 : 15)
const buttonClass = computed(() => `nyx-editor__${props.surface}-btn`)
const separatorClass = computed(() => `nyx-editor__${props.surface}-sep`)
const trailingSeparatorClass = computed(() => [separatorClass.value, props.surface === 'toolbar' ? 'nyx-editor__toolbar-sep--grow' : ''].filter(Boolean).join(' '))

const onAnnotationCreate = () => emit('annotation:create')
</script>

<template>
  <template v-if="hasFormatting">
    <button :class="[buttonClass, { active: editor?.isActive('bold') }]"
      @click="editor?.chain().focus().toggleBold().run()" aria-label="Bold">
      <Bold :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('italic') }]"
      @click="editor?.chain().focus().toggleItalic().run()" aria-label="Italic">
      <Italic :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('underline') }]"
      @click="editor?.chain().focus().toggleUnderline().run()" aria-label="Underline">
      <Underline :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('strike') }]"
      @click="editor?.chain().focus().toggleStrike().run()" aria-label="Strikethrough">
      <Strikethrough :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('code') }]"
      @click="editor?.chain().focus().toggleCode().run()" aria-label="Inline code">
      <Code :size="iconSize" />
    </button>

    <span :class="separatorClass" aria-hidden="true" />

    <button :class="[buttonClass, { active: editor?.isActive('bulletList') }]"
      @click="editor?.chain().focus().toggleBulletList().run()" aria-label="Bullet list">
      <List :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('orderedList') }]"
      @click="editor?.chain().focus().toggleOrderedList().run()" aria-label="Ordered list">
      <ListOrdered :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('taskList') }]"
      @click="editor?.chain().focus().toggleTaskList().run()" aria-label="Task list">
      <ListChecks :size="iconSize" />
    </button>

    <span :class="separatorClass" aria-hidden="true" />

    <button :class="[buttonClass, { active: editor?.isActive('heading', { level: 1 }) }]"
      @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" aria-label="Heading 1">
      <Heading1 :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('heading', { level: 2 }) }]"
      @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" aria-label="Heading 2">
      <Heading2 :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('heading', { level: 3 }) }]"
      @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" aria-label="Heading 3">
      <Heading3 :size="iconSize" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('paragraph') }]"
      @click="editor?.chain().focus().setParagraph().run()" aria-label="Paragraph">
      <Pilcrow :size="iconSize" />
    </button>
  </template>

  <template v-if="hasFormatting && hasComments">
    <span :class="separatorClass" aria-hidden="true" />
  </template>

  <template v-if="hasComments">
    <button :class="buttonClass" @click="onAnnotationCreate" aria-label="Comment">
      <MessageSquare :size="iconSize" />
    </button>
  </template>

  <template v-if="showUndoRedo">
    <span :class="trailingSeparatorClass" aria-hidden="true" />
    <button :class="buttonClass" :disabled="!editor?.can().undo()"
      @click="editor?.chain().focus().undo().run()" aria-label="Undo">
      <Undo2 :size="iconSize" />
    </button>
    <button :class="buttonClass" :disabled="!editor?.can().redo()"
      @click="editor?.chain().focus().redo().run()" aria-label="Redo">
      <Redo2 :size="iconSize" />
    </button>
  </template>
</template>
