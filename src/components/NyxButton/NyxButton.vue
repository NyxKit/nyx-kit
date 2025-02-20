<script setup lang="ts">
import './NyxButton.scss'
import { NyxSize, NyxVariant, NyxTheme, NyxShape } from '@/types'
import type { NyxButtonProps, NyxButtonEmits } from './NyxButton.types'
import { computed } from 'vue';
import { isCurrentDomain } from '@/utils'
import useNyxProps from '@/compositions/useNyxProps';

const props = withDefaults(defineProps<NyxButtonProps>(), {
  type: 'button',
  disabled: false,
  theme: NyxTheme.Default,
  variant: NyxVariant.Solid,
  shape: NyxShape.Rectangle,
  size: NyxSize.Medium,
  gradient: false,
  backlight: false
})

const emit = defineEmits<NyxButtonEmits>()
const { classList } = useNyxProps(props)
const anchorTarget = computed(() => props.href && isCurrentDomain(props.href) ? '_self' : '_blank')

</script>

<template>
  <button
    v-if="!props.href"
    class="nyx-button"
    :class="classList"
    :type="props.type"
    :disabled="props.disabled"
    @click="emit('click')"
  ><slot>Click me</slot></button>
  <a
    v-else
    class="nyx-button"
    :class="classList"
    :href="props.href"
    :target="anchorTarget"
    :disabled="props.disabled"
    @click="emit('click')"
  ><slot>Click me</slot></a>
</template>
