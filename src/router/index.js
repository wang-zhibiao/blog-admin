import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/* Layout */
import Layout from '@/layout'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

export default router
