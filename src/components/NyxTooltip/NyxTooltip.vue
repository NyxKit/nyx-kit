<script setup lang="ts">
import './NyxTooltip.scss'
import { defineProps, defineSlots, ref, useTemplateRef } from 'vue'
import { NyxPosition, NyxTheme, NyxSize, NyxVariant } from '@/types'
import type { NyxTooltipProps } from './NyxTooltip.types'
import { useTeleportPosition } from '@/compositions'

const props = withDefaults(defineProps<NyxTooltipProps>(), {
  theme: NyxTheme.Default,
  size: NyxSize.Medium,
  variant: NyxVariant.Solid,
  position: NyxPosition.TopCenter,
  disabled: false
})

const model = defineModel<boolean>({ default: false })

const slots = defineSlots()

const elRelative = useTemplateRef<HTMLDivElement>('elTooltip')
const elAbsolute = useTemplateRef<HTMLDivElement>('elTooltipContent')

const { cssVariables, computedPosition } = useTeleportPosition(elRelative, elAbsolute, {
  position: ref(props.position),
  gap: ref(NyxSize.Medium) // ref(props.size)
})

const open = () => model.value = true
const close = () => model.value = false
const toggle = () => model.value = !model.value

</script>

<template>
  <div
    class="nyx-tooltip"
    ref="elTooltip"
    @mouseover="open"
    @mouseleave="close"
    @click="open"
    v-click-outside="close"
  >
    <slot></slot>
    <Teleport to="body">
      <div
        class="nyx-tooltip__content"
        :class="[
          `theme-${props.theme}`, `variant-${props.variant}`, `size-${props.size}`,
          { 'nyx-tooltip__content--open': model }
        ]"
        :data-position="computedPosition"
        :style="cssVariables"
        ref="elTooltipContent"
      >
        <div class="nyx-tooltip__content-wrapper">
          <span v-if="props.text">{{ props.text }}</span>
          <slot name="tooltip-content" v-else>NyxTooltip</slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>
