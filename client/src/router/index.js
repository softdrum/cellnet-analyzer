import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Charts from '../views/Charts.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: Home
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
    component: () => import('../views/Database.vue')
  }, 
  {
    path: '/database/:directory',
    name: 'Directory',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Database/Directory.vue')
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
    component: () => import('../views/Login.vue')
  }, 
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
