<template>
  <div 
    class="px-[20px] py-[6px]"
    :class="item.person === 'computer' ? 'bg-violet-50 text-zinc-700 rounded-2xl rounded-bl-none' : 'bg-violet-500 text-white rounded-2xl rounded-br-none'"
  >{{ item.text }}</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface IPropsAnswer {
  person: string,
  text: string,
}

const props = defineProps({
  item: {
    type: Object as PropType<IPropsAnswer>,
    required: true,
  },
});
</script>