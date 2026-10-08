<script setup lang="ts">
import { computed } from 'vue'
import { useNyxProps } from '@/composables'
import { NyxAnimationState, NyxSize, NyxTheme, NyxVariant } from '@/types'
import type { NyxStatusDotProps } from './NyxStatusDot.types'
import { useSlots } from 'vue'
import './NyxStatusDot.scss'

const props = withDefaults(defineProps<NyxStatusDotProps>(), {
  theme: NyxTheme.Success,
  size: NyxSize.XSmall,
  variant: NyxVariant.Filled,
  backlight: false,
  animation: NyxAnimationState.Paused,
})

const { classList } = useNyxProps(props, { origin: 'NyxStatusDot' })

const animationClass = computed(() => `animation-${ props.animation }`)
const slots = useSlots()
const isDecorative = computed(() => !slots.default && !props.label)
</script>

<template>
  <span
    class="nyx-status-dot"
    :class="[...classList, animationClass]"
    :aria-hidden="isDecorative ? 'true' : undefined"
  >
    <span class="nyx-status-dot__indicator" aria-hidden="true" />
    <span v-if="$slots.default || props.label" class="nyx-status-dot__label">
      <slot>{{ props.label }}</slot>
    </span>
  </span>
</template>
