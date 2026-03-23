<script setup lang="ts">
import './NyxTooltip.scss'
import { defineExpose, defineSlots, ref, useId, useTemplateRef, type Slots } from 'vue'
import { NyxPosition, NyxSize } from '@/types'
import type { NyxTooltipProps } from './NyxTooltip.types'
import { useTeleportPosition, useNyxProps } from '@/composables'

const props = withDefaults(defineProps<NyxTooltipProps>(), {
  position: NyxPosition.Top,
  disabled: false,
  trigger: 'hover'
})

const model = defineModel<boolean>({ default: false })

const slots: Slots = defineSlots()

const elRelative = useTemplateRef<HTMLDivElement>('elTooltip')
const elAbsolute = useTemplateRef<HTMLDivElement>('elTooltipContent')

const { classList } = useNyxProps(props, { origin: 'NyxTooltip' })

const { cssVariables, computedPosition, updateCssVariables } = useTeleportPosition(elRelative, elAbsolute, {
  position: ref(props.position),
  gap: ref(NyxSize.Medium), // ref(props.size)
})

const open = () => model.value = true
const close = () => model.value = false
const toggle = () => model.value = !model.value

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
    <Teleport to="body">
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
