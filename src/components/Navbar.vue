<template>
    <nav class="navbar">
      <div id="home" class="container-fluid">
        <div class="navbar-header">
          <a class="btn navbar-hover navbar-toggle collapsed" href="javascript:void(0)" v-if="this.user[0]">{{ this.user[1] }} 님</a>
          <a class="navbar-hover navbar-brand" href="javascript:void(0)" @click="goPage('/')">SMART CAR FACTORY</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse hidden-xs">
          <ul class="nav navbar-nav navbar-right">
            <li><a class="navbar-hover" href="javascript:void(0)" v-if="!this.user[0]" @click="goPage('login')"><i class="fa fa-sign-in"></i> Sign in</a></li>
            <li><a class="navbar-hover" href="javascript:void(0)" v-if="!this.user[0]" @click="goPage('signup')"><i class="fa fa-sign-in"></i> Sign up</a></li>
            <li><a class="navbar-hover btn" v-if="this.user[0]" @click="goPage('/')">{{ this.user[1] }} 님</a></li>
          </ul>
          <ul class="nav navbar-nav">
            <li class="active"><a class="navbar-hover" href="javascript:void(0)" @click="goPage('/')">Home</a></li>
            <li><a class="navbar-hover" href="javascript:void(0)" @click="goPage('about')">About</a></li>
            <li><a class="navbar-hover" href="javascript:void(0)" @click="goPage('check')">Book</a></li>
            <li><a class="navbar-hover" href="javascript:void(0)" @click="goPage('contact')">Contact</a></li>
          </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'app-nav',
  props: ['user'],
  methods: {
    goPage: function (goMessage) { this.$router.push(goMessage) }
  },
}
</script>
<style>
  .navbar{
    font-family: 'Roboto', sans-serif;
  }
  .navbar-brand{
    font-family: 'Comfortaa', cursive;
  }
  a:hover {
    text-decoration: none;
  }
  .navbar-brand{
    color: #0074d6
  }
</style>
