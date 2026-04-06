<script setup lang="ts">
import './NyxModal.scss'
import type { NyxModalEmits, NyxModalProps } from './NyxModal.types'
import NyxButton from '../NyxButton/NyxButton.vue'
import { KeyboardKey, NyxVariant, NyxTheme } from '@/types'
import { useKeyPress, useNyxProps } from '@/composables'
import { computed, nextTick, useSlots, useTemplateRef, watch, type Slots } from 'vue'
import { generateRandomString } from '@/utils/string'

const props = withDefaults(defineProps<NyxModalProps>(), {
  cancelText: 'Close',
  backdrop: true,
  static: false,
  pixel: false
})

const emit = defineEmits<NyxModalEmits>()
const model = defineModel<boolean>({ default: false })
const slots: Slots = useSlots()

const elDialog = useTemplateRef<HTMLDialogElement>('elDialog')
const modalTitleId = `nyx-modal-title-${generateRandomString(8)}`

const isOpen = computed(() => model.value || props.static)
const isHeaderVisible = computed(() => !!slots.header || !!props.title)
const isFooterVisible = computed(() => !!slots.footer || !!props.confirmText)
const textSubmitButton = computed(() => props.confirmText ?? 'Confirm')
const textCancelButton = computed(() => props.cancelText ?? 'Cancel')

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

watch(isOpen, (open) => {
  if (open) {
    if (elDialog.value?.showModal) elDialog.value.showModal()
    nextTick(() => {
      const first = elDialog.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      first?.focus()
    })
  } else {
    if (elDialog.value?.close) elDialog.value.close()
  }
})

// ── Actions ───────────────────────────────────────────────────────────────────

const close = () => {
  if (props.static) return
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

const { classList, nyxTheme } = useNyxProps(props, { origin: 'NyxModal' })
</script>

<template>
  <dialog
    class="nyx-modal"
    :class="[
      ...classList,
      !!props.customClass && `${props.customClass}`,
      { 'nyx-modal--open': isOpen },
      { 'nyx-modal--no-backdrop': !props.backdrop }
    ]"
    ref="elDialog"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="isHeaderVisible ? modalTitleId : undefined"
    @click.self="close"
    @cancel.prevent="close"
  >
    <header class="nyx-modal__header" v-if="isHeaderVisible">
      <slot name="header">
        <h1 :id="modalTitleId">{{ props.title }}</h1>
      </slot>
      <button class="nyx-modal__close" @click="close" v-if="!props.static">&times;</button>
    </header>
    <section class="nyx-modal__body">
      <slot>NyxModal body</slot>
    </section>
    <footer class="nyx-modal__footer" v-if="isFooterVisible">
      <slot name="footer">
        <NyxButton
          :variant="NyxVariant.Subtle"
          :theme="NyxTheme.Info"
          @click="cancel"
        >{{ textCancelButton }}</NyxButton>
        <NyxButton
          :theme="nyxTheme"
          @click="confirm"
        >{{ textSubmitButton }}</NyxButton>
      </slot>
    </footer>
  </dialog>
</template>
