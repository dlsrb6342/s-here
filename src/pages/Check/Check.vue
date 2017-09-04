<template>
	<div class="check view text-center">
		<v-container class="SFwide">
			<h2 class="text-center font-exo">Reservation</h2>
			<v-layout row-md column>
				<v-flex>
          <v-flex class="hidden-sm-and-up">
            <v-flex xs12>
              <v-btn fab flat small @click="getBefore_mon">
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>
              <span class="indigo--text text--darken-1 headline">{{ today | mon(month_index) }}</span>
              <v-btn fab flat small @click="getNext_mon">
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs12>
						<v-btn fab flat small @click="getBefore_day">
							<v-icon>keyboard_arrow_left</v-icon>
						</v-btn>
						<v-btn fab class="indigo darken-1 white--text title">{{ today | day(-1) }}</v-btn>
						<v-btn fab large class="indigo darken-1 white--text headline">{{ today | day }}</v-btn>
						<v-btn fab class="indigo darken-1 white--text title">{{ today | day(1) }}</v-btn>
						<v-btn fab flat small @click="getNext_day">
							<v-icon>keyboard_arrow_right</v-icon>
						</v-btn>
					</v-flex>
          </v-flex>
					<v-date-picker
	              v-model="focus"
	              locale="ko-KR" class="hidden-xs-only">
          </v-date-picker>
					<v-flex xs12>
						<v-btn @click.native="showTimeTable = !showTimeTable">showTT</v-btn>
						<v-btn @click.native="testDataset">testDS</v-btn>
						<v-btn @click.native="debugSet = !debugSet">showInside</v-btn>
					</v-flex>
				</v-flex>
				<transition name="slide-fade">
					<v-flex lg8 v-if="showTimeTable">
						<v-layout row-md column>
							<v-flex lg9 class="elevation-10 white px-2 SFtable">
								<v-layout row child-flex class="pa-0 my-1">
									<v-card v-for="(item, j) in productId" :key="j" class="pa-1 my-1 mx-0">
										<v-card-text class="pa-0">{{ item }}</v-card-text>
									</v-card>
								</v-layout>
								<v-layout row child-flex class="pa-0 my-0" v-for="i in 48" :key="i">
									<v-card v-for="j in productId.length" :key="j" @mousedown="mouseDown(i, j)" @mouseup="mouseUp(i, j)" @mouseenter="mouseDrag(i, j)" @touchend="touchDetect(i, j)" class="pa-1 mx-0 " :class="TimeTable[(i-1) * productId.length + j - 1]">
										<v-card-text class="caption pa-0">{{ debugSet ? TimeTable[(i-1) * productId.length + j - 1] : '' }}</v-card-text>
									</v-card>
								</v-layout>
							</v-flex>
							<v-flex lg3>
								<v-btn primary dark @click.native.stop="dialog = true">dialog</v-btn>
								<v-dialog v-model="dialog">
									<v-card class="">
										<v-card-text>
											<v-flex class="pa-3 SFtimepicker">
												시작시간
												<vue-timepicker hide-clear-button :minute-interval="30" :format="myFormat" v-model="defaultStartTime"></vue-timepicker>
											</v-flex>
											<v-flex class="pa-3">
												종료시간
												<vue-timepicker hide-clear-button :minute-interval="30" :format="myFormat" v-model="defaultEndTime"></vue-timepicker>
											</v-flex>
											<v-flex class="pa-3">
												대여인원
												<v-select v-bind:items="people" overflow label="1-6"></v-select>
											</v-flex>
										</v-card-text>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn flat class="indigo--text" @click="reserve">Submit</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-flex>
						</v-layout>
					</v-flex>
				</transition>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import moment from 'moment'
