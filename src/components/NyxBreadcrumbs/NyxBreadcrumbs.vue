<script setup lang="ts">
import './NyxBreadcrumbs.scss'
import { useSlots, computed, type Slots } from 'vue'
import { NyxSize, NyxTheme, NyxVariant, type NyxBreadcrumb } from '@/types'
import type { NyxBreadcrumbsEmits, NyxBreadcrumbsProps } from './NyxBreadcrumbs.types'

const props = withDefaults(defineProps<NyxBreadcrumbsProps>(), {
  separator: '/',
  theme: NyxTheme.Default,
  size: NyxSize.Medium,
  variant: NyxVariant.Text
})

const emit = defineEmits<NyxBreadcrumbsEmits>()

const normalizedItems = computed<NyxBreadcrumb[]>(() => {
  return props.items
    .map((item: string|NyxBreadcrumb) => (typeof item === 'string') ? { label: item } : item)
})

// Access slots
const slots: Slots = useSlots()

</script>

<template>
  <nav
    class="nyx-breadcrumbs"
    :class="[`theme-${props.theme}`, `size-${props.size}`, `variant-${props.variant}`]"
  >
    <template v-for="(item, index) in normalizedItems" :key="index">
      <a
        :href="item.href"
        :size="NyxSize.Small"
        :variant="NyxVariant.Text"
        @click="() => emit('click', item)"
      >{{ item.label }}</a>
      <span class="nyx-breadcrumbs__separator" v-if="index < normalizedItems.length - 1">
        <slot name="separator">{{ props.separator }}</slot>
      </span>
    </template>
  </nav>
</template>
