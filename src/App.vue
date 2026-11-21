<script setup>
import { ref, reactive, computed, watch } from 'vue'

import iconHeart from './icons/heart.svg'
import iconLeaf from './icons/leaf.svg'
import iconClock from './icons/clock.svg'
import iconList from './icons/list.svg'
import iconSearch from './icons/search.svg'
import iconClose from './icons/close.svg'
import iconSun from './icons/sun.svg'
import iconMoon from './icons/moon.svg'

import {
  initialCookingTime,
  initialRecipeOfDay,
  initialIngredients
} from './data/recipes.js'

const THEME_STORAGE_KEY = 'smachno-theme'
const PORTIONS_STORAGE_KEY = 'smachno-portions'

const isDark = ref(localStorage.getItem(THEME_STORAGE_KEY) === 'dark')
const searchQuery = ref('')

const savedPortions = Number(localStorage.getItem(PORTIONS_STORAGE_KEY))
const portions = ref(savedPortions >= 1 ? savedPortions : 4)
const cookingTime = ref(initialCookingTime)

const recipeOfDay = ref({ ...initialRecipeOfDay })
const ingredients = reactive([...initialIngredients])

const ingredientsCountLabel = computed(() => {
  return `Інгредієнтів: ${ingredients.length}`
})

const calculatedIngredients = computed(() => {
  return ingredients.map((ingredient) => {
    return {
      ...ingredient,
      totalAmount: ingredient.amountPerPortion * portions.value
    }
  })
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const clearSearch = () => {
  searchQuery.value = ''
}

const decreasePortions = () => {
  if (portions.value > 1) {
    portions.value--
  }
}

const increasePortions = () => {
  portions.value++
}

watch(
  isDark,
  (darkValue) => {
    if (darkValue) {
      document.documentElement.classList.add('dark')
      localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem(THEME_STORAGE_KEY, 'light')
    }
  },
  { immediate: true }
)

watch(searchQuery, (newQuery) => {
  console.log('Пошуковий запит:', newQuery)
})

watch(portions, (newVal) => {
  localStorage.setItem(PORTIONS_STORAGE_KEY, String(newVal))
})

</script>

<template>
    <header class="app-header">
     <div class="header-top-row">
        <div class="header-titles">
      <h1 class="app-title" >Смачно</h1>
      <p class="app-subtitle">Інтерактивна кулінарна книга</p>
       </div>
        <button
          @click="toggleTheme"
          type="button"
          class="theme-toggle-btn"
          :aria-label="isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
        >
          <img :src="isDark ? iconSun : iconMoon" alt="Іконка теми" class="theme-icon" />
          <span>{{ isDark ? 'Світла' : 'Темна' }}</span>
        </button>
      </div>
    </header>

        <main class="recipe-section">
        <div class="search-wrapper">
        <img :src="iconSearch" alt="Пошук" class="search-icon-left" />

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Пошук рецепта за назвою"
          class="search-input"
        />

        <button
          v-if="searchQuery"
          @click="clearSearch"
          type="button"
          class="search-clear-btn"
          aria-label="Очистити пошук"
        >
          <img :src="iconClose" alt="Очистити" class="search-icon-close" />
        </button>
      </div>
      <h2 class="section-title">Рецепт дня</h2>

      <div class="recipe-of-day-wrapper"></div>
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

             <span
              class="category-badge-pill"
              :class="{ 'type-veg': recipeOfDay.isVegetarian }"
            >
              <img :src="iconLeaf" alt="Листочок" class="icon-leaf" />
              Вегетаріанська
            </span>
          </div>

          <h3 class="card-recipe-title">{{ recipeOfDay.title }}</h3>

          <div class="card-meta-info-row">
            <span class="meta-item">
              <img :src="iconClock" alt="Годинник" class="icon-clock" />
               {{ cookingTime }} хв
            </span>

             <span class="meta-item">
              <img :src="iconList" alt="Список" class="icon-list" />
              {{ ingredients.length  }} інгредієнтів
            </span>

          </div>
        </div>
      </div>

 <div class="portions-counter">
          <button
            class="portions-btn"
            @click="decreasePortions"
            :disabled="portions <= 1"
            aria-label="Зменшити кількість порцій"
          >
            −
          </button>

          <div class="portions-info">
            <span class="portions-value">{{ portions }}</span>
            <span class="portions-label">порції</span>
          </div>

          <button
            class="portions-btn"
            @click="increasePortions"
            aria-label="Збільшити кількість порцій"
          >
            +
          </button>
        </div>
          <div class="ingredients-preview">
          <div class="ingredients-header">
            <h3 class="ingredients-title">Інгредієнти (на {{ portions }} порц.)</h3>
            <span class="ingredients-count-badge">{{ ingredientsCountLabel }}</span>
          </div>

          <ul class="ingredients-list">
            <li
              v-for="item in calculatedIngredients"
              :key="item.id"
              class="ingredient-item"
            >
              <div class="ingredient-name-wrapper">
                <span class="ingredient-dot"></span>
                <span class="ingredient-name">{{ item.name }}</span>
              </div>
              <span class="ingredient-amount">{{ item.totalAmount }} {{ item.unit }}</span>
            </li>
          </ul>
        </div>

     </main>

</template>

<style scoped>
.app-header {
  margin-bottom: 40px;
}

.header-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.header-titles {
  text-align: left;
}

.app-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.app-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-primary);
  text-align: center;
}

.recipe-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
}

.recipe-of-day-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items:center;
}

</style>
