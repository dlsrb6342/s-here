<template>
  <div class="view mainpage container vertical-center">
    <!--<v-carousel>
      <v-carousel-item v-for="(item,i) in itmes" v-bind:src="item.src" :key="i"></v-carousel-item>
    </v-carousel>-->
    <div class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="item active">
          <img class="img-fluid" src="static/img/bg1.JPG" alt="First slide">
        </div>
        <div class="item">
          <img class="img-fluid" src="static/img/bg2.JPG" alt="Second slide">
        </div>
        <div class="item">
          <img class="img-fluid" src="static/img/bg3.JPG" alt="Third slide">
        </div>
      </div>
    </div>
    <div class="menu-box row">
      <hr class="prime-line">
      <div class="col-md-4 col-xs-4 text-center">
        <a href="" class="icon hidden-xs">
          <i class="fa fa-cog fa-spin-hover fa-icon-eff fa-3x"></i>
        </a>
        <a href="" class="icon visible-xs">
          <i class="fa fa-cog fa-spin-hover fa-icon-eff fa-2x"></i>
        </a>
        <div class="caption hidden-xs">
          메인 페이지
        </div>
        <div class="caption-xs visible-xs">
          xs viewport size, consectetur adipiscing elit.
        </div>

      </div>
      <div class="col-md-4 col-xs-4 text-center">
        <a class="icon hidden-xs" href="check">
          <i class="fa fa-calendar fa-icon-eff fa-3x"></i>
        </a>
        <a class="icon visible-xs" href="check">
          <i class="fa fa-calendar fa-icon-eff fa-2x"></i>
        </a>
        <div class="caption hidden-xs">
          예약 하기
        </div>
        <div class="caption-xs visible-xs">
          xs viewport size, consectetur adipiscing elit.
        </div>
      </div>
      <div class="col-md-4 col-xs-4 text-center">
        <a href="contact" class="icon hidden-xs">
          <i class="fa fa-list fa-icon-eff fa-3x"></i>
        </a>
        <a href="contact" class="icon visible-xs">
          <i class="fa fa-list fa-icon-eff fa-2x"></i>
        </a>
        <div class="caption hidden-xs">
          문의 사항
        </div>
        <div class="caption-xs visible-xs">
          xs viewport size, consectetur adipiscing elit.
        </div>
      </div>
      <hr class="prime-line">
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainpage',
  data () {
    return {
      items: [
        {
          src: '/static/img/bg1.jpg'
        },
        {
          src: '/static/img/bg2.jpg'
        },
        {
          src: '/static/img/bg3.jpg'
        }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.vertical-center{
    display: block;
    margin-top: 2%;
    vertical-align: middle;
  }
  a {
    color: #203050;
  }
  .mainpage{
    margin-bottom: 20px;
  }
</style>
