<script setup lang="ts">
import './NyxGrid.scss'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  useSlots,
  useTemplateRef,
  watch,
  type CSSProperties,
} from 'vue'
import { NyxSize } from '@/types'
import { NyxGridMode, type NyxGridProps } from './NyxGrid.types'

const DEFAULT_COLUMNS = 3
const GAP_REM_MAP: Record<NyxSize, number> = {
  [NyxSize.XSmall]: 0.25,
  [NyxSize.Small]: 0.5,
  [NyxSize.Medium]: 0.75,
  [NyxSize.Large]: 1,
  [NyxSize.XLarge]: 1.25,
}

const props = withDefaults(defineProps<NyxGridProps>(), {
  mode: NyxGridMode.Grid,
  columns: DEFAULT_COLUMNS,
  gap: NyxSize.Medium,
})

const slots = useSlots()
const elGrid = useTemplateRef<HTMLElement>('elGrid')
const elContent = useTemplateRef<HTMLDivElement>('elContent')

let layoutFrame = 0
let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null
const observedElements = new Set<HTMLElement>()

const hasHeader = computed(() => !!slots.header || !!props.title)
const hasFooter = computed(() => !!slots.footer)

const resolvedMode = computed<NyxGridMode>(() => (
  props.mode === NyxGridMode.Masonry ? NyxGridMode.Masonry : NyxGridMode.Grid
))

const resolvedColumns = computed(() => {
  const candidate = Number(props.columns)
  return Number.isInteger(candidate) && candidate > 0 ? candidate : DEFAULT_COLUMNS
})

const resolvedGap = computed<NyxSize>(() => (
  Object.values(NyxSize).includes(props.gap as NyxSize) ? props.gap as NyxSize : NyxSize.Medium
))

const resolvedGapValue = computed(() => {
  if (typeof props.gap === 'number' && Number.isFinite(props.gap) && props.gap >= 0) {
    return `${props.gap}rem`
  }

  return `calc(var(--nyx-gap-${resolvedGap.value}) * 1.5)`
})

const rootStyle = computed<CSSProperties>(() => ({
  '--nyx-grid-gap': resolvedGapValue.value,
  '--nyx-grid-columns': String(resolvedColumns.value),
}))

function getContentElements() {
  if (!elContent.value) return []

  return Array.from(elContent.value.children).filter(
    (node): node is HTMLElement => node instanceof HTMLElement
  )
}

function resetMasonryElement(element: HTMLElement) {
  element.style.removeProperty('--nyx-grid-item-width')
  element.style.removeProperty('--nyx-grid-item-left')
  element.style.removeProperty('--nyx-grid-item-top')
}

function syncObservedElements() {
  if (!resizeObserver) return

  const nextElements = new Set(getContentElements())

  observedElements.forEach((element) => {
    if (!nextElements.has(element)) {
      resizeObserver?.unobserve(element)
      observedElements.delete(element)
    }
  })

  nextElements.forEach((element) => {
    if (!observedElements.has(element)) {
      resizeObserver?.observe(element)
      observedElements.add(element)
    }
  })
}

function getGapPx() {
  if (typeof window === 'undefined') return 0

  const token = `--nyx-gap-${resolvedGap.value}`
  const source = elGrid.value ?? document.documentElement
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16

  if (typeof props.gap === 'number' && Number.isFinite(props.gap) && props.gap >= 0) {
    return props.gap * rootFontSize
  }

  const resolvedValue = getComputedStyle(source).getPropertyValue(token).trim()
  const parsed = Number.parseFloat(resolvedValue)

  if (Number.isFinite(parsed) && parsed > 0) {
    if (resolvedValue.endsWith('rem')) {
      return parsed * rootFontSize * 1.5
    }

    if (resolvedValue.endsWith('px')) {
      return parsed * 1.5
    }

    return parsed * 1.5
  }

  return GAP_REM_MAP[resolvedGap.value] * rootFontSize * 1.5
}

