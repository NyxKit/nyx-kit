

<script setup lang="ts">
import './NyxSwitch.scss'
import { type NyxSwitchProps } from './NyxSwitch.types'

const props = withDefaults(defineProps<NyxSwitchProps>(), {})

const model = defineModel<boolean>({ default: false })

</script>

<template>
  <div
    class="nyx-switch"
    :class="[
      props.theme && `theme-${props.theme}`,
      props.variant && `variant-${props.variant}`,
      props.size && `size-${props.size}`,
      { 'nyx-switch--on': model }
    ]"
    @click="model = !model"
  >
    <div class="nyx-switch__knob"></div>
    <input type="checkbox" class="nyx-switch__hidden" v-model="model" :id="props.id" />
  </div>
</template>
