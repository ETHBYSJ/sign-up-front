import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    {
      path: '/mine',
      component: () => import('../views/mine.vue')
    }
  ]
})

export default router
