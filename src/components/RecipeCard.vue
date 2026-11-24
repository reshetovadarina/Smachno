<script setup>
import iconHeart from '../icons/heart.svg'
import iconLeaf from '../icons/leaf.svg'
import iconClock from '../icons/clock.svg'
import iconList from '../icons/list.svg'
import iconHeartFilled from '../icons/heart-filled.svg'

defineProps({
  recipe: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})
defineEmits(['toggle-favorite'])
</script>

<template>
  <div class="recipe-card-vertical">
    <div class="card-media-wrapper">
      <img v-if="recipe.image" :src="recipe.image" :alt="recipe.title" class="recipe-main-img" />

      <button
        type="button"
        class="card-favorite-action"
        :class="{ 'is-favorite': isFavorite }"
        :aria-label="isFavorite ? 'Видалити з обраного' : 'В обране'"
        title="В обране"
        @click="$emit('toggle-favorite', recipe.id)"
      >
        <img :src="isFavorite ? iconHeartFilled : iconHeart" alt="В обране" class="icon-heart" />
      </button>
    </div>

    <div class="card-body-details">
      <div class="badge-row">
        <span class="category-badge-pill type-breakfast">{{ recipe.category }}</span>

        <span
          v-if="recipe.isVegetarian"
          class="category-badge-pill"
          :class="{ 'type-veg': recipe.isVegetarian }"
        >
          <img :src="iconLeaf" alt="Листочок" class="icon-leaf" />
          Вегетаріанська
        </span>
      </div>

      <h3 class="card-recipe-title">{{ recipe.title }}</h3>

      <div class="card-meta-info-row">
        <span class="meta-item">
          <img :src="iconClock" alt="Годинник" class="icon-clock" />
          {{ recipe.cookingTime }} хв
        </span>
        <span class="meta-item">
          <img :src="iconList" alt="Список" class="icon-list" />
          {{ recipe.ingredientsCount }} інгредієнтів
        </span>
      </div>
    </div>
  </div>
</template>
