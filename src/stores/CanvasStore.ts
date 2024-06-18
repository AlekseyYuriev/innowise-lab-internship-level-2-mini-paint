import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Picture {
  userEmail: string | null
  timestamp: number
  picture: string
}

export const useCanvasStore = defineStore('canvasStore', () => {
  const picture = ref<Picture>({
    userEmail: '',
    timestamp: 0,
    picture: ''
  })

  return { picture }
})
