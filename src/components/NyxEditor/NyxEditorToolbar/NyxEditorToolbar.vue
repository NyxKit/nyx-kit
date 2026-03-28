<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { NyxEditorToolbar as NyxEditorToolbarMode } from '@/types'
import NyxEditorToolbarContent from '../NyxEditorToolbarContent/NyxEditorToolbarContent.vue'

defineProps<{
  editor: Editor | null
  toolbar: NyxEditorToolbarMode
}>()

const emit = defineEmits<{
  'annotation:create': []
}>()
</script>

<template>
  <div
    class="nyx-editor__toolbar"
    role="toolbar"
    aria-label="Text formatting"
    @mousedown.prevent
  >
    <NyxEditorToolbarContent
      :editor="editor"
      :toolbar="toolbar"
      surface="toolbar"
      :show-undo-redo="true"
      @annotation:create="emit('annotation:create')"
    />
  </div>
</template>
