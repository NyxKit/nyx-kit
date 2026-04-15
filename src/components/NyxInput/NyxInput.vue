<script setup lang="ts">
import './NyxInput.scss'
import { computed, useTemplateRef } from 'vue'
import { useNyxInputNumber, useNyxProps } from '@/composables'
import type { NyxInputProps, NyxInputEmits } from './NyxInput.types'
import { NyxDirection, NyxInputNumberControls, NyxInputType, NyxShape, NyxSize } from '@/types'
import { generateRandomString } from '@/utils/string'
import NyxButton from '../NyxButton/NyxButton.vue'
import NyxIcon from '../NyxIcon/NyxIcon.vue'
import NyxButtonGroup from '../NyxButtonGroup/NyxButtonGroup.vue'

const props = withDefaults(defineProps<NyxInputProps>(), {
  type: NyxInputType.Text,
  step: 1
})

const emit = defineEmits<NyxInputEmits>()

const model = defineModel<string>()

const prefixRef = useTemplateRef<HTMLSpanElement>('prefixRef')
const suffixRef = useTemplateRef<HTMLSpanElement>('suffixRef')
const numberControlsRef = useTemplateRef<HTMLDivElement>('numberControlsRef')

const { classList, nyxTheme, nyxVariant } = useNyxProps(props, { origin: 'NyxInput', primitive: 'input' })
const normalizedId = computed(() => props.id ?? `nyx-input-${generateRandomString(16)}`)

const computedPaddingVars = computed(() => {
  const prefixWidth = prefixRef.value?.offsetWidth ?? 0
  const suffixWidth = suffixRef.value?.offsetWidth ?? 0
  const numberControlsWidth = numberControlsRef.value?.offsetWidth ?? 0
  return {
    '--nyx-input-pad-prefix': `${prefixWidth}px`,
    '--nyx-input-pad-suffix': `${suffixWidth + numberControlsWidth}px`,
    '--nyx-input-offset-suffix': `${numberControlsWidth}px`,
  }
})

const {
  normalizedNumberControls,
  numberButtonVariant,
  onNumberButtonClick,
  onNumberButtonPointerCancel,
  onNumberButtonPointerDown,
  onNumberButtonPointerUp,
} = useNyxInputNumber(props, model, nyxVariant)

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
    <NyxButton
      v-if="normalizedNumberControls === NyxInputNumberControls.Separated"
      class="nyx-input__number-control"
      :theme="nyxTheme"
      :size="props.size"
      :shape="NyxShape.Square"
      :variant="numberButtonVariant"
      @pointerdown="onNumberButtonPointerDown(-1, $event)"
      @pointerup="onNumberButtonPointerUp"
      @pointercancel="onNumberButtonPointerCancel"
      @click="onNumberButtonClick(-1, $event)"
    ><NyxIcon name="minus" /></NyxButton>
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
      :min="props.type === NyxInputType.Number ? props.min : undefined"
      :max="props.type === NyxInputType.Number ? props.max : undefined"
      :step="props.type === NyxInputType.Number ? props.step : undefined"
      :id="normalizedId"
      v-model="model"
      @click="emit('click')"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
    <NyxButton
      v-if="normalizedNumberControls === NyxInputNumberControls.Separated"
      class="nyx-input__number-control"
      :theme="nyxTheme"
      :size="props.size"
      :shape="NyxShape.Square"
      :variant="numberButtonVariant"
      @pointerdown="onNumberButtonPointerDown(1, $event)"
      @pointerup="onNumberButtonPointerUp"
      @pointercancel="onNumberButtonPointerCancel"
      @click="onNumberButtonClick(1, $event)"
    ><NyxIcon name="plus" /></NyxButton>
    <NyxButtonGroup
      v-if="normalizedNumberControls === NyxInputNumberControls.Stacked"
      class="nyx-input__number-controls"
      :direction="NyxDirection.Vertical"
      ref="numberControlsRef"
    >
      <NyxButton
        class="nyx-input__number-control"
        :theme="nyxTheme"
        :size="props.size"
        :shape="NyxShape.Square"
        :variant="numberButtonVariant"
        @pointerdown="onNumberButtonPointerDown(1, $event)"
        @pointerup="onNumberButtonPointerUp"
        @pointercancel="onNumberButtonPointerCancel"
        @click="onNumberButtonClick(1, $event)"
      ><NyxIcon name="chevron-up" :size="NyxSize.XSmall" /></NyxButton>
      <NyxButton
        class="nyx-input__number-control"
        :theme="nyxTheme"
        :size="props.size"
        :shape="NyxShape.Square"
        :variant="numberButtonVariant"
        @pointerdown="onNumberButtonPointerDown(-1, $event)"
        @pointerup="onNumberButtonPointerUp"
        @pointercancel="onNumberButtonPointerCancel"
        @click="onNumberButtonClick(-1, $event)"
      ><NyxIcon name="chevron-down" :size="NyxSize.XSmall" /></NyxButton>
    </NyxButtonGroup>
    <span class="nyx-input__suffix" v-if="props.suffix || $slots.suffix" ref="suffixRef">
      <slot name="suffix">
        {{ props.suffix }}
      </slot>
    </span>
  </div>

</template>
