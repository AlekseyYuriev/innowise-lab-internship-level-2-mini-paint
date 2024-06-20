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
        <div class="navbar__wrapper">
          <div class="navbar__home">
            <router-link
              :to="handleHeaderRoute || '/register'"
              class="navbar__button navbar__button-home"
              >{{ handleButtonText }}
            </router-link>
          </div>
          <div class="navbar__auth-wrapper">
            <p class="navbar__text">
              Logged in as:
              <span class="navbar__email">{{ authStore.user.email }}</span>
            </p>
            <button @click="handleLogout" class="navbar__button">
              Log Out
            </button>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import ThemeCheckbox from './ThemeCheckbox.vue'
import { computed } from 'vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const handleLogout = async (): Promise<void> => {
  await authStore.logoutUser()
  router.push('/signin')
}

const handleHeaderRoute = computed<string>(() => {
  return route.fullPath === '/' ? '/paint' : '/'
})

const handleButtonText = computed<string>(() => {
  return route.fullPath === '/' ? '+Create new picture' : "←Back to Gallery"
})
</script>

<style scoped>
.navbar {
  max-width: 762px;
  height: 105px;
  background-color: var(--color-container-background);
  width: 100%;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
  box-sizing: border-box;
  padding: 10px 30px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
.navbar__wrapper {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.navbar__auth-wrapper {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 5px;
}
.navbar__text {
  margin: 0 0 0 15px;
  color: var(--color-text-main);
}
.navbar__email {
  margin: 0;
  color: var(--color-text-main);
  font-weight: 600;
}
.navbar__button {
  text-decoration: none;
  padding: 0 10px;
  max-width: fit-content;
  width: 100%;
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
  .navbar__title {
    font-size: 18px;
  }
  .navbar__subtitle {
    font-size: 16px;
  }
  .navbar__text {
    width: 100%;
    font-size: 12px;
    margin: 0;
  }
  .navbar__button {
    height: 25px;
    font-size: 12px;
  }
  .navbar__email {
    font-size: 12px;
    margin: 0;
  }
}

@media screen and (max-width: 565px) {
  .navbar {
    flex-direction: column;
    gap: 0;
    padding: 15px 20px;
  }
  .navbar__content {
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
  .navbar__title {
    font-size: 16px;
  }
  .navbar__subtitle {
    font-size: 14px;
  }
  .navbar__wapper {
    width: 100%;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 5px;
  }
  .navbar__text {
    font-size: 12px;
    margin: 0;
    display: none;
  }
  .navbar__email {
    font-size: 12px;
    margin: 0;
    display: none;
  }
}
</style>
