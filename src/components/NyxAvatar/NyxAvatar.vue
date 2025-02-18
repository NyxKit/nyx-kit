<script setup lang="ts">
import './NyxAvatar.scss'
import { defineProps, computed } from 'vue'
import NyxMedia from '../NyxMedia/NyxMedia.vue'
import type { NyxAvatarProps } from './NyxAvatar.types'
import { NyxMediaType, NyxSize } from '@/types'

const props = withDefaults(defineProps<NyxAvatarProps>(), {
  size: NyxSize.Medium
})

const fallback = computed(() => {
  if (props.initials) return props.initials
  if (!props.name) return ''
  const nameParts = props.name.split(' ')
  return nameParts.map((part) => part.charAt(0).toUpperCase()).join('')
})

const alt = computed(() => props.name ?? props.initials)
</script>

<template>
  <div
    class="nyx-avatar"
    :class="[`size-${props.size}`]"
    :style="{ '--nyx-c-avatar': props.color }"
  >
    <NyxMedia
      v-if="props.src"
      class="nyx-avatar__image"
      :type="NyxMediaType.Image"
      :src="props.src"
      :alt="alt"
      :title="alt"
    />
    <span v-else class="nyx-avatar__image">{{ fallback }}</span>
    <span v-if="props.name" class="nyx-avatar__name">{{ props.name }}</span>
  </div>
</template>
