<script lang="ts" setup>
defineOptions({ name: 'HomePage' });
</script>

<template>
  <div class="page">
    <div class="card">
      <h1>Home Page</h1>

      <p>Vue3 + Router + Pinia Demo</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
}

.card {
  width: 500px;

  padding: 40px;

  border-radius: 12px;

  background: white;

  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  text-align: center;
}

h1 {
  margin-bottom: 20px;

  @apply text-[var(--global-color)];
}
</style>
