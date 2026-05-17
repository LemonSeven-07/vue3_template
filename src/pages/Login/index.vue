<script lang="ts" setup>
defineOptions({ name: 'LoginPage' });

import { useUserStore } from '@/store/user';

const router = useRouter();

const userStore = useUserStore();

const handleLogin = async () => {
  await userStore.login();

  router.push('/profile');
};
</script>

<template>
  <div class="page">
    <div class="login-box">
      <h2>Login Page</h2>

      <button class="login-btn" @click="handleLogin">Login</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
}

.login-box {
  width: 400px;

  padding: 40px;

  background: white;

  border-radius: 12px;

  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  text-align: center;
}

h2 {
  margin-bottom: 30px;

  @apply text-[var(--global-color)];
}

.login-btn {
  width: 100%;

  height: 42px;

  border: none;

  border-radius: 8px;

  background: #409eff;

  color: white;

  cursor: pointer;

  font-size: 16px;
}

.login-btn:hover {
  opacity: 0.9;
}
</style>