function layoutMasonry() {
  const contentElement = elContent.value

  if (!contentElement || resolvedMode.value !== 'masonry') return

  const elements = getContentElements()

  syncObservedElements()

  if (elements.length === 0) {
    contentElement.style.removeProperty('--nyx-grid-masonry-height')
    return
  }

  const gapPx = getGapPx()
  const availableWidth = contentElement.clientWidth

  if (!availableWidth) {
    contentElement.style.removeProperty('--nyx-grid-masonry-height')
    elements.forEach(resetMasonryElement)
    return
  }

  const columnWidth = Math.max(0, (availableWidth - (gapPx * Math.max(0, resolvedColumns.value - 1))) / resolvedColumns.value)

  if (!columnWidth) {
    contentElement.style.removeProperty('--nyx-grid-masonry-height')
    elements.forEach(resetMasonryElement)
    return
  }

  const columnBottoms = Array.from({ length: resolvedColumns.value }, () => 0)

  elements.forEach((element, index) => {
    const columnIndex = index % resolvedColumns.value
    const x = columnIndex * (columnWidth + gapPx)
    const y = columnBottoms[columnIndex]

    element.style.setProperty('--nyx-grid-item-width', `${columnWidth}px`)
    element.style.setProperty('--nyx-grid-item-left', `${x}px`)
    element.style.setProperty('--nyx-grid-item-top', `${y}px`)

    columnBottoms[columnIndex] += element.offsetHeight + gapPx
  })

  contentElement.style.setProperty(
    '--nyx-grid-masonry-height',
    `${Math.max(0, ...columnBottoms.map(bottom => bottom - gapPx))}px`
  )
}

function resetMasonryLayout() {
  const contentElement = elContent.value
  if (!contentElement) return

  contentElement.style.removeProperty('--nyx-grid-masonry-height')
  getContentElements().forEach(resetMasonryElement)
}

function scheduleLayout() {
  if (typeof window === 'undefined') return

  if (layoutFrame) {
    cancelAnimationFrame(layoutFrame)
  }

  nextTick(() => {
    layoutFrame = requestAnimationFrame(() => {
      layoutFrame = 0

      if (resolvedMode.value === NyxGridMode.Masonry) {
        layoutMasonry()
        return
      }

      resetMasonryLayout()
    })
  })
}

watch([resolvedMode, resolvedColumns, resolvedGap], () => {
  scheduleLayout()
})

onMounted(() => {
  if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => {
      scheduleLayout()
    })

    if (elContent.value) {
      resizeObserver.observe(elContent.value)
    }
  }

  if (typeof window !== 'undefined' && 'MutationObserver' in window && elContent.value) {
    mutationObserver = new MutationObserver(() => {
      scheduleLayout()
    })
    mutationObserver.observe(elContent.value, { childList: true })
  }

  window.addEventListener('resize', scheduleLayout)
  scheduleLayout()
})

onBeforeUnmount(() => {
  if (layoutFrame) {
    cancelAnimationFrame(layoutFrame)
  }

  window.removeEventListener('resize', scheduleLayout)
  mutationObserver?.disconnect()
  resizeObserver?.disconnect()
  mutationObserver = null
  resizeObserver = null
  observedElements.clear()
})
</script>

<template>
  <section
    ref="elGrid"
    class="nyx-grid"
    :class="[`nyx-grid--${resolvedMode}`]"
    :style="rootStyle"
  >
    <header v-if="hasHeader" class="nyx-grid__header">
      <slot v-if="$slots.header" name="header" />
      <h2 v-else class="nyx-grid__title">{{ props.title }}</h2>
    </header>

    <div ref="elContent" class="nyx-grid__content">
      <slot />
    </div>

    <footer v-if="hasFooter" class="nyx-grid__footer">
      <slot name="footer" />
    </footer>
  </section>
</template>
