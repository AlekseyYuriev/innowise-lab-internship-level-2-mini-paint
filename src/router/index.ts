import { getCurrentUser } from '@/services/auth'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/GalleryPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/paint',
    name: 'paint',
    component: () => import('../views/PaintPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to) => {
  const authenticatedUser = await getCurrentUser()

  if (to.meta.requiresAuth && !authenticatedUser) {
    return {
      name: 'signin'
    }
  }

  if (authenticatedUser && (to.name === 'signin' || to.name === 'register')) {
    return { name: 'home' }
  }
})

export default router
