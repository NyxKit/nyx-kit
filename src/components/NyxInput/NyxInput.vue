<script setup lang="ts">
import './NyxInput.scss'
import type { NyxInputProps, NyxInputEmits } from './NyxInput.types'
import { NyxInputType } from '@/types'

const props = withDefaults(defineProps<NyxInputProps>(), {
  type: NyxInputType.Text
})

const emit = defineEmits<NyxInputEmits>()

const model = defineModel<string>()

</script>

<template>
  <input
    class="nyx-input"
    :class="[`theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`]"
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
    v-model="model"
    @focus="emit('focus')"
    @blur="emit('blur')"
  />
</template>
