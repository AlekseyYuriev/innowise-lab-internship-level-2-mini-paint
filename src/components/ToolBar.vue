<template>
  <div class="toolbar">
    <div class="toolbar__buttons">
      <div class="toolbar__buttons-wrapper">
        <button
          v-for="item in toolItems"
          :key="item"
          class="toolbar__button"
          :class="currentTool === item ? `active ${item}` : item"
          @:click="changeTool(item)"
        />
      </div>

      <div class="toolbar__buttons-wrapper">
        <button @click="undoLast" class="toolbar__button undo"></button>
        <button @click="redoLast" class="toolbar__button redo"></button>
        <button @click="clearCanvas" class="toolbar__button clear"></button>
        <button @click="saveImage" class="toolbar__button save"></button>
      </div>
    </div>
    <div class="toolbar__options">
      <div class="toolbar__buttons-wrapper">
        <div class="toolbar__button-input">
          <label for="color">Color:</label>
          <input
            type="color"
            class="color__input"
            id="color"
            value="#000000"
            v-model="color"
            @input="changeColor"
          />
        </div>
        <div class="toolbar__button-input range">
          <label for="range">Line width: {{ line }} </label>
          <input
            type="range"
            class="range__input"
            id="range"
            min="1"
            max="40"
            value="5"
            v-model="line"
            @change="changeLineWidth"
          />
        </div>
      </div>
      <div class="toolbar__buttons-wrapper">
        <AppCheckbox
          :title="'Fill Figure'"
          :id="'fill'"
          v-model="fill"
          :theme="false"
        />
        <div class="toolbar__side">
          <label for="sides">Number of sides:</label>
          <select
            @change="changeNumberOfSides"
            v-model="sides"
            class="toolbar__select"
            name="sides"
            id="sides"
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5" default>5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppCheckbox from './AppCheckbox.vue'

const fill = ref<boolean>(false)

const color = ref<string>('#000000')
const line = ref<number>(5)
const sides = ref<number>(5)
const currentTool = ref<string>('brush')

const toolItems: string[] = [
  'brush',
  'rectangle',
  'circle',
  'line',
  'star',
  'polygon',
  'eraser'
]

const emit = defineEmits({
  changeCurrentTool: null,
  undoLast: null,
  redoLast: null,
  resetCanvas: null,
  saveImage: null,
  changeColor: null,
  changeLineWidth: null,
  changeFillFigureStyle: null,
  changeNumberOfSides: null
})

function changeTool(tool: string) {
  currentTool.value = tool
  emit('changeCurrentTool', tool)
}

function undoLast() {
  emit('undoLast')
}

function redoLast() {
  emit('redoLast')
}

function clearCanvas() {
  emit('resetCanvas')
}

function changeColor() {
  emit('changeColor', color.value)
}

function changeLineWidth() {
  emit('changeLineWidth', line.value)
}

function changeFillFigureStyle(fill: boolean) {
  emit('changeFillFigureStyle', fill)
}

function changeNumberOfSides() {
  emit('changeNumberOfSides', sides.value)
}

function saveImage() {
  emit('saveImage', true)
}

watch(fill, (newValue) => {
  changeFillFigureStyle(newValue)
})
</script>

<style scoped>
.toolbar {
  box-sizing: border-box;
  padding: 10px 20px;
  height: fit-content;
  width: 100%;
  background-color: #323e4e;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}
.toolbar__buttons {
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}
.toolbar__buttons-wrapper {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}
.toolbar__options {
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
}
.toolbar__button {
  padding: 0;
  width: 25px;
  height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  background-size: cover;
  background-color: transparent;
  background-position: center;
  transition: outline 0.3s;
  transition:
    outline 0.3s,
    transform 0.2s;
}
.toolbar__button:hover {
  outline: 1px solid var(--color-button-background);
  transform: scale(110%);
}
.toolbar__button:active {
  transform: scale(98%);
}
.brush {
  background-image: url('../assets/icons/paint-brush-artist-svgrepo-com.svg');
}
.rectangle {
  background-image: url('../assets/icons/rectangle-frame-svgrepo-com.svg');
}
.circle {
  background-image: url('../assets/icons/circle-outline-svgrepo-com.svg');
}
.line {
  background-image: url('../assets/icons/line-svgrepo-com.svg');
}
.star {
  background-image: url('../assets/icons/star-svgrepo-com.svg');
}
.polygon {
  background-image: url('../assets/icons/perspective-svgrepo-com.svg');
}
.clear {
  background-image: url('../assets/icons/clear-svgrepo-com.svg');
}
.eraser {
  background-image: url('../assets/icons/eraser-svgrepo-com.svg');
}
.undo {
  background-image: url('../assets/icons/undo-svgrepo-com.svg');
  margin-left: auto;
}
.redo {
  background-image: url('../assets/icons/redo-svgrepo-com.svg');
}
.save {
  background-image: url('../assets/icons/save-icon-svgrepo-com.svg');
}
.active {
  outline: 1px solid var(--color-button-background);
  transform: scale(125%);
}
.toolbar__button-input {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-button-text);
  font-size: 13px;
  user-select: none;
}
.color__input {
  height: 25px;
  width: 40px;
  border: none;
  padding: 0;
}
.range {
  display: flex;
  flex-direction: column;
}
.range__input {
  width: 100px;
}
.toolbar__side {
  min-width: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-button-text);
  font-size: 13px;
  user-select: none;
}
.toolbar__select {
  width: 50px;
}
@media screen and (max-width: 600px) {
  .toolbar {
    height: fit-content;
    width: 100%;
    gap: 10px;
  }
  .toolbar__buttons {
    gap: 15px;
    flex-wrap: wrap;
  }
  .toolbar__buttons-wrapper {
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  }
  .toolbar__options {
    flex-wrap: wrap;
    gap: 10px;
  }
  .toolbar__button {
    width: 17px;
    height: 17px;
  }
  .toolbar__button-input {
    font-size: 12px;
  }
  .color__input {
    height: 20px;
    width: 35px;
  }
}
@media screen and (max-width: 500px) {
  .toolbar__buttons {
    flex-direction: column;
    justify-content: center;
  }
  .toolbar__options {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
