<template>
  <div :class="id === 'fill' ? 'filter-fill' : 'filter-theme'">
    <label
      htmlfor="checkbox"
      class="filter__switch"
      :class="id === 'fill' ? 'filter__switch-fill' : 'filter__switch-theme'"
    >
      {{ title }}
      <input
        :id="id"
        type="checkbox"
        class="filter__checkbox"
        :value="modelValue"
        @click="update"
        :checked="theme"
      />
      <span
        class="filter__checkbox-button"
        :class="
          id === 'fill'
            ? 'filter__checkbox-button-fill'
            : 'filter__checkbox-button-theme'
        "
      ></span>
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel()

defineProps<{
  title: string
  id: string
  modelValue: boolean
  theme: boolean
}>()

function update() {
  model.value = !model.value
}
</script>

<style scoped>
.filter-fill {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 20px 0;
}

.filter-theme {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 5px 0;
}

.filter__switch-fill {
  display: flex;
  width: 59px;
  flex-direction: column;
  position: relative;
  color: var(--color-button-text);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter__switch-theme {
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

.filter__checkbox-button-fill {
  display: inline-block;
  position: relative;
}

.filter__checkbox-button-theme {
  display: inline-block;
  position: relative;
  padding-left: 40px;
}

.filter__checkbox-button:hover {
  cursor: pointer;
}

.filter__checkbox-button-fill::before {
  display: block;
  content: '';
  position: absolute;
  left: 12px;
  top: 2px;
  width: 34px;
  height: 14px;
  background-color: var(--color-input-background);
  outline: 1px solid var(--color-text-main);
  border-radius: 16px;
  box-sizing: border-box;
  transition: background-color 0.5s;
}

.filter__checkbox-button-fill::after {
  display: block;
  content: '';
  position: absolute;
  left: 15.5px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-text-main);
  transition: left 0.5s;
}

.filter__checkbox-button-theme::before {
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

.filter__checkbox-button-theme::after {
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

.filter__checkbox:checked + .filter__checkbox-button-fill::before {
  background-color: #42b883;
}

.filter__checkbox:checked + .filter__checkbox-button-fill::after {
  left: 33px;
}

.filter__checkbox:checked + .filter__checkbox-button-theme::before {
  background-color: #3d5a80;
}

.filter__checkbox:checked + .filter__checkbox-button-theme::after {
  left: 21px;
}

@media screen and (max-width: 700px) {
  .filter__checkbox-button-theme {
    padding-left: 35px;
  }
  .filter__checkbox-button-theme::before {
    left: 6.5px;
    top: 5px;
    width: 24px;
    height: 10px;
  }
  .filter__checkbox-button-theme::after {
    left: 8.5px;
    top: 6px;
    width: 8px;
    height: 8px;
  }
}
</style>
