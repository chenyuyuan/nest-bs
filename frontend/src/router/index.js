import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/user/Login.vue'
import Register from '../components/user/Register.vue'
import AddDevice from '../components/device/AddDevice'
import ManageDevice from '../components/device/ManageDevice'
import Device from '../components/device/Device'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '/home', name: 'Home', component: Home  },

  { path: '/adddevice', name: 'AddDevice', component: AddDevice  },
  { path: '/managedevice', name: 'ManageDevice', component: ManageDevice  },
  { path: '/device', name: 'Device', component: Device  },
  
  { path: '/create', name: 'Create', component: () => import(/* webpackChunkName: "about" */ '../components/post/Create.vue') },
  { path: '/edit/:id', name: 'Edit', component: () => import(/* webpackChunkName: "about" */ '../components/post/Edit.vue') },
  { path: '/post/:id', name: 'Post', component: () => import(/* webpackChunkName: "about" */ '../components/post/Post.vue') },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
