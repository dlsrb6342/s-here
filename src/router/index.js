import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/pages/MainPage'
import Admin from '@/pages/Admin/Admin'
import About from '@/pages/About/About'
import Contact from '@/pages/About/Contact'
import Check from '@/pages/Check/Check'
import Login from '@/pages/User/Login/Login'
import Signup from '@/pages/User/Signup/Signup'
import Confirm from '@/pages/User/Signup/Confirm'
import Remote from '@/pages/Check/Remote'

Vue.use(Router)

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
      path: '/remote',
      name: 'Remote',
      component: Remote
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
