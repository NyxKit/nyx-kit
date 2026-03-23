<script setup lang="ts">
import './NyxBadge.scss'
import { NyxVariant, NyxShape } from '@/types'
import type { NyxBadgeProps, NyxBadgeEmits } from './NyxBadge.types'
import NyxButton from '../NyxButton/NyxButton.vue'
import { useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxBadgeProps>(), {
  disabled: false,
  hasClose: false
})

const emit = defineEmits<NyxBadgeEmits>()

const { classList } = useNyxProps(props, { origin: 'NyxBadge' })

</script>

<template>
  <div
    class="nyx-badge"
    :class="[...classList, { 'nyx-badge--closable': hasClose }]"
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
