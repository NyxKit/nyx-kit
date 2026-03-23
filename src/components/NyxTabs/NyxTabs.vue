<script setup lang="ts">
import './NyxTabs.scss'
import { NyxPosition, NyxTabsVariant } from '@/types'
import type { NyxTabsProps } from './NyxTabs.types'
import { useNyxProps } from '@/composables'
import { computed, useId, useSlots, type Slots } from 'vue'

const props = withDefaults(defineProps<NyxTabsProps>(), {
  variant: NyxTabsVariant.Modern,
  position: NyxPosition.TopLeft,
  floating: false,
  border: false,
  tabTransition: 'fade'
})

const model = defineModel<string>()
const slots: Slots = useSlots()

const { classList } = useNyxProps(props, { origin: 'NyxTabs' })

const currentTab = computed(() => model.value ?? props.tabs[0])

const cssVars = computed(() => ({
  '--nyx-tab-index': props.tabs.indexOf(currentTab.value),
}))

const baseId = useId()
const tabId = (tab: string) => `${baseId}-tab-${tab}`
const panelId = (tab: string) => `${baseId}-panel-${tab}`

const onTablistKeydown = (e: KeyboardEvent) => {
  const idx = props.tabs.indexOf(currentTab.value)
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    model.value = props.tabs[(idx + 1) % props.tabs.length]
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    model.value = props.tabs[(idx - 1 + props.tabs.length) % props.tabs.length]
  } else if (e.key === 'Home') {
    e.preventDefault()
    model.value = props.tabs[0]
  } else if (e.key === 'End') {
    e.preventDefault()
    model.value = props.tabs[props.tabs.length - 1]
  }
}

</script>

<template>
  <section
    class="nyx-tabs"
    :class="[...classList, { floating, border }]"
    :style="cssVars"
  >
    <nav>
      <ul role="tablist" @keydown="onTablistKeydown">
        <li v-for="tab in tabs" :key="tab">
          <button
            class="nyx-tabs__button"
            :class="{ 'active': tab === currentTab }"
            role="tab"
            :id="tabId(tab)"
            :aria-selected="tab === currentTab"
            :aria-controls="panelId(tab)"
            :tabindex="tab === currentTab ? 0 : -1"
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
        :key="tab"
        class="nyx-tabs__tab"
        :class="{ 'active': tab === currentTab }"
        role="tabpanel"
        :id="panelId(tab)"
        :aria-labelledby="tabId(tab)"
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
