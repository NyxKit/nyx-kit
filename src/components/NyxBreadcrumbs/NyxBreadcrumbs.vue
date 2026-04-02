<script setup lang="ts">
import './NyxBreadcrumbs.scss'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { type NyxBreadcrumb } from '@/types'
import NyxIcon from '../NyxIcon/NyxIcon.vue'
import NyxBreadcrumbItem from './NyxBreadcrumbItem.vue'
import type {
  NyxBreadcrumbsEmits,
  NyxBreadcrumbsIconSeparator,
  NyxBreadcrumbsProps,
  NyxBreadcrumbsSeparator,
} from './NyxBreadcrumbs.types'
import { useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxBreadcrumbsProps>(), {
  separator: '/',
})

const emit = defineEmits<NyxBreadcrumbsEmits>()
defineSlots<{
  item?: (props: { item: NyxBreadcrumb }) => unknown
  separator?: () => unknown
}>()

const { classList } = useNyxProps(props, { origin: 'NyxBreadcrumbs' })

const normalizedItems = computed<NyxBreadcrumb[]>(() => {
  return props.items
    .map((item: string|NyxBreadcrumb) => (typeof item === 'string') ? { label: item } : item)
})

const isSeparatorIcon = computed(() => isIconSeparator(props.separator))
const separatorIconName = computed(() => getSeparatorIconName(props.separator))

function isIconSeparator (separator: NyxBreadcrumbsSeparator): separator is NyxBreadcrumbsIconSeparator {
  return typeof separator === 'object' && separator !== null && typeof separator.icon === 'string'
}

function getSeparatorIconName (separator: NyxBreadcrumbsSeparator): string | undefined {
  return isIconSeparator(separator) ? separator.icon : undefined
}

function isLinkItem (item: NyxBreadcrumb): boolean {
  return Boolean(item.route || item.href)
}

function handleItemClick (item: NyxBreadcrumb): void {
  if (!isLinkItem(item)) return
  emit('click', item)
}


</script>

<template>
  <nav
    class="nyx-breadcrumbs"
    :class="classList"
  >
    <template v-for="(item, index) in normalizedItems" :key="index">
      <RouterLink
        v-if="item.route"
        :to="item.route"
        class="nyx-breadcrumbs__item nyx-breadcrumbs__item--link"
        @click="handleItemClick(item)"
      >
        <slot name="item" :item="item">
          <NyxBreadcrumbItem :item="item" :size="props.size" />
        </slot>
      </RouterLink>

      <a
        v-else-if="item.href"
        :href="item.href"
        class="nyx-breadcrumbs__item nyx-breadcrumbs__item--link"
        @click="handleItemClick(item)"
      >
        <slot name="item" :item="item">
          <NyxBreadcrumbItem :item="item" :size="props.size" />
        </slot>
      </a>

      <span
        v-else
        class="nyx-breadcrumbs__item nyx-breadcrumbs__item--static"
      >
        <slot name="item" :item="item">
          <NyxBreadcrumbItem :item="item" :size="props.size" />
        </slot>
      </span>

      <span class="nyx-breadcrumbs__separator" v-if="index < normalizedItems.length - 1" aria-hidden="true">
        <slot name="separator">
          <NyxIcon
            v-if="isSeparatorIcon"
            :name="separatorIconName!"
            :size="props.size"
          />
          <template v-else>{{ props.separator }}</template>
        </slot>
      </span>
    </template>
  </nav>
</template>
