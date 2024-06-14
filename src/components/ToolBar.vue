<template>
  <div class="toolbar">
    <div class="toolbar__buttons">
      <button @click="changeToolToBrush" class="toolbar__button brush"></button>
      <button
        @click="changeToolToRectangle"
        class="toolbar__button rectangle"
      ></button>
      <button
        @click="changeToolToCircle"
        class="toolbar__button circle"
      ></button>
      <button @click="changeToolToLine" class="toolbar__button line"></button>
      <button class="toolbar__button star"></button>
      <button class="toolbar__button polygon"></button>
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
      <button @click="clearCanvas" class="toolbar__button clear"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref<string>('#000000')
const line = ref<number>(5)

const emit = defineEmits({
  resetCanvas: null,
  changeColor: null,
  changeLineWidth: null,
  changeToolToBrush: null,
  changeToolToRectangle: null,
  changeToolToLine: null,
  changeToolToCircle: null
})

function clearCanvas() {
  emit('resetCanvas')
}

function changeColor() {
  emit('changeColor', color.value)
}

function changeLineWidth() {
  emit('changeLineWidth', line.value)
}

function changeToolToBrush() {
  emit('changeToolToBrush', 'brush')
}
function changeToolToRectangle() {
  emit('changeToolToRectangle', 'rectangle')
}
function changeToolToLine() {
  emit('changeToolToLine', 'line')
}
function changeToolToCircle() {
  emit('changeToolToCircle', 'circle')
}
</script>

<style scoped>
.toolbar {
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  background-color: #323e4e;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.toolbar__buttons {
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
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
}
.toolbar__button:hover {
  outline: 1px solid var(--color-button-background);
}
.brush {
  background-image: url('/paint-brush-artist-svgrepo-com.svg');
}
.rectangle {
  background-image: url('/rectangle-frame-svgrepo-com.svg');
}
.circle {
  background-image: url('/circle-outline-svgrepo-com.svg');
}
.line {
  background-image: url('/line-svgrepo-com.svg');
}
.star {
  background-image: url('/star-svgrepo-com.svg');
}
.polygon {
  background-image: url('/perspective-svgrepo-com.svg');
}
.clear {
  background-image: url('/clear-svgrepo-com.svg');
  margin-left: auto;
}
.toolbar__button-input {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-button-text);
  font-size: 14px;
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
@media screen and (max-width: 565px) {
  .toolbar {
    height: fit-content;
    padding: 10px;
    width: 100%;
  }
  .toolbar__buttons {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .toolbar__button {
    width: 15px;
    height: 15px;
  }
  .toolbar__button-input {
    font-size: 12px;
  }
  .color__input {
    height: 20px;
    width: 35px;
  }
}
</style>
