<script setup lang="ts">
import { NyxSize, type NyxBreadcrumb } from '@/types'
import NyxIcon from '../NyxIcon/NyxIcon.vue'

const props = defineProps<{
  item: NyxBreadcrumb
  size?: NyxSize
}>()
</script>

<template>
  <span class="nyx-breadcrumbs__item-content">
    <NyxIcon
      v-if="props.item.icon"
      class="nyx-breadcrumbs__icon"
      :name="props.item.icon"
      :size="props.size ?? NyxSize.Medium"
      :stroke="NyxSize.Small"
      aria-hidden="true"
    />
    <span class="nyx-breadcrumbs__label">{{ props.item.label }}</span>
  </span>
</template>
