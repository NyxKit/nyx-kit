<script setup lang="ts">
import './NyxBadge.scss'
import { NyxSize, NyxVariant, NyxTheme, NyxShape } from '@/types'
import type { NyxBadgeProps, NyxBadgeEmits } from './NyxBadge.types'
import NyxButton from '../NyxButton/NyxButton.vue'

const props = withDefaults(defineProps<NyxBadgeProps>(), {
  disabled: false,
  theme: NyxTheme.Default,
  variant: NyxVariant.Solid,
  size: NyxSize.Medium,
  hasClose: false
})

const emit = defineEmits<NyxBadgeEmits>()

</script>

<template>
  <div
    class="nyx-badge"
    :class="[
      { 'nyx-badge--closable': hasClose },
      `theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`
    ]"
    @click.self="emit('click')"
  >
    <span><slot>NyxBadge</slot></span>
    <NyxButton
      v-if="hasClose"
      class="nyx-badge__button"
      :size="props.size"
      :shape="NyxShape.Circle"
      :variant="NyxVariant.Ghost"
      @click="emit('close')"
    >×</NyxButton>
</div>
</template>
