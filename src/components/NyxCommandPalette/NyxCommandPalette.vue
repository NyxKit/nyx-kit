<script setup lang="ts" generic="T extends NyxCommandPaletteItem">
import './NyxCommandPalette.scss'
import useNyxProps from '@/composables/useNyxProps'
import { NyxSize } from '@/types/common'
import NyxIcon from '../NyxIcon/NyxIcon.vue'
import NyxCommandPaletteResults from './NyxCommandPaletteResults.vue'
import { useCommandPaletteState } from './useCommandPaletteState'
import { NyxCommandPaletteViewportMode } from './NyxCommandPalette.types'
import type {
  NyxCommandPaletteItem,
  NyxCommandPaletteProps,
  NyxCommandPaletteSelectEvent,
  NyxCommandPaletteSlots
} from './NyxCommandPalette.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NyxCommandPaletteProps<T>>(), {
  inline: false,
  viewportMode: NyxCommandPaletteViewportMode.AfterInteraction,
  showResultsLabel: 'Show results',
  placeholder: 'Search commands...',
  label: 'Search commands',
  loading: false,
  loadingText: 'Loading commands...',
  emptyText: 'No commands found.',
  disabled: false,
  autofocus: false,
  loop: true,
  closeable: false,
  closeLabel: 'Close command palette'
})

const model = defineModel<string>()
const searchTerm = defineModel<string>('searchTerm')
const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{ select: [event: NyxCommandPaletteSelectEvent<T>]; close: [] }>()

const slots = defineSlots<NyxCommandPaletteSlots<T>>()

const { classList } = useNyxProps(props, { origin: 'NyxCommandPalette' })

const {
  attrs,
  root,
  input,
  viewport,
  overlay,
  mounted,
  closing,
  query,
  resultsVisible,
  revealResults,
  filtered,
  resultCount,
  active,
  domId,
  scope,
  activate,
  composition,
  onInputKeydown,
  rootAttrs
} = useCommandPaletteState(props, model, searchTerm, open, emit)

defineExpose({ focus: overlay.focus })
</script>

<template>
  <Teleport
    to="body"
    :disabled="inline || !mounted"
  >
    <component
      :is="inline ? 'div' : 'dialog'"
      ref="root"
      v-bind="rootAttrs()"
      class="nyx-command-palette"
      :class="[classList, attrs.class]"
      :style="attrs.style"
      :data-closing="closing"
      :data-results-visible="resultsVisible"
      :aria-label="inline ? undefined : label"
      :aria-modal="inline ? undefined : true"
      tabindex="-1"
      @keydown="overlay.onKeydown"
      @cancel="overlay.onCancel"
      @pointerdown="overlay.onPointerDown"
      @pointerup="overlay.onPointerUp"
      @pointercancel="overlay.onPointerCancel"
    >
      <div class="nyx-command-palette__search">
        <NyxIcon
          name="search"
          aria-hidden="true"
        />
        <input
          :id="domId('input')"
          ref="input"
          class="nyx-command-palette__input"
          type="text"
          role="combobox"
          :aria-label="label"
          aria-autocomplete="list"
          :aria-controls="domId('list')"
          :aria-expanded="(inline || (mounted && open)) && !disabled && resultsVisible && !closing"
          :aria-activedescendant="active ? domId('option', active) : undefined"
          :placeholder="placeholder"
          :value="query"
          :disabled="disabled"
          autocomplete="off"
          @input="searchTerm = ($event.target as HTMLInputElement).value"
          @keydown="onInputKeydown"
          @compositionstart="composition(true)"
          @compositionend="composition(false)"
        />
        <button
          v-if="closeable"
          class="nyx-command-palette__close"
          type="button"
          :aria-label="closeLabel"
          @click="overlay.dismiss"
        >
          <NyxIcon
            name="x"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        class="nyx-command-palette__results"
        :data-visible="resultsVisible"
        :inert="!resultsVisible"
        :aria-hidden="!resultsVisible"
      >
        <div
          ref="viewport"
          class="nyx-command-palette__viewport"
        >
          <NyxCommandPaletteResults
            :filtered="filtered"
            :loading="loading"
            :loading-text="loadingText"
            :empty-text="emptyText"
            :result-count="resultCount"
            :label="label"
            :query="query"
            :active="active"
            :dom-id="domId"
            :scope="scope"
            @activate="activate"
            @highlight="active = $event"
          >
            <template
              v-if="slots['item']"
              #item="slotProps"
            >
              <slot
                name="item"
                v-bind="slotProps"
              />
            </template>
            <template
              v-if="slots['item-leading']"
              #item-leading="slotProps"
            >
              <slot
                name="item-leading"
                v-bind="slotProps"
              />
            </template>
            <template
              v-if="slots['item-label']"
              #item-label="slotProps"
            >
              <slot
                name="item-label"
                v-bind="slotProps"
              />
            </template>
            <template
              v-if="slots['item-trailing']"
              #item-trailing="slotProps"
            >
              <slot
                name="item-trailing"
                v-bind="slotProps"
              />
            </template>
            <template
              v-if="slots['group-label']"
              #group-label="slotProps"
            >
              <slot
                name="group-label"
                v-bind="slotProps"
              />
            </template>
            <template
              v-if="slots['loading']"
              #loading="slotProps"
            >
              <slot
                name="loading"
                v-bind="slotProps"
              />
            </template>
            <template
              v-if="slots['empty']"
              #empty="slotProps"
            >
              <slot
                name="empty"
                v-bind="slotProps"
              />
            </template>
          </NyxCommandPaletteResults>
        </div>
      </div>
      <span
        class="nyx-command-palette__status"
        role="status"
        >{{ !resultsVisible ? '' : loading ? loadingText : !resultCount ? emptyText : '' }}</span
      >
      <div
        v-if="slots.footer || !resultsVisible"
        class="nyx-command-palette__footer"
      >
        <slot
          name="footer"
          :search-term="query"
          :result-count="resultCount"
        />
        <button
          v-if="!resultsVisible"
          class="nyx-command-palette__reveal"
          type="button"
          :aria-label="showResultsLabel"
          :title="showResultsLabel"
          :aria-controls="domId('list')"
          :aria-expanded="false"
          :disabled="disabled || closing"
          @click="revealResults"
        >
          <NyxIcon
            name="chevrons-down"
            :size="NyxSize.XSmall"
            aria-hidden="true"
          />
        </button>
      </div>
    </component>
  </Teleport>
</template>
