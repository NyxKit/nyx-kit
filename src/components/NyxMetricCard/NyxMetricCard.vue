<script setup lang="ts">
import './NyxMetricCard.scss'
import { NyxSize, NyxVariant } from '@/types'
import type { NyxMetricCardProps } from './NyxMetricCard.types'
import NyxIcon from '../NyxIcon/NyxIcon.vue'
import { useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxMetricCardProps>(), {
  variant: NyxVariant.Text
})

const { classList } = useNyxProps(props, { origin: 'NyxMetricCard' })
</script>

<template>
  <div class="nyx-metric-card" :class="classList">
    <div class="nyx-metric-card__body">
      <div class="nyx-metric-card__title">{{ title }}</div>

      <div class="nyx-metric-card__row">
        <span class="nyx-metric-card__value">{{ value }}</span>
        <span v-if="unit" class="nyx-metric-card__unit">{{ unit }}</span>
        <span v-if="suffix" class="nyx-metric-card__suffix">{{ suffix }}</span>
        <span v-if="icon" class="nyx-metric-card__icon">
          <NyxIcon :name="icon" :theme="props.theme" :size="NyxSize.Small" aria-hidden="true" />
        </span>
      </div>
    </div>
  </div>
</template>
