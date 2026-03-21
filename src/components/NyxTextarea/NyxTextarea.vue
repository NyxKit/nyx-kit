<script setup lang="ts">
import './NyxTextarea.scss'
import { computed } from 'vue'
import type { NyxTextareaProps, NyxTextareaEmits } from './NyxTextarea.types'
import { generateRandomString } from '@/utils/string'

const props = defineProps<NyxTextareaProps>()

const emit = defineEmits<NyxTextareaEmits>()

const model = defineModel<string>()

const normalizedId = computed(() => props.id ?? `nyx-textarea-${generateRandomString(16)}`)

</script>

<template>
  <div
    class="nyx-textarea"
    :class="[
      props.theme && `theme-${props.theme}`,
      props.variant && `variant-${props.variant}`,
      props.size && `size-${props.size}`
    ]"
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
