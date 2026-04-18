<script setup lang="ts" generic="T = string">
import './NyxDropdown.scss'
import { useNyxProps } from '@/composables'
import NyxDropdownItem from './NyxDropdownItem.vue'
import type { NyxDropdownMenuEmits, NyxDropdownMenuProps } from './NyxDropdown.types'

const props = withDefaults(defineProps<NyxDropdownMenuProps<T>>(), {
  options: () => []
})

const emit = defineEmits<NyxDropdownMenuEmits<T>>()

const { classList } = useNyxProps(props, { origin: 'NyxDropdownMenu' })

const onItemClick = (option: NonNullable<NyxDropdownMenuProps<T>['options']>[number]) => {
  emit('select', option)
}
</script>

<template>
  <div
    class="nyx-dropdown-menu"
    :class="classList"
    role="menu"
  >
    <NyxDropdownItem
      v-for="option in props.options"
      :key="String(option.value)"
      :option="option"
      :size="props.size"
      @click="onItemClick"
    />
  </div>
</template>
