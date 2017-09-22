<template>
  <div class="view container vertical-center">
    <v-carousel class="hidden-sm-and-down elevation-15">
      <v-carousel-item v-for="(item, i) in this.items" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
    <h4 class="hidden-md-and-up font-exo text-center mt-3 mb-1">SMART CAR FACTORY</h4>
    <hr class="mt-5 mb-5">
    <v-container fluid class="non-padding text-left mb-5">
      <v-layout row-md column>
        <v-flex>
          <v-card class="elevation-10">
            <v-card-title>
              <div>
                <h3 class="headline mb-0">이용 안내</h3>
                <div class="caption">
                  09:00 ~ 23:00<br>
                  테이블 2 | 프린터 5 | 공구함 5
                </div>
              </div>
            </v-card-title>
            <v-card-media
              src="../../static/img/bg1.jpg"
              height="180px"
            >
            </v-card-media>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card class="elevation-10">
            <v-card-title>
              <div>
                <h3 class="headline mb-0">공지사항</h3>
                <div class="caption" v-html="msg"></div>
              </div>
            </v-card-title>
            <v-card-media
              src="../../static/img/bg2.jpg"
              height="180px"
            >
            </v-card-media>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card class="elevation-10">
            <v-card-title>
              <div>
                <h3 class="headline mb-0">문의사항</h3>
                <div class="caption">
                  Learning factory 운영진 (031.290.5699)<br>
                  WE UP 사업단 (031.290.5612)
                </div>
              </div>
            </v-card-title>
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
        { src: '../../static/img/bg1.jpg' },
        { src: '../../static/img/bg2.jpg' },
        { src: '../../static/img/bg3.jpg' }
      ],
      msg: '<br>스마트카 팩토리 예약 시스템에 오신 것을 환영합니다.'
    }
  },
  created () {
    setInterval(this.getNotice(), 10000)
  },
  methods: {
    getNotice: function () {
      let xhr = new XMLHttpRequest(), self = this
			xhr.open('GET', '/api/notice')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          self.msg = result.hasOwnProperty('data') ? result.data : '공지사항 조회에 실패하였습니다.'
        }
			}
			xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
    }
  }
}
</script>

<style scoped>
  div.non-padding{
    padding: 0;
  }
  div.carousel {
    height: 70vh;
    margin: 40px 0;
  }
  div.vertical-center{
    display: block;
    vertical-align: middle;
  }
</style>
