<template>
  <svg
    class="nyx-spinner"
    :class="[`theme-${props.theme}`, props.size && `size-${props.size}`]"
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
import { type CssVariablesDict, NyxTheme } from '@/types'

const props = withDefaults(defineProps<NyxSpinnerProps>(), {
  theme: NyxTheme.Default,
  speed: '2s'
})

const cssVars = computed<CssVariablesDict>(() => ({
  '--nyx-speed-spinner': props.speed
}))

</script>
