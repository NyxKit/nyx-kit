<script setup lang="ts">
import './NyxTabs.scss'
import { NyxPosition, NyxSize, NyxTabsVariant, NyxTheme } from '@/types'
import type { NyxTabsProps } from './NyxTabs.types'
import useNyxProps from '@/compositions/useNyxProps'
import { computed, useSlots, type Slots } from 'vue'

const props = withDefaults(defineProps<NyxTabsProps>(), {
  theme: NyxTheme.Default,
  size: NyxSize.Medium,
  variant: NyxTabsVariant.Modern,
  position: NyxPosition.TopLeft,
  floating: false,
  border: false,
  tabTransition: 'fade'
})

const model = defineModel<string>()
const slots: Slots = useSlots()

const { classList } = useNyxProps(props, 'NyxTabs')

const currentTab = computed(() => model.value ?? props.tabs[0])

const cssVars = computed(() => ({
  '--nyx-tab-index': props.tabs.indexOf(currentTab.value),
}))

</script>

<template>
  <section
    class="nyx-tabs"
    :class="[...classList, { floating, border }]"
    :style="cssVars"
  >
    <nav>
      <ul>
        <li v-for="tab in tabs">
          <button
            class="nyx-tabs__button"
            :class="{ 'active': tab === currentTab }"
            @click="model = tab"
          >
            <slot :name="`tab-button-${tab}`">{{ tab }}</slot>
          </button>
        </li>
      </ul>
    </nav>
    <slot />
    <div class="nyx-tabs__container">
      <div
        v-for="tab in tabs"
        class="nyx-tabs__tab"
        :class="{ 'active': tab === currentTab }"
      >
        <slot :name="`tab-${tab}`">
          <p>This tab has no content. Add content by using the following template.</p>
          <code>{{ `<template v-slot:tab-${tab}>Your content here</template>` }}</code>
        </slot>
      </div>
    </div>
    <footer v-if="!!slots.footer">
      <slot name="footer" />
    </footer>
  </section>
</template>
