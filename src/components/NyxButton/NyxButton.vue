<script setup lang="ts">
import './NyxButton.scss'
import { NyxShape } from '@/types'
import type { NyxButtonProps, NyxButtonEmits } from './NyxButton.types'
import { computed } from 'vue';
import { isCurrentDomain } from '@/utils'
import { useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxButtonProps>(), {
  type: 'button',
  disabled: false,
  shape: NyxShape.Rectangle,
  gradient: false,
  backlight: false,
  pixel: false
})

const emit = defineEmits<NyxButtonEmits>()
const { classList } = useNyxProps(props, { origin: 'NyxButton', primitive: 'button' })
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
