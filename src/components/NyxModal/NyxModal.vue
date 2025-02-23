<script setup lang="ts">
import './NyxModal.scss'
import type { NyxModalEmits, NyxModalProps } from './NyxModal.types'
import NyxButton from '../NyxButton/NyxButton.vue'
import { KeyboardKey, NyxSize, NyxVariant, NyxTheme } from '@/types'
import { useKeyPress } from '@/compositions'
import { computed, useSlots, type Slots } from 'vue'

const props = withDefaults(defineProps<NyxModalProps>(), {
  cancelText: 'Close',
  size: NyxSize.Medium,
  backdrop: true,
  static: false
})

const emit = defineEmits<NyxModalEmits>()
const model = defineModel<boolean>({ default: false })
const slots: Slots = useSlots()

const close = () => {
  if (props.static) return
  model.value = false
  emit('close')
}

useKeyPress(KeyboardKey.Esc, close)

const isHeaderVisible = computed(() => !!slots.header || !!props.title)
const isFooterVisible = computed(() => !!slots.footer || !!props.confirmText)

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
      :class="[
        `size-${props.size}`,
        { 'nyx-modal--open': model },
        { 'nyx-modal--no-backdrop': !props.backdrop }
      ]"
      @click.self="close"
    >
      <article class="nyx-modal__content">
        <header class="nyx-modal__header" v-if="isHeaderVisible">
          <slot name="header">
            <h1>{{ title }}</h1>
          </slot>
          <button class="nyx-modal__close" @click="close" v-if="!props.static">&times;</button>
        </header>
        <section class="nyx-modal__body">
          <slot>NyxModal body</slot>
        </section>
        <footer class="nyx-modal__footer" v-if="isFooterVisible">
          <slot name="footer">
            <NyxButton
              v-if="!props.static"
              :theme="NyxTheme.Default"
              :variant="NyxVariant.Outline"
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
