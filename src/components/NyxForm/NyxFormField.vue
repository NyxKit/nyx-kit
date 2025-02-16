<script setup lang="ts">
import { generateRandomString } from '@/utils/string'
import type { NyxFormFieldProps } from './NyxForm.types'

const props = defineProps<NyxFormFieldProps>()
const id = `nyx-form-field-${ generateRandomString(16) }`
</script>

<template>
  <div class="nyx-form-field">
    <label v-if="props.label" :for="id" class="nyx-form-field__label">{{ label }}</label>
    <slot :id="id"></slot>
  </div>
</template>
