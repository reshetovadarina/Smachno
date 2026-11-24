<script setup>
import { ref, reactive, computed, watch } from 'vue'
import RecipeCard from './components/RecipeCard.vue'
import RecipeFilters from './components/RecipeFilters.vue'
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
const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')
const favoriteIds = ref(Array.isArray(savedFavorites) ? savedFavorites : [])

const savedPortions = Number(localStorage.getItem(PORTIONS_STORAGE_KEY))
const portions = ref(savedPortions >= 1 ? savedPortions : 4)

const recipes = reactive([...recipesList])
const recipeOfDay = ref(recipesList.find((recipe) => recipe.id === RECIPE_OF_DAY_ID))
const ingredients = reactive([...initialIngredients])

const themeToggle = computed(() =>
  isDark.value
    ? { icon: iconSun, label: 'Світла', ariaLabel: 'Увімкнути світлу тему' }
    : { icon: iconMoon, label: 'Темна', ariaLabel: 'Увімкнути темну тему' }
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

const decreasePortions = () => {
  if (portions.value > 1) {
    portions.value--
  }
}

const increasePortions = () => {
  portions.value++
}

const toggleFavorite = (recipeId) => {
  const index = favoriteIds.value.indexOf(recipeId)
  if (index === -1) {
    favoriteIds.value.push(recipeId)
  } else {
    favoriteIds.value.splice(index, 1)
  }
}

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
  <header class="app-header">
    <div class="header-top-row">
      <div class="header-titles">
        <h1 class="app-title">Смачно</h1>
        <p class="app-subtitle">Інтерактивна кулінарна книга</p>
      </div>
      <button
        @click="toggleTheme"
        type="button"
        class="theme-toggle-btn"
        :aria-label="themeToggle.ariaLabel"
      >
        <img :src="themeToggle.icon" alt="Іконка теми" class="theme-icon" />
        <span>{{ themeToggle.label }}</span>
      </button>
    </div>
  </header>

  <main class="recipe-section">
    <RecipeFilters
      v-model:search-query="searchQuery"
      v-model:selected-category="selectedCategory"
    />
    <h2 class="section-title">Рецепт дня</h2>

    <div class="recipe-of-day-wrapper">
      <RecipeCard
        :recipe="recipeOfDay"
        :is-favorite="favoriteIds.includes(recipeOfDay.id)"
        @toggle-favorite="toggleFavorite"
      />
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
        <li v-for="item in calculatedIngredients" :key="item.id" class="ingredient-item">
          <div class="ingredient-name-wrapper">
            <span class="ingredient-dot"></span>
            <span class="ingredient-name">{{ item.name }}</span>
          </div>
          <span class="ingredient-amount">{{ item.totalAmount }} {{ item.unit }}</span>
        </li>
      </ul>
    </div>

    <section class="all-recipes-section">
      <h2 class="section-title">Усі рецепти</h2>

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
        <p class="empty-state-desc">Спробуйте змінити пошуковий запит або обрати іншу категорію</p>
        <button @click="resetFilters" type="button" class="reset-filters-btn">
          Скинути фільтри
        </button>
      </div>
    </section>
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
  align-items: center;
}
</style>
