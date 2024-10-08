import { auth } from '@/firebase/config'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'
import {
  INVALID_CREDENTIALS,
  NO_NETWORK_CONNECTION,
  UNEXPECTED_ERROR
} from '@/constants/errorMessage'

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      throw new Error(`User with email: ${email} already exists`)
    } else if (err.code === 'auth/network-request-failed') {
      throw new Error(NO_NETWORK_CONNECTION)
    } else {
      throw new Error(UNEXPECTED_ERROR)
    }
  }
}

export const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    if (err.code === 'auth/invalid-credential') {
      throw new Error(INVALID_CREDENTIALS)
    } else if (err.code === 'auth/network-request-failed') {
      throw new Error(NO_NETWORK_CONNECTION)
    } else {
      throw new Error(UNEXPECTED_ERROR)
    }
  }
}

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(`${error.code}`)
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener()
      resolve(user)
    })
  })
}
