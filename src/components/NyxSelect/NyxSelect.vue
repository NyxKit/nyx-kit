<script setup lang="ts">
import { ref, computed, useId, useTemplateRef, watch } from 'vue'
import { type NyxSelectOption, type NyxSelectOptionGroup } from '@/types'
import './NyxSelect.scss'
import type { NyxSelectProps } from './NyxSelect.types'
import { useTeleportPosition, useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxSelectProps>(), {
  multiple: false
})

const modelValue = defineModel<string | string[]>()
const model = computed({
  get: () => modelValue.value ?? (props.multiple ? [] : ''),
  set: (value) => {
    modelValue.value = value
  }
})

const elInput = useTemplateRef<HTMLInputElement>('elInput')
const searchQuery = ref('')

const elControl = useTemplateRef<HTMLDivElement>('elControl')
const elDropdown = useTemplateRef<HTMLDivElement>('elDropdown')
const isOpen = ref(false)

const { classList } = useNyxProps(props, { origin: 'NyxSelect', primitive: 'select' })

const dropdownId = useId()

const { cssVariables, computedPosition } = useTeleportPosition(elControl, elDropdown, {
  isEqualWidth: true,
  isUpdateAllowed: isOpen
})

const isGrouped = computed(() => props.options.length > 0 && 'options' in props.options[0])

const flatOptions = computed((): NyxSelectOption[] => {
  if (!isGrouped.value) return props.options as NyxSelectOption[]
  return (props.options as NyxSelectOptionGroup[]).flatMap((group) => group.options)
})

const selectedLabels = computed(() => {
  if (!props.multiple) {
    const option = flatOptions.value.find((opt) => opt.value === model.value)
    return option?.label ?? ''
  }
  return (model.value as string[])
    .map((value) => flatOptions.value.find((opt) => opt.value === value)?.label ?? '')
    .join(', ')
})

const filteredOptions = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return props.options
  if (isGrouped.value) {
    return (props.options as NyxSelectOptionGroup[])
      .map((group) => ({
        ...group,
        options: group.options.filter((opt) => opt.label.toLowerCase().includes(query))
      }))
      .filter((group) => group.options.length > 0)
  }
  return (props.options as NyxSelectOption[]).filter((opt) =>
    opt.label.toLowerCase().includes(query)
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
      model.value = values.filter((v) => v !== value)
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
    :class="classList"
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
        ref="elInput"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        aria-autocomplete="list"
        :aria-controls="dropdownId"
      />
      <span class="nyx-select__arrow" @click="toggleDropdown">▼</span>
    </div>

    <Teleport to="body">
      <div
        class="nyx-select__dropdown"
        :class="[
          ...classList,
          `nyx-select__dropdown--${computedPosition}`,
          { 'nyx-select__dropdown--open': isOpen }
        ]"
        ref="elDropdown"
        role="listbox"
        :id="dropdownId"
        :style="cssVariables"
      >
        <ul>
          <template v-if="isGrouped">
            <template v-for="group in (filteredOptions as NyxSelectOptionGroup[])" :key="group.label">
              <li class="nyx-select__group-label"><span>{{ group.label }}</span></li>
              <li
                v-for="option in group.options"
                :key="option.value"
                class="nyx-select__option nyx-select__option--group"
                :class="{
                  'nyx-select__option--selected': isSelected(option.value),
                  'nyx-select__option--disabled': !!option.disabled
                }"
                role="option"
                :aria-selected="isSelected(option.value)"
                :aria-disabled="!!option.disabled || undefined"
                @click="onSelectOption(option)"
              ><span>{{ option.label }}</span></li>
            </template>
            <li
              v-if="(filteredOptions as NyxSelectOptionGroup[]).length === 0"
              class="nyx-select__option nyx-select__option--empty"
              @click.prevent.stop="elInput?.focus()"
            ><slot name="empty"><span>No results found</span></slot></li>
          </template>
          <template v-else>
            <li
              v-for="option in (filteredOptions as NyxSelectOption[])"
              :key="option.value"
              class="nyx-select__option"
              :class="{
                'nyx-select__option--selected': isSelected(option.value),
                'nyx-select__option--disabled': !!option.disabled
              }"
              role="option"
              :aria-selected="isSelected(option.value)"
              :aria-disabled="!!option.disabled || undefined"
              @click="onSelectOption(option)"
            ><span>{{ option.label }}</span></li>
            <li
              v-if="(filteredOptions as NyxSelectOption[]).length === 0"
              class="nyx-select__option nyx-select__option--empty"
              @click.prevent.stop="elInput?.focus()"
            ><slot name="empty"><span>No results found</span></slot></li>
          </template>
        </ul>
      </div>
    </Teleport>

    <select v-model="model" class="sr-only" :id="props.id" :multiple="props.multiple">
      <template v-if="isGrouped">
        <optgroup v-for="group in (props.options as NyxSelectOptionGroup[])" :key="group.label" :label="group.label">
          <option v-for="option in group.options" :value="option.value" :key="option.value">{{ option.label }}</option>
        </optgroup>
      </template>
      <template v-else>
        <option v-for="option in (props.options as NyxSelectOption[])" :value="option.value" :key="option.value">{{ option.label }}</option>
      </template>
    </select>
  </div>
</template>
