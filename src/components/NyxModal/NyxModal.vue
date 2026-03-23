<script setup lang="ts">
import './NyxModal.scss'
import type { NyxModalEmits, NyxModalProps } from './NyxModal.types'
import NyxButton from '../NyxButton/NyxButton.vue'
import { KeyboardKey, NyxVariant, NyxTheme } from '@/types'
import { useKeyPress, useNyxProps } from '@/composables'
import { computed, nextTick, onBeforeUnmount, useSlots, useTemplateRef, watch, type Slots } from 'vue'
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

const elContent = useTemplateRef<HTMLElement>('elContent')
const modalTitleId = `nyx-modal-title-${generateRandomString(8)}`

const isOpen = computed(() => model.value || props.static)
const isHeaderVisible = computed(() => !!slots.header || !!props.title)
const isFooterVisible = computed(() => !!slots.footer || !!props.confirmText)

// ── Focus trap ────────────────────────────────────────────────────────────────

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

let previousFocus: Element | null = null

const trapFocus = (event: KeyboardEvent) => {
  if (event.key !== 'Tab' || !elContent.value) return
  const focusable = [...elContent.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)]
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

watch(isOpen, (open) => {
  if (open) {
    previousFocus = document.activeElement
    document.addEventListener('keydown', trapFocus)
    nextTick(() => {
      const first = elContent.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      first?.focus()
    })
  } else {
    document.removeEventListener('keydown', trapFocus)
    ;(previousFocus as HTMLElement | null)?.focus()
    previousFocus = null
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', trapFocus)
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

const { classList } = useNyxProps(props, { origin: 'NyxModal' })
</script>

<template>
  <Teleport to="body">
    <div
      class="nyx-modal"
      :class="[
        ...classList,
        !!props.customClass && `${props.customClass}`,
        { 'nyx-modal--open': isOpen },
        { 'nyx-modal--no-backdrop': !props.backdrop }
      ]"
      @click.self="close"
    >
      <article
        class="nyx-modal__content"
        ref="elContent"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="isHeaderVisible ? modalTitleId : undefined"
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
              v-if="!props.static"
              :variant="NyxVariant.Outline"
              @click="cancel"
            >{{ props.cancelText }}</NyxButton>
            <NyxButton
              v-if="props.confirmText"
              :theme="NyxTheme.Primary"
              @click="confirm"
            >{{ props.confirmText }}</NyxButton>
          </slot>
        </footer>
      </article>
    </div>
  </Teleport>
</template>
