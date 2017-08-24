<template>
  <div class="check view text-center">
    <v-container>
        <h2 class="text-center font-exo">Reservation</h2>
      <v-container>
        <v-layout row-md column>
            <v-flex md4 sm12>
              <v-date-picker
                v-model="focus"
                locale="ko-KR"
              ></v-date-picker>
            </v-flex>
            <v-flex md8 sm12 v-if="showTimeTable">
              <v-layout row>
                <v-flex md6 class="SFtable">
                  <v-layout row child-flex class="pa-0 my-1">
                    <v-card v-for="(item, j) in productId" :key="j" class="pa-1 my-1 mx-0">
                      <v-card-text class="pa-0">{{ item }}</v-card-text>
                    </v-card>
                  </v-layout>
                  <v-layout row child-flex class="pa-0 my-0"
                    v-for="i in 48" :key="i">
                    <v-card v-for="j in productId.length" :key="j" class="pa-1 mx-0 ">
                      <v-card-text class="caption pa-0"> </v-card-text>
                    </v-card>
                  </v-layout>
                </v-flex>
                <v-flex md6>
                  <v-layout column>
                    <v-flex>
                      <v-time-picker landscape v-model="fromTime"
                                     :scrollable="true" :allowed-minutes="grid">
                      </v-time-picker>
                    </v-flex>
                    <v-flex>
                      <v-time-picker landscape v-model="toTime"
                                     :scrollable="true" :allowed-minutes="grid">
                      </v-time-picker>
                    </v-flex>
                    <v-flex>
                      <v-btn lg flat @click="reserve">Submit</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
	name: 'check',
	props: ['date', 'user'],
	data () {
		return {
			focus: null,
			showTimeTable: true,
			dialog: true,
			retData: [],
			TimeTable: [],
			fromTime: null,
			toTime: null,
			productId: ["프린터 1", "프린터 2", "프린터 3", "프린터 4", "프린터 5"],
		}
	},
	created () {
		if (typeof(this.date) === 'string') {
		  this.focus = new Date(this.date.slice(0, 4),
														this.date.slice(4, 6) - 1,
														this.date.slice(6, 8),
														new Date().getHours())
			this.retTimeList
		}
	},
	methods: {
		retTimeList: function () {
			let xhr = new XMLHttpRequest()
			xhr.open('GET', '/api/item/' + this.focus.toJSON().slice(0, 10).replace(/-/g, ""))
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function () {
				let result = JSON.parse(xhr.responseText)
				if (result.hasOwnProperty('data')) {
					this.retData = result.data
					this.showTimeTable = true
				} else {
					this.retData = []
					alert('조회에 실패하였습니다.')
				}
			}
			xhr.send('{"_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
		},
		reserve: function () {
			let xhr = new XMLHttpRequest()
			xhr.open('POST', '/api/reserve/')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function () {
				let result = JSON.parse(xhr.responseText)
				if (result.success) alert('예약되었습니다.')
				else if (result.code === 0) alert('잘못된 시간값을 입력하셨습니다.')
				else if (result.code === 1) alert('해당 시간대를 이미 예약하셨습니다.')
				else if (result.code === 2) alert('다른 사람이 예약한 시간대입니다.\n다른 시간대를 예약해주세요.')
				else alert('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.')
				this.showTimeline
			}
			xhr.send('{"start": '+ this.fromTime +
							 ', "end": ' + this.toTime +
							 ', "itemId": ' + 0 + // TODO: itemID에 들어갈 값
							 ', "date": ' + this.showFocus.replace(/-/g, '') +
							 ', "people": "' + 0 + // TODO: people에 들어갈 값
							 '", "_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
		},
		showTimeline: function () {
			this.retTimeList
			for (item of this.retData) {
				// TODO: 받아온 데이터(retData)를 TimeTable로 변환하기
			}
		},
		changeFocus: function () {
			if (this.focus === null) {
				this.focus = this.dp
			}
		}
	},
	computed: {
	}
}
</script>

<style scoped>
  div .picker{
    margin: 0 auto;

  }
</style>
