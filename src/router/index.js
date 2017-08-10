import Vue from 'vue'
import Router from 'vue-router'

import VueCalendar from 'vue-bootstrap-datetimepicker'

import MainPage from '@/pages/MainPage'

import Admin from '@/pages/Admin/Admin'

import About from '@/pages/About/About'
import Contact from '@/pages/About/Contact'

import Check from '@/pages/Check/Check'

import Open from '@/pages/Open/Open'

import User from '@/pages/User/User'
import Login from '@/pages/User/Login/Login'
import LostPW from '@/pages/User/LostPW/LostPW'
import Signup from '@/pages/User/Signup/Signup'
import Confirm from '@/pages/User/Signup/Confirm'

Vue.use(Router)
Vue.use(VueCalendar)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/check',
      name: 'Check',
      component: Check,
      props: true
    },
    {
      path: '/check/:date',
      name: 'CheckDate',
      component: Check,
      props: true
    },
    {
      path: '/open',
      name: 'Open',
      component: Open
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/lostpw',
      name: 'lostpw',
      component: LostPW
    },
    {
      path: '/resetpw',
      name: 'ResetPW',
      component: LostPW,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm,
    },
    {
      path: '*',
      redirect: {
        name: 'MainPage'
      }
    }
  ],
  mode: 'history'
})
