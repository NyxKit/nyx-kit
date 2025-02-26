<script setup lang="ts">
import { ref, computed, useTemplateRef, watch } from 'vue'
import { NyxSelectType, NyxSize, NyxVariant, NyxTheme, type NyxSelectOption } from '@/types'
import './NyxSelect.scss'
import type { NyxSelectProps } from './NyxSelect.types'
import { useTeleportPosition } from '@/compositions'

const props = withDefaults(defineProps<NyxSelectProps>(), {
  type: NyxSelectType.Single,
  theme: NyxTheme.Default,
  variant: NyxVariant.Outline,
  size: NyxSize.Medium,
  multiple: false
})

const modelValue = defineModel<string | string[]>()
const model = computed({
  get: () => modelValue.value ?? (props.multiple ? [] : ''),
  set: (value) => {
    modelValue.value = value
  }
})

const elInput = useTemplateRef<HTMLInputElement>('nyx-select-input')
const searchQuery = ref('')

const elControl = useTemplateRef<HTMLDivElement>('elControl')
const elDropdown = useTemplateRef<HTMLDivElement>('elDropdown')
const isOpen = ref(false)

const { cssVariables, computedPosition } = useTeleportPosition(elControl, elDropdown, {
  isEqualWidth: true,
  isUpdateAllowed: isOpen
})

const selectedLabels = computed(() => {
  if (!props.multiple) {
    const option = props.options.find((opt) => opt.value === model.value)
    return option?.label ?? ''
  }
  return (model.value as string[])
    .map(value => props.options.find(opt => opt.value === value)?.label ?? '')
    .join(', ')
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const onSelectOption = ({ value, label }: NyxSelectOption) => {
  if (props.multiple) {
    const values = model.value as string[]
    const index = values.indexOf(value)
    if (index === -1) {
      model.value = [...values, value]
    } else {
      model.value = values.filter(v => v !== value)
    }
    searchQuery.value = ''
  } else {
    model.value = value
    searchQuery.value = label
    isOpen.value = false
  }
}

const setSearchQuery = (value?: string) => {
  searchQuery.value = value === undefined ? selectedLabels.value : value
}

const onControlClick = () => {
  isOpen.value = true
  elInput.value?.focus()
}

const isSelected = (value: string): boolean => {
  if (props.multiple) {
    return (model.value as string[]).includes(value)
  }
  return value === model.value
}

watch(isOpen, (newVal) => {
  if (!newVal) setSearchQuery()
  else setSearchQuery('')
})
</script>

<template>
  <div
    class="nyx-select"
    :class="[`theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`]"
  >
    <div
      class="nyx-select__control"
      :class="[
        `nyx-select__control--${computedPosition}`,
        { 'nyx-select__control--open': isOpen }
      ]"
      ref="elControl"
      @click="onControlClick"
      @keyup.esc="closeDropdown"
      v-click-outside="closeDropdown"
    >
      <input
        type="search"
        v-model="searchQuery"
        class="nyx-select__input"
        :placeholder="props.multiple ? 'Select multiple...' : 'Select...'"
        ref="nyx-select-input"
      />
      <span class="nyx-select__arrow" @click="toggleDropdown">▼</span>
    </div>

    <Teleport to="body">
      <div
        class="nyx-select__dropdown"
        :class="[
          `theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`,
          `nyx-select__dropdown--${computedPosition}`,
          { 'nyx-select__dropdown--open': isOpen }
        ]"
        ref="elDropdown"
        role="listbox"
        :style="cssVariables"
      >
        <ul>
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            class="nyx-select__option"
            :class="{
              'nyx-select__option--selected': isSelected(option.value),
              'nyx-select__option--disabled': !!option.disabled
            }"
            @click="onSelectOption(option)"
          ><span>{{ option.label }}</span></li>
          <li
            v-if="filteredOptions.length === 0"
            class="nyx-select__option nyx-select__option--empty"
            @click.prevent.stop="elInput?.focus()"
          ><slot name="empty"><span>No results found</span></slot></li>
        </ul>
      </div>
    </Teleport>

    <select v-model="model" class="sr-only" :id="props.id" :multiple="props.multiple">
      <option v-for="option in props.options" :value="option.value" :key="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
