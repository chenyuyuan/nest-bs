import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/user/Login.vue'
import Register from '../components/user/Register.vue'
import AddDevice from '../components/device/AddDevice'
import ManageDevice from '../components/device/ManageDevice'
import Device from '../components/device/Device'
import Data from '../components/data/Data'
import HistoryData from '../components/data/HistoryData'
import AdminLogin from '../components/admin/AdminLogin'
import AdminHome from '../components/admin/AdminHome'
import Profile from '../components/user/Profile'
import ForgetPwd from '../components/user/ForgetPwd'
import Message from '../components/user/Message'
import PostList from '../components/post/PostList'
import CreatePost from '../components/post/CreatePost'


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

  { path: '/data', name: 'Data', component: Data  },
  { path: '/historydata', name: 'HistoryData', component: HistoryData  },
  
  { path: '/create', name: 'Create', component: () => import(/* webpackChunkName: "about" */ '../components/post/Create.vue') },
  { path: '/edit/:id', name: 'Edit', component: () => import(/* webpackChunkName: "about" */ '../components/post/Edit.vue') },
  { path: '/post', name: 'Post', component: () => import(/* webpackChunkName: "about" */ '../components/post/Post.vue') },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/forgetpwd', name: 'ForgetPwd', component: ForgetPwd },


  { path: '/messagelist', name: 'Message', component: Message },


  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin  },
  { path: '/admin/home', name: 'AdminHome', component: AdminHome  },


  { path: '/postlist', name: 'PostList', component: PostList },
  { path: '/createpost', name: 'CreatePost', component: CreatePost },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
