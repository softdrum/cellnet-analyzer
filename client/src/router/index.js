import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Charts from '../views/Charts.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    meta: {layout: 'main', auth: true},
    component: Dashboard
  }, 
  {
    path: '/charts',
    name: 'Charts',
    meta: {layout: 'main', auth: true},
    component: Charts
  }, 
  {
    path: '/map',
    name: 'Map',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Map.vue')
  }, 
  {
    path: '/database',
    name: 'Database',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/database/Database.vue')
  }, 
  {
    path: '/database/:directory',
    name: 'Directory',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/database/Directory.vue')
  }, 
  {
    path: '/system',
    name: 'System',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/System.vue')
  }, 
  {
    path: '/user-settings',
    name: 'UserSettings',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/UserSettings.vue')
  }, 
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/auth/Login.vue')
  }, 
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/auth/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
