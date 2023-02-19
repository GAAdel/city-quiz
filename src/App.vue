<template>
  <div>
    <AppContainer>
      <RouterView />
    </AppContainer>
  </div>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';

import { RouterView } from 'vue-router';

</script>

<style>
body {
  background-color: #E5E7EB;
}

</style>