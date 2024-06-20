import { getCurrentUser } from '@/services/auth'
import GalleryPage from '@/views/GalleryPage.vue'
import NotFound from '@/views/NotFound.vue'
import PaintPage from '@/views/PaintPage.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: GalleryPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/paint',
    name: 'paint',
    component: PaintPage,
    meta: { requiresAuth: true }
  },
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
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
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
