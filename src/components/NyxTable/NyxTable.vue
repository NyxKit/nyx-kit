<script setup lang="ts" generic="T extends Object">
import './NyxTable.scss'
import { type CssVariablesDict } from '@/types'
import { computed, useSlots, type Slots } from 'vue'
import { isObject } from '@/utils'
import type { NyxTableProps } from './NyxTable.types'
import NyxTableCell from './NyxTableCell.vue'
import { useNyxProps } from '@/composables'

const slots: Slots = useSlots()

const props = withDefaults(defineProps<NyxTableProps<T>>(), {
  disabled: false,
  header: true,
  striped: false,
  colInclude: () => [],
  colExclude: () => []
})

const model = defineModel<T[]>({ default: [] })

const columnTitles = computed(() => {
  if (!!props.columnTitles) return props.columnTitles
  if (model.value.length === 0) return []
  const item = model.value[0]
  if (!isObject(item)) return []
  const include = props.colInclude.length > 0 ? props.colInclude : Object.keys(item) as (keyof T)[]
  return include.filter((col: keyof T) => !props.colExclude.includes(col))
})

const numColumns = computed(() => {
  const baseNumColumns = !!slots.actions ? 1 : 0
  if (props.columns !== undefined) return props.columns + baseNumColumns
  if (model.value.length === 0) return 1 + baseNumColumns
  return columnTitles.value.length + baseNumColumns
})

const data = computed(() => {
  const include = props.colInclude.length > 0 ? props.colInclude : Object.keys(model.value[0] ?? {}) as (keyof T)[]
  const keys = include.filter((col: keyof T) => !props.colExclude.includes(col))
  return model.value.map((item) => {
    const data: Partial<T> = {}
    for (const key of keys) {
      data[key] = item[key]
    }
    return data
  })
})

const { classList } = useNyxProps(props, { origin: 'NyxTable' })

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
