<template>
  <div class="card-header flex justify-between items-center px-[16px] py-[17px]">
    <h1 class="card-header__title text-base">Сейчас ваша очередь</h1>
    <span class="card-header__timer text-xl" v-if="timer">{{ timer }}</span>
  </div>
  <div class="w-full bg-gray-200 h-[5px]">
    <div class="bg-violet-300 h-[5px]" v-if="timerPercentage" :style="{width: `${timerPercentage}%`}"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  timer: {
    type: String,
  },
  timerPercentage: {
    type: Number,
  }
});

</script>

<style scoped>

</style>