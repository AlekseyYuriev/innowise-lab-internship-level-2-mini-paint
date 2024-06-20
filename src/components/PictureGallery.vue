<template>
  <div class="gallery">
    <h1 class="gallery__title">Picture Gallery</h1>
    <input
      v-model.trim="userEmail"
      type="text"
      name="search"
      class="gallery__input"
      placeholder="Find by user email"
      autocomplete="on"
    />
    <div
      v-if="filteredPictures.length > 0 && !isLoading"
      class="gallery__pictures"
    >
      <div
        v-for="item in filteredPictures"
        :key="item.timestamp"
        class="gallery__item"
      >
        <div class="gallery__item-description">
          <p class="gallery__author">Created by {{ item.userEmail }}</p>
          <p class="gallery__created-date">
            {{
              new Date(item.timestamp)
                .toISOString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-')
            }}
          </p>
        </div>
        <img
          ref="image"
          :src="item.picture"
          class="gallery__image"
          width="720"
          height="480"
          alt="Gallery image"
        />
      </div>
    </div>
    <page-loader v-else-if="isLoading" />
    <div v-else-if="pictures.length === 0" class="gallery__empty">
      No pictures yet. Create new image and save it to the gallery.
    </div>
    <div v-else class="gallery__empty">
      A user with such email haven't saved images to the gallery yet.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { getAllPictures, type UserPicture } from '@/services/pictures'

const pictures = reactive<UserPicture[]>([])
const userEmail = ref<string>('')
const isLoading = ref<boolean>(false)

const filteredPictures = computed(() => {
  const sortedArr = [...pictures].sort((a, b) => {
    return a.timestamp < b.timestamp ? 1 : -1
  })
  if (userEmail.value) {
    const filteredAndSortedArr = sortedArr.filter((item) =>
      item.userEmail?.includes(userEmail.value)
    )
    return filteredAndSortedArr
  }
  return sortedArr
})

onMounted(async () => {
  isLoading.value = true
  const galleryPictures = await getAllPictures()
  pictures.splice(0, pictures.length, ...(galleryPictures as []))
  isLoading.value = false
})
</script>

<style scoped>
.gallery {
  box-sizing: border-box;
  max-width: 762px;
  min-height: 600px;
  background-color: var(--color-container-background);
  margin: 30px auto 0;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
}
.gallery__title {
  margin: 0;
  padding-bottom: 15px;
  text-align: center;
  color: var(--color-text-main);
}
.gallery__empty {
  color: var(--color-text-main);
  font-size: 18px;
  padding: 20px 20px 0;
  text-align: center;
}
.gallery__input {
  height: 30px;
  width: 50%;
  margin: 0 0 15px;
  padding: 0 15px 0 15px;
  border: none;
  font-weight: 600;
  outline: 1px solid var(--color-input-outline);
  border-radius: 20px;
  color: var(--color-text-main);
  background-color: var(--color-input-background);
}
.gallery__pictures {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.gallery__item {
  border-bottom: 1px solid var(--color-text-main);
  padding-bottom: 15px;
  max-width: 720px;
  width: 100%;
}
.gallery__item-description {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
  color: var(--color-text-main);
  font-style: italic;
}
.gallery__author {
  margin: 0;
}
.gallery__created-date {
  margin: 0;
  text-align: end;
}
.gallery__image {
  display: block;
  width: 100%;
  height: auto;
  background-color: var(--white);
  outline: 1px solid var(--color-text-main);
  border-radius: 16px;
}
@media screen and (max-width: 480px) {
  .gallery__title {
    font-size: 24px;
  }
  .gallery__item-description {
    font-size: 12px;
  }
  .gallery__input {
    width: 70%;
    font-size: 12px;
  }
  .gallery__author {
    margin: 0;
    max-width: 250px;
    overflow: hidden;
  }
}
</style>
