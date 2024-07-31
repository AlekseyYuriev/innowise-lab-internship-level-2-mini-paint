<template>
  <page-loader v-if="!authStore.authIsReady" />
  <div v-else class="page">
    <AppHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/AuthStore'
import AppHeader from './components/AppHeader.vue';

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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media screen and (max-width: 480px) {
  .page {
    min-width: 300px;
  }
}
</style>
