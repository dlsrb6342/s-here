<template>
	<div class="about container view">
    <v-container fluid>
      <v-layout column>
        <v-flex xs12 md12>
          <v-card class="SFfloating elevation-15">
            <v-card-media
              src="../../static/img/bg2.jpg"
              height="300px"
              style="opacity: 0.7">
              <v-card-title>
                <h2 class="grey--text text--lighten-4">SMART CAR Learning Factory</h2>
              </v-card-title>
            </v-card-media>
            <v-card-text class="pa-4">
              <span class="about-desc">스마트카 팩토리는 성균관대 여성공학인재사업단에서 구축한 새로운 메이커 스페이스로,<br>
              기존의 산학관 1층에 위치한 Learning Factory 와 비교하여 스마트카 교육 환경에 맞추어 제작된 것이 특징입니다.<br>
              스마트카 트랙 이수자, WE-UP 서포터즈 학생에게 개방되어 있습니다.<br>
              스마트카 팩토리 내 구비 물품: 큐비콘 싱글 플러스(FDM방식 3D Printer) 5대, TinyCNC-3035C(CNC 라우터) 1대, 작업 테이블, 공구함<br>
              3D프린터와 CNC 라우터는 사전 예약을 통해 이용자를 제한하고 있습니다.<br>
              </span>
            </v-card-text>

          </v-card>
        </v-flex>
        <v-layout row-md column>
          <v-flex xs12 md4 v-for="i in 3" :key="i" class="my-3 elevation-8">
            <v-card>
              <v-card-media
                :src="cards[i-1].src" height="200px"></v-card-media>
              <v-card-title primary-title>
                <div>
                  <h5 v-text="cards[i-1].title"></h5>
                  <div>
                    <span v-text="cards[i-1].desc"></span>
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
	</div>
</template>

<script>
export default {
  name: 'about',
	data () {
		return {
			msg: 'stored data',
      cards: [
        {title: '큐비콘 싱글 플러스', src: '../../static/img/bg1.jpg', desc: 'FDM 방식 3D Printer 5대'},
        {title: 'CNC 라우터', src: '../../static/img/bg2.jpg', desc: 'TinyCNC-3035C 1대'},
        {title: '작업 테이블', src: '../../static/img/bg3.jpg', desc: '예약 후 사용'},
      ]
		}
	}
}
</script>

<style scoped>
  .about-desc{
    font-size: 16px;
    font-weight: 400;
    line-height: 3;
    font-family: 'Noto Sans KR', sans-serif;
  }
  @media only screen and (max-width: 599px) {
    .about-desc{
      font-size: 12px;
      line-height: 1.5;
    }
  }
</style>
