<script setup>
import { useTemplateRef, onMounted } from 'vue'
import iconSearch from '../icons/search.svg'
import iconClose from '../icons/close.svg'
import iconChevronDown from '../icons/chevron-down.svg'

defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  selectedCategory: {
    type: String,
    default: ''
  }
})

defineEmits(['update:searchQuery', 'update:selectedCategory'])

const searchInput = useTemplateRef('searchInput')

onMounted(() => {
  searchInput.value?.focus()
})
</script>

<template>
  <div class="filters-bar">
    <div class="search-wrapper">
      <img :src="iconSearch" alt="Пошук" class="search-icon-left" />

      <input
        ref="searchInput"
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text"
        placeholder="Пошук рецепта за назвою"
        class="search-input"
      />

      <button
        v-if="searchQuery"
        @click="$emit('update:searchQuery', '')"
        type="button"
        class="search-clear-btn"
        aria-label="Очистити пошук"
      >
        <img :src="iconClose" alt="Очистити" class="search-icon-close" />
      </button>
    </div>

    <div class="select-wrapper">
      <select
        :value="selectedCategory"
        @change="$emit('update:selectedCategory', $event.target.value)"
        class="category-select"
        aria-label="Категорія"
      >
        <option value="">Усі категорії</option>
        <option value="Сніданок">Сніданок</option>
        <option value="Обід">Обід</option>
        <option value="Десерт">Десерт</option>
      </select>
      <img :src="iconChevronDown" alt="" class="select-icon-arrow" />
    </div>
  </div>
</template>
