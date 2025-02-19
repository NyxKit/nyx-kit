<script setup lang="ts">
import './NyxCheckbox.scss'
import { defineProps, defineEmits, computed } from 'vue'
import { NyxSize, NyxTheme, NyxVariant } from '@/types'
import type { NyxCheckboxProps } from './NyxCheckbox.types'
import { generateRandomString } from '@/utils/string';

const props = withDefaults(defineProps<NyxCheckboxProps>(), {
  label: '',
  disabled: false,
  size: NyxSize.Medium,
  theme: NyxTheme.Default,
  // variant: NyxVariant.Solid
})

const model = defineModel<boolean>({ default: false })

const normalizedId = computed(() => props.id ?? `nyx-checkbox-${ generateRandomString(16) }`)

</script>

<template>
  <div
    class="nyx-checkbox"
    :class="[`theme-${props.theme}`, `size-${props.size}`]"
  >
    <input
      type="checkbox"
      v-model="model"
      :disabled="props.disabled"
      :aria-label="props.label"
      :id="normalizedId"
    />
    <span class="nyx-checkbox__checkbox" @click="model = !model"></span>
    <label v-if="props.label" :for="normalizedId" class="nyx-checkbox__label">{{ props.label }}</label>
  </div>
</template>
