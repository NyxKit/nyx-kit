<script setup lang="ts">
import './NyxLogViewer.scss'
import { computed } from 'vue'
import { NyxVariant, NyxSort, type NyxLogEntry, NyxSize } from '@/types'
import type { NyxLogViewerProps } from './NyxLogViewer.types'
import NyxTable from '../NyxTable/NyxTable.vue'
import NyxTableCell from '../NyxTable/NyxTableCell.vue'
import { useNyxProps } from '@/composables'

const LOG_ENTRY_KEYS: (keyof NyxLogEntry)[] = ['timestamp', 'value', 'origin', 'theme']

const props = withDefaults(defineProps<NyxLogViewerProps>(), {
  timestampFormat: 'HH:mm:ss',
  sort: NyxSort.None,
  size: NyxSize.XSmall,
})

const model = defineModel<NyxLogEntry[]>({ default: () => [] })

const { nyxTheme, nyxSize } = useNyxProps(props, { origin: 'NyxLogViewer' })

const hasOrigin = computed(() => model.value.some(e => !!e.origin))

const gridTemplateColumns = computed(() =>
  hasOrigin.value ? 'auto auto 1fr' : 'auto 1fr'
)

function toMs(ts: Date | number | string): number {
  if (ts instanceof Date) return ts.getTime()
  if (typeof ts === 'number') return ts
  return new Date(ts).getTime()
}

const sortedEntries = computed(() => {
  if (props.sort === NyxSort.None) return model.value
  return [...model.value].sort((a, b) => {
    const diff = toMs(a.timestamp) - toMs(b.timestamp)
    return props.sort === NyxSort.Asc ? diff : -diff
  })
})

function formatTimestamp(ts: Date | number | string, fmt: string): string {
  const d = ts instanceof Date ? ts : new Date(ts)
  if (isNaN(d.getTime())) return String(ts)
  const pad = (n: number) => String(n).padStart(2, '0')
  return fmt
    .replace('YYYY', String(d.getFullYear()))
    .replace('MM', pad(d.getMonth() + 1))
    .replace('DD', pad(d.getDate()))
    .replace('HH', pad(d.getHours()))
    .replace('mm', pad(d.getMinutes()))
    .replace('ss', pad(d.getSeconds()))
}
</script>

<template>
  <NyxTable
    :model-value="sortedEntries"
    :header="false"
    :variant="NyxVariant.Ghost"
    :gridTemplateColumns
    :col-include="LOG_ENTRY_KEYS"
    :size="nyxSize"
    class="nyx-log-viewer"
  >
    <template #default="{ item }">
      <NyxTableCell
        class="nyx-log-viewer__timestamp"
        :class="props.theme !== undefined ? `theme-${nyxTheme}` : undefined"
      >
        {{ formatTimestamp(item.timestamp!, props.timestampFormat) }}
      </NyxTableCell>
      <NyxTableCell v-if="hasOrigin" class="nyx-log-viewer__origin">
        {{ item.origin }}
      </NyxTableCell>
      <NyxTableCell
        class="nyx-log-viewer__value"
        :class="item.theme ? `theme-${item.theme}` : undefined"
      >
        {{ item.value }}
      </NyxTableCell>
    </template>
  </NyxTable>
</template>
