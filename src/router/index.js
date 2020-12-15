import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/not-logged',
    },
    {
      path: '/home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/mine',
      component: () => import('../views/mine.vue')
    },
    {
      path: '/not-logged',
      component: () => import('../views/not-logged.vue')
    }

  ]
})

export default router
