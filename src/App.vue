<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useUserStore } from '@/stores/user'
import AppHeader from './components/AppHeader.vue'

const userStore = useUserStore()

const isLoading = ref<boolean>(true)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.userId = user.uid
    } else {
      userStore.userId = ''
    }
    isLoading.value = false
  })
})
</script>

<template>
  <page-loader v-if="isLoading" />
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
