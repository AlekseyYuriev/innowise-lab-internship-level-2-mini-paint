<template>
  <div class="notfound">
    <h1 class="notfound__title">404</h1>
    <p class="notfound__text">This is not the web page you are looking for</p>
    <router-link to="/" class="notfound__link"
      >Back to HomePage &#8594;</router-link
    >
  </div>
</template>

<style scoped>
.notfound {
  box-sizing: border-box;
  min-width: 280px;
  margin: 0 auto;
  background-color: var(--color-body-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.notfound__title {
  color: #000;
  font-size: 140px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 20px 0;
}

.notfound__text {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 20px 0;
}

.notfound__link {
  text-decoration: none;
  color: var(--color-button-background);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 20px 0;
  transition: all 0.3s;
  cursor: pointer;
}

.notfound__link:hover {
  opacity: 0.6;
}

@media screen and (max-width: 500px) {
  .notfound {
    max-width: 280px;
  }

  .notfound__title {
    font-size: 80px;
  }

  .notfound__text {
    font-size: 12px;
  }

  .notfound__link {
    font-size: 12px;
  }
}
</style>
