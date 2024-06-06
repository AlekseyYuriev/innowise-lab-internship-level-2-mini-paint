<script setup lang="ts">
import { login, register } from '@/API/api'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  title: { type: String, required: true },
  buttonText: { type: String, required: true },
  subtitleText: { type: String, required: true },
  linkText: { type: String, required: true }
})

const route = useRoute()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

const handleRoute = computed<string>(() => {
  return route.fullPath === '/signin' ? '/register' : '/signin'
})

const submitForm = async (): Promise<void> => {
  isLoading.value = true

  try {
    if (route.fullPath === '/signin') {
      await login(email.value, password.value)
    } else {
      await register(email.value, password.value)
    }
    router.push('/paint')
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="auth__title">{{ props.title }}</h1>
      <form @submit.prevent="submitForm" class="auth__form" novalidate>
        <div class="auth__lable">
          <label>
            <input
              v-model="email"
              type="email"
              name="email"
              class="auth__input"
              placeholder="Your email address"
              autocomplete="on"
            />
          </label>
          <div class="input__errors">
            <p class="auth__input-error"></p>
          </div>
        </div>
        <div class="auth__lable">
          <label>
            <input
              v-model="password"
              type="password"
              name="password"
              class="auth__input"
              placeholder="Password"
              autocomplete="on"
            />
          </label>
          <div class="input__errors">
            <p class="auth__input-error"></p>
          </div>
        </div>
        <div class="auth__form-error">
          <p v-if="error" class="auth__form-error-text">{{ error }}</p>
        </div>
        <button type="submit" class="auth__button" :disabled="isLoading">
          {{ props.buttonText }}
        </button>
      </form>
      <p class="auth__subtitle">
        {{ props.subtitleText }}
        <router-link :to="handleRoute || '/register'" class="auth__link">{{
          props.linkText
        }}</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth {
  max-width: 762px;
  min-height: 400px;
  width: 100%;
  background-color: var(--color-container-background);
  margin: 30px auto 0;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
}
.auth__container {
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: auto;
}
.auth__title {
  margin: 50px 0 50px;
  color: var(--color-text-main);
}
.auth__form {
  width: 100%;
  min-height: 250px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.auth__lable {
  width: 100%;
}
.auth__input {
  box-sizing: border-box;
  display: flex;
  height: 50px;
  width: 100%;
  margin: 0;
  padding: 0 15px 0 15px;
  border: none;
  font-weight: 600;
  outline: 1px solid var(--color-input-outline);
  border-radius: 20px;
  color: var(--color-text-main);
  background-color: var(--color-input-background);
}
.auth__input::placeholder {
  color: var(--color-text-main);
}
.input__errors {
  height: 35px;
  padding: 5px 0 0 0;
}
.auth__input-error {
  margin: 0;
  color: rgb(237, 69, 69);
  height: 12px;
  padding: 0 15px 0 15px;
  font-size: 12px;
}
.auth__form-error {
  height: 40px;
  margin: 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(237, 69, 69);
  padding: 0 15px 0 15px;
}
.auth__form-error-text {
  margin: 0;
  font-size: 12px;
}
.auth__button {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50px;
  border: none;
  outline: 1px solid var(--color-input-outline);
  border-radius: 20px;
  background-color: var(--color-button-background);
  color: var(--color-button-text);
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.2s;
}
.auth__button:not(:disabled):hover {
  opacity: 0.8;
  transform: scale(101%);
}
.auth__button:not(:disabled):active {
  transform: scale(98%);
}
.auth__button:disabled {
  cursor: not-allowed;
  background-color: #aaaaaa;
}
.auth__subtitle {
  display: flex;
  width: 100%;
  margin: 20px 0 70px;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: var(--color-text-main);
}
.auth__link {
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: #39c6d2;
  text-decoration: underline;
}
@media screen and (max-width: 565px) {
  .auth {
    max-width: 300px;
    margin: 15px auto 0;
    min-height: 320px;
  }
  .auth__container {
    max-width: 280px;
    padding: 0 20px;
  }
  .auth__title {
    margin: 20px 0 30px;
    font-size: 22px;
    padding-left: 15px;
  }
  .auth__form {
    min-height: 210px;
  }
  .auth__input {
    height: 40px;
    font-size: 14px;
  }
  .auth__form-error {
    text-align: center;
    font-size: 12px;
  }
  .auth__button {
    margin: 5px 0 0;
    height: 40px;
    font-size: 14px;
  }
  .auth__subtitle {
    margin: 20px 0 20px;
    font-size: 12px;
  }
  .input__errors {
    height: 30px;
  }
}
</style>
