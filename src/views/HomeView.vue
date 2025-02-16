<script setup lang="ts">
import { NyxButton, NyxModal } from '@/components'
import { ref } from 'vue'

const isModalOpen = ref(false)

</script>

<template>
  <main>
    <NyxButton @click="isModalOpen = true">Click me</NyxButton>
    <NyxModal v-model="isModalOpen" title="Lorem" confirmText="Confirm">My Model</NyxModal>
  </main>
</template>
