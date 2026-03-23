<template>
  <svg
    class="nyx-spinner"
    :class="classList"
    :style="cssVars"
    role="progressbar"
    aria-label="Loading"
  >
    <circle class="nyx-spinner__track"></circle>
    <circle class="nyx-spinner__indicator"></circle>
  </svg>
</template>

<script setup lang="ts">
import './NyxSpinner.scss'
import { computed } from 'vue'
import { type NyxSpinnerProps } from './NyxSpinner.types'
import { type CssVariablesDict } from '@/types'
import { useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxSpinnerProps>(), {
  speed: '2s'
})

const cssVars = computed<CssVariablesDict>(() => ({
  '--nyx-speed-spinner': props.speed
}))

const { classList } = useNyxProps(props, { origin: 'NyxSpinner' })

</script>
