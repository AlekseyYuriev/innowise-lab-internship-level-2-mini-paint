import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { login, logout, register } from '@/services/auth'
import { isThemeDark } from '@/utils/theme'

export interface User {
  email: string | null
  uid: string
}

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)
  const authIsReady = ref<boolean>(false)
  const themeDark = ref<boolean>(isThemeDark())

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

  const changeTheme = (isThemeDark: boolean) => {
    if (isThemeDark) {
      themeDark.value = isThemeDark
      localStorage.setItem('theme', 'dark')
      document.body.classList.add('dark')
    } else {
      themeDark.value = isThemeDark
      localStorage.setItem('theme', 'light')
      document.body.classList.remove('dark')
    }
  }

  return {
    init,
    registerUser,
    loginUser,
    logoutUser,
    user,
    authIsReady,
    themeDark,
    changeTheme
  }
})
