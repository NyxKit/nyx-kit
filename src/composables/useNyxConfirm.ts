import { ref, h, render, type VNode, onUnmounted } from 'vue'
import type { ConfirmOptions } from '../types/confirm'
import { NyxResult, type NyxResultVoid } from '../classes/NyxResult'
import { NyxTheme, NyxVariant } from '../types'
import NyxModal from '../components/NyxModal/NyxModal.vue'

const container = ref<HTMLElement | null>(null)
let currentResolve: ((result: NyxResultVoid<'cancelled'>) => void) | null = null
let isDialogOpen = false

function createContainer(): HTMLElement {
  if (!container.value) {
    const el = document.createElement('div')
    el.id = 'nyx-confirm-container'
    document.body.appendChild(el)
    container.value = el
  }
  return container.value
}

function destroyContainer() {
  if (container.value) {
    render(null, container.value)
    container.value.remove()
    container.value = null
  }
}

function useNyxConfirm() {
  const confirm = (options: ConfirmOptions): Promise<NyxResultVoid<'cancelled'>> => {
    if (isDialogOpen) {
      return Promise.reject(new Error('A confirmation dialog is already open'))
    }

    isDialogOpen = true

    return new Promise((resolve) => {
      currentResolve = resolve

      const el = createContainer()

      const handleConfirm = () => {
        cleanup()
        resolve(NyxResult.ok())
      }

      const handleCancel = () => {
        cleanup()
        resolve(NyxResult.fail('cancelled', 'User cancelled'))
      }

      const vnode: VNode = h(NyxModal, {
        modelValue: true,
        title: options.title || '',
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        theme: options.theme || NyxTheme.Primary,
        onConfirm: handleConfirm,
        onCancel: handleCancel,
        onClose: handleCancel
      }, () => options.message)

      render(vnode, el)
    })
  }

  const cleanup = () => {
    isDialogOpen = false
    currentResolve = null
    destroyContainer()
  }

  return { confirm }
}

onUnmounted(() => {
  destroyContainer()
})

export { useNyxConfirm }