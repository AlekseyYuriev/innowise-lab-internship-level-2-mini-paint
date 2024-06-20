import { auth } from '@/firebase/config'
import { login, logout, register } from '@/services/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  email: string | null
  uid: string
}

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)
  const authIsReady = ref<boolean>(false)
  const themeDark = ref<boolean>(true)

  const init = () => {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        user.value = { email: userDetails.email, uid: userDetails.uid }
      } else {
        user.value = null
      }
      authIsReady.value = true
    })
  }

  const registerUser = async (email: string, password: string) => {
    await register(email, password)
  }

  const loginUser = async (email: string, password: string) => {
    await login(email, password)
  }

  const logoutUser = async () => {
    await logout()
  }

  return {
    init,
    registerUser,
    loginUser,
    logoutUser,
    user,
    authIsReady,
    themeDark
  }
})
