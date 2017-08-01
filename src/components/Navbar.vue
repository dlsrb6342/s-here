<template>
    <nav class="navbar">
      <div id="home" class="container-fluid">
        <div class="navbar-header">
          <a class="btn navbar-hover navbar-toggle collapsed" v-if="this.user[0]" href="#">{{ this.user[1] }} 님</a>
          <a class="navbar-hover navbar-brand" href="#" @click="goPage('mainpage')">SMART CAR FACTORY</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse hidden-xs">
          <ul class="nav navbar-nav navbar-right">
            <li><a class="navbar-hover" href="#" v-if="!this.user[0]" @click="goPage('login')"><i class="fa fa-sign-in"></i> Sign in</a></li>
            <li><a class="navbar-hover" href="#" v-if="!this.user[0]" @click="goPage('signup')"><i class="fa fa-sign-in"></i> Sign up</a></li>
            <li><a class="navbar-hover btn" v-if="this.user[0]" @click="goPage('mainpage')">{{ this.user[1] }} 님</a></li>
          </ul>
          <ul class="nav navbar-nav">
            <li class="active"><a class="navbar-hover" href="#home" @click="goPage('mainpage')">Home</a></li>
            <li><a class="navbar-hover" href="#" @click="goPage('about')">About</a></li>
            <li><a class="navbar-hover" href="#" @click="goPage('reserve')">Book</a></li>
            <li><a class="navbar-hover" href="#" @click="goPage('contact')">Contact</a></li>
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
    goPage: function (goMessage) { this.$emit('change', goMessage) }
  },
}
</script>
<style>
</style>
