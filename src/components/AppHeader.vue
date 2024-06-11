<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import ThemeCheckbox from './ThemeCheckbox.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async (): Promise<void> => {
  await authStore.logoutUser()
  router.push('/signin')
}
</script>

<template>
  <nav class="navbar">
    <theme-checkbox />
    <div class="navbar__content">
      <template v-if="!authStore.user">
        <div class="navbar__title-wrapper">
          <h1 class="navbar__title">Welcom to Vue Paint!</h1>
        </div>
        <div class="navbar__subtitle-wrapper">
          <p class="navbar__subtitle">Where ideas shine bright!</p>
        </div>
      </template>
      <template v-else>
        <div class="navbar__home">
          <router-link to="/" class="navbar__button navbar__button-home"
            >HomePage</router-link
          >
        </div>
        <div class="navbar__wapper">
          <p class="navbar__text">
            Logged in as:
            <span class="navbar__email">{{ authStore.user.email }}</span>
          </p>
          <button @click="handleLogout" class="navbar__button">Log Out</button>
        </div>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  max-width: 762px;
  background-color: var(--color-container-background);
  width: 100%;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
  box-sizing: border-box;
  padding: 10px 50px 15px;
}
.navbar__content {
  max-width: 762px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar__title {
  margin: 0;
  font-size: 24px;
  color: var(--color-text-main);
}
.navbar__subtitle {
  margin: 0;
  color: var(--color-text-main);
  font-weight: 500;
  font-size: 18px;
}
.navbar__wapper {
  display: flex;
  align-items: center;
  gap: 30px;
}
.navbar__text {
  margin: 0;
  color: var(--color-text-main);
}
.navbar__email {
  margin: 0 0 0 5px;
  color: var(--color-text-main);
  font-weight: 600;
}
.navbar__button {
  text-decoration: none;
  padding: 0;
  width: 100px;
  height: 30px;
  border: none;
  outline: 1px solid var(--color-input-outline);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-button-text);
  background-color: var(--color-button-background);
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.2s;
}

.navbar__button:not(:disabled):hover {
  opacity: 0.8;
  transform: scale(101%);
}
.navbar__button:not(:disabled):active {
  transform: scale(98%);
}

@media screen and (max-width: 700px) {
  .navbar__home {
    display: none;
  }
  .navbar__wapper {
    max-width: 600px;
    width: 100%;
  }
  .navbar__text {
    width: 100%;
  }
  .navbar__button {
    width: 80px;
    height: 25px;
    font-size: 12px;
    padding: 0 5px;
  }
  .navbar__title {
    font-size: 16px;
  }
  .navbar__subtitle {
    font-size: 14px;
  }
}

@media screen and (max-width: 565px) {
  .navbar {
    max-width: 300px;
    flex-direction: column;
    gap: 0;
    padding: 15px 20px;
  }
  .navbar__content {
    max-width: 300px;
    display: flex;
    flex-direction: column;
  }
  .navbar__title-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  .navbar__subtitle-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .navbar__wapper {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .navbar__text {
    font-size: 14px;
  }
  .navbar__email {
    margin: 0;
  }
}
</style>
