<script setup lang="ts">
import './NyxModal.scss'
import { useTemplateRef } from 'vue'
import type { NyxModalEmits, NyxModalProps } from './NyxModal.types'
import NyxButton from '../NyxButton/NyxButton.vue'
import { KeyboardKey, NyxSize, NyxStyleVariant, NyxTheme } from '@/types'
import { useKeyPress } from '@/compositions'

const props = withDefaults(defineProps<NyxModalProps>(), {
  cancelText: 'Close',
  size: NyxSize.Medium
})

const emit = defineEmits<NyxModalEmits>()
const model = defineModel<boolean>({ default: false })
// const elDialog = useTemplateRef<HTMLDialogElement>('elDialog')

const close = () => {
  model.value = false
  emit('close')
}

useKeyPress(KeyboardKey.Esc, close)

const cancel = () => {
  emit('cancel')
  close()
}

const confirm = () => {
  emit('confirm')
  close()
}
</script>

<template>
  <Teleport to="body">
    <!-- <dialog :open="model" ref="elDialog"></dialog> -->
    <div
      class="nyx-modal"
      :class="[`size-${props.size}`, { 'nyx-modal--open': model }]"
      @click.self="close"
    >
      <article class="nyx-modal__content">
        <header class="nyx-modal__header">
          <slot name="header">
            <h1>{{ title }}</h1>
          </slot>
          <button class="nyx-modal__close" @click="close">&times;</button>
        </header>
        <section class="nyx-modal__body">
          <slot>NyxModal body</slot>
        </section>
        <footer class="nyx-modal__footer">
          <slot name="footer">
            <NyxButton
              :theme="NyxTheme.Default"
              :variant="NyxStyleVariant.Outline"
              @click="cancel"
            >{{ props.cancelText }}</NyxButton>
            <NyxButton
              v-if="props.confirmText"
              :theme="NyxTheme.Primary"
              @click="confirm"
            >{{ confirmText }}</NyxButton>
          </slot>
        </footer>
      </article>
    </div>
  </Teleport>
</template>
