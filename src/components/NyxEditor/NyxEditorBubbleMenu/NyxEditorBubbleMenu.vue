<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import { NyxEditorToolbar, NyxPosition } from '@/types'
import useSelectionPosition from '@/composables/useSelectionPosition'
import {
  Bold, Italic, Underline, Strikethrough, Code,
  List, ListOrdered, ListChecks,
  Heading1, Heading2, Heading3, Pilcrow,
  MessageSquare,
} from 'lucide-vue-next'
import type { NyxEditorSelection } from '@/types/editor'

const props = defineProps<{
  editor: Editor | null
  toolbar: NyxEditorToolbar
  visible: boolean
}>()

const emit = defineEmits<{
  mousedown: [],
  comment: [NyxEditorSelection]
}>()

const bubbleRef = ref<HTMLElement | null>(null)

const { cssVariables, updateCssVariables } = useSelectionPosition(bubbleRef, {
  position: ref(NyxPosition.Top),
  offsetY: -8,
})

const hasToolbar = computed(() => [NyxEditorToolbar.Default, NyxEditorToolbar.Full].includes(props.toolbar))
const hasComments = computed(() => [NyxEditorToolbar.CommentOnly, NyxEditorToolbar.Full].includes(props.toolbar))

watch(() => props.visible, (val) => {
  if (val) nextTick(updateCssVariables)
})

const onComment = () => {
  if (!props.editor) return
  const text = props.editor.state.doc.textBetween(props.editor.state.selection.from, props.editor.state.selection.to)
  const range = { from: props.editor.state.selection.from, to: props.editor.state.selection.to }
  emit('comment', { text, range })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="nyx-bubble">
      <div
        v-if="visible"
        ref="bubbleRef"
        class="nyx-editor__bubble"
        role="toolbar"
        aria-label="Text formatting"
        :style="cssVariables"
        @mousedown.prevent="emit('mousedown')"
      >
        <template v-if="hasToolbar">
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('bold') }"
            @click="editor?.chain().focus().toggleBold().run()" aria-label="Bold">
            <Bold :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('italic') }"
            @click="editor?.chain().focus().toggleItalic().run()" aria-label="Italic">
            <Italic :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('underline') }"
            @click="editor?.chain().focus().toggleUnderline().run()" aria-label="Underline">
            <Underline :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('strike') }"
            @click="editor?.chain().focus().toggleStrike().run()" aria-label="Strikethrough">
            <Strikethrough :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('code') }"
            @click="editor?.chain().focus().toggleCode().run()" aria-label="Inline code">
            <Code :size="14" />
          </button>

          <span class="nyx-editor__bubble-sep" aria-hidden="true" />

          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('bulletList') }"
            @click="editor?.chain().focus().toggleBulletList().run()" aria-label="Bullet list">
            <List :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('orderedList') }"
            @click="editor?.chain().focus().toggleOrderedList().run()" aria-label="Ordered list">
            <ListOrdered :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('taskList') }"
            @click="editor?.chain().focus().toggleTaskList().run()" aria-label="Task list">
            <ListChecks :size="14" />
          </button>

          <span class="nyx-editor__bubble-sep" aria-hidden="true" />

          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('heading', { level: 1 }) }"
            @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" aria-label="Heading 1">
            <Heading1 :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('heading', { level: 2 }) }"
            @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" aria-label="Heading 2">
            <Heading2 :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('heading', { level: 3 }) }"
            @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" aria-label="Heading 3">
            <Heading3 :size="14" />
          </button>
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('paragraph') }"
            @click="editor?.chain().focus().setParagraph().run()" aria-label="Paragraph">
            <Pilcrow :size="14" />
          </button>
        </template>

        <template v-if="hasToolbar && hasComments">
          <span class="nyx-editor__bubble-sep" aria-hidden="true" />
        </template>
        
        <template v-if="hasComments">
          <button class="nyx-editor__bubble-btn" :class="{ active: editor?.isActive('comment') }"
            @click="onComment" aria-label="Comment">
            <MessageSquare :size="14" />
          </button>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>
