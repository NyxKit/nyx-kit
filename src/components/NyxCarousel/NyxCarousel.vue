<script setup lang="ts" generic="T">
import './NyxCarousel.scss'
import { ref, computed, onUnmounted, watch, useSlots, type Slots } from 'vue'
import type { NyxCarouselProps } from './NyxCarousel.types'
import { NyxTheme, type CssVariablesDict } from '@/types'
import NyxMedia from '../NyxMedia/NyxMedia.vue'
import { useKeyboardShortcuts } from '@/compositions'

const props = withDefaults(defineProps<NyxCarouselProps<T>>(), {
  theme: NyxTheme.Default,
  autoplay: true,
  interval: 3000,
  controls: true,
  dots: false
})

const slots: Slots = useSlots()

const currentIndex = ref(0)
const isTransitioning = ref(true)
let intervalId: number|null = null

const isAutoplay = computed(() => props.autoplay)
const duplicatedSlides = computed(() => [props.slides[props.slides.length - 1], ...props.slides, props.slides[0]])
const cssVars = computed<CssVariablesDict>(() => ({
  '--nyx-carousel-index': currentIndex.value,
  '--nyx-carousel-transition': isTransitioning.value ? 'transform' : 'none'
}))

const getSlotName = (index: number) => `slide-${index % props.slides.length}`

const resetInterval = () => {
  if (intervalId) clearInterval(intervalId)
  if (props.autoplay) {
    intervalId = setInterval(next, props.interval)
  }
}

const next = () => {
  resetInterval()
  if (currentIndex.value >= props.slides.length) {
    isTransitioning.value = false
    currentIndex.value = 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
        currentIndex.value++
      })
    })
  } else {
    currentIndex.value++
  }
}

const prev = () => {
  resetInterval()
  if (currentIndex.value <= 0) {
    isTransitioning.value = false
    currentIndex.value = props.slides.length
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
        currentIndex.value--
      })
    })
  } else {
    currentIndex.value--
  }
}

const goToSlide = (index: number) => {
  resetInterval()
  currentIndex.value = index
}

const handleTransitionEnd = () => {
  if (currentIndex.value === props.slides.length) {
    isTransitioning.value = false
    currentIndex.value = 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
      })
    })
  } else if (currentIndex.value === -1) {
    isTransitioning.value = false
    currentIndex.value = props.slides.length - 1
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
      })
    })
  }
}

watch(isAutoplay, (newVal: boolean) => {
  if (newVal && !intervalId) {
    intervalId = setInterval(next, props.interval)
  } else if (intervalId) {
    clearInterval(intervalId)
  }
}, { immediate: true })

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

useKeyboardShortcuts({
  'ARROWLEFT': (_event) => prev(),
  'ARROWRIGHT': (_event) => next()
})
</script>

<template>
  <div class="nyx-carousel" :class="[`theme-${props.theme}`]">
    <div
      class="nyx-carousel__container"
      :style="cssVars"
      @transitionend="handleTransitionEnd"
    >
      <div v-for="(slide, index) in duplicatedSlides" :key="index" class="nyx-carousel__slide">
        <slot
          v-if="!!slots[getSlotName(index)]"
          :name="`slide-${index % slides.length}`"
          :slide="slide"
        >{{ slide }}</slot>
        <slot v-else :slide="slide">
          <NyxMedia v-if="typeof slide === 'string'" :src="slide" />
          <span v-else>{{ slide }}</span>
        </slot>
      </div>
    </div>
    <button v-if="props.controls" @click="prev" class="nyx-carousel__button prev">&#9665;</button>
    <button v-if="props.controls" @click="next" class="nyx-carousel__button next">&#9655;</button>
    <div v-if="props.dots" class="nyx-carousel__dots">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ 'active': index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>
