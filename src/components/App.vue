<template>
  <div id="app">
    <app-nav
    @change="changeState"
    :user="currentUser"></app-nav>
    <p v-show="state == 'mainpage'">
      <mainpage></mainpage>
    </p>
    <p v-show="state == 'about'">
      <about @change="changeState"></about>
    </p>
    <p v-show="state == 'contact'">
      <contact @change="changeState"></contact>
    </p>
    <p v-show="state == 'open'">
      <open @change="changeState"></open>
    </p>
    <p v-show="state == 'check'">
      <check @change="changeState"></check>
    </p>
    <p v-show="state == 'reserve'">
      <reserve @change="changeState"></reserve>
    </p>
    <p v-show="state == 'user'">
      <user @change="changeState"
      @logout="logoutUser"></user>
    </p>
    <p v-show="state == 'signup'">
      <signup @change="changeState"></signup>
    </p>
    <p v-show="state == 'login'">
      <login @change="changeState"
      @setUser="changeUser"></login>
    </p>
    <p v-show="state == 'lostpw'">
      <lostpw @change="changeState"></lostpw>
    </p>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Nav from './Nav'
import Footer from './Footer'

import MainPage from '@/pages/MainPage'

import About from '@/pages/About/About'
import Contact from '@/pages/About/Contact'

import Open from '@/pages/Open/Open'

import User from '@/pages/User/User'
import Signup from '@/pages/User/Signup'
import Login from '@/pages/User/Login'
import LostPW from '@/pages/User/LostPW'

import Check from '@/pages/Check/Check'
import Reserve from '@/pages/Check/Reserve'

import Admin from '@/pages/Admin/Admin'

export default {
  name: 'app',
  components: {
    'app-nav': Nav,
    'mainpage': MainPage,
    'about': About,
    'contact': Contact,
    'open': Open,
    'user': User,
    'signup': Signup,
    'login': Login,
    'lostpw': LostPW,
    'check': Check,
    'reserve': Reserve,
    'admin': Admin,
    'app-footer': Footer
  },
  data () {
    return {
      state: 'mainpage',
      currentUser: null,
    }
  },
  methods: {
    changeState: function (gotState) { if (gotState) this.state = gotState },
    changeUser: user => this.currentUser = user,
    getUser: () => this.currentUser,
    logoutUser: () => {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/user/logout')
      xhr.send(' ')
      /*
      XMLHttpRequest 응답을 보고 판단.
      if (result['success']) */this.currentUser = null
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
