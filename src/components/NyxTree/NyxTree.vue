<script setup lang="ts">
import './NyxTree.scss'
import type { KeyDict } from '@/types'
import NyxTreeNode from './NyxTreeNode.vue'

const model = defineModel<KeyDict<string | KeyDict<any>>>({ required: true })
</script>

<template>
  <ul class="nyx-tree">
    <NyxTreeNode
      v-for="(value, key) in model"
      :key="key"
      :node="value"
      :path="[String(key)]"
    />
  </ul>
</template>
