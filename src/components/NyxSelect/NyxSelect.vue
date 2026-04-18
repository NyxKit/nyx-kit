<script setup lang="ts" generic="T = string">
import './NyxSelect.scss'
import { ref, computed, useId, useTemplateRef, watch, nextTick, shallowRef } from 'vue'
import { NyxSelectType, type NyxSelectOption, type NyxSelectOptionGroup } from '@/types'
import type { NyxSelectEmits, NyxSelectProps } from './NyxSelect.types'
import { useTeleportPosition, useNyxProps, useSelectKeyboardControls } from '@/composables'

const props = withDefaults(defineProps<NyxSelectProps<T>>(), {
  type: NyxSelectType.Single
})

const emit = defineEmits<NyxSelectEmits<T>>()

const isMultiple = computed(() => props.type === NyxSelectType.Multiple)

const model = defineModel<T | T[]>()

const emptySingle = '' as unknown as T

const normalisedModel = computed({
  get: (): T | T[] => model.value ?? (isMultiple.value ? [] : emptySingle),
  set: (value: T | T[]) => { model.value = value }
})

const elInput = useTemplateRef<HTMLInputElement>('elInput')
const searchQuery = ref('')
const focusedValue = shallowRef<T | null>(null)

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

const flatOptions = computed((): NyxSelectOption<T>[] => {
  if (!isGrouped.value) return props.options as NyxSelectOption<T>[]
  return (props.options as NyxSelectOptionGroup<T>[]).flatMap((group) => group.options)
})

const selectedLabels = computed(() => {
  if (!isMultiple.value) {
    const option = flatOptions.value.find((opt) => opt.value === normalisedModel.value)
    return option?.label ?? ''
  }
  return (normalisedModel.value as T[])
    .map((value) => flatOptions.value.find((opt) => opt.value === value)?.label ?? '')
    .join(', ')
})

const filteredOptions = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return props.options
  if (isGrouped.value) {
    return (props.options as NyxSelectOptionGroup<T>[])
      .map((group) => ({
        ...group,
        options: group.options.filter((opt) => opt.label.toLowerCase().includes(query))
      }))
      .filter((group) => group.options.length > 0)
  }
  return (props.options as NyxSelectOption<T>[]).filter((opt) =>
    opt.label.toLowerCase().includes(query)
  )
})

const flatFilteredOptions = computed((): NyxSelectOption<T>[] => {
  if (isGrouped.value) {
    return (filteredOptions.value as NyxSelectOptionGroup<T>[]).flatMap((group) => group.options)
  }
  return filteredOptions.value as NyxSelectOption<T>[]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const onSelectOption = (option: NyxSelectOption<T>) => {
  const { value } = option
  if (isMultiple.value) {
    const values = normalisedModel.value as T[]
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
  emit('select', option)
}

const setSearchQuery = (value?: string) => {
  searchQuery.value = value === undefined ? selectedLabels.value : value
}

const onControlClick = () => {
  isOpen.value = true
  elInput.value?.focus()
}

const isSelected = (value: T): boolean => {
  if (isMultiple.value) {
    return (normalisedModel.value as T[]).includes(value)
  }
  return value === normalisedModel.value
}

const isOptionDisabled = (option: NyxSelectOption<T>): boolean => {
  return !!option.disabled
}

const getOptionId = (value: T): string => {
  return `${dropdownId}-option-${String(value)}`
}

const activeDescendantId = computed(() =>
  focusedValue.value != null ? getOptionId(focusedValue.value) : undefined
)

const scrollToFocusedOption = (value: T) => {
  nextTick(() => {
    const el = elDropdown.value?.querySelector(`[data-option-value="${String(value)}"]`) as HTMLElement | null
    if (el?.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest' })
    }
  })
}

const { onInputKeydown } = useSelectKeyboardControls<T>({
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
    if (isMultiple.value) {
      const first = (normalisedModel.value as T[])[0]
      if (first !== undefined) focusedValue.value = first
    } else {
      const selectedValue = normalisedModel.value as T
      if (selectedValue) {
        focusedValue.value = selectedValue
      }
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
        :aria-activedescendant="activeDescendantId"
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
            <template v-for="group in (filteredOptions as NyxSelectOptionGroup<T>[])" :key="group.label">
              <li class="nyx-select__group-label"><span>{{ group.label }}</span></li>
              <li
                v-for="option in group.options"
                :key="String(option.value)"
                class="nyx-select__option nyx-select__option--group"
                :class="{
                  'nyx-select__option--selected': isSelected(option.value),
                  'nyx-select__option--focused': focusedValue === option.value,
                  'nyx-select__option--disabled': !!option.disabled
                }"
                role="option"
                :id="getOptionId(option.value)"
                :data-option-value="String(option.value)"
                :aria-selected="isSelected(option.value)"
                :aria-disabled="!!option.disabled || undefined"
                @click="onSelectOption(option)"
              ><span>{{ option.label }}</span></li>
            </template>
            <li
              v-if="(filteredOptions as NyxSelectOptionGroup<T>[]).length === 0"
              class="nyx-select__option nyx-select__option--empty"
              @click.prevent.stop="elInput?.focus()"
            ><slot name="empty"><span>No results found</span></slot></li>
          </template>
          <template v-else>
            <li
              v-for="option in (filteredOptions as NyxSelectOption<T>[])"
              :key="String(option.value)"
              class="nyx-select__option"
              :class="{
                'nyx-select__option--selected': isSelected(option.value),
                'nyx-select__option--focused': focusedValue === option.value,
                'nyx-select__option--disabled': !!option.disabled
              }"
              role="option"
              :id="getOptionId(option.value)"
              :data-option-value="String(option.value)"
              :aria-selected="isSelected(option.value)"
              :aria-disabled="!!option.disabled || undefined"
              @click="onSelectOption(option)"
            ><span>{{ option.label }}</span></li>
            <li
              v-if="(filteredOptions as NyxSelectOption<T>[]).length === 0"
              class="nyx-select__option nyx-select__option--empty"
              @click.prevent.stop="elInput?.focus()"
            ><slot name="empty"><span>No results found</span></slot></li>
          </template>
        </ul>
      </div>
    </Teleport>

    <select v-model="normalisedModel" class="sr-only" :id="props.id" :multiple="isMultiple" tabindex="-1">
      <template v-if="isGrouped">
        <optgroup v-for="group in (props.options as NyxSelectOptionGroup<T>[])" :key="group.label" :label="group.label">
          <option v-for="option in group.options" :value="option.value" :key="String(option.value)">{{ option.label }}</option>
        </optgroup>
      </template>
      <template v-else>
        <option v-for="option in (props.options as NyxSelectOption<T>[])" :value="option.value" :key="String(option.value)">{{ option.label }}</option>
      </template>
    </select>
  </div>
</template>
