<script setup lang="ts">
import { computed } from 'vue'
import type { NyxTreeNodeProps } from './NyxTree.types'
import type { KeyDict } from '@/types';

defineOptions({
  name: 'NyxTreeNode'
})

const props = defineProps<NyxTreeNodeProps>()

const isLeaf = computed(() => typeof props.node === 'string')
</script>

<template>
  <li class="nyx-tree-node">
    <template v-if="isLeaf">
      {{ node }}
    </template>
    <template v-else>
      <ul class="nyx-tree-children">
        <NyxTreeNode
          v-for="(value, key) in (node as KeyDict<string | KeyDict<any>>)"
          :key="key"
          :node="value"
          :path="[...path, String(key)]"
        />
      </ul>
    </template>
  </li>
</template>
