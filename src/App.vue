<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

import RecipeCard from './components/RecipeCard.vue'
import RecipeFilters from './components/RecipeFilters.vue'
import CookingTimer from './components/CookingTimer.vue'

import iconChefHat from './icons/chef-hat.svg'
import iconLeaf from './icons/leaf.svg'
import iconClock from './icons/clock.svg'
import iconList from './icons/list.svg'
import iconSearch from './icons/search.svg'
import iconSun from './icons/sun.svg'
import iconMoon from './icons/moon.svg'

import { RECIPE_OF_DAY_ID, initialIngredients, recipesList } from './data/recipes.js'

const THEME_STORAGE_KEY = 'smachno-theme'
const PORTIONS_STORAGE_KEY = 'smachno-portions'
const FAVORITES_STORAGE_KEY = 'smachno-favorites'

const isDark = ref(localStorage.getItem(THEME_STORAGE_KEY) === 'dark')
const searchQuery = ref('')
const selectedCategory = ref('')
const favoriteIds = ref([])
const showTimer = ref(true)

const savedPortions = Number(localStorage.getItem(PORTIONS_STORAGE_KEY))
const portions = ref(savedPortions >= 1 ? savedPortions : 4)

const recipes = reactive([...recipesList])
const recipeOfDay = ref(recipesList.find((recipe) => recipe.id === RECIPE_OF_DAY_ID))
const ingredients = reactive([...initialIngredients])

const themeToggle = computed(() =>
  isDark.value
    ? { icon: iconSun, ariaLabel: 'Увімкнути світлу тему' }
    : { icon: iconMoon, ariaLabel: 'Увімкнути темну тему' }
)

const ingredientsCountLabel = computed(() => `Інгредієнтів: ${ingredients.length}`)

const calculatedIngredients = computed(() =>
  ingredients.map((ingredient) => ({
    ...ingredient,
    totalAmount: ingredient.amountPerPortion * portions.value
  }))
)

const filteredRecipes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return recipes.filter((recipe) => {
    const matchesSearch = !query || recipe.title.toLowerCase().includes(query)
    const matchesCategory = !selectedCategory.value || recipe.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

const toggleFavorite = (recipeId) => {
  const index = favoriteIds.value.indexOf(recipeId)
  if (index === -1) {
    favoriteIds.value.push(recipeId)
  } else {
    favoriteIds.value.splice(index, 1)
  }
}

const decreasePortions = () => {
  if (portions.value > 1) {
    portions.value--
  }
}

const increasePortions = () => {
  portions.value++
}

onMounted(() => {
  const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')
  if (Array.isArray(savedFavorites)) {
    favoriteIds.value = savedFavorites
  }
})

watch(
  isDark,
  (darkValue) => {
    document.documentElement.classList.toggle('dark', darkValue)
    localStorage.setItem(THEME_STORAGE_KEY, darkValue ? 'dark' : 'light')
  },
  { immediate: true }
)

watch(searchQuery, (newQuery) => {
  console.log('Пошуковий запит:', newQuery)
})

watch(portions, (newVal) => {
  localStorage.setItem(PORTIONS_STORAGE_KEY, String(newVal))
})

watch(
  favoriteIds,
  (newIds) => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newIds))
  },
  { deep: true }
)
</script>

<template>
  <header class="app-navbar">
    <div class="navbar-inner">
      <div class="brand-logo">
        <span class="brand-badge">
          <img :src="iconChefHat" alt="Логотип Смачно" class="brand-icon" />
        </span>
        <span class="brand-name">Смачно</span>
      </div>

      <div class="navbar-actions">
        <span class="nav-pill is-active nav-pill-text">Каталог</span>
        <span class="nav-pill">
          <span class="nav-pill-text">Обране</span>
          <span v-if="favoriteIds.length > 0" class="nav-fav-count">{{ favoriteIds.length }}</span>
        </span>
        <span class="nav-pill nav-pill-text">Додати рецепт</span>

        <button
          @click="toggleTheme"
          type="button"
          class="theme-toggle-btn"
          :aria-label="themeToggle.ariaLabel"
        >
          <img :src="themeToggle.icon" alt="Тема" class="theme-icon" />
        </button>
      </div>
    </div>
  </header>

  <main class="container">
    <section v-if="recipeOfDay" class="hero-recipe-banner">
      <div class="hero-media">
        <img v-if="recipeOfDay.image" :src="recipeOfDay.image" :alt="recipeOfDay.title" />
      </div>

      <div class="hero-content">
        <div class="badge-row">
          <span class="category-badge-pill hero-badge-day">Рецепт дня</span>
          <span v-if="recipeOfDay.isVegetarian" class="category-badge-pill type-veg">
            <img :src="iconLeaf" alt="" class="icon-leaf" />
            Вегетаріанська
          </span>
        </div>

        <h1 class="hero-title">{{ recipeOfDay.title }}</h1>
        <p class="hero-desc">
          Ніжні сирники на сковорідці з теплим соусом із заморожених ягід. Готуються з простих
          продуктів і смакують як удома.
        </p>

        <div class="hero-meta-row">
          <span class="meta-item">
            <img :src="iconClock" alt="" class="icon-clock" />
            {{ recipeOfDay.cookingTime }} хв
          </span>
          <span class="meta-item">
            <img :src="iconList" alt="" class="icon-list" />
            {{ ingredients.length }} інгредієнтів
          </span>
          <span class="meta-item"> {{ portions }} порц. </span>
        </div>
      </div>
    </section>

    <section>
      <h2 class="catalog-heading">Каталог рецептів</h2>

      <RecipeFilters
        v-model:search-query="searchQuery"
        v-model:selected-category="selectedCategory"
      />

      <p class="results-count-text">Знайдено {{ filteredRecipes.length }} рецептів</p>

      <div v-if="filteredRecipes.length > 0" class="recipes-grid">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
          :is-favorite="favoriteIds.includes(recipe.id)"
          @toggle-favorite="toggleFavorite"
        />
      </div>

      <div v-else class="empty-state-box">
        <img :src="iconSearch" alt="" class="empty-state-icon" />
        <h3 class="empty-state-title">Такого рецепта ще немає</h3>
        <p class="empty-state-desc">Спробуйте іншу назву або приберіть фільтр категорії.</p>
        <button @click="resetFilters" type="button" class="reset-filters-btn">
          Скинути фільтри
        </button>
      </div>
    </section>

    <section class="practice-widgets-grid">
      <div class="ingredients-preview">
        <div class="ingredients-header">
          <div>
            <h3 class="ingredients-title">Інгредієнти</h3>
            <span class="ingredients-count-badge">{{ ingredientsCountLabel }}</span>
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
        </div>

        <ul class="ingredients-list">
          <li v-for="item in calculatedIngredients" :key="item.id" class="ingredient-item">
            <div class="ingredient-name-wrapper">
              <span class="ingredient-dot"></span>
              <span class="ingredient-name">{{ item.name }}</span>
            </div>
            <span class="ingredient-amount">{{ item.totalAmount }} {{ item.unit }}</span>
          </li>
        </ul>
      </div>

      <div class="timer-column">
        <div>
          <button type="button" class="timer-btn" @click="showTimer = !showTimer">
            {{ showTimer ? 'Сховати таймер' : 'Показати таймер' }}
          </button>
        </div>

        <CookingTimer v-if="showTimer" :initial-minutes="recipeOfDay.cookingTime" />
      </div>
    </section>
  </main>
</template>
