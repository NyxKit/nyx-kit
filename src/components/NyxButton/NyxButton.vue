<script setup lang="ts">
import './NyxButton.scss'
import { NyxSize, NyxVariant, NyxTheme, NyxShape } from '@/types'
import type { NyxButtonProps, NyxButtonEmits } from './NyxButton.types'
import { computed } from 'vue';
import { isCurrentDomain } from '@/utils';

const props = withDefaults(defineProps<NyxButtonProps>(), {
  type: 'button',
  disabled: false,
  theme: NyxTheme.Default,
  variant: NyxVariant.Solid,
  shape: NyxShape.Rectangle,
  size: NyxSize.Medium
})

const emit = defineEmits<NyxButtonEmits>()

const anchorTarget = computed(() => props.href && isCurrentDomain(props.href) ? '_self' : '_blank')
</script>

<template>
  <button
    v-if="!props.href"
    class="nyx-button"
    :class="[`theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`, `shape-${props.shape}`]"
    :type="props.type"
    :disabled="props.disabled"
    @click="emit('click')"
  ><slot>Click me</slot></button>
  <a
    v-else
    class="nyx-button"
    :class="[`theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`, `shape-${props.shape}`]"
    :href="props.href"
    :target="anchorTarget"
  ><slot>Click me</slot></a>
</template>
