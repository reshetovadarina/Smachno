<script setup>
import { ref, reactive, computed } from 'vue'
import iconHeart from './icons/heart.svg'
import iconLeaf from './icons/leaf.svg'
import iconClock from './icons/clock.svg'
import iconList from './icons/list.svg'

import imgSyrnyky from './syrnyky.jpg'

const cookingTime = ref('35 хв')
const ingredientsCount = ref(9)
const portions = ref(4)

const decreasePortions = () => {
  if (portions.value > 1) {
    portions.value--
  }
}

const increasePortions = () => {
  portions.value++
}

const recipeOfDay = ref({
  title: 'Сирники з ягідним соусом',
  category: 'Сніданок',
   image: imgSyrnyky,
   isVegetarian: true
})

const ingredients = reactive([
  { id: 1, name: 'Кисломолочний сир', amountPerPortion: 100, unit: 'г' },
  { id: 2, name: 'Яйце куряче', amountPerPortion: 0.5, unit: 'шт.' },
  { id: 3, name: 'Борошно пшеничне', amountPerPortion: 15, unit: 'г' },
  { id: 4, name: 'Цукор', amountPerPortion: 10, unit: 'г' },
  { id: 5, name: 'Ванільний цукор', amountPerPortion: 2, unit: 'г' },
  { id: 6, name: 'Дрібка солі', amountPerPortion: 1, unit: 'г' },
  { id: 7, name: 'Олія для смаження', amountPerPortion: 5, unit: 'мл' },
  { id: 8, name: 'Свіжі або заморожені ягоди', amountPerPortion: 50, unit: 'г' },
  { id: 9, name: 'Мед для соусу', amountPerPortion: 10, unit: 'г' }
])

const calculatedIngredients = computed(() => {
  return ingredients.map((ingredient) => {
    return {
      ...ingredient,
      totalAmount: ingredient.amountPerPortion * portions.value
    }
  })
})

const ingredientsCountLabel = computed(() => {
  return `Інгредієнтів: ${ingredients.length}`
})

</script>

<template>
  <div id="app" class="container">
    <header class="app-header">
      <h1 class="app-title" >Смачно</h1>
      <p class="app-subtitle">Інтерактивна кулінарна книга</p>
    </header>

        <main class="recipe-section">
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
               {{ cookingTime }}
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
  </div>
</template>

<style scoped>
.app-header {
  text-align: center;
  margin-bottom: 40px;
}

.app-title {
  font-family: var(--font-display);
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
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-primary);
  text-align: center;
}

.recipe-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 15px;
}

.recipe-of-day-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

</style>
