<template>
  <div class="card-body text-sm leading-normal text-zinc-700 p-6">
    <div class="card-body__text mb-6">Цель: Назвать как можно больше реальных городов.</div>
    <ul class="card-body__list mb-6 list-disc">
      <li class="card-body__item ml-6">
        Запрещается повторение городов.
      </li>
      <li class="card-body__item ml-6">
        Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.
      </li>
      <li class="card-body__item ml-6">
        Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим
      </li>
    </ul>
    <button class="block mx-auto bg-violet-600 text-white rounded px-4 py-2" type="button" @click="handleClick">Начать игру</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = () => {
  router.push('/play');
}
</script>