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
  size: NyxSize.Medium
})

const model = defineModel<string>({ default: '' })
const elInput = useTemplateRef<HTMLInputElement>('nyx-select-input')
const searchQuery = ref('')

const elControl = useTemplateRef<HTMLDivElement>('elControl')
const elDropdown = useTemplateRef<HTMLDivElement>('elDropdown')
const isOpen = ref(false)

const { cssVariables, computedPosition } = useTeleportPosition(elControl, elDropdown, {
  isEqualWidth: true,
  isUpdateAllowed: isOpen
})

const selectedLabel = computed(() => props.options.find((option) => option.value === model.value)?.label ?? '')

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
  model.value = value
  searchQuery.value = label
  isOpen.value = false
}

const setSearchQuery = (value?: string) => {
  searchQuery.value = value === undefined ? selectedLabel.value : value
}

const onControlClick = () => {
  isOpen.value = true
  elInput.value?.focus()
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
        placeholder="Select..."
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
            :class="{ 'nyx-select__option--selected': option.value === model }"
            @click="onSelectOption(option)"
          >
            {{ option.label }}
          </li>
          <li
            v-if="filteredOptions.length === 0"
            class="nyx-select__option nyx-select__option--empty"
            @click.prevent.stop="elInput?.focus()"
          >
            <slot name="empty">No results found</slot>
          </li>
        </ul>
      </div>
    </Teleport>

    <select v-model="model" class="sr-only" :id="props.id">
      <option v-for="option in props.options" :value="option.value" :key="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
