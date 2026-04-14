<script setup lang="ts">
import './NyxInput.scss'
import { computed, useTemplateRef } from 'vue'
import { useNyxProps } from '@/composables'
import type { NyxInputProps, NyxInputEmits } from './NyxInput.types'
import { NyxInputType } from '@/types'
import { generateRandomString } from '@/utils/string'

const props = withDefaults(defineProps<NyxInputProps>(), {
  type: NyxInputType.Text,
})

const emit = defineEmits<NyxInputEmits>()

const model = defineModel<string>()

const prefixRef = useTemplateRef<HTMLSpanElement>('prefixRef')
const suffixRef = useTemplateRef<HTMLSpanElement>('suffixRef')

const { classList } = useNyxProps(props, { origin: 'NyxInput', primitive: 'input' })

const normalizedId = computed(() => props.id ?? `nyx-input-${generateRandomString(16)}`)

const computedPaddingVars = computed(() => {
  const prefixWidth = prefixRef.value?.offsetWidth ?? 0
  const suffixWidth = suffixRef.value?.offsetWidth ?? 0
  return {
    '--nyx-input-pad-prefix': `${prefixWidth}px`,
    '--nyx-input-pad-suffix': `${suffixWidth}px`,
  }
})

</script>

<template>
  <div
    class="nyx-input"
    :class="classList"
    :style="computedPaddingVars"
  >
    <span class="nyx-input__prefix" v-if="props.prefix || $slots.prefix" ref="prefixRef">
      <slot name="prefix">
        {{ props.prefix }}
      </slot>
    </span>
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
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :id="normalizedId"
      v-model="model"
      @click="emit('click')"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
    <span class="nyx-input__suffix" v-if="props.suffix || $slots.suffix" ref="suffixRef">
      <slot name="suffix">
        {{ props.suffix }}
      </slot>
    </span>
  </div>

</template>
