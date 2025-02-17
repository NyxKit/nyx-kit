<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { NyxMediaProps } from './NyxMedia.types'
import { NyxMediaType } from '@/types'

const props = withDefaults(defineProps<NyxMediaProps>(), {
  type: NyxMediaType.Image,
  loading: 'lazy'
})

</script>

<template>
  <figure class="nyx-media">
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
