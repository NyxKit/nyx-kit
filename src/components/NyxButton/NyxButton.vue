<script setup lang="ts">
import './NyxButton.scss'
import { NyxShape, NyxSize } from '@/types'
import type { NyxButtonProps, NyxButtonEmits } from './NyxButton.types'
import { computed } from 'vue'
import { isCurrentDomain } from '@/utils'
import { useNyxProps } from '@/composables'
import NyxSpinner from '@/components/NyxSpinner/NyxSpinner.vue'

const props = withDefaults(defineProps<NyxButtonProps>(), {
  type: 'button',
  disabled: false,
  loading: false,
  shape: NyxShape.Rectangle,
  gradient: false,
  backlight: false,
  pixel: false
})

const emit = defineEmits<NyxButtonEmits>()
const { classList, nyxTheme } = useNyxProps(props, { origin: 'NyxButton', primitive: 'button' })
const anchorTarget = computed(() => props.href && isCurrentDomain(props.href) ? '_self' : '_blank')

</script>

<template>
  <button
    v-if="!props.href"
    class="nyx-button"
    :class="classList"
    :type="props.type"
    :disabled="props.disabled || !!props.loading"
    @click="emit('click')"
  >
    <slot v-if="!props.loading">Click me</slot>
    <slot v-else name="loading">
      <NyxSpinner :size="NyxSize.XSmall" :theme="nyxTheme" />
      <span>Loading...</span>
    </slot>
  </button>
  <a
    v-else
    class="nyx-button"
    :class="classList"
    :href="props.href"
    :target="anchorTarget"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    <slot v-if="!props.loading">Click me</slot>
    <slot v-else name="loading">
      <NyxSpinner :size="NyxSize.XSmall" :theme="nyxTheme" />
      <span>Loading...</span>
    </slot></a>
</template>
