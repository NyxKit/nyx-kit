<script setup lang="ts">
import './NyxButton.scss'
import { NyxSize, NyxVariant, NyxTheme, NyxShape } from '@/types'
import type { NyxButtonProps, NyxButtonEmits } from './NyxButton.types'
import { computed } from 'vue';
import { isCurrentDomain } from '@/utils'
import { NyxLog } from '@/classes'

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

const anchorTarget = computed(() => props.href && isCurrentDomain(props.href) ? '_self' : '_blank')

const gradientNormalized = computed(() => {
  if (props.gradient !== false && props.variant !== NyxVariant.Solid) {
    NyxLog.error('NyxButton', 'Only solid buttons support gradients.')
    return props.theme
  }
  return props.gradient === true ? props.theme : props.gradient
})

const classList = computed<string[]>(() => {
  const backlight = props.backlight === true ? props.theme : props.backlight
  const list = [`theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`, `shape-${props.shape}`]
  if (!!gradientNormalized.value) list.push(`gradient-${gradientNormalized.value}`)
  if (!!backlight) list.push(`backlight-${backlight}`)
  return list
})
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
