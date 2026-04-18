<script setup lang="ts" generic="T = string">
import './NyxDropdown.scss'
import { useNyxProps } from '@/composables'
import NyxIcon from '../NyxIcon/NyxIcon.vue'
import type { NyxDropdownItemEmits, NyxDropdownItemProps } from './NyxDropdown.types'

const props = defineProps<NyxDropdownItemProps<T>>()
const emit = defineEmits<NyxDropdownItemEmits<T>>()

const { classList, nyxSize } = useNyxProps(props, { origin: 'NyxDropdownItem' })

const onClick = () => {
  if (props.option.disabled) return
  emit('click', props.option)
}
</script>

<template>
  <button
    type="button"
    class="nyx-dropdown-item"
    data-nyx-dropdown-item
    :class="[
      ...classList,
      { 'nyx-dropdown-item--disabled': props.option.disabled }
    ]"
    :disabled="props.option.disabled"
    :aria-disabled="props.option.disabled || undefined"
    role="menuitem"
    @click="onClick"
  >
    <NyxIcon v-if="props.option.icon" :name="props.option.icon" :size="nyxSize" />
    <span>{{ props.option.label }}</span>
  </button>
</template>
