import { createWebHistory, createRouter } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: defineAsyncComponent(() => import('@/pages/Tasks/index.vue'))
  },
  {
    path: '/task/:id',
    name: 'task',
    component: defineAsyncComponent(() => import('@/pages/TaskDetail/index.vue'))
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局前置路由守卫
router.beforeEach((to, from) => {
  console.log('全局前置路由守卫', to, from);
  return true;
});

// 全局后置路由守卫
router.afterEach((to, from) => {
  console.log('全局后置路由守卫', to, from);
});

export default router;