export default {
	name: 'check',
	components: { VueTimepicker },
	props: ['date', 'user'],
	filters: {
		day: function(val, i) {
			if (val) {
				return moment(val).add(i, 'd').format('DD')
			}
		},
		mon: function(val, i) {
			if (val) {
				return moment(val).add(i, 'M').format('MM')
			}
		}
	},
	data() {
		return {
			focus: null,
			showTimeTable: true,
			dialog: false,
			errMessage: '',
			retData: [],
			TimeTable: [],
			selectItem: null,
			fromTime: null,
			dragTime: null,
			toTime: null,
			touching: false,
			productId: ['print 1', 'print 2', 'print 3'],
			productName: ['print 1', 'print 2', 'print 3'],
			people: ['1', '2', '3', '4', '5', '6'],
			today: new Date(),
			date_index: 0,
			month_index: 0,
			Day: null,
			defaultStartTime: {
				HH: '09',
				mm: '00',
			},
			defaultEndTime: {
				HH: '11',
				mm: '00',
			},
			myFormat: 'HH:mm',
			debugSet: false,
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
		goPage: function(goMessage) { this.$router.push(goMessage) },
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
				else if (result.code === 1) alert('해당 시간대에 다른 프린터를 이미 예약하셨습니다.')
				else if (result.code === 2) alert('다른 사람이 예약한 시간대입니다.\n다른 시간대를 예약해주세요.')
				else alert('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.')
				this.showTimeline
			}
			xhr.send('{"start": ' + this.fromTime +
				', "end": ' + this.toTime +
				', "itemId": ' + 0 + // TODO: itemID에 들어갈 값
				', "date": ' + this.showFocus.replace(/-/g, '') +
				//', "people": "' + 0 +  TODO: people에 들어갈 값
				'", "_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
		},
		showTimeline: function() {
			this.retTimeList
			this.TimeTable = []
			for (let i = 0; i < 48 * this.productId.length; i++) {
				this.TimeTable.push({
					'grey': false,
					'red': false,
				})
			}
			/*
			for (item of this.retData) {
				this.productId.push(item._id)
				this.productName.push(item.name)
				for (time of item.occupied) {
					this.TimeTable[time * productId.length + item._id].grey = true
				}
			}*/
		},
		testDataset: function() {
			this.TimeTable = []
			for (let i in [...Array(this.productId.length * 48).keys()]) this.TimeTable.push({})
		},
		detectFocus: function() {
			if (this.focus !== null) this.showTimeline
		},
		mouseDown: function(time, item) {
			this.touching = true
			this.fromTime = this.dragTime = time - 1
			this.selectItem = item - 1
			this.testDataset()
			this.TimeTable[(time - 1) * this.productId.length + (item - 1)]['red lighten-2'] = true
			console.log('mouseDown on ' + time + ', ' + item)
		},
		mouseDrag: function(time, item) {
			if (this.touching) {
				if (this.dragTime < this.fromTime) { // up
					if (this.dragTime < time) {
						// mouse goes down, delete class
						this.dragTime * this.productId.length
						this.TimeTable[this.dragTime * this.productId.length + this.selectItem]['red lighten-4'] = false
						console.log('mouseDrag on (' + time + ', ' + this.dragTime + ', ' + item + ') and is (up, down)')
					} else {
						// mouse goes up, add class
						this.TimeTable[(time - 1) * this.productId.length + this.selectItem]['red lighten-4'] = true
						console.log('mouseDrag on (' + time + ', ' + this.dragTime + ', ' + item + ') and is (up, up)')
					}
				} else if (this.dragTime > this.fromTime) { // down
					if (this.dragTime < time) {
						// mouse goes down, add class
						this.TimeTable[(time - 1) * this.productId.length + this.selectItem]['red lighten-4'] = true
						console.log('mouseDrag on (' + time + ', ' + this.dragTime + ', ' + item + ') and is (down, down)')
					} else {
						// mouse goes up, delete class
						this.TimeTable[this.dragTime * this.productId.length + this.selectItem]['red lighten-4'] = false
						console.log('mouseDrag on (' + time + ', ' + this.dragTime + ', ' + item + ') and is (down, up)')
					}
				} else {
					this.TimeTable[(time - 1) * this.productId.length + this.selectItem]['red lighten-4'] = true
					console.log('mouseDrag on (' + time + ', ' + this.dragTime + ', ' + item + ') and is (down, down)')
				}
				this.dragTime = time - 1
			}
		},
		mouseUp: function(time, item) {
			this.touching = false
			this.TimeTable[(time - 1) * this.productId.length + (item - 1)]['red lighten-2'] = false
			this.TimeTable[(time - 1) * this.productId.length + (item - 1)]['green lighten-2'] = true
			console.log('mouseUp on ' + time + ', ' + item)
		},
		touchDetect: function(time, item) {
			// detect @touchend for touching such things
			if (touching) {
				touching = false
				// TODO: touch mouseDown simulation
			} else {
				touching = true
				// TODO: touch mouseUp simulation
			}
		},
		getBefore_day: function() {
			this.today = moment(this.today).subtract(1, 'd')
		},
		getNext_day: function() {
      this.today = moment(this.today).add(1, 'd')
		},
		getBefore_mon: function() {
      this.today = moment(this.today).subtract(1, 'M')
		},
		getNext_mon: function() {
      this.today = moment(this.today).add(1, 'M')
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
