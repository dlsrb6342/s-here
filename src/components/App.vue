<template>
  <v-app id="app" standalone>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      enable-resize-watcher
      right
      overflow
      width="65%"
      v-if="!isAdmin" class="SFdrawer">
      <v-list>
        <v-list-tile @click.native="goPage('mainpage')">
          <v-list-tile-action>
            <v-icon large>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>메인</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native="goPage('about')">
          <v-list-tile-action>
            <v-icon large>question_answer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>소개</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native="goPage('check')">
          <v-list-tile-action>
            <v-icon large>event</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>공간예약</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native="goPage('remote')">
          <v-list-tile-action>
            <v-icon large>settings_remote</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>스마트키</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native="goPage('contact')">
          <v-list-tile-action>
            <v-icon large>call</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>문의사항</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-spacer></v-spacer>
        <v-list-tile v-if="!this.currentUser[0]" @click.native="goPage('login')">
          <v-list-tile-action>
            <v-icon large>input</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>로그인</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!this.currentUser[0]" @click.native="goPage('signup')">
          <v-list-tile-action>
            <v-icon large>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>회원가입</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="this.currentUser[0]" @click.native="logoutUser()">
          <v-list-tile-action>
            <v-icon large>directions_run</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>로그아웃</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="SFnav elevation-2">
      <v-toolbar-title class="ml-5" @click="goPage('mainpage')">
        <a href="javascript:void(0)"><img src="../../static/img/menu-logo.svg"></a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="SFnav-btn hidden-sm-and-down mr-5">
        {{ this.currentUser }}
        <v-btn flat class="SFbtn SF-menu-font" @click.native="goPage('about')">
          소개
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" @click.native="goPage('check')">
          공간예약
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" @click.native="goPage('contact')">
          문의사항
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" @click.native="goPage('remote')">
          스마트키
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" v-if="currentUser[0] == null" @click.native="goPage('login')">
          로그인
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" v-if="currentUser[0] !== null" @click.native="logoutUser()">
          로그아웃
        </v-btn>
        <v-btn flat class="SFbtn SF-menu-font" v-if="currentUser[0] != 'admin'" @click.native="goPage('admin')">
          관리자
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view :user="currentUser" @snackbar="showSnackbar" @setUser="changeUser">
        <center>페이지 로딩에 실패하였습니다.</center>
      </router-view>
    </main>
    <v-footer id="app-footer" class="vertical-center">
      <div class="text-center">
        <hr><br>
        COPYRIGHT © {{ new Date().getFullYear() }} SMART CAR FACTORY<br>
        (440-746) 경기도 수원시 장안구 서부로 2066 자연과학캠퍼스 산학협력센터 85155호<br>
        Powered by S-Hero Project
      </div>
    </v-footer>
    <v-snackbar :timeout="snackbar.timeout" :top="true" :success="snackbar.mode === 'success'" :info="snackbar.mode === 'info'" :warning="snackbar.mode === 'warning'" :error="snackbar.mode === 'error'" multi-line v-model="snackbar.show" class="grey--text text--lighten-3">
			<div v-html="snackbar.msg" style="text-align: center;"></div>
      <v-btn flat v-show="signupMsg" class="grey--text text--lighten-3 mr-0 px-1" @click="goPage('signup')">Sign Up</v-btn>
      <v-btn flat v-show="loginMsg" class="grey--text text--lighten-3 mr-0 px-1" @click="goPage('login')">Log In</v-btn>
      <v-btn flat class="white--text mx-0 px-1" @click.native="snackbar.show = false">Close</v-btn>
		</v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
			snackbar: {
				show: false,
				timeout: 5000,
				mode: '',
				msg: '',
			},
      signupMsg: false,
      loginMsg: false,
      currentUser: [null, null],
      isAdmin: false,
      drawer: null,
    }
  },
  methods: {
    showSnackbar: function (showMessage, mode) {
      this.snackbar.show = true
      this.snackbar.msg = showMessage
      this.snackbar.mode = mode
      this.signupMsg = showMessage === '회원가입을 하셔야만 이용할 수 있는 서비스입니다.' ? true : false
      this.loginMsg = showMessage === '로그인 하셔야만 이용하실 수 있습니다.' ? true : false
    },
    goPage: function (goMessage) { this.$router.push(goMessage) },
    changeUser: function (user) { this.currentUser = user },
    logoutUser: function () {
      let xhr = new XMLHttpRequest(), self = this
      xhr.open('POST', '/api/user/logout')
      xhr.send(JSON.stringify({_csrf: document.cookie.split("_csrf=")[1]}))
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('success')) {
            self.currentUser = [null, null]
            self.goPage('mainpage')
          }
        }
      }
    },
  }
}
</script>

<style>
  main{
    background-image: url("../../static/img/content-bg-1-uai-2064x2064.jpg");
  }
  .snack__content {
    padding: 30px 30px 30px 30px;
  }
  .application--light .toolbar {
    background-color: #ffffff;
  }
  div .list__tile__title {
    text-align: center;
  }
  div .input-group__selections__comma{
    margin: auto;
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
    height: 80px;
    background-color: white;
    color: #1565c0;
  }
  @media only screen and (max-width: 599px){
    .SFdrawer{
      width: 65%;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }
</style>
