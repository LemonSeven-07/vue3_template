<script lang="ts" setup>
defineOptions({ name: 'ProfilePage' });

import { useUserStore } from '@/store/user';

const router = useRouter();

const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();

  router.push('/login');
};
</script>

<template>
  <div class="page">
    <div class="profile-card">
      <h2>User Profile Page</h2>

      <div class="user-info">
        <div class="label">Username:</div>

        <div class="value">
          {{ userStore.userInfo?.username }}
        </div>
      </div>

      <button class="logout-btn" @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
}

.profile-card {
  width: 500px;

  padding: 40px;

  border-radius: 12px;

  background: white;

  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  margin-bottom: 30px;

  @apply text-[var(--global-color)];
}

.user-info {
  display: flex;

  margin-bottom: 30px;
}

.label {
  width: 100px;

  font-weight: bold;
}

.logout-btn {
  width: 100%;

  height: 42px;

  border: none;

  border-radius: 8px;

  background: #f56c6c;

  color: white;

  cursor: pointer;
}

.logout-btn:hover {
  opacity: 0.9;
}
</style>
