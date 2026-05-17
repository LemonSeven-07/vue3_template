<script lang="ts" setup>
import { useAutoCancelRequests } from '@/api/http/useAutoCancelRequests';
import { useLoadingStore } from '@/store/loading';

useAutoCancelRequests();
const loadingStore = useLoadingStore();
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="logo">Vue3 Demo</div>

      <nav class="nav">
        <router-link to="/"> Home </router-link>

        <router-link to="/profile"> Profile </router-link>

        <router-link to="/login"> Login </router-link>
      </nav>
    </header>

    <main class="main" v-loading.fullscreen.lock="loadingStore.globalLoading">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  height: 60px;

  padding: 0 30px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  background: #222;

  color: #fff;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  @apply text-[var(--global-color)];
}

.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  color: #fff;
  text-decoration: none;
}

.nav a.router-link-active {
  color: #409eff;
}

.main {
  padding: 40px;
}
</style>
