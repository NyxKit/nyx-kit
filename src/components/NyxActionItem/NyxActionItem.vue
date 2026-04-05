<script setup lang="ts">
import './NyxActionItem.scss'
import { NyxSize, NyxVariant } from '@/types'
import type { NyxActionItemProps, NyxActionItemEmits } from './NyxActionItem.types'
import { useNyxProps } from '@/composables'
import NyxButton from '@/components/NyxButton/NyxButton.vue'

const props = defineProps<NyxActionItemProps>()
const emit = defineEmits<NyxActionItemEmits>()

const { classList } = useNyxProps(props, { origin: 'NyxActionItem' })
</script>

<template>
  <div class="nyx-action-item" :class="classList">
    <span class="nyx-action-item__title">{{ title }}</span>
    <div class="nyx-action-item__description">
      <slot>
        <p class="nyx-action-item__description-text">{{ description }}</p>
      </slot>
    </div>
    <div class="nyx-action-item__action">
      <slot name="action">
        <NyxButton
          v-if="props.action"
          :theme="props.theme"
          :size="NyxSize.Small"
          :variant="NyxVariant.Soft"
          @click="emit('click')"
        >{{ props.action }}</NyxButton>
      </slot>
    </div>
  </div>
</template>
