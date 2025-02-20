<script setup lang="ts">
import './NyxCard.scss'
import { NyxSize, NyxTheme, NyxVariant, type CssVariablesDict } from '@/types'
import NyxMedia from '../NyxMedia/NyxMedia.vue'
import type { NyxCardEmits, NyxCardProps } from './NyxCard.types'
import useNyxProps from '@/compositions/useNyxProps'
import { computed, useSlots, type Slots } from 'vue'

const props = withDefaults(defineProps<NyxCardProps>(), {
  theme: NyxTheme.Default,
  size: NyxSize.Medium,
  variant: NyxVariant.Solid,
  textAlign: 'left',
  layout: 'media-first',
  blendMedia: false
})

const emit = defineEmits<NyxCardEmits>()

const slots: Slots = useSlots()

const { classList } = useNyxProps(props)
const cssVars = computed<CssVariablesDict>(() => ({
  '--nyx-card-text-align': props.textAlign
}))

const onClick = () => emit('click')

</script>

<template>
  <article
    class="nyx-card"
    :class="[
      ...classList,
      props.layout,
      props.blendMedia && 'blend-media'
    ]"
    :style="cssVars"
    @click.self="onClick"
  >
    <slot name="media">
      <NyxMedia
        v-if="props.src"
        :src="props.src"
        :alt="props.title"
        :title="props.title"
      />
    </slot>
    <header class="nyx-card__header" v-if="!!slots.header || props.title">
      <slot name="header">
        <h1>{{ props.title }}</h1>
      </slot>
    </header>
    <section class="nyx-card__body">
      <slot />
    </section>
    <footer class="nyx-card__footer" v-if="!!slots.footer">
      <slot name="footer" />
    </footer>
  </article>
</template>
