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
					<v-date-picker actions v-model="focus" locale="ko-KR" class="hidden-xs-only" @click.native="retTimeList()"></v-date-picker>
					<v-flex xs12 v-show="isDebug">
						<v-btn @click.native="testDataset">DATASET</v-btn>
						<v-btn @click.native="showStyl = !showStyl">SHOW TEXT</v-btn>
						<v-btn @click.native="touchDevice = !touchDevice">TOGGLE TOUCH</v-btn>
						<v-btn primary dark @click.native.stop="dialog = true">dialog</v-btn>
						<br>
						{{ selToTimeMin }}
					</v-flex>
				</v-flex>
				<transition name="slide-fade">
					<v-flex lg8>
						<v-layout row-md column>
							<v-flex lg9 class="elevation-10 white px-2 SFtable">
								<v-layout row child-flex class="pa-0 my-1">
									<v-card v-for="(item, j) in productName" :key="j" class="pa-1 my-1 mx-0">
										<v-card-text class="pa-0">{{ item }}</v-card-text>
									</v-card>
								</v-layout>
								<v-layout row child-flex class="pa-0 my-0" v-for="i in 48" :key="i">
									<v-card v-for="j in productName.length" :key="j" @touchend="touchDetect(i-1,j-1)" @mousedown="mouseDown(i-1,j-1)" @mouseup="mouseUp(i-1)" @mouseenter="mouseDrag(i-1,j-1)" class="pa-1 mx-0 " :class="classInfo(i-1,j-1)" style="-ms-user-select: none;-moz-user-select: -moz-none;-khtml-user-select: none;-webkit-user-select: none;user-select: none;">
										<v-card-text class="caption pa-0">{{ showStyl ? TimeTable[(i-1)*productName.length+j-1] : '' }}{{showStyl ? ' '+((i-1)*productName.length+j-1) : ''}}</v-card-text>
									</v-card>
								</v-layout>
							</v-flex>
							<v-dialog v-model="dialog" width="480" persistent>
								<v-card>
									<v-card-title class="headline text-md-center">{{ productName[selectItem] }}</v-card-title>
									<v-card-text>
										<!--
												<v-flex class="pa-3 SFtimepicker">
													시작시각
													<vue-timepicker hide-clear-button :minute-interval="30" :format="myFormat" v-model="defaultStartTime"></vue-timepicker>
												</v-flex>
												<v-flex class="pa-3">
													사용시간
													<v-slider v-model="toTime" v-bind:min="1" v-bind:max="12" step="1" thumb-label snap></v-slider>
	                        <span class="text-center">{{ toTime * 0.5 }} 시간</span>
												</v-flex>
	                      <v-flex class="px-3">
	                        <multiselect v-model="value"
	                                     track-by="ID"
	                                     label="ID"
	                                     placeholder='search memeber ID'
	                                     select-label="check"
	                                     deselect-label="remove"
	                                     :max="6"
	                                     :max-height="110"
	                                     :hide-selected="true"
	                                     :close-on-select="false"
	                                     :multiple="true"
	                                     :options="people"></multiselect>
	                      </v-flex>
												-->
										<v-layout row wrap>
											<v-flex xs5><v-select label="시작 시각" :items="hourItems" v-model="selFromTimeHour" item-text="hour"></v-select></v-flex>
											<v-flex xs5><v-select :items="minItems" v-model="selFromTimeMin" item-text="min"></v-select></v-flex>
											<v-flex xs2><v-card-text class="subheading">부터</v-card-text></v-flex>
											<v-flex xs5><v-select label="종료 시각" :items="hourItems" v-model="selToTimeHour" item-text="hour"></v-select></v-flex>
											<v-flex xs5><v-select :items="minItems" v-model="selToTimeMin" item-text="min"></v-select></v-flex>
											<v-flex xs2><v-card-text class="subheading">까지</v-card-text></v-flex>
											<v-flex xs9><v-slider label="사용시간" :max="47-fromTime" :min='1' v-model="duration"></v-slider></v-flex>
											<v-flex xs3><v-card-text class="subheading">{{ parseInt(duration/2) == 0 ? '' : parseInt(duration/2)+'시간'}}{{ duration % 2 == 0 ? '00' : '30'}}분</v-card-text></v-flex>
											<v-flex xs12>
												<!-- TODO: 사용자 목록 생성 -->
											</v-flex>
										</v-layout>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn flat class="indigo--text" @click.native="dialog = false">CANCEL</v-btn>
										<v-btn flat class="indigo--text" @click.native="reserve">SUBMIT</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-layout>
					</v-flex>
				</transition>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import moment from 'moment'
