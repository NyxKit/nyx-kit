

<script setup lang="ts">
import './NyxSwitch.scss'
import { type NyxSwitchProps } from './NyxSwitch.types'
import { useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxSwitchProps>(), {})

const model = defineModel<boolean>({ default: false })

const { classList } = useNyxProps(props, { origin: 'NyxSwitch', primitive: 'switch' })

</script>

<template>
  <div
    class="nyx-switch"
    :class="[...classList, { 'nyx-switch--on': model }]"
    @click="model = !model"
  >
    <div class="nyx-switch__knob"></div>
    <input type="checkbox" class="nyx-switch__hidden" v-model="model" :id="props.id" />
  </div>
</template>
