import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{ path: '/home', name: 'home', component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue') },
  { path: '/create', name: 'Create', component: () => import(/* webpackChunkName: "about" */ '../components/post/Create.vue') },
  { path: '/edit/:id', name: 'Edit', component: () => import(/* webpackChunkName: "about" */ '../components/post/Edit.vue') },
  { path: '/post/:id', name: 'Post', component: () => import(/* webpackChunkName: "about" */ '../components/post/Post.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