export default {
	name: 'check',
	props: ['date', 'user'],
	filters: {
		day: (val, i) => val ? moment(val).add(i, 'd').format('DD') : undefined,
		mon: (val, i) => val ? moment(val).add(i, 'M').format('MM') : undefined
	},
	data() {
		return {
			focus: null,
			dialog: false,
			retData: [],
			TimeTable: [],
			selectItem: null,
			fromTime: null,
			toTime: null,
			duration: null,
			touching: false,
			touchDevice: false,
			collision: false,
			productName: ['print 1', 'print 2', 'print 3'],
			value: null,
			hourItems: [
				{ hour: '오전 12시', value: 0 }, { hour: '오전 01시', value: 2 }, { hour: '오전 02시', value: 4 },
				{ hour: '오전 03시', value: 6 }, { hour: '오전 04시', value: 8 }, { hour: '오전 05시', value: 10 },
				{ hour: '오전 06시', value: 12 }, { hour: '오전 07시', value: 14 }, { hour: '오전 08시', value: 16 },
				{ hour: '오전 09시', value: 18 }, { hour: '오전 10시', value: 20 }, { hour: '오전 11시', value: 22 },
				{ hour: '오후 12시', value: 24 }, { hour: '오후 01시', value: 26 }, { hour: '오후 02시', value: 28 },
				{ hour: '오후 03시', value: 30 }, { hour: '오후 04시', value: 32 }, { hour: '오후 05시', value: 34 },
				{ hour: '오후 06시', value: 36 }, { hour: '오후 07시', value: 38 }, { hour: '오후 08시', value: 40 },
				{ hour: '오후 09시', value: 42 }, { hour: '오후 10시', value: 44 }, { hour: '오후 11시', value: 46 }
			],
			minItems: [
				{ min: '00분', value: 0 },
				{ min: '30분', value: 1 },
			],
			people: [
				// TODO: 사용자 목록 생성
				{ name: '김기환', ID: '2013314573' },
				{ name: '박문기', ID: '2012315373' },
				{ name: '지지민', ID: '2011314583' },
				{ name: '박수아', ID: '2014322573' },
				{ name: '모정수', ID: '2015314573' },
				{ name: '이은영', ID: '2015314573' },
			],
			today: new Date(),
			date_index: 0,
			month_index: 0,
			Day: null,
			selFromTimeHour: { hour: '오전 12시', value: 0 },
			selFromTimeMin: { min: '00분', value: 0 },
			selToTimeHour: { hour: '오전 12시', value: 0 },
			selToTimeMin: { min: '00분', value: 0 },
			myFormat: 'HH:mm',
			showStyl: false,
			isDebug: true,
		}
	},
	watch: {
		selFromTimeMin: function (val) { this.fromTime = this.selFromTimeHour.value + this.selFromTimeMin.value },
		selToTimeMin: function (val) { this.toTime = this.selToTimeHour.value + this.selToTimeMin.value },
		duration: function(val) {
			this.selToTimeHour = this.hourItems[parseInt((this.fromTime+val)/2)]
			this.selToTimeMin = this.minItems[(this.fromTime+val)%2]
		},
	},
	created() {
		for (let i in [...Array(this.productName.length * 48).keys()]) this.TimeTable.push({ state: 'notload' })
		if (typeof (this.date) === 'string') {
			this.focus = new Date(this.date.slice(0, 4),
				this.date.slice(4, 6) - 1,
				this.date.slice(6, 8),
				new Date().getHours())
			this.showTimeline()
		}
	},
	methods: {
		retTimeList: function() {
			if (this.focus !== null) {
				let xhr = new XMLHttpRequest(), self = this
				xhr.open('GET', '/api/item/' + this.focus.slice(0, 10).replace(/-/g, ""))
				xhr.setRequestHeader("Content-type", "application/json")
				xhr.onreadystatechange = function() {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						let result = JSON.parse(xhr.responseText)
						if (result.data !== undefined) this.retData = result.data
						else {
							self.retData = []
							switch (result.code) {
								case -3:
									self.$emit('snackbar', '로그인 하셔야만 이용하실 수 있습니다.', 'error')
									break
								default:
									self.$emit('snackbar', '조회에 실패하였습니다.', 'warning')
							}
						}
					}
				}
				xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
			}
		},
		reserve: function() {
			let xhr = new XMLHttpRequest(), self = this
			xhr.open('POST', '/api/reserve/')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					let result = JSON.parse(xhr.responseText)
					if (result.hasOwnProperty('success')) self.$emit('snackbar', '예약되었습니다.', 'success')
					else if (result.code === 0) self.$emit('snackbar', '잘못된 시간값을 입력하셨습니다.', 'error')
					else if (result.code === 1) self.$emit('snackbar', '해당 시간대에 다른 프린터를 이미 예약하셨습니다.', 'error')
					else if (result.code === 2) self.$emit('snackbar', '다른 사람이 예약한 시간대입니다.<br>다른 시간대를 예약해주세요.', 'error')
					else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'warning')
					self.showTimeline()
				}
			}
			xhr.send(JSON.stringify({
				start: this.fromTime,
				end: this.toTime,
				itemId: this.selectItem,
				date: this.focus.replace(/-/g, ''),
				people: [], // TODO: 사용자 목록 생성
				_csrf: document.cookie.split("_csrf=")[1]
			}))
		},
		showTimeline: function() {
			this.retTimeList()
			this.TimeTable = []
			for (let i in [...Array(this.productName.length * 48).keys()]) this.TimeTable.push({ state: 'empty' })
			for (item of this.retData) {
				this.productName.push(item._id)
				this.productName.push(item.name)
				for (time of item.occupied) {
					this.TimeTable[time * productName.length + item._id].state = 'occupied'
				}
			}
		},
		testDataset: function() {
			this.TimeTable = []
			for (let i in [...Array(this.productName.length * 48).keys()]) this.TimeTable.push({ state: 'empty' })
			for (let i = 0; i < this.productName.length; i++) {
				let [j, max] = [Math.floor(Math.random() * 48), Math.floor(Math.random() * 48)].sort()
				for (; j < max; j++) this.TimeTable[j * this.productName.length + i].state = 'occupied'
			}
		},
		mouseDown: function(time, item) {
			if (!this.touchDevice) {
				this.touching = true
				this.fromTime = time
				this.selectItem = item
				for (let i in [...Array(this.productName.length * 48).keys()]) if (this.TimeTable[i].state !== 'occupied' && this.TimeTable[i].state !== 'notload') this.TimeTable[i].state = 'empty'
				if (this.TimeTable[time * this.productName.length + item].state !== 'occupied' && this.TimeTable[time * this.productName.length + item].state !== 'notload') this.TimeTable[time * this.productName.length + item].state = 'clickFrom'
			}
		},
		mouseDrag: function(time, item) {
			if (this.touching && !this.touchDevice) {
				for (let i in [...Array(this.productName.length * 48).keys()]) { if (this.TimeTable[i].state === 'clickDrag') this.TimeTable[i].state = 'empty' }
				if (this.fromTime < time) {
					for (let i = this.fromTime + 1; i < time + 1; i++) {
						if (this.TimeTable[i * this.productName.length + this.selectItem].state === 'empty') this.TimeTable[i * this.productName.length + this.selectItem].state = 'clickDrag'
						else if (this.TimeTable[i * this.productName.length + this.selectItem].state === 'occupied' || this.TimeTable[i * this.productName.length + this.selectItem].state === 'notload') this.collision = true
					}
				}
				else if (this.fromTime > time) {
					for (let i = this.fromTime - 1; i > time - 1; i--) {
						if (this.TimeTable[i * this.productName.length + this.selectItem].state === 'empty') this.TimeTable[i * this.productName.length + this.selectItem].state = 'clickDrag'
						else if (this.TimeTable[i * this.productName.length + this.selectItem].state === 'occupied' || this.TimeTable[i * this.productName.length + this.selectItem].state === 'notload') this.collision = true
					}
				}
			}
		},
		mouseUp: function(time) {
			if (!this.touchDevice) {
				this.touching = false
				if (!this.collision && this.TimeTable[time * this.productName.length + this.selectItem].state !== 'occupied' && this.TimeTable[time * this.productName.length + this.selectItem].state !== 'notload') {
					this.TimeTable[time * this.productName.length + this.selectItem].state = 'clickTo'
					this.toTime = time
					if (this.fromTime > this.toTime)[this.fromTime, this.toTime] = [this.toTime, this.fromTime]
					this.fromTimeChanged()
					this.toTimeChanged()
					this.dialog = true
				}
				else {
					this.$emit('snackbar', this.TimeTable === [] ? '다른 사람이 예약한 시간대와 겹칩니다.<br>다른 시간대를 선택해 주세요.' : '날짜를 선택해 주세요.', this.TimeTable === [] ? 'error' : 'info')
					for (let i in [...Array(this.productName.length * 48).keys()]) if (this.TimeTable[i].state !== 'occupied' && this.TimeTable[i].state !== 'notload') this.TimeTable[i].state = 'empty'
					this.collision = false
				}
			}
		},
		touchDetect: function(time, item) {
			this.touchDevice = true
			if (this.touching) {
				if (this.fromTime < time) {
					for (let i = this.fromTime + 1; i < time; i++) {
						if (this.TimeTable[i * this.productName.length + this.selectItem].state === 'empty') this.TimeTable[i * this.productName.length + this.selectItem].state = 'clickDrag'
						else if (this.TimeTable[i * this.productName.length + this.selectItem].state === 'occupied' || this.TimeTable[i * this.productName.length + this.selectItem].state === 'notload') this.collision = true
					}
				}
				else if (this.fromTime > time) {
					for (let i = this.fromTime - 1; i > time; i--) {
						if (this.TimeTable[i * this.productName.length + this.selectItem].state === 'empty') this.TimeTable[i * this.productName.length + this.selectItem].state = 'clickDrag'
						else if (this.TimeTable[i * this.productName.length + this.selectItem].state === 'occupied' || this.TimeTable[i * this.productName.length + this.selectItem].state === 'notload') this.collision = true
					}
				}
				if (!this.collision && this.TimeTable[time * this.productName.length + this.selectItem].state !== 'occupied' && this.TimeTable[time * this.productName.length + this.selectItem].state !== 'notload') {
					this.TimeTable[(time) * this.productName.length + this.selectItem].state = 'clickTo'
					this.toTime = time
					if (this.fromTime > this.toTime)[this.fromTime, this.toTime] = [this.toTime, this.fromTime]
					this.fromTimeChanged()
					this.toTimeChanged()
					this.dialog = true
				} else {
					this.$emit('snackbar', this.TimeTable === [] ? '다른 사람이 예약한 시간대와 겹칩니다.<br>다른 시간대를 선택해 주세요.' : '날짜를 선택해 주세요.', this.TimeTable === [] ? 'error' : 'info')
					for (let i in [...Array(this.productName.length * 48).keys()]) if (this.TimeTable[i].state !== 'occupied' && this.TimeTable[i].state !== 'notload') this.TimeTable[i].state = 'empty'
					this.collision = false
				}
				this.touching = false
			} else {
				this.fromTime = time
				this.selectItem = item
				for (let i in [...Array(this.productName.length * 48).keys()]) if (this.TimeTable[i].state !== 'occupied' && this.TimeTable[i].state !== 'notload') this.TimeTable[i].state = 'empty'
				if (this.TimeTable[time * this.productName.length + item].state !== 'occupied' && this.TimeTable[time * this.productName.length + item].state !== 'notload') {
					this.TimeTable[time * this.productName.length + item].state = 'clickFrom'
					this.touching = true
				} else this.$emit('snackbar', this.TimeTable === [] ? '다른 사람이 예약한 시간대와 겹칩니다.<br>다른 시간대를 선택해 주세요.' : '날짜를 선택해 주세요.', this.TimeTable === [] ? 'error' : 'info')
			}
		},
		classInfo: function(i, j) {
			switch (this.TimeTable[i * this.productName.length + j].state) {
				case 'notload':
				case 'occupied':
					return { 'grey lighten-2': true }
				case 'clickFrom':
					return { 'red lighten-3': true, 'elevation-3': true }
				case 'clickDrag':
					return { 'red lighten-4': true, 'elevation-3': true }
				case 'clickTo':
					return { 'red lighten-3': true, 'elevation-3': true }
				default:
					return {}
			}
		},
		getBefore_day: function() { this.today = moment(this.today).subtract(1, 'd') },
		getNext_day: function() { this.today = moment(this.today).add(1, 'd') },
		getBefore_mon: function() { this.today = moment(this.today).subtract(1, 'M') },
		getNext_mon: function() { this.today = moment(this.today).add(1, 'M') },
		querySelections: function() {
			// TODO: 사용자 목록 생성
		},
		fromTimeChanged: function() {
			this.selFromTimeHour = this.hourItems[parseInt(this.fromTime/2)]
			this.selFromTimeMin = this.minItems[this.fromTime%2]
		},
		toTimeChanged: function(val) {
			this.selToTimeHour = this.hourItems[parseInt(this.toTime/2)]
			this.selToTimeMin = this.minItems[this.toTime%2]
		},
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
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>
