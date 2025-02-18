<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import { NyxSelectType, NyxSize, NyxVariant, NyxTheme } from '@/types'
import './NyxSelect.scss'
import type { NyxSelectEmits, NyxSelectProps } from './NyxSelect.types'
import { useTeleportPosition } from '@/compositions';

const props = withDefaults(defineProps<NyxSelectProps>(), {
  type: NyxSelectType.Single,
  theme: NyxTheme.Default,
  variant: NyxVariant.Outline,
  size: NyxSize.Medium,
})

const emit = defineEmits<NyxSelectEmits>()

const model = defineModel<string>({ default: '' })

const elControl = useTemplateRef<HTMLDivElement>('elControl')
const elDropdown = useTemplateRef<HTMLDivElement>('elDropdown')
const isOpen = ref(false)

const { cssVariables, computedPosition } = useTeleportPosition(elControl, elDropdown, {
  isEqualWidth: true,
  isUpdateAllowed: isOpen
})

const selectedLabel = computed(() => {
  return props.options
    .find((option) => option.value === model.value)
    ?.label ?? props.placeholder ?? 'Select...'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectOption = (value: string) => {
  model.value = value
  isOpen.value = false
  emit('change', model.value)
}
</script>

<template>
  <div
    class="nyx-select"
    :class="[`theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`]"
    v-click-outside="closeDropdown"
  >
    <div
      class="nyx-select__control"
      :class="[
        `nyx-select__control--${ computedPosition }`,
        { 'nyx-select__control--open': isOpen }
      ]"
      @click="toggleDropdown"
      ref="elControl"
    >
      <span class="nyx-select__selected">{{ selectedLabel }}</span>
      <span class="nyx-select__arrow">▼</span>
    </div>

    <Teleport to="body">
      <ul
        class="nyx-select__dropdown"
        :class="[
          `theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`,
          `nyx-select__dropdown--${ computedPosition }`,
          { 'nyx-select__dropdown--open': isOpen }
        ]"
        ref="elDropdown"
        role="listbox"
        :style="cssVariables"
      >
        <li
          v-for="option in props.options"
          :key="option.value"
          class="nyx-select__option"
          :class="{ 'nyx-select__option--selected': option.value === model }"
          @click="selectOption(option.value)"
        >{{ option.label }}</li>
      </ul>
    </Teleport>

    <select v-model="model" class="nyx-select__hidden" :id="props.id">
      <option
        v-for="option in props.options"
        :value="option.value"
        :key="option.value"
      >{{ option.label }}</option>
    </select>
  </div>
</template>
