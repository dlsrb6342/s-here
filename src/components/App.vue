<template>
  <v-app id="app" standalone>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      enable-resize-watcher
      overflow
      absolute
      v-if="!isAdmin">
      <v-list>
        <v-list-tile @click.native="goPage('mainpage')">
          <v-list-tile-action>
            <v-icon large>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native="goPage('about')">
          <v-list-tile-action>
            <v-icon large>question_answer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native="goPage('check')">
          <v-list-tile-action>
            <v-icon large>event</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Book</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native="goPage('contact')">
          <v-list-tile-action>
            <v-icon large>call</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-spacer></v-spacer>
        <v-list-tile v-if="this.currentUser[0]" @click.native="goPage('login')">
          <v-list-tile-action>
            <v-icon large>input</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign in</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="this.currentUser[0]" @click.native="goPage('signup')">
          <v-list-tile-action>
            <v-icon large>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sing up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="this.currentUser[0]" @click.native="goPage('signup')">
          <v-list-tile-action>
            <v-icon large>directions_run</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sing out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!--<nav class="SFnav navbar navbar-toggleable-sm">

      aiejofi
    </nav>-->
    <v-toolbar fixed class="SFnav elevation-2">
      <v-toolbar-title class="ml-5" @click="goPage('mainpage')">
        <a href="javascript:void(0)"><img src="../../static/img/menu-logo.svg"></a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="SFnav-btn hidden-sm-and-down mr-5">
        <v-btn flat class="SFbtn SF-menu-font" @click.native="goPage('about')">
          소개
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" @click.native="goPage('check')">
          공간예약
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" @click.native="goPage('contact')">
          문의사항
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" v-if="!this.currentUser[0]" @click.native="goPage('login')">
          로그인
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" v-if="this.currentUser[0]" @click.native="goPage('mainpage')">
          로그아웃
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <main>
      <router-view :user="currentUser"></router-view>
    </main>
    <v-footer id="app-footer" class="vertical-center">
      <div class="text-center">
        <hr><br>
        COPYRIGHT © {{ new Date().getFullYear() }} SMART CAR FACTORY<br>
        (440-746) 경기도 수원시 장안구 서부로 2066 자연과학캠퍼스 산학협력센터 85155호<br>
        Powered by S-Hero Project
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      currentUser: [null, null],
      isAdmin: false,
      drawer: null,
    }
  },
  methods: {
    goPage: function (goMessage) { this.$router.push(goMessage) },
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

<style scoped>
  main{
    background-image: url("../../static/img/content-bg-1-uai-2064x2064.jpg");
  }
  #app-footer {
    width: 100%;
    height: 100%;
    display: block;
    padding: 32px;
    font-size: 10px;
    background-color: #1565c0;
    color: white;
  }
  #app-footer hr{
    width: 80%;
    margin: 0 auto;
  }
  .SFbtn{
    width: 110px;
    color: #203050 !important;
    transition: 10ms;
  }
  .SFbtn:hover{
    color: #1565c0 !important;
  }
  .SFnav {
    height: 100px;
    background-color: white;
    color: #1565c0;
  }

</style>
