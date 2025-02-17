

<script setup lang="ts">
import './NyxSwitch.scss'
import { type NyxSwitchProps } from './NyxSwitch.types'
import { NyxSize, NyxStyleVariant, NyxTheme } from '@/types'

const props = withDefaults(defineProps<NyxSwitchProps>(), {
  theme: NyxTheme.Success,
  size: NyxSize.Medium,
  variant: NyxStyleVariant.Solid
})

const model = defineModel<boolean>({ default: false })

</script>

<template>
  <div
    class="nyx-switch"
    :class="[
      `theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`,
      { 'nyx-switch--on': model }
    ]"
    @click="model = !model"
  >
    <div class="nyx-switch__knob"></div>
    <input type="checkbox" class="nyx-switch__hidden" v-model="model" :id="props.id" />
  </div>
</template>
