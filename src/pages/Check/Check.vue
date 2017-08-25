<template>
	<div class="check view text-center">
		<h2 class="text-center font-exo">Reservation</h2>
		<v-container hidden-sm-and-up>
			<!-- 휴대폰용 UI 부분-->
		</v-container>
		<v-container hidden-xs-only hidden-md-and-up>
			<!-- 패블릿용 UI 부분 -->
		</v-container>
		<v-container>
			<!-- 데스크톱용 UI -->
			<v-layout row>
				<v-flex xs4>
					<v-date-picker v-model="focus" locale="ko-KR" @click.native="detectFocus"></v-date-picker>
					{{ this.focus }} 
					<v-btn @click.native="showTimeTable = !showTimeTable">???</v-btn>
				</v-flex>
				<transition name="slide-fade">
					<v-flex xs8 v-show="showTimeTable">
						<v-layout row child-flex class="pa-0 my-1">
							<v-card v-for="(item, j) in productId" :key="j" class="pa-1 my-1 mx-0">
								<v-card-text class="pa-0">{{ item }}</v-card-text>
							</v-card>
						</v-layout>
						<v-layout row child-flex class="pa-0 my-0" v-for="i in 48" :key="i">
							<v-card v-for="j in productId.length" :key="j" class="pa-1 mx-0 ">
								<v-card-text @mousedown="setFromTime(i,j)" @mouseup="this.toTime = i" @touchend="touchDetect(i, j)" class="pa-2"></v-card-text>
							</v-card>
						</v-layout>
					</v-flex>
				</transition>
				<v-dialog>
					
				</v-dialog>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'check',
	props: ['date', 'user'],
	data() {
		return {
			focus: null,
			showTimeTable: false,
			dialog: true,
			retData: [],
			TimeTable: [],
			selectItem: null,
			fromTime: null,
			toTime: null,
			touching: false,
			productId: ["P1", "P2", "P3", "P4", "P5", "T1", "T2", "T3", "T4", "D1", "D2", "D3", "D4", "D5", "D6", "D1", "D2", "D3", "D4", "D5", "D6"],
		}
	},
	created() {
		if (typeof (this.date) === 'string') {
			this.focus = new Date(this.date.slice(0, 4),
				this.date.slice(4, 6) - 1,
				this.date.slice(6, 8),
				new Date().getHours())
			this.retTimeList
		}
	},
	methods: {
    goPage: function (goMessage) { this.$router.push(goMessage) },
		retTimeList: function() {
			this.showTimeTable = true
			let xhr = new XMLHttpRequest()
			xhr.open('GET', '/api/item/' + this.focus.toJSON().slice(0, 10).replace(/-/g, ""))
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
				let result = JSON.parse(xhr.responseText)
				if (result.hasOwnProperty('data')) {
					this.retData = result.data
				} else {
					this.retData = []
					alert('조회에 실패하였습니다.')
				}
			}
			xhr.send('{"_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
		},
		reserve: function() {
			let xhr = new XMLHttpRequest()
			xhr.open('POST', '/api/reserve/')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
				let result = JSON.parse(xhr.responseText)
				if (result.success) alert('예약되었습니다.')
				else if (result.code === 0) alert('잘못된 시간값을 입력하셨습니다.')
				else if (result.code === 1) alert('해당 시간대를 이미 예약하셨습니다.')
				else if (result.code === 2) alert('다른 사람이 예약한 시간대입니다.\n다른 시간대를 예약해주세요.')
				else alert('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.')
				this.showTimeline
			}
			xhr.send('{"start": ' + this.fromTime +
				', "end": ' + this.toTime +
				', "itemId": ' + 0 + // TODO: itemID에 들어갈 값
				', "date": ' + this.showFocus.replace(/-/g, '') +
				', "people": "' + 0 + // TODO: people에 들어갈 값
				'", "_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
		},
		showTimeline: function() {
			this.retTimeList
			for (item of this.retData) {
				// TODO: 받아온 데이터(retData)를 TimeTable로 변환하기
			}
		},
		detectFocus: function() {
			if (this.focus !== null) this.retTimeList
		},
		setFromTime: function (i, j) {
			this.selectItem = j
			this.fromTime = i
		},
		touchDetect: function (i, j) {
			if (this.touching) {
				this.toTime = i
			} else {
				this.selectItem = j
				this.fromTime = i
			}
			this.touching = !this.touching
		}
	},
	computed: {
	}
}
</script>

<style scoped>
div .picker {
	margin: 0 auto;
}

.slide-fade-enter-active {
	transition: all .2s ease;
}

.slide-fade-leave-active {
	transition: all .2s cubic-bezier(.1, .9, .1, .9);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */

{
	transform: translateX(20px);
	opacity: 0;
}
</style>
