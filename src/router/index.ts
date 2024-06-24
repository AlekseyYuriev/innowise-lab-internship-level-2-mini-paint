import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { getCurrentUser } from '@/services/auth'
import SignIn from '@/views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/register',
    name: 'register',
    component: SignUp
  },
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
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
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
