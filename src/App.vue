<script setup>
import { ref } from 'vue'

import iconHeart from './assets/heart.svg'
import iconLeaf from './assets/leaf.svg'
import iconClock from './assets/clock.svg'
import imgSyrnyky from './assets/syrnyky.jpg'

const recipeOfDay = ref({
  title: 'Сирники з ягідним соусом',
  category: 'Сніданок',
  cookingTime: '35 хв',
   image: imgSyrnyky
})</script>

<template>
  <div id="app" class="container">
    <header class="app-header">
      <h1>Смачно</h1>
      <p class="app-subtitle">Інтерактивна кулінарна книга</p>
    </header>

    <main class="recipe-section">
        <main class="recipe-section">
      <h2 class="section-title">Рецепт дня</h2>

      <div class="recipe-card-vertical">
        <div class="card-media-wrapper">
          <img :src="recipeOfDay.image" :alt="recipeOfDay.title" class="recipe-main-img" />

          <button class="card-favorite-action" aria-label="Додати в улюблене">
            <img :src="iconHeart" alt="Сердечко" class="icon-heart" />
          </button>
        </div>

        <div class="card-body-details">
          <div class="badge-row">
            <span class="category-badge-pill type-breakfast">{{ recipeOfDay.category }}</span>

            <span class="category-badge-pill type-veg">
              <img :src="iconLeaf" alt="Листочок" class="icon-leaf" />
              Вегетаріанська
            </span>
          </div>

          <h3 class="card-recipe-title">{{ recipeOfDay.title }}</h3>

          <div class="card-meta-info-row">
            <span class="meta-item">
              <img :src="iconClock" alt="Годинник" class="icon-clock" />
              {{ recipeOfDay.cookingTime }}
            </span>
          </div>
        </div>
      </div>
    </main>
    </main>
  </div>
</template>

<style scoped></style>
