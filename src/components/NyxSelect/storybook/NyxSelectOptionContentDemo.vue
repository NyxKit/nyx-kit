<script setup lang="ts">
import { computed, ref } from 'vue'
import NyxSelect from '../NyxSelect.vue'
import type { NyxSelectOption, NyxSelectOptionGroup } from '@/types'

const props = defineProps<{ grouped?: boolean }>()

const selectedDiscussion = ref(1)
const discussions = ref<NyxSelectOption<number>[]>([
  { label: 'Planning the next release and following up on feedback from the team', value: 1 },
  { label: 'Discussion switcher improvements', value: 2 },
  { label: 'Archived discussion', value: 3, disabled: true }
])
const options = computed<NyxSelectOption<number>[] | NyxSelectOptionGroup<number>[]>(() =>
  props.grouped
    ? [
      { label: 'Active', options: discussions.value.filter(option => !option.disabled) },
      { label: 'Archive', options: discussions.value.filter(option => option.disabled) }
    ]
    : discussions.value
)

const dates: Record<number, string> = { 1: '27 Oct', 2: '26 Oct', 3: '20 Oct' }
const dateFor = (value: number) => dates[value]
const reorder = () => { discussions.value = [...discussions.value].reverse() }
const rename = () => {
  const selected = discussions.value.find(option => option.value === selectedDiscussion.value)
  if (selected) selected.label = 'Renamed discussion with the same selected value'
}
</script>

<template>
  <div class="select-option-demo">
    <div class="select-option-demo__actions">
      <button type="button" @click="reorder">Reorder options</button>
      <button type="button" @click="rename">Rename selected</button>
    </div>
    <NyxSelect v-model="selectedDiscussion" :options="options">
      <template #option="{ option }">
        <span class="discussion-option">
          <span class="discussion-option__title">{{ option.label }}</span>
          <span class="discussion-option__date">{{ dateFor(option.value) }}</span>
        </span>
      </template>
    </NyxSelect>
    <p>Selected value: {{ selectedDiscussion }}</p>
  </div>
</template>

<style scoped>
.select-option-demo {
  width: 100%;
  max-width: 48rem;
  display: grid;
  gap: var(--nyx-gap-xl);
}

.select-option-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--nyx-gap-xl);
}

.discussion-option {
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--nyx-gap-xl);
}

.discussion-option__title {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.discussion-option__date {
  flex-shrink: 0;
  white-space: nowrap;
  color: var(--nyx-c-text-2);
  font-size: var(--nyx-font-size-sm);
}
</style>
