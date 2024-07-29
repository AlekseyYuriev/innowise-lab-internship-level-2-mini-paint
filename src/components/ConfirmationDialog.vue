<template>
  <div @click="closeDialog" class="dialog">
    <div @click.stop class="dialog__content">
      <h3 class="dialog__title">Do You want to save the image?</h3>
      <div class="dialog__buttons">
        <button
          @click="closeDialog"
          type="button"
          class="dialog__button dialog__button-cancel"
          :disabled="props.isLoading"
        >
          No
        </button>
        <button
          @click="saveImage"
          type="button"
          class="dialog__button dialog__button-confirm"
          :disabled="props.isLoading"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isLoading: { type: Boolean, required: true }
})

const emit = defineEmits({
  hideDialog: null,
  saveImage: null
})

const closeDialog = () => {
  emit('hideDialog', false)
}

function hideDialogOnButton(evt: KeyboardEvent) {
  if (evt.key === 'Escape') {
    closeDialog()
  } else if (evt.key === 'Enter') {
    saveImage()
  }
}

const saveImage = () => {
  emit('saveImage')
}

onMounted(() => {
  document.addEventListener('keyup', hideDialogOnButton)
})

onUnmounted(() => {
  document.removeEventListener('keyup', hideDialogOnButton)
})
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: var(--color-add-dialog-background);
  backdrop-filter: blur(5px);
  position: fixed;
  display: flex;
}

.dialog__content {
  box-sizing: border-box;
  margin: auto;
  background: var(--color-container-background);
  border-radius: 12px;
  min-height: 150px;
  width: 300px;
  padding: 15px;
  outline: 1px solid var(--color-input-outline);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dialog__title {
  margin: 0;
  color: var(--color-text-main);
  font-size: 20px;
  text-align: center;
}
.dialog__buttons {
  display: flex;
  justify-content: space-around;
}
.dialog__button {
  margin: 0;
  padding: 0;
  max-width: 100px;
  width: 100%;
  height: 50px;
  border: none;
  outline: 1px solid var(--color-input-outline);
  border-radius: 20px;
  color: var(--color-text-main);
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.2s;
}
.dialog__button-cancel {
  background-color: #ff4e50;
}
.dialog__button-confirm {
  background-color: #44e48d;
}
.dialog__button:not(:disabled):hover {
  opacity: 0.8;
  transform: scale(101%);
}
.dialog__button:not(:disabled):active {
  transform: scale(98%);
}
.dialog__button:disabled {
  cursor: not-allowed;
  background-color: #aaaaaa;
}
</style>
