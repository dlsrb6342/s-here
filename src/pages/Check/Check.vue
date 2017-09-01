<template>
  <div class="check view text-center">
    <v-container class="SFwide">
        <h2 class="text-center font-exo">Reservation</h2>
        <v-layout row-md column>
            <v-flex>
              <v-flex xs12>
                <v-btn fab flat small @click="getBefore_mon"><v-icon>keyboard_arrow_left</v-icon></v-btn>
                <span class="indigo--text text--darken-1 headline">{{ today | mon(month_index) }}</span>
                <v-btn fab flat small @click="getNext_mon"><v-icon>keyboard_arrow_right</v-icon></v-btn>
              </v-flex>
              <v-flex xs12>
                <v-btn fab flat small @click="getBefore_day"><v-icon>keyboard_arrow_left</v-icon></v-btn>
                <v-btn fab class="indigo darken-1 white--text title">{{ today | day(date_index-1) }}</v-btn>
                <v-btn fab large class="indigo darken-1 white--text headline">{{ today | day(date_index) }}</v-btn>
                <v-btn fab class="indigo darken-1 white--text title">{{ today | day(date_index + 1) }}</v-btn>
                <v-btn fab flat small @click="getNext_day"><v-icon>keyboard_arrow_right</v-icon></v-btn>
              </v-flex>
            <!--<v-date-picker
              v-model="focus"
              locale="ko-KR"
            ></v-date-picker>-->
              <v-flex xs12>
                <v-btn @click.native="showTimeTable = !showTimeTable">???</v-btn>
                <v-btn @click.native="productId = ['10', '20']">add item</v-btn>
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
                  <v-layout row child-flex class="pa-0 my-0"
                    v-for="i in 48" :key="i">
                    <v-card v-for="j in productId.length" :key="j" @mousedown="setFromTime" class="pa-1 mx-0 ">
                      <v-card-text class="caption pa-0"> </v-card-text>
                    </v-card>
                  </v-layout>
                </v-flex>
                <v-flex lg3>
                  <v-btn primary dark @click.naive.stop="dialog = true">dialog</v-btn>
                  <v-dialog v-model="dialog">
                    <v-card class="">
                      <v-card-text>
                        <v-flex class="pa-3 SFtimepicker">
                          시작시간
                          <vue-timepicker hide-clear-button :minute-interval="30" :format="myFormat"
                                          v-model="defaultStartTime"></vue-timepicker>
                        </v-flex>
                        <v-flex class="pa-3">
                          종료시간
                          <vue-timepicker hide-clear-button :minute-interval="30" :format="myFormat"
                                          v-model="defaultEndTime"></vue-timepicker>
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
  filters:{
	  day: function(val, i){
	    if(val){
	      return moment(val).add(i, 'd').format('DD')
      }
    },
    mon: function(val, i){
      if(val){
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
			for (let i = 0; i < 48; i++) {
				let tmpArray = []
				for (let j = 0; j < productId.length; j++) {
					tmpArray.push({
						'grey': false,
						'red': false,
					})
				}
				this.TimeTable.push(tmpArray)
			}
			for (item of this.retData) {
				this.productId.push(item._id)
				this.productName.push(item.name)
				for (time of item.occupied) {
					this.TimeTable[time][item._id]['grey'] = true
				}
			}
		},
		detectFocus: function() {
			if (this.focus !== null) this.showTimeline
		},
		setFromTime: function(i, j) {
			this.selectItem = j
			this.fromTime = i
			this.TimeTable[i][j]['red'] = true
		},
		setToTime: function(i) {
			this.toTime = i
			for (let c = this.fromTime; c <= this.toTime; c++) this.TimeTable[c][this.selectItem]['red'] = true
		},
		drag: function(i, j) {
			this.TimeTable[i][j]['red'] = !this.TimeTable[i][j]['red']
		},
		touchDetect: function(i, j) {
			if (this.touching) {
				this.toTime = i
			} else {
				this.selectItem = j
				this.fromTime = i
				alert('yes')
			}
			this.touching = !this.touching
		},
    getBefore_day: function() {
      this.date_index -= 1
    },
    getNext_day: function() {
      this.date_index += 1
    },
    getBefore_mon: function() {
      this.month_index -= 1
    },
    getNext_mon: function() {
      this.month_index += 1
    }
	},
	computed: {
		classInfo: function (i, j) {

		},
		fromTimeItems: function() {
			return []
		},
		toTimeItems: function() {
			return []
		}
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
