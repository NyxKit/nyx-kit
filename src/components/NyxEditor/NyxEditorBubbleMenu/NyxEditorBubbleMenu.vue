<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import { NyxPosition } from '@/types'
import useSelectionPosition from '@/composables/useSelectionPosition'

const props = defineProps<{
  editor: Editor | null
  visible: boolean
}>()

const emit = defineEmits<{
  mousedown: []
}>()

const bubbleRef = ref<HTMLElement | null>(null)

const { cssVariables, updateCssVariables } = useSelectionPosition(bubbleRef, {
  position: ref(NyxPosition.Top),
  offsetY: -8,
})

watch(() => props.visible, (val) => {
  if (val) nextTick(updateCssVariables)
})
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
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('bold') }"
          @click="editor?.chain().focus().toggleBold().run()"
          aria-label="Bold"
        ><strong>B</strong></button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('italic') }"
          @click="editor?.chain().focus().toggleItalic().run()"
          aria-label="Italic"
        ><em>I</em></button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('underline') }"
          @click="editor?.chain().focus().toggleUnderline().run()"
          aria-label="Underline"
        ><u>U</u></button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('strike') }"
          @click="editor?.chain().focus().toggleStrike().run()"
          aria-label="Strikethrough"
        ><s>S</s></button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('code') }"
          @click="editor?.chain().focus().toggleCode().run()"
          aria-label="Inline code"
        >&lt;&gt;</button>

        <span class="nyx-editor__bubble-sep" aria-hidden="true" />

        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('bulletList') }"
          @click="editor?.chain().focus().toggleBulletList().run()"
          aria-label="Bullet list"
        >UL</button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('orderedList') }"
          @click="editor?.chain().focus().toggleOrderedList().run()"
          aria-label="Ordered list"
        >OL</button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('taskList') }"
          @click="editor?.chain().focus().toggleTaskList().run()"
          aria-label="Task list"
        >☐</button>

        <span class="nyx-editor__bubble-sep" aria-hidden="true" />

        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('heading', { level: 1 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
          aria-label="Heading 1"
        >H1</button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('heading', { level: 2 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
          aria-label="Heading 2"
        >H2</button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('heading', { level: 3 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
          aria-label="Heading 3"
        >H3</button>
        <button
          class="nyx-editor__bubble-btn"
          :class="{ active: editor?.isActive('paragraph') }"
          @click="editor?.chain().focus().setParagraph().run()"
          aria-label="Paragraph"
        >P</button>
      </div>
    </Transition>
  </Teleport>
</template>
