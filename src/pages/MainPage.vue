<template>
  <div class="mainpage container vertical-center elemnet">
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
        <a href="" class="icon visible-xs"></a>
          <i class="fa fa-cog fa-spin-hover fa-icon-eff fa-2x"></i>
        </a>
        <div class="caption hidden-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur vestibulum purus, a placerat leo.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur vestibulum purus, a placerat leo.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur vestibulum purus, a placerat leo.
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
  a {
    color: #203050;
  }
  .mainpage{
    margin-bottom: 20px;
  }
</style>
