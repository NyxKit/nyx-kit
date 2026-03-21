<script setup lang="ts">
import './NyxInput.scss'
import { computed } from 'vue'
import useNyxProps from '@/composables/useNyxProps'
import type { NyxInputProps, NyxInputEmits } from './NyxInput.types'
import { NyxInputType } from '@/types'
import { generateRandomString } from '@/utils/string'

const props = withDefaults(defineProps<NyxInputProps>(), {
  type: NyxInputType.Text,
})

const emit = defineEmits<NyxInputEmits>()

const model = defineModel<string>()

const { classList } = useNyxProps(props, { origin: 'NyxInput', primitive: 'input' })

const normalizedId = computed(() => props.id ?? `nyx-input-${generateRandomString(16)}`)

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
      :id="normalizedId"
      v-model="model"
      @click="emit('click')"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
  </div>

</template>
