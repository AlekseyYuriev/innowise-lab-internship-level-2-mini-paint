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
    component: () => import('../views/NotFound.vue')
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

router.onError((error, to) => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')
  ) {
    window.location.href = to.fullPath
  }
})

export default router
