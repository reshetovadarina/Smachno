<script setup>
import { ref, computed, onUnmounted } from 'vue'

import iconPlay from '../icons/play.svg'
import iconPause from '../icons/pause.svg'
import iconReset from '../icons/reset.svg'

const props = defineProps({
  initialMinutes: {
    type: Number,
    default: 10
  }
})

const secondsLeft = ref(props.initialMinutes * 60)
const isRunning = ref(false)
let intervalId = null

const formattedTime = computed(() => {
  const minutes = Math.floor(secondsLeft.value / 60)
  const seconds = secondsLeft.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const startTimer = () => {
  if (isRunning.value || secondsLeft.value <= 0) return

  isRunning.value = true
  intervalId = setInterval(() => {
    console.log('тік')
    if (secondsLeft.value > 0) {
      secondsLeft.value--
    } else {
      pauseTimer()
    }
  }, 1000)
}

const pauseTimer = () => {
  isRunning.value = false
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const resetTimer = () => {
  pauseTimer()
  secondsLeft.value = props.initialMinutes * 60
}

onUnmounted(() => {
  pauseTimer()
})
</script>

<template>
  <div class="cooking-timer">
    <div class="timer-header">
      <span class="timer-label">Таймер приготування</span>
      <span v-if="secondsLeft === 0" class="timer-done-badge">Час вийшов!</span>
    </div>

    <div class="timer-display" :class="{ 'is-finished': secondsLeft === 0 }">
      {{ formattedTime }}
    </div>

    <div class="timer-controls">
      <button
        type="button"
        class="timer-btn timer-btn-primary"
        :disabled="isRunning || secondsLeft === 0"
        @click="startTimer"
      >
        <img :src="iconPlay" alt="" class="timer-btn-icon" />
        <span>Старт</span>
      </button>

      <button type="button" class="timer-btn" :disabled="!isRunning" @click="pauseTimer">
        <img :src="iconPause" alt="" class="timer-btn-icon" />
        <span>Пауза</span>
      </button>

      <button
        type="button"
        class="timer-btn"
        :disabled="!isRunning && secondsLeft === initialMinutes * 60"
        @click="resetTimer"
      >
        <img :src="iconReset" alt="" class="timer-btn-icon" />
        <span>Скинути</span>
      </button>
    </div>
  </div>
</template>
