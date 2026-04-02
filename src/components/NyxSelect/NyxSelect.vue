<script setup lang="ts">
import { ref, computed, useId, useTemplateRef, watch, nextTick } from 'vue'
import { NyxSelectType, type NyxSelectOption, type NyxSelectOptionGroup } from '@/types'
import './NyxSelect.scss'
import type { NyxSelectProps } from './NyxSelect.types'
import { useTeleportPosition, useNyxProps, useSelectKeyboardControls } from '@/composables'

const props = withDefaults(defineProps<NyxSelectProps>(), {
  type: NyxSelectType.Single
})

const isMultiple = computed(() => props.type === NyxSelectType.Multiple)

const model = defineModel<string | string[]>()

const normalisedModel = computed({
  get: () => model.value ?? (isMultiple.value ? [] : ''),
  set: (value) => { model.value = value }
})

const elInput = useTemplateRef<HTMLInputElement>('elInput')
const searchQuery = ref('')
const focusedValue = ref<string | null>(null)

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
  if (!isMultiple.value) {
    const option = flatOptions.value.find((opt) => opt.value === normalisedModel.value)
    return option?.label ?? ''
  }
  return (normalisedModel.value as string[])
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

const flatFilteredOptions = computed((): NyxSelectOption[] => {
  if (isGrouped.value) {
    return (filteredOptions.value as NyxSelectOptionGroup[]).flatMap((group) => group.options)
  }
  return filteredOptions.value as NyxSelectOption[]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const onSelectOption = ({ value }: NyxSelectOption) => {
  if (isMultiple.value) {
    const values = normalisedModel.value as string[]
    const index = values.indexOf(value)
    if (index === -1) {
      normalisedModel.value = [...values, value]
    } else {
      normalisedModel.value = values.filter((v) => v !== value)
    }
    searchQuery.value = ''
  } else {
    normalisedModel.value = value
    searchQuery.value = ''
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
  if (isMultiple.value) {
    return (normalisedModel.value as string[]).includes(value)
  }
  return value === normalisedModel.value
}

const isOptionDisabled = (option: NyxSelectOption): boolean => {
  return !!option.disabled
}

const getOptionId = (value: string): string => {
  return `${dropdownId}-option-${value}`
}

const scrollToFocusedOption = (value: string) => {
  nextTick(() => {
    const el = elDropdown.value?.querySelector(`[data-option-value="${value}"]`) as HTMLElement | null
    if (el?.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest' })
    }
  })
}

const { onInputKeydown } = useSelectKeyboardControls({
  options: flatFilteredOptions,
  focusedValue,
  isOpen,
  onSelect: onSelectOption,
  isOptionDisabled,
  scrollToOption: scrollToFocusedOption
})

watch(isOpen, (newVal) => {
  if (!newVal) {
    setSearchQuery()
    focusedValue.value = null
  } else {
    setSearchQuery('')
    const selectedValue = isMultiple.value 
      ? ((normalisedModel.value as string[])[0] ?? '')
      : (normalisedModel.value as string)
    if (selectedValue) {
      focusedValue.value = selectedValue
    }
  }
})

watch([normalisedModel, flatOptions], () => {
  if (!isOpen.value) {
    setSearchQuery()
  }
}, { immediate: true })
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
        :placeholder="isMultiple ? 'Select multiple...' : 'Select...'"
        ref="elInput"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        aria-autocomplete="list"
        :aria-controls="dropdownId"
        :aria-activedescendant="focusedValue ? getOptionId(focusedValue) : undefined"
        @keydown="onInputKeydown"
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
                  'nyx-select__option--focused': focusedValue === option.value,
                  'nyx-select__option--disabled': !!option.disabled
                }"
                role="option"
                :id="getOptionId(option.value)"
                :data-option-value="option.value"
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
                'nyx-select__option--focused': focusedValue === option.value,
                'nyx-select__option--disabled': !!option.disabled
              }"
              role="option"
              :id="getOptionId(option.value)"
              :data-option-value="option.value"
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

    <select v-model="normalisedModel" class="sr-only" :id="props.id" :multiple="isMultiple" tabindex="-1">
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
