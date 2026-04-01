<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import { NyxEditorToolbar } from '@/types'
import NyxIcon from '../../NyxIcon/NyxIcon.vue'

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

const buttonClass = computed(() => `nyx-editor__${props.surface}-btn`)
const separatorClass = computed(() => `nyx-editor__${props.surface}-sep`)
const trailingSeparatorClass = computed(() => [separatorClass.value, props.surface === 'toolbar' ? 'nyx-editor__toolbar-sep--grow' : ''].filter(Boolean).join(' '))

const onAnnotationCreate = () => emit('annotation:create')
</script>

<template>
  <template v-if="hasFormatting">
    <button :class="[buttonClass, { active: editor?.isActive('bold') }]"
      @click="editor?.chain().focus().toggleBold().run()" aria-label="Bold">
      <NyxIcon name="bold" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('italic') }]"
      @click="editor?.chain().focus().toggleItalic().run()" aria-label="Italic">
      <NyxIcon name="italic" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('underline') }]"
      @click="editor?.chain().focus().toggleUnderline().run()" aria-label="Underline">
      <NyxIcon name="underline" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('strike') }]"
      @click="editor?.chain().focus().toggleStrike().run()" aria-label="Strikethrough">
      <NyxIcon name="strikethrough" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('code') }]"
      @click="editor?.chain().focus().toggleCode().run()" aria-label="Inline code">
      <NyxIcon name="code" />
    </button>

    <span :class="separatorClass" aria-hidden="true" />

    <button :class="[buttonClass, { active: editor?.isActive('bulletList') }]"
      @click="editor?.chain().focus().toggleBulletList().run()" aria-label="Bullet list">
      <NyxIcon name="list" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('orderedList') }]"
      @click="editor?.chain().focus().toggleOrderedList().run()" aria-label="Ordered list">
      <NyxIcon name="list-ordered" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('taskList') }]"
      @click="editor?.chain().focus().toggleTaskList().run()" aria-label="Task list">
      <NyxIcon name="list-check" />
    </button>

    <span :class="separatorClass" aria-hidden="true" />

    <button :class="[buttonClass, { active: editor?.isActive('heading', { level: 1 }) }]"
      @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" aria-label="Heading 1">
      <NyxIcon name="heading-1" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('heading', { level: 2 }) }]"
      @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" aria-label="Heading 2">
      <NyxIcon name="heading-2" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('heading', { level: 3 }) }]"
      @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" aria-label="Heading 3">
      <NyxIcon name="heading-3" />
    </button>
    <button :class="[buttonClass, { active: editor?.isActive('paragraph') }]"
      @click="editor?.chain().focus().setParagraph().run()" aria-label="Paragraph">
      <NyxIcon name="pilcrow" />
    </button>
  </template>

  <template v-if="hasFormatting && hasComments">
    <span :class="separatorClass" aria-hidden="true" />
  </template>

  <template v-if="hasComments">
    <button :class="buttonClass" @click="onAnnotationCreate" aria-label="Comment">
      <NyxIcon name="message-square" />
    </button>
  </template>

  <template v-if="showUndoRedo">
    <span :class="trailingSeparatorClass" aria-hidden="true" />
    <button :class="buttonClass" :disabled="!editor?.can().undo()"
      @click="editor?.chain().focus().undo().run()" aria-label="Undo">
      <NyxIcon name="undo-2" />
    </button>
    <button :class="buttonClass" :disabled="!editor?.can().redo()"
      @click="editor?.chain().focus().redo().run()" aria-label="Redo">
      <NyxIcon name="redo-2" />
    </button>
  </template>
</template>
