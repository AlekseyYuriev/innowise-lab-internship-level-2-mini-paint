<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import { useAuthStore } from './stores/AuthStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>

<template>
  <page-loader v-if="!authStore.authIsReady" />
  <div v-else class="page">
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.page {
  min-width: 320px;
  margin: 0 auto;
  padding: 20px;
}
</style>
