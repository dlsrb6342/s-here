<template>
  <v-footer id="app-footer" class="row vertical-center">
    <hr class="white-line">
    <div class="caption text-center">
      Powered by S-Hero Project © {{ new Date().getFullYear() }}
    </div>
  </v-footer>
</template>

<script>
export default {
	name: 'app-footer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style>
  #app-footer {
    width: 100%;
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
  #app-footer .caption{
    color: #fafafa;
  }
</style>
