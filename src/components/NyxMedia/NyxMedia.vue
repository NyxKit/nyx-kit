<script setup lang="ts">
import './NyxMedia.scss'
import { defineProps } from 'vue'
import type { NyxMediaProps } from './NyxMedia.types'
import { NyxMediaType, NyxShape } from '@/types'

const props = withDefaults(defineProps<NyxMediaProps>(), {
  type: NyxMediaType.Image,
  shape: NyxShape.Rectangle,
  loading: 'lazy'
})

</script>

<template>
  <figure class="nyx-media" :class="`shape-${props.shape}`">
    <img
      v-if="props.type === NyxMediaType.Image"
      :src="props.src"
      :alt="props.alt"
      :title="props.title"
      :loading="loading"
    />
    <video
      v-else-if="props.type === NyxMediaType.Video"
      :src="props.src"
      :title="props.title"
      controls
      :loading="props.loading"
    ><track v-if="props.track" kind="subtitles" :src="props.track" /></video>
    <audio
      v-else-if="props.type === NyxMediaType.Audio"
      :src="props.src"
      :title="props.title"
      controls
      :loading="props.loading"
    ><track v-if="props.track" kind="subtitles" :src="props.track" /></audio>
    <figcaption v-if="props.caption">{{ props.caption }}</figcaption>
  </figure>
</template>
