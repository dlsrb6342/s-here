<template>
  <div id="app">
    <app-nav
    v-if="!isAdmin"
    :user="currentUser"></app-nav>
    <transition name="fade">
      <router-view :user="currentUser"></router-view>
    </transition>
    <app-footer v-if="!isAdmin"></app-footer>
  </div>
</template>

<script>
import Nav from './Navbar'
import Footer from './Footer'
import VueRouter from 'vue-router'
import router from '@/router'

export default {
  name: 'app',
  components: {
    'app-nav': Nav,
    'app-footer': Footer,
  },
  data () {
    return {
      currentUser: [null, null],
      isAdmin: false,
    }
  },
  methods: {
    changeUser: user => this.currentUser = user,
    getUser: () => this.currentUser,
    logoutUser: () => {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/user/logout')
      xhr.send(null)
      xhr.onreadystatechange = function () {
        let result = JSON.parse(xhr.responseText)
        if (result.hasOwnProperty('success')) this.currentUser = [null, null]
      }
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter-active {
  transition-delay: .25s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
