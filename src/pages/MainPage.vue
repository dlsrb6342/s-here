<template>
  <div class="view container vertical-center">
    <v-carousel class="hidden-sm-and-down elevation-15">
      <v-carousel-item v-for="(item, i) in this.items" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
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
                  Learning factory 운영진<br>
                  WE UP 사업단
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
    //setInterval(this.retNotice(), 10000)
  },
  methods: {
    goPage: function (goMessage) { this.$router.push(goMessage) },
    retNotice: function () {
      let xhr = new XMLHttpRequest()
			xhr.open('GET', '/api/admin/notice') // TODO: fix correct url and request
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
			  let result = JSON.parse(xhr.responseText)
        this.msg = result.hasOwnProperty('data') ? result.data : '공지사항 조회에 실패하였습니다.'
        // TODO: fit type of responseText
			}
			xhr.send({ _csrf: document.cookie.split("_csrf=")[1] })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
