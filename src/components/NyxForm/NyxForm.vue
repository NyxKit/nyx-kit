<script setup lang="ts">
import { NyxSize } from '@/types';
import './NyxForm.scss'
import type { NyxFormEmits, NyxFormProps } from './NyxForm.types'

const props = withDefaults(defineProps<NyxFormProps>(), {
  size: NyxSize.Medium
})

const emit = defineEmits<NyxFormEmits>()
const onSubmit = (event: Event) => emit('submit', event)
</script>

<template>
  <form class="nyx-form" :class="[`size-${props.size}`]" @submit.prevent="onSubmit">
    <slot>NyxForm</slot>
  </form>
</template>
