<script setup lang="ts">
import type { NyxSize, NyxStyle, NyxTheme } from '@/types';

const props = withDefaults(defineProps<{
  type?: 'button'|'submit'|'reset',
  theme?: NyxTheme,
  style?: NyxStyle,
  size?: NyxSize
}>(), {
  type: 'button'
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="nyx-button"
    :class="[
      props.theme && `theme-${props.theme}`,
      props.style && `style-${props.style}`,
      props.size && `size-${props.size}`
    ]"
    :type="props.type"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  all: unset;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-primary--darker);
  font-weight: 600;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: var(--color-primary--light);
}
</style>
