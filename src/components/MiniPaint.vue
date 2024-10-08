<template>
  <main class="main__containter">
    <div class="main__wrapper">
      <tool-bar
        @change-current-tool="changeCurrentTool"
        @undo-last="undoLast"
        @redo-last="redoLast"
        @reset-canvas="clearCanvas"
        @save-image="handleConfirmationDialog"
        @change-color="changeColor"
        @change-line-width="changeLineWidth"
        @change-fill-figure-style="changeFillFigureStyle"
        @change-number-of-sides="changeNumberOfSides"
      />
      <div class="main__canvas">
        <canvas
          class="main__canvas-item"
          ref="canvas"
          width="720"
          height="480"
          @mousedown.stop.prevent="startDrawing"
          @mouseup.stop.prevent="stopDrawing"
          @mousemove.prevent="draw"
        ></canvas>
      </div>
    </div>
  </main>
  <confirmation-dialog
    v-if="confirm"
    @hide-dialog="handleConfirmationDialog"
    @save-image="saveImage"
    :isLoading="isLoading"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import usePaint from '@/composables/usePaint'
import { savePicture } from '@/services/pictures'
import ToolBar from '@/components/ToolBar.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

const authStore = useAuthStore()
const router = useRouter()

const color = ref<string>('#000000')
const lineWidth = ref<number>(5)
const tool = ref<string>('brush')
const fillFigure = ref<boolean>(false)
const numberOfSides = ref<number>(6)
const confirm = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const {
  canvas,
  draw,
  stopDrawing,
  startDrawing,
  clearCanvas,
  undoLast,
  redoLast
} = usePaint(color, lineWidth, tool, fillFigure, numberOfSides)

function changeCurrentTool(newTool: string) {
  tool.value = newTool
}

function saveImage() {
  if (!canvas.value || !authStore.user || !authStore.user.email) return
  isLoading.value = true
  const dateTimestamp = new Date().getTime()
  const imageData = canvas.value.toDataURL()

  savePicture(authStore.user.email, dateTimestamp, imageData)

  isLoading.value = false
  handleConfirmationDialog(false)
  router.push('/')
}

function changeColor(newColor: string) {
  color.value = newColor
}

function changeLineWidth(newLineWidth: number) {
  lineWidth.value = newLineWidth
}

function changeFillFigureStyle(fill: boolean) {
  fillFigure.value = fill
}

function changeNumberOfSides(sides: number) {
  numberOfSides.value = sides
}

function handleConfirmationDialog(status: boolean) {
  confirm.value = status
}
</script>

<style scoped>
.main__containter {
  max-width: 762px;
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
  height: calc((100dvw - 80px) * 2 / 3);
  width: calc(100dvw - 80px);
  border-radius: 16px;
  cursor: crosshair;
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
  }
}
</style>
