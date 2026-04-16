<script setup lang="ts">
import './NyxDropdown.scss'
import { useNyxProps } from '@/composables'
import NyxDropdownItem from './NyxDropdownItem.vue'
import type { NyxDropdownMenuEmits, NyxDropdownMenuProps } from './NyxDropdown.types'

const props = withDefaults(defineProps<NyxDropdownMenuProps>(), {
  options: () => []
})

const emit = defineEmits<NyxDropdownMenuEmits>()

const { classList } = useNyxProps(props, { origin: 'NyxDropdownMenu' })

const onItemClick = (option: NonNullable<NyxDropdownMenuProps['options']>[number]) => {
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
      :key="option.value"
      :option="option"
      :size="props.size"
      @click="onItemClick"
    />
  </div>
</template>
