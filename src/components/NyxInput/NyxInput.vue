<script setup lang="ts">
import useNyxProps from '@/compositions/useNyxProps';
import './NyxInput.scss'
import type { NyxInputProps, NyxInputEmits } from './NyxInput.types'
import { NyxInputType, NyxTheme, NyxVariant, NyxSize } from '@/types'

const props = withDefaults(defineProps<NyxInputProps>(), {
  type: NyxInputType.Text,
  theme: NyxTheme.Default,
  variant: NyxVariant.Outline,
  size: NyxSize.Medium
})

const emit = defineEmits<NyxInputEmits>()

const model = defineModel<string>()

const { classList } = useNyxProps(props)

</script>

<template>
  <div
    class="nyx-input"
    :class="classList"
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
      :tabindex="props.tabindex"
      :id="id"
      v-model="model"
      @click="emit('click')"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
  </div>

</template>
