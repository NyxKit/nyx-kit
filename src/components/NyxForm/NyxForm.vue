<script setup lang="ts">
import './NyxForm.scss'
import type { NyxFormEmits } from './NyxForm.types'

const emit = defineEmits<NyxFormEmits>()
const onSubmit = (event: Event) => emit('submit', event)
</script>

<template>
  <form class="nyx-form" @submit="onSubmit">
    <slot>NyxForm</slot>
  </form>
</template>
