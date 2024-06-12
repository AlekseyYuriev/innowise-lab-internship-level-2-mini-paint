<template>
  <page-loader v-if="!authStore.authIsReady" />
  <div v-else class="page">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/AuthStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>

<style scoped>
.page {
  box-sizing: border-box;
  min-width: 320px;
  margin: 0 auto;
  padding: 20px;
}
</style>
