<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="page">
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
