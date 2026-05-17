import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const routes = [
  {
    path: '/',
    component: defineAsyncComponent(() => import('@/pages/Home/index.vue'))
  },

  {
    path: '/login',
    component: defineAsyncComponent(() => import('@/pages/Login/index.vue'))
  },

  {
    path: '/profile',
    component: defineAsyncComponent(() => import('@/pages/Profile/index.vue')),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局前置路由守卫
router.beforeEach((to, from) => {
  console.log('全局前置路由守卫', to, from);
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.token) {
    return '/login';
  }

  return true;
});

// 全局后置路由守卫
router.afterEach((to, from) => {
  console.log('全局后置路由守卫', to, from);
});

export default router;
