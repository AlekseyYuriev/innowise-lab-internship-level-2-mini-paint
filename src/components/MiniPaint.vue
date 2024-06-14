<template>
  <main class="main__containter">
    <div class="main__wrapper">
      <tool-bar
        @reset-canvas="clearCanvas"
        @change-color="changeColor"
        @change-line-width="changeLineWidth"
        @change-tool-to-brush="changeToolToBrush"
        @change-tool-to-rectangle="changeToolToRectangle"
        @change-tool-to-line="changeToolToLine"
      />
      <div class="main__canvas">
        <canvas
          class="main__canvas-item"
          ref="canvas"
          width="720"
          height="480"
          @mousedown.prevent="startDrawing"
          @mouseup.stop.prevent="stopDrawing"
          @mousemove.prevent="draw"
        ></canvas>
      </div>
      <button @click="check">Check</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import ToolBar from '@/components/ToolBar.vue'
import { ref, watch } from 'vue'
import usePaint from '@/composables/usePaint'

const color = ref<string>('#000000')
const lineWidth = ref<number>(5)
const tool = ref<string>('brush')

const { canvas, ctx, draw, stopDrawing, startDrawing } = usePaint(
  color,
  lineWidth,
  tool
)

function clearCanvas() {
  if (canvas.value && ctx.value) {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }
}

function changeColor(newColor: string) {
  color.value = newColor
}

function changeLineWidth(newLineWidth: number) {
  lineWidth.value = newLineWidth
}

function changeToolToBrush(toolBrush: string) {
  tool.value = toolBrush
}
function changeToolToRectangle(toolBrush: string) {
  tool.value = toolBrush
}
function changeToolToLine(toolBrush: string) {
  tool.value = toolBrush
}
function check() {}

watch(color, (newColor) => {
  if (newColor) {
    color.value = newColor
  }
})

watch(lineWidth, (newLineWidth) => {
  if (newLineWidth) {
    lineWidth.value = newLineWidth
  }
})

watch(tool, (newTool) => {
  if (newTool) {
    tool.value = newTool
  }
})
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
    padding: 10px;
  }
  .main__canvas-item {
    height: calc(100dvw - 70px);
    width: calc(100dvw - 70px);
  }
}
</style>
