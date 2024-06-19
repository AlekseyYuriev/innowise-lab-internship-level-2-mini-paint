<template>
  <div class="filter">
    <label htmlfor="checkbox" class="filter__switch">
      Theme
      <input
        @click="changeTheme"
        type="checkbox"
        class="filter__checkbox"
        id="checkbox"
        checked
      />
      <span class="filter__checkbox-button"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
const changeTheme = () => {
  document.body.classList.toggle('light')
}
</script>

<style scoped>
.filter {
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 5px 0;
}

.filter__switch {
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  color: var(--color-text-main);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter__switch:hover {
  opacity: 0.7;
}

.filter__checkbox {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

.filter__checkbox-button {
  display: inline-block;
  position: relative;
  padding-left: 40px;
}

.filter__checkbox-button:hover {
  cursor: pointer;
}

.filter__checkbox-button::before {
  display: block;
  content: '';
  position: absolute;
  left: 0;
  top: 2px;
  width: 34px;
  height: 14px;
  background-color: var(--color-input-background);
  outline: 1px solid var(--color-text-main);
  border-radius: 16px;
  box-sizing: border-box;
  transition: background-color 0.5s;
}

.filter__checkbox-button::after {
  display: block;
  content: '';
  position: absolute;
  left: 3.5px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-text-main);
  transition: left 0.5s;
}

.filter__checkbox:checked + .filter__checkbox-button::before {
  background-color: #3d5a80;
}

.filter__checkbox:checked + .filter__checkbox-button::after {
  left: 21px;
}

@media screen and (max-width: 700px) {
  .filter {
    padding: 0 0 5px 0;
  }
  .filter__switch {
    margin-right: 5px;
  }
  .filter__checkbox-button {
    padding-left: 35px;
  }
  .filter__checkbox-button::before {
    left: 6.5px;
    top: 5px;
    width: 24px;
    height: 10px;
  }
  .filter__checkbox-button::after {
    left: 8.5px;
    top: 6px;
    width: 8px;
    height: 8px;
  }
}
</style>
