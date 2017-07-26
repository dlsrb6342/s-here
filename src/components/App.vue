<template>
  <div id="app">
    <app-nav @change="changeState"></app-nav>
    <p v-if="state == 'mainpage'">
      <mainpage></mainpage>
    </p>
    <p v-if="state == 'about'">
      <about></about>
    </p>
    <p v-if="state == 'contact'">
      <contact></contact>
    </p>
    <p v-if="state == 'open'">
      <open></open>
    </p>
    <p v-if="state == 'check'">
      <check></check>
    </p>
    <p v-if="state == 'reserve'">
      <reserve></reserve>
    </p>
    <p v-if="state == 'user'">
      <user></user>
    </p>
    <p v-if="state == 'signup'">
      <signup @change="changeState"></signup>
    </p>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNav from './AppNav'
import AppFooter from './AppFooter'

import MainPage from './MainPage'

import About from './About/About'
import Contact from './About/Contact'

import Open from './Open/Open'

import User from './User/User'
import Signup from './User/Signup'

import Check from './Check/Check'
import Reserve from './Check/Reserve'

import Admin from './Admin/Admin'

export default {
  name: 'app',
  components: {
    'app-nav': AppNav,
    'mainpage': MainPage,
    'about': About,
    'contact': Contact,
    'open': Open,
    'user': User,
    'signup': Signup,
    'check': Check,
    'reserve': Reserve,
    'admin': Admin,
    'app-footer': AppFooter
  },
  data () {
    return {
      state: 'mainpage'
    }
  },
  methods: {
    changeState: function (gotState) {
      if (gotState) this.state = gotState
    }
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
