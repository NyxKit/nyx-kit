<script setup lang="ts" generic="T extends object">
import './NyxTable.scss'
import { type CssVariablesDict } from '@/types'
import { computed, useSlots } from 'vue'
import { isObject } from '@/utils'
import type { NyxTableProps } from './NyxTable.types'
import NyxTableCell from './NyxTableCell.vue'
import { useNyxProps } from '@/composables'

const slots = useSlots()

defineSlots<{
  default?: (props: { item: T }) => unknown
  actions?: (props: { item: T }) => unknown
}>()

const props = withDefaults(defineProps<NyxTableProps<T>>(), {
  disabled: false,
  header: true,
  striped: false,
  colInclude: () => [],
  colExclude: () => []
})

const model = defineModel<T[]>({ default: [] })

const columnTitles = computed(() => {
  if (props.columnTitles) return props.columnTitles
  if (model.value.length === 0) return []
  const item = model.value[0]
  if (!isObject(item)) return []
  const include = props.colInclude.length > 0 ? props.colInclude : Object.keys(item) as (keyof T)[]
  return include.filter((col: keyof T) => !props.colExclude.includes(col))
})

const numColumns = computed(() => {
  const baseNumColumns = slots.actions ? 1 : 0
  if (props.columns !== undefined) return props.columns + baseNumColumns
  if (model.value.length === 0) return 1 + baseNumColumns
  return columnTitles.value.length + baseNumColumns
})

const visibleKeys = computed<(keyof T)[]>(() => {
  const include = props.colInclude.length > 0 ? props.colInclude : Object.keys(model.value[0] ?? {}) as (keyof T)[]
  return include.filter((col: keyof T) => !props.colExclude.includes(col))
})

const { classList } = useNyxProps(props, { origin: 'NyxTable' })

const style = computed<CssVariablesDict>(() => {
  const actionsColumnValue = slots.actions ? 'auto' : ''
  const gridTemplateColumn = props.gridTemplateColumns
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
    :class="[...classList, { 'striped': striped }, { 'sticky': props.header === 'sticky' }]"
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
        v-for="(item) of model"
        :key="typeof item === 'object' && !!props.itemKey ? item[props.itemKey] : item"
      >
        <tr>
          <slot :item="item">
            <template v-for="key of visibleKeys" :key="key">
              <NyxTableCell>{{ item[key] }}</NyxTableCell>
            </template>
          </slot>
          <NyxTableCell v-if="!!slots.actions" class="nyx-table__actions">
            <slot name="actions" :item="item" />
          </NyxTableCell>
        </tr>
      </template>
    </tbody>
  </table>
</template>
