<script setup lang="ts">
import { useCounterStore } from '@/store/task';

const useCounter = useCounterStore();
const handleClick = () => {
  useCounter.increment();
};
</script>

<template>
  <RouterLink to="/">Tasks </RouterLink>&nbsp;&nbsp;
  <RouterLink to="/task/1"> Task 1 </RouterLink>
  <RouterView />
  <p>{{ useCounter.count }}</p>
  <el-button type="primary" @click="handleClick">Primary</el-button>
  <HelloWorld />
</template>

<style lang="scss" scoped>
p {
  @apply text-[var(--global-color)];
}
</style>
