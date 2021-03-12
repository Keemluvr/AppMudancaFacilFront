import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Immobile from '../views/Immobile.vue'
import NewProperty from '../views/PropertyRegistration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/meus-imoveis',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/immobile/:id',
    name: 'Immobile',
    component: Immobile
  },
  {
    path: '/new-property',
    name: 'NewProperty',
    component: NewProperty
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
