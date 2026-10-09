<script setup lang="ts">
import './NyxTooltip.scss'
import { onBeforeUnmount, ref, useId, useTemplateRef, watch } from 'vue'
import { NyxPosition, NyxSize } from '@/types'
import type { NyxTooltipProps } from './NyxTooltip.types'
import { useTeleportPosition, useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxTooltipProps>(), {
  position: NyxPosition.Top,
  disabled: false,
  trigger: 'hover',
  delay: 150
})

const model = defineModel<boolean>({ default: false })

const elRelative = useTemplateRef<HTMLDivElement>('elTooltip')
const elAbsolute = useTemplateRef<HTMLDivElement>('elTooltipContent')

const { classList } = useNyxProps(props, { origin: 'NyxTooltip' })

const { cssVariables, computedPosition, teleportTarget, updateCssVariables } = useTeleportPosition(
  elRelative,
  elAbsolute,
  {
    position: ref(props.position),
    gap: ref(NyxSize.Medium), // ref(props.size)
  },
)

let openTimer: ReturnType<typeof setTimeout> | undefined

const cancelPendingOpen = () => {
  if (openTimer !== undefined) {
    clearTimeout(openTimer)
    openTimer = undefined
  }
}

const open = () => {
  if (model.value || openTimer !== undefined) return

  if (!Number.isFinite(props.delay) || props.delay <= 0) {
    model.value = true
    return
  }

  openTimer = setTimeout(() => {
    openTimer = undefined
    model.value = true
  }, props.delay)
}

const close = () => {
  cancelPendingOpen()
  model.value = false
}

watch([() => props.trigger, () => props.delay, model], cancelPendingOpen, { flush: 'sync' })

watch(model, (isOpen) => {
  if (isOpen) updateCssVariables()
}, { flush: 'post' })

onBeforeUnmount(cancelPendingOpen)

const onMouseOver = () => props.trigger === 'hover' && open()
const onMouseLeave = () => props.trigger !== 'manual' && close()
const onClick = () => props.trigger === 'click' && open()
const onClickOutside = () => props.trigger !== 'manual' && close()

const tooltipId = useId()

defineExpose({ updatePosition: updateCssVariables })
</script>

<template>
  <div
    class="nyx-tooltip"
    ref="elTooltip"
    :aria-describedby="tooltipId"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @click="onClick"
    v-click-outside="onClickOutside"
  >
    <slot></slot>
    <Teleport :to="teleportTarget">
      <div
        class="nyx-tooltip__content"
        :class="[...classList, { 'nyx-tooltip__content--open': model }]"
        :data-position="computedPosition"
        :style="cssVariables"
        ref="elTooltipContent"
        :id="tooltipId"
        role="tooltip"
      >
        <div class="nyx-tooltip__content-wrapper">
          <slot name="tooltip-content"><span>{{ props.text }}</span></slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>
