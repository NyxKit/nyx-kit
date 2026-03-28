<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import { NyxEditorToolbar, NyxPosition } from '@/types'
import useSelectionPosition from '@/composables/useSelectionPosition'
import NyxEditorToolbarContent from '../NyxEditorToolbarContent/NyxEditorToolbarContent.vue'

const props = defineProps<{
  editor: Editor | null
  toolbar: NyxEditorToolbar
  visible: boolean
}>()

const emit = defineEmits<{
  mousedown: [],
  'annotation:create': []
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
        <NyxEditorToolbarContent
          :editor="editor"
          :toolbar="toolbar"
          surface="bubble"
          @annotation:create="emit('annotation:create')"
        />
      </div>
    </Transition>
  </Teleport>
</template>
