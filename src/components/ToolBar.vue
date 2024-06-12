<template>
  <div class="toolbar">
    <div class="toolbar__buttons">
      <button class="toolbar__button brush"></button>
      <button class="toolbar__button rectangle"></button>
      <button class="toolbar__button circle"></button>
      <button class="toolbar__button line"></button>
      <button class="toolbar__button star"></button>
      <button class="toolbar__button polygon"></button>
      <div class="color">
        <label for="color" class="color__lable">Color:</label>
        <input type="color" class="color__input" id="color" value="#a6afb7" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.toolbar {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  background-color: #323e4e;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.toolbar__buttons {
  display: flex;
  gap: 15px;
  align-items: center;
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
  background-image: url('../../public/paint-brush-artist-svgrepo-com.svg');
}
.rectangle {
  background-image: url('../../public/rectangle-frame-svgrepo-com.svg');
}
.circle {
  background-image: url('../../public/circle-outline-svgrepo-com.svg');
}
.line {
  background-image: url('../../public/line-svgrepo-com.svg');
}
.star {
  background-image: url('../../public/star-svgrepo-com.svg');
}
.polygon {
  background-image: url('../../public/perspective-svgrepo-com.svg');
}
.color {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 10px;
}
.color__input {
  height: 25px;
  width: 40px;
  border: none;
  padding: 0;
}
.color__lable {
  color: var(--color-button-text);
  font-size: 14px;
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
  .color__input {
    height: 20px;
    width: 35px;
  }
  .color__lable {
    font-size: 12px;
  }
}
</style>
