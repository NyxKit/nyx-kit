<script setup lang="ts">
import './NyxBadge.scss'
import { NyxVariant, NyxShape } from '@/types'
import type { NyxBadgeProps, NyxBadgeEmits } from './NyxBadge.types'
import NyxButton from '../NyxButton/NyxButton.vue'

const props = withDefaults(defineProps<NyxBadgeProps>(), {
  disabled: false,
  hasClose: false
})

const emit = defineEmits<NyxBadgeEmits>()

</script>

<template>
  <div
    class="nyx-badge"
    :class="[
      { 'nyx-badge--closable': hasClose },
      props.theme && `theme-${props.theme}`,
      props.variant && `variant-${props.variant}`,
      props.size && `size-${props.size}`
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
