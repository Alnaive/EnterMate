import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import UpdateProfileView from '../views/UpdateProfileView.vue'
import VerifyView from '../views/VerifyView.vue'
import { useAuth } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {requiresAuth: true},
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {authPage: true},
      component: LoginView,
    },
    {
      path:'/feeds',
      name: 'user',
      component: UserView,
    },
    {
      path:'/profile/:id',
      name: 'profile',
      component: ProfileView,
      props: true,
    },
    {
      path:'/update/profile/:id',
      name: 'profileUpdate',
      component: UpdateProfileView,
      props: true,
    },
    {
      path:'/emailVerify/:token',
      name: 'emailVerify',
      meta: { requiresAuth: true },
      props: true,
      component: VerifyView,
    }
  ]
})

router.beforeEach(async(to) => {
  const auth = useAuth()
  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    router.push({ name: 'login' });
  }
})

export default router
