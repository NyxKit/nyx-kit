<script setup lang="ts">
import './NyxTextarea.scss'
import { computed } from 'vue'
import type { NyxTextareaProps, NyxTextareaEmits } from './NyxTextarea.types'
import { NyxTheme, NyxVariant, NyxSize } from '@/types'
import { generateRandomString } from '@/utils/string'

const props = withDefaults(defineProps<NyxTextareaProps>(), {
  theme: NyxTheme.Default,
  variant: NyxVariant.Outline,
  size: NyxSize.Medium
})

const emit = defineEmits<NyxTextareaEmits>()

const model = defineModel<string>()

const normalizedId = computed(() => props.id ?? `nyx-textarea-${generateRandomString(16)}`)

</script>

<template>
  <div
    class="nyx-textarea"
    :class="[`theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`]"
  >
    <textarea
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :maxlength="props.maxlength"
      :minlength="props.minlength"
      :pattern="props.pattern"
      :required="props.required"
      :autocomplete="props.autocomplete"
      :autofocus="props.autofocus"
      :id="normalizedId"
      v-model="model"
      @click="emit('click')"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
  </div>
</template>
