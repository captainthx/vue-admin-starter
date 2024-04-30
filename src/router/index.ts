import { createRouter, createWebHistory } from 'vue-router';
import routerList from './routeConfig';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerList
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    authStore.loadAuth();
    if (authStore.isAuthenticated) {
      next();
    }
  }
  next({ name: 'login' });
});

export default router;
