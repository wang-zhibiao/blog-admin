import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
//解决导航栏重复点击跳转报错报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'home', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

]
export const asyncRoutes = [
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/menu1',
    name: 'menu',
    meta: {
      title: 'menu',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/menu1'), // Parent router-view
        name: 'menu1',
        meta: { title: 'menu1', icon: 'chart' },
      },
      {
        path: 'menu2',
        name: 'menu2',
        component: () => import('@/views/menu2'),
        meta: { title: 'menu2', icon: 'wechat' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router