<template>
  <div class="card-body text-xl leading-normal text-center px-3 sm:px-20 py-10">
    <div 
      class="card-body__text leading-normal mb-8"
      v-if="route.params.looser === 'user'"
    >К сожалению твое время вышло! <br> Твой противник победил!</div>

     <div 
      class="card-body__text leading-normal mb-8"
      v-else
    >Поздравляем тебя с победой! <br> Твой противник не вспомнил нужный город!</div>
    
    <div 
      class="card-body__text text-3xl leading-normal mb-8"
      :class="route.params.looser === 'user' ? 'text-red-600' : 'text-green-600'"
    >00:00</div>

    <div class="card-body__text leading-normal mb-8">Всего было перечислено городов: {{ route.params.amount }} <br> Очень не плохой результат!</div>

    <div class="card-body__text leading-normal mb-8">Последний город названный победителем <br> <span class="card-body__text text-2xl">{{ route.params.lastCity }}</span></div>

    <button 
      class="block mx-auto bg-violet-600 text-base text-white rounded px-4 py-2"
      type="button"
      @click="handleClick"
    >Начать новую игру</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const handleClick = () => {
  router.push('/play');
}
</script>
