<script setup lang="ts">
import './NyxDropdown.scss'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, useSlots, useTemplateRef } from 'vue'
import { NyxPosition, NyxSize, NyxTrigger } from '@/types'
import { useNyxProps, useTeleportPosition } from '@/composables'
import NyxDropdownMenu from './NyxDropdownMenu.vue'
import type { NyxDropdownEmits, NyxDropdownProps } from './NyxDropdown.types'

const props = withDefaults(defineProps<NyxDropdownProps>(), {
  trigger: NyxTrigger.Click,
  position: NyxPosition.BottomRight,
  options: () => []
})

const emit = defineEmits<NyxDropdownEmits>()
const slots = useSlots()

const { classList } = useNyxProps(props, { origin: 'NyxDropdown' })

const isOpen = ref(false)
const elTrigger = useTemplateRef<HTMLDivElement>('elTrigger')
const elDropdown = useTemplateRef<HTMLDivElement>('elDropdown')
const dropdownId = useId()
const triggerId = useId()
const supportsHover = ref(false)
let closeTimer: number | null = null

const { cssVariables, computedPosition } = useTeleportPosition(elTrigger, elDropdown, {
  position: computed(() => props.position),
  gap: ref(NyxSize.Medium),
  isUpdateAllowed: isOpen,
})

const hasCustomDropdown = computed(() => !!slots.dropdown)
const isHoverTrigger = computed(() => props.trigger === NyxTrigger.Hover)

const getMenuItems = (): HTMLButtonElement[] => {
  if (!elDropdown.value) return []
  return Array.from(elDropdown.value.querySelectorAll<HTMLButtonElement>('[data-nyx-dropdown-item]'))
}

const clearCloseTimer = () => {
  if (!closeTimer) return
  window.clearTimeout(closeTimer)
  closeTimer = null
}

const scheduleClose = () => {
  clearCloseTimer()
  closeTimer = window.setTimeout(() => {
    void closeDropdown({ blurTrigger: true })
  }, 120)
}

const focusMenuItem = async (index: number) => {
  await nextTick()
  getMenuItems()[index]?.focus()
}

const focusAdjacentItem = async (direction: 1 | -1) => {
  const items = getMenuItems()
  if (!items.length) return
  const currentIndex = items.findIndex(item => item === document.activeElement)
  const nextIndex = currentIndex === -1
    ? (direction > 0 ? 0 : items.length - 1)
    : (currentIndex + direction + items.length) % items.length
  items[nextIndex]?.focus()
}

const openDropdown = async (focusIndex?: number) => {
  clearCloseTimer()
  if (isOpen.value) return
  isOpen.value = true
  if (focusIndex !== undefined && !hasCustomDropdown.value) {
    await focusMenuItem(focusIndex)
  }
}

const closeDropdown = async (options?: { focusTrigger?: boolean, blurTrigger?: boolean }) => {
  clearCloseTimer()
  if (!isOpen.value) return
  isOpen.value = false
  await nextTick()
  if (options?.focusTrigger) {
    elTrigger.value?.focus()
  } else if (options?.blurTrigger) {
    elTrigger.value?.blur()
  }
}

const toggleDropdown = async (options?: { focusTrigger?: boolean, blurTrigger?: boolean }) => {
  if (isOpen.value) {
    await closeDropdown(options)
    return
  }
  await openDropdown()
}

const onTriggerClick = async () => {
  await toggleDropdown({ blurTrigger: true })
}

const onTriggerKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    await closeDropdown({ focusTrigger: true })
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    await toggleDropdown({ focusTrigger: true })
    return
  }

  if (hasCustomDropdown.value) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!isOpen.value) {
      await openDropdown(0)
    } else {
      await focusAdjacentItem(1)
    }
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) {
      const items = getMenuItems()
      await openDropdown(Math.max(items.length - 1, 0))
    } else {
      await focusAdjacentItem(-1)
    }
  }
}

const onTriggerPointerEnter = () => {
  if (!isHoverTrigger.value || !supportsHover.value) return
  void openDropdown()
}

const onTriggerPointerLeave = () => {
  if (!isHoverTrigger.value || !supportsHover.value) return
  scheduleClose()
}

const onPanelPointerEnter = () => {
  if (!isHoverTrigger.value || !supportsHover.value) return
  clearCloseTimer()
}

const onPanelPointerLeave = () => {
  if (!isHoverTrigger.value || !supportsHover.value) return
  scheduleClose()
}

const onPanelKeydown = async (event: KeyboardEvent) => {
  if (hasCustomDropdown.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    await closeDropdown({ focusTrigger: true })
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    await focusAdjacentItem(1)
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    await focusAdjacentItem(-1)
  }
}

const onSelectOption = async (option: NonNullable<NyxDropdownProps['options']>[number]) => {
  emit('select', option)
  await closeDropdown({ blurTrigger: true })
}

const getOwnerDocument = () => elTrigger.value?.ownerDocument ?? document

const onDocumentClick = (event: MouseEvent) => {
  if (!isOpen.value) return
  const target = event.target as Node | null
  if (!target) return
  if (elTrigger.value?.contains(target) || elDropdown.value?.contains(target)) return
  void closeDropdown({ blurTrigger: true })
}

onMounted(() => {
  supportsHover.value = typeof window !== 'undefined'
    ? window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches ?? false
    : false
  getOwnerDocument().addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  clearCloseTimer()
  getOwnerDocument().removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <div
    class="nyx-dropdown"
    :class="classList"
  >
    <div
      ref="elTrigger"
      class="nyx-dropdown__trigger"
      :id="triggerId"
      role="button"
      tabindex="0"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-controls="dropdownId"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
      @pointerenter="onTriggerPointerEnter"
      @pointerleave="onTriggerPointerLeave"
    >
      <slot />
    </div>

    <Teleport to="body">
      <div
        ref="elDropdown"
        class="nyx-dropdown__panel"
        :class="[
          ...classList,
          `nyx-dropdown__panel--${computedPosition}`,
          { 'nyx-dropdown__panel--open': isOpen }
        ]"
        :data-position="computedPosition"
        :id="dropdownId"
        :style="cssVariables"
        role="menu"
        :aria-labelledby="triggerId"
        @keydown="onPanelKeydown"
        @pointerenter="onPanelPointerEnter"
        @pointerleave="onPanelPointerLeave"
      >
        <slot name="dropdown">
          <NyxDropdownMenu
            :theme="props.theme"
            :size="props.size"
            :variant="props.variant"
            :options="props.options"
            @select="onSelectOption"
          />
        </slot>
      </div>
    </Teleport>
  </div>
</template>
