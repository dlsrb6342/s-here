<template>
  <div class="view mainpage container vertical-center">
    <v-carousel>
      <v-carousel-item v-for="(item, i) in this.items" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
    <!--
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
    -->
    <v-container fluid class="text-left">
      <v-layout row justify-space-around>
        <v-flex xs12 lg4>
          <v-card>
            <v-card-media
              src="http://lorempixel.com/300/130/cats/"
              height="140px"
            >
            </v-card-media>
            <v-card-title>
              <div>
                <h3 class="headline mb-0">이용 안내</h3>
                <div>
                  오픈 할 수 있을까<br>
                  인건비를 줄이자
                </div>
              </div>
            </v-card-title>
            <v-card-action @click="goPage('about')">
                <v-btn flat class="blue--text">About</v-btn>
            </v-card-action>
          </v-card>
        </v-flex>
        <v-flex xs12 lg4>
          <v-card>
            <v-card-media
              src="http://lorempixel.com/320/130/cats/"
              height="140px"
            >
            </v-card-media>
            <v-card-title>
              <div>
                <h3 class="headline mb-0">공간 예약</h3>
                <div>
                  09:00 ~ 23:00<br>
                  테이블 2 | 프린터 5 | 공구함 5
                </div>
              </div>
            </v-card-title>
            <v-card-action @click="goPage('check')">
              <v-btn flat class="blue--text">Book</v-btn>
            </v-card-action>
          </v-card>
        </v-flex>
        <v-flex xs12 lg4>
          <v-card>
            <v-card-media
              src="http://lorempixel.com/340/130/cats/"
              height="140px"
            >
            </v-card-media>
            <v-card-title>
              <div>
                <h3 class="headline mb-0">문의사항</h3>
                <div>
                  이거 관리하는 사람 누구야<br>
                  담당자 나오라 그래
                </div>
              </div>
            </v-card-title>
            <v-card-action @click="goPage('contact')">
              <v-btn flat class="blue--text">Contact</v-btn>
            </v-card-action>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="menu-box row">
      <hr class="prime-line">
      <div class="col-md-4 col-xs-4 text-center">
        <a class="icon hidden-xs" href="javascript:void(0)" @click="goPage('mainpage')">
          <i class="fa fa-cog fa-spin-hover fa-icon-eff fa-3x"></i>
        </a>
        <a class="icon visible-xs" href="javascript:void(0)" @click="goPage('mainpage')">
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
        <a class="icon hidden-xs" href="javascript:void(0)" @click="goPage('check')">
          <i class="fa fa-calendar fa-icon-eff fa-3x"></i>
        </a>
        <a class="icon visible-xs" href="javascript:void(0)" @click="goPage('check')">
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
        <a class="icon hidden-xs" href="javascript:void(0)" @click="goPage('contact')">
          <i class="fa fa-list fa-icon-eff fa-3x"></i>
        </a>
        <a class="icon visible-xs" href="javascript:void(0)" @click="goPage('contact')">
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
  methods: {
    goPage: function (goMessage) { this.$router.push(goMessage) }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.vertical-center{
    display: block;
    vertical-align: middle;
  }
  a {
    color: #203050;
  }
  .mainpage{
    margin-bottom: 20px;
  }
</style>
