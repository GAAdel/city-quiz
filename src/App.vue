<template>
  <div class="min-h-screen bg-gray-200">
    <AppContainer>
      <RouterView />
    </AppContainer>
  </div>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { RouterView } from 'vue-router';
</script>