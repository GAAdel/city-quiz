import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/PlayView.vue')
    },
    {
      path: '/final/:winner/:lastCity/:amount',
      name: 'final',
      component: () => import('../views/FinalView.vue')
    }
  ]
})

export default router
