<template>
  <main class="main__containter">
    <div class="main__wrapper">
      <tool-bar
        @change-tool-to-brush="changeToolToBrush"
        @change-tool-to-rectangle="changeToolToRectangle"
        @change-tool-to-circle="changeToolToCircle"
        @change-tool-to-line="changeToolToLine"
        @change-tool-to-star="changeToolToStar"
        @change-tool-to-polygon="changeToolToPolygon"
        @change-tool-to-eraser="changeToolToEraser"
        @undo-last="undoLast"
        @redo-last="redoLast"
        @reset-canvas="clearCanvas"
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToolBar from '@/components/ToolBar.vue'
import usePaint from '@/composables/usePaint'

const color = ref<string>('#000000')
const lineWidth = ref<number>(5)
const tool = ref<string>('brush')
const fillFigure = ref<boolean>(false)
const numberOfSides = ref<number>(6)

const {
  canvas,
  draw,
  stopDrawing,
  startDrawing,
  clearCanvas,
  undoLast,
  redoLast
} = usePaint(color, lineWidth, tool, fillFigure, numberOfSides)

function changeToolToBrush(newTool: string) {
  tool.value = newTool
}

function changeToolToRectangle(newTool: string) {
  tool.value = newTool
}

function changeToolToCircle(newTool: string) {
  tool.value = newTool
}

function changeToolToLine(newTool: string) {
  tool.value = newTool
}

function changeToolToStar(newTool: string) {
  tool.value = newTool
}

function changeToolToPolygon(newTool: string) {
  tool.value = newTool
}

function changeToolToEraser(newTool: string) {
  tool.value = newTool
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

// function clearCanvas() {
//   if (canvas.value && ctx.value) {
//     ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
//   }
// }
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
