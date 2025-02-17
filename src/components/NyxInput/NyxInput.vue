<script setup lang="ts">
import './NyxInput.scss'
import type { NyxInputProps, NyxInputEmits } from './NyxInput.types'
import { NyxInputType, NyxTheme, NyxStyleVariant, NyxSize } from '@/types'

const props = withDefaults(defineProps<NyxInputProps>(), {
  type: NyxInputType.Text,
  theme: NyxTheme.Default,
  variant: NyxStyleVariant.Outline,
  size: NyxSize.Medium
})

const emit = defineEmits<NyxInputEmits>()

const model = defineModel<string>()

</script>

<template>
  <div
    class="nyx-input"
    :class="[`theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`]"
  >
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :maxlength="props.maxlength"
      :minlength="props.minlength"
      :pattern="props.pattern"
      :required="props.required"
      :autocomplete="props.autocomplete"
      :autofocus="props.autofocus"
      :id="id"
      v-model="model"
      @click="emit('click')"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
  </div>

</template>
