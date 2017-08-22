<template>
  <div class="view mainpage container vertical-center">
    <v-carousel>
      <v-carousel-item v-for="(item, i) in this.items" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
    <v-container fluid class="non-padding text-left">
      <v-layout row-md column>
        <v-flex>
          <v-card>
            <v-card-title>
              <div>
                <h3 class="headline mb-0">이용 안내</h3>
                <div class="caption">
                  Smart car factory<br>
                  소개 및 이용 안내
                </div>
              </div>
            </v-card-title>
            <v-btn flat class="blue--text" @click="goPage('about')">About</v-btn>
            <v-card-media
              src="../../static/img/bg1.jpg"
              height="180px"
            >
            </v-card-media>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card>
            <v-card-title>
              <div>
                <h3 class="headline mb-0">공간 예약</h3>
                <div class="caption">
                  09:00 ~ 23:00<br>
                  테이블 2 | 프린터 5 | 공구함 5
                </div>
              </div>
            </v-card-title>
            <v-btn flat class="blue--text" @click="goPage('check')">Book</v-btn>
            <v-card-media
              src="../../static/img/bg2.jpg"
              height="180px"
            >
            </v-card-media>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card>
            <v-card-title>
              <div>
                <h3 class="headline mb-0">문의사항</h3>
                <div class="caption">
                  Learning factory 운영진<br>
                  WE UP 사업단
                </div>
              </div>
            </v-card-title>
            <v-btn flat class="blue--text" @click="goPage('contact')">Contact</v-btn>
            <v-card-media
              src="../../static/img/bg3.jpg"
              height="180px"
            >
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'mainpage',
  data () {
    return {
      items: [
        {
          src: '../../static/img/bg1.jpg'
        },
        {
          src: '../../static/img/bg2.jpg'
        },
        {
          src: '../../static/img/bg3.jpg'
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
  div.test{
    display: inline-flex;
  }
  div.non-padding{
    padding: 0;
  }
  div.carousel {
    height: 50vh;
  }
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
