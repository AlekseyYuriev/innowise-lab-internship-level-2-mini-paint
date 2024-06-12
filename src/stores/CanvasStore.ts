import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCanvasStore = defineStore('canvasStore', () => {
  const canvas = ref<object | null>(null)
  const points = ref<Object[]>([])

  return { canvas, points }
})
