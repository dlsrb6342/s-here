<template>
  <div id="app">
    <img src="../assets/skku_logo.jpg">
    <app-nav v-bind:pstate="state"></app-nav>
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
    <p v-if="state == 'book'">
      <reserve></reserve>
    </p>
    <p v-if="state == 'user'">
      <user></user>
    </p>
    <p v-if="state == 'register'">
      <register></register>
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
import Register from './User/Register'

import Check from './Check/Check'
import Book from './Check/Book'

import Admin from './Admin/Admin'

export default {
  name: 'app',
  components: {
    'app-nav': AppNav,
    'mainpage': MainPage,
    'about': About,
    'open': Open,
    'user': User,
    'register': Register,
    'check': Check,
    'book': Book,
    'admin': Admin,
    'app-footer': AppFooter
  },
  data () {
    return {
      state: 'mainpage'
    }
  },
  computed: {
    changeState: (state) => this.state = state
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
