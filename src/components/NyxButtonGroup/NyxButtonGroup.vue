<script setup lang="ts">
import { NyxDirection, NyxVariant } from '@/types';
import './NyxButtonGroup.scss'
import type { NyxButtonGroupProps } from './NyxButtonGroup.types'

const props = withDefaults(defineProps<NyxButtonGroupProps>(), {
  direction: NyxDirection.Horizontal,
  variant: NyxVariant.Ghost
})
</script>

<template>
  <div class="nyx-button-group" :class="[`direction-${props.direction}`, `variant-${props.variant}`]">
    <slot />
  </div>
</template>
