<script setup lang="ts">
import './NyxAvatar.scss'
import { computed } from 'vue'
import NyxMedia from '../NyxMedia/NyxMedia.vue'
import type { NyxAvatarProps } from './NyxAvatar.types'
import { NyxMediaType, NyxShape, NyxSize } from '@/types'
import useNyxProps from '@/compositions/useNyxProps'

const props = withDefaults(defineProps<NyxAvatarProps>(), {
  size: NyxSize.Medium,
  shape: NyxShape.Circle,
  showName: false,
  pixel: false
})

const fallback = computed(() => {
  if (props.placeholder) return props.placeholder
  if (!props.name) return ''
  const nameParts = props.name.split(' ')
  return nameParts.map((part) => part.charAt(0).toUpperCase()).join('')
})

const alt = computed(() => props.name ?? props.placeholder ?? '')

const { classList } = useNyxProps(props)
</script>

<template>
  <div
    class="nyx-avatar"
    :class="classList"
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
    <span v-else class="nyx-avatar__image"><slot>{{ fallback }}</slot></span>
    <span v-if="props.name && props.showName" class="nyx-avatar__name">{{ props.name }}</span>
  </div>
</template>
