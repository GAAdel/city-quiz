<template>
  <AppCard>
    <CardHeader :timer="timer" :timerPercentage="timerPercentage"/>
    <CardBody 
      :currentTurn="currentTurn"
      @changeCurrentTurn="changeCurrentTurn"
    />
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from '@/components/AppCard.vue';
import CardHeader from '@/components/play-card/CardHeader.vue'
import CardBody from '@/components/play-card/CardBody.vue'

import { ref, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isQuizFinished = ref(false);

const timerTime = 120000; // 2минуты = 120000; 15 сек = 15000

let deadline = new Date().getTime() + timerTime;
const timer = ref();
const timerPercentage = ref();

const updateTimer = () => {
  const date = new Date().getTime();
  const timeRemaining = (deadline - date) / 1000;

  const minutes = Math.floor((timeRemaining / 60) % 60);
  const seconds = Math.floor(timeRemaining % 60);

  const fMinutes = minutes < 10 ? '0' + minutes : minutes;
  const fSeconds = seconds < 10 ? '0' + seconds : seconds;

  if (timeRemaining <= 1) {
    clearInterval(currentTimer);
    isQuizFinished.value = true;
  }

  timer.value = `${fMinutes}:${fSeconds}`;
  timerPercentage.value = 100 - Math.floor((timeRemaining * 1000) * 100 / timerTime);
}

let currentTimer;

const startTimer = () => {
  currentTimer = setInterval(updateTimer, 500);
}

onBeforeUnmount(() => {
  clearInterval(currentTimer);
});

(() => {
  startTimer();
})();

const currentTurn = ref('user' as 'user' | 'computer');

const lastCity = ref(' '); // ToDo
const amount = ref(0); // ToDo

const changeCurrentTurn = (lastAnswer: string, amountAnswers: number) => {
  lastCity.value = lastAnswer;
  amount.value = amountAnswers;
  deadline = new Date().getTime() + timerTime;
  clearInterval(currentTimer);
  startTimer();
  if (currentTurn.value === 'user') {
    currentTurn.value = 'computer';
  } else {
    currentTurn.value = 'user';
  }
}

watch(isQuizFinished, (newIsQuizFinished) => {
  if (newIsQuizFinished === true) {
    router.push({ name: 'final', params: { looser: `${currentTurn.value}`, lastCity: lastCity.value, amount: amount.value } })
  }
});

</script>
