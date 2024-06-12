<template>
  <main class="main__containter">
    <div class="main__wrapper">
      <tool-bar />
      <div class="main__canvas">
        <canvas
          class="main__canvas-item"
          ref="canvas"
          width="720"
          height="480"
        ></canvas>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ToolBar from '@/components/ToolBar.vue'
import { onMounted, ref } from 'vue'
// import { useCanvasStore } from '@/stores/CanvasStore'

// const canvasStore = useCanvasStore()

const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const isDrawing = ref<Boolean>(false)
// const startX = ref<number>(0)
// const startY = ref<number>(0)
// const points = ref<Object[]>([])

onMounted(() => {
  if (canvas.value) {
    context.value = canvas.value.getContext('2d')
    canvas.value.addEventListener('mouseup', mouseup)
    canvas.value.addEventListener('mousedown', mousedown)
    canvas.value.addEventListener('mousemove', mousemove)
  }
})

function mouseup(e) {
  isDrawing.value = false
}

function mousedown(e) {
  if (!canvas.value) {
    return
  }
  isDrawing.value = true

  const rect = canvas.value.getBoundingClientRect()
  const scaleX = canvas.value.width / rect.width
  const scaleY = canvas.value.height / rect.height
  context.value?.beginPath()
  context.value?.moveTo(
    (e.clientX - rect.left) * scaleX,
    (e.clientY - rect.top) * scaleY
  )
}

function mousemove(e) {
  if (!canvas.value) {
    return
  }
  if (isDrawing.value) {
    const rect = canvas.value.getBoundingClientRect()
    const scaleX = canvas.value.width / rect.width
    const scaleY = canvas.value.height / rect.height
    draw((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY)
  }
}

function draw(x: number, y: number) {
  if (!context.value) {
    return
  }
  context.value.lineTo(x, y)
  context.value.strokeStyle = 'rgba(0,0,0,1)'
  context.value.stroke()
}
</script>

<style scoped>
.main__containter {
  max-width: 762px;
  min-height: 520px;
  width: 100%;
  background-color: #a6afb7;
  margin: 20px auto 0;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
}
.main__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
}
.main__canvas {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.main__canvas-item {
  background-color: var(--white);
  max-height: 480px;
  max-width: 720px;
  height: calc(100dvw - 75px);
  width: calc(100dvw - 75px);
  border-radius: 16px;
}
@media screen and (max-width: 565px) {
  .main__containter {
    min-height: 340px;
  }
  .main__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .main__canvas-item {
    height: calc(100dvw - 70px);
    width: calc(100dvw - 70px);
  }
}
</style>
