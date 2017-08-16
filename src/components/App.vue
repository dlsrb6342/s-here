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
      <v-list dense>
        <v-list-tile>
          <v-list-tile-title>{{ this.currentUser[0] }}</v-list-tile-title>
        </v-list-tile>
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
    <v-toolbar class="indigo" dark>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="goPage('mainpage')">SMART CAR FACTORY</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view :user="currentUser"></router-view>
      </v-container>
    </main>
    <v-footer id="app-footer" class="row vertical-center">
      <div class="caption text-center">
        <hr><br>
        Powered by S-Hero Project © {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      currentUser: ['testNmae', null],
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
  #app-footer {
    width: 100%;
    height:10vh;
    display: block;
    /*position: fixed;
    left:0;
    bottom: 0;
    height: auto;
    max-height: 13vh;*/
    background-color: #1565c0;
    margin: 0;
    color: white;
  }
  #app-footer hr{
    width: 80%;
    margin: 0 auto;
  }
  #app-footer .caption{
    color: #fafafa;
  }
</style>
