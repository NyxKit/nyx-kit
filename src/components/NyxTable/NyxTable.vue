<script setup lang="ts" generic="T extends Object">
import './NyxTable.scss'
import { type CssVariablesDict, NyxSize, NyxTheme, NyxVariant } from '@/types'
import { computed, useSlots, type Slots } from 'vue'
import { isObject } from '@/utils'
import type { NyxTableProps } from './NyxTable.types'
import NyxTableCell from './NyxTableCell.vue'

const slots: Slots = useSlots()

const props = withDefaults(defineProps<NyxTableProps<T>>(), {
  disabled: false,
  theme: NyxTheme.Default,
  size: NyxSize.Medium,
  variant: NyxVariant.Outline,
  header: true,
  striped: false,
  colWhitelist: () => [],
  colBlacklist: () => []
})

const model = defineModel<T[]>({ default: [] })

const columnTitles = computed(() => {
  if (!!props.columnTitles) return props.columnTitles
  if (model.value.length === 0) return []
  const item = model.value[0]
  if (!isObject(item)) return []
  const whitelist = props.colWhitelist.length > 0 ? props.colWhitelist : Object.keys(item) as (keyof T)[]
  return whitelist.filter((col: keyof T) => !props.colBlacklist.includes(col))
})

const numColumns = computed(() => {
  const baseNumColumns = !!slots.actions ? 1 : 0
  if (props.columns !== undefined) return props.columns + baseNumColumns
  if (model.value.length === 0) return 1 + baseNumColumns
  return columnTitles.value.length + baseNumColumns
})

const data = computed(() => {
  const whitelist = props.colWhitelist.length > 0 ? props.colWhitelist : Object.keys(model.value[0] ?? {}) as (keyof T)[]
  const keys = whitelist.filter((col: keyof T) => !props.colBlacklist.includes(col))
  return model.value.map((item) => {
    const data: Partial<T> = {}
    for (const key of keys) {
      data[key] = item[key]
    }
    return data
  })
})

const style = computed<CssVariablesDict>(() => {
  const actionsColumnValue = !!slots.actions ? 'auto' : ''
  const gridTemplateColumn = !!props.gridTemplateColumns
    ? `${ props.gridTemplateColumns } ${ actionsColumnValue }`
    : `repeat(${ numColumns.value }, 1fr)`
  return {
    '--grid-template-columns': gridTemplateColumn
  }
})
</script>

<template>
  <table
    class="nyx-table"
    :class="[
      `size-${props.size}`,
      `theme-${props.theme}`,
      `variant-${props.variant}`,
      { 'striped': striped },
      { 'sticky': props.header === 'sticky' }
    ]"
    :style="style"
  >
    <thead v-if="!!props.header">
      <tr>
        <template v-for="header in columnTitles" :key="header">
          <th>{{ header }}</th>
        </template>
        <th v-if="!!slots.actions">&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(item) of data"
        :key="typeof item === 'object' && !!props.itemKey ? item[props.itemKey] : item"
      >
        <tr>
          <slot :item>
            <template v-for="cell of Object.values(item ?? {})" :key="cell">
              <NyxTableCell>{{ cell }}</NyxTableCell>
            </template>
          </slot>
          <NyxTableCell v-if="!!slots.actions" class="nyx-table__actions">
            <slot name="actions" :item />
          </NyxTableCell>
        </tr>
      </template>
    </tbody>
  </table>
</template>
