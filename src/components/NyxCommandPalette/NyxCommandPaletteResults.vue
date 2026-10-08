<script setup lang="ts" generic="T extends NyxCommandPaletteItem">
import NyxIcon from '../NyxIcon/NyxIcon.vue'
import type { NyxCommandPaletteResultsProps } from './NyxCommandPaletteResults.types'
import type { NyxCommandPaletteGroup, NyxCommandPaletteItem, NyxCommandPaletteSlots } from './NyxCommandPalette.types'

defineProps<NyxCommandPaletteResultsProps<T>>()

const slots = defineSlots<NyxCommandPaletteSlots<T>>()

const emit = defineEmits<{
  activate: [item: T, group: NyxCommandPaletteGroup<T>, event: MouseEvent]
  highlight: [id: string]
}>()

const hideLeavingResult = (element: Element) => {
  element.setAttribute('aria-hidden', 'true')
  element.setAttribute('inert', '')
}

const restoreResult = (element: Element) => {
  element.removeAttribute('aria-hidden')
  element.removeAttribute('inert')
}
</script>

<template>
  <div class="nyx-command-palette__results-content">
    <div
      :id="domId('list')"
      role="listbox"
      :aria-label="label"
      :aria-busy="loading"
    >
      <TransitionGroup
        v-for="{ group, items } in filtered"
        :key="group.id"
        tag="div"
        role="group"
        appear
        name="nyx-command-palette-result"
        @before-leave="hideLeavingResult"
        @before-enter="restoreResult"
        @leave-cancelled="restoreResult"
        :aria-labelledby="group.label?.trim() || slots['group-label'] ? domId('group', group.id) : undefined"
        class="nyx-command-palette__group"
      >
        <div
          v-if="group.label?.trim() || slots['group-label']"
          key="heading"
          :id="domId('group', group.id)"
          class="nyx-command-palette__heading"
        >
          <slot
            name="group-label"
            :group="group"
            :search-term="query"
            >{{ group.label }}</slot
          >
        </div>
        <button
          v-for="(item, index) in items"
          :id="domId('option', item.id)"
          :key="`item:${item.id}`"
          type="button"
          role="option"
          tabindex="-1"
          class="nyx-command-palette__option"
          :data-active="active === item.id"
          :aria-selected="scope(item, group, index).selected"
          :aria-disabled="scope(item, group, index).disabled"
          :aria-label="item.label"
          :aria-describedby="
            !slots.item && !slots['item-label'] && item.description ? domId('description', item.id) : undefined
          "
          @pointermove="!scope(item, group, index).disabled && emit('highlight', item.id)"
          @mousedown.prevent
          @click="emit('activate', item, group, $event)"
        >
          <slot
            v-if="slots.item"
            name="item"
            v-bind="scope(item, group, index)"
          />
          <template v-else>
            <span
              v-if="slots['item-leading'] || item.icon"
              class="nyx-command-palette__leading"
            >
              <slot
                name="item-leading"
                v-bind="scope(item, group, index)"
                ><NyxIcon
                  v-if="item.icon"
                  :name="item.icon"
                  aria-hidden="true"
              /></slot>
            </span>
            <span class="nyx-command-palette__label">
              <slot
                name="item-label"
                v-bind="scope(item, group, index)"
              >
                <span>{{ item.label }}</span>
                <span
                  v-if="item.description"
                  :id="domId('description', item.id)"
                  class="nyx-command-palette__description"
                  >{{ item.description }}</span
                >
              </slot>
            </span>
            <span
              v-if="slots['item-trailing'] || item.shortcuts?.length"
              class="nyx-command-palette__trailing"
            >
              <slot
                name="item-trailing"
                v-bind="scope(item, group, index)"
              >
                <kbd
                  v-for="(key, keyIndex) in item.shortcuts"
                  :key="keyIndex"
                  aria-hidden="true"
                  >{{ key }}</kbd
                >
              </slot>
            </span>
          </template>
        </button>
      </TransitionGroup>
    </div>
    <Transition
      name="nyx-command-palette-state"
      mode="out-in"
      @before-leave="hideLeavingResult"
    >
      <div
        v-if="loading || !resultCount"
        :key="loading ? 'loading' : 'empty'"
        class="nyx-command-palette__state"
      >
        <slot
          v-if="loading"
          name="loading"
          :search-term="query"
          ><NyxIcon
            name="loader-circle"
            aria-hidden="true"
          />{{ loadingText }}</slot
        >
        <slot
          v-else
          name="empty"
          :search-term="query"
          >{{ emptyText }}</slot
        >
      </div>
    </Transition>
  </div>
</template>
