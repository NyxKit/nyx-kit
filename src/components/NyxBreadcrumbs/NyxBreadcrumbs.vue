<script setup lang="ts">
import './NyxBreadcrumbs.scss'
import { computed } from 'vue'
import { type NyxBreadcrumb } from '@/types'
import type { NyxBreadcrumbsEmits, NyxBreadcrumbsProps } from './NyxBreadcrumbs.types'
import { useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxBreadcrumbsProps>(), {
  separator: '/',
})

const emit = defineEmits<NyxBreadcrumbsEmits>()

const { classList } = useNyxProps(props, { origin: 'NyxBreadcrumbs' })

const normalizedItems = computed<NyxBreadcrumb[]>(() => {
  return props.items
    .map((item: string|NyxBreadcrumb) => (typeof item === 'string') ? { label: item } : item)
})


</script>

<template>
  <nav
    class="nyx-breadcrumbs"
    :class="classList"
  >
    <template v-for="(item, index) in normalizedItems" :key="index">
      <a
        :href="item.href"
        @click="() => emit('click', item)"
      >{{ item.label }}</a>
      <span class="nyx-breadcrumbs__separator" v-if="index < normalizedItems.length - 1">
        <slot name="separator">{{ props.separator }}</slot>
      </span>
    </template>
  </nav>
</template>
