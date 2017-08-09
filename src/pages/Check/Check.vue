<template>
	<div class="check view">
		예약 현황<br>
		<div id="calendar">
			<center>
				<table class="table-condensed table-bordered table-striped">
					<thead>
						<tr>
							<th colspan="7">
								<center>
									<a class="btn" @click="changeMonth(-1)"><i class="icon-chevron-left"><</i></a>
									<a class="btn">{{ showFocus }}</a>
									<a class="btn" @click="changeMonth(1)"><i class="icon-chevron-right">></i></a>
								</center>
							</th>
						</tr>
						<tr>
							<th><center>일</center></th>
							<th><center>월</center></th>
							<th><center>화</center></th>
							<th><center>수</center></th>
							<th><center>목</center></th>
							<th><center>금</center></th>
							<th><center>토</center></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(week, index) in calendar" :key="index">
							<td v-for="(day, index2) in week" :key="index2" :title="day">
								<a class="btn" v-show="day[1]" @click="changeFocus(day)">{{ day[0] }}</a>
								<a class="btn muted" v-show="!day[1]" @click="changeFocus(day)">{{ day[0] }}</a>
							</td>
						</tr>
					</tbody>
				</table>
				<a class="btn" @click="showTimeline">{{ showFocus }} 일정 확인하기</a>
				<a class="btn" @click="showTimeline" style="padding: 6px 6px 6px 6px;"><img src="../../assets/refresh/refresh.svg" width=18 height=18></a>
				<transition name="fade">
						<div v-if="showTimeTable" min-height="3">
							<table class="table-condensed table-bordered table-striped">
								<thead>
									<tr>
										<th style="font-size: 12px;" v-for="(item, index) in this.retData" :key="index">{{ this.item.name }}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(i1, index1) in Array(48)" :key="index1">
										<td v-for="(i2, index2) in Array(7)" :key="index2"></td>
									</tr>
								</tbody>
							</table>
							<a class="btn" @click="reserve">해당 시각 예약하기</a>
						</div>
					</transition>
			</center>
		</div>
	</div>
</template>

<script>
export default {
	name: 'check',
	props: ['date', 'user'],
	data () {
		return {
			calendar: [[[null, true], [null, true], [null, true], [null, true], [null, true], [null, true], [null, true]],
								 [[null, true], [null, true], [null, true], [null, true], [null, true], [null, true], [null, true]],
								 [[null, true], [null, true], [null, true], [null, true], [null, true], [null, true], [null, true]],
								 [[null, true], [null, true], [null, true], [null, true], [null, true], [null, true], [null, true]],
								 [[null, true], [null, true], [null, true], [null, true], [null, true], [null, true], [null, true]],
								 [[null, true], [null, true], [null, true], [null, true], [null, true], [null, true], [null, true]],],
			focus: new Date(),
			showTimeTable: false,
			retData: [],
			TimeTable: [],
		}
	},
	created () {
		if (typeof(this.date) === 'string') {
			if (this.date.length == 8) this.focus = new Date(this.date.slice(0,4), this.date.slice(4,6)-1, this.date.slice(6,8), new Date().getHours())
		}
		this.drawCalendar
	},
	methods: {
		changeToday: function () { this.focus = new Date() },
		changeFocus: function (date) {
			let res = new Date(this.focus.getFullYear(), this.focus.getMonth(), date[0], this.focus.getHours())
			this.focus = res
			if (date[1] === false) {
				if (date[0] < 15) res.setMonth(this.focus.getMonth() + 1)
				else res.setMonth(this.focus.getMonth() - 1)
				this.drawCalendar
			}
		},
		changeMonth: function (delta) {
			let res = new Date()
			res.setDate(this.focus.getDate())
			res.setFullYear(this.focus.getFullYear())
			res.setMonth(this.focus.getMonth() + delta)
			this.focus = res
			this.drawCalendar
		},
		retTimeList: function () {
			let xhr = new XMLHttpRequest()
			xhr.open('GET', '/api/item/'+this.focus.toJSON().slice(0,10).replace(/-/g,""))
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function () {
				let result = JSON.parse(xhr.responseText)
				
				if (result.hasOwnProperty('data')) {
					this.retData = result.data
					this.showTimeTable = true
					/*
					for (data of result['data']) {
						this.retData.push(data)
					}
					*/
				}
				else {
					alert('조회에 실패하였습니다.')
					this.retData = []
					this.showTimeTable = false
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
				if (result.hasOwnProperty('success')) alert('예약되었습니다.')
				else {
					switch (result.code) {
						case 0:
						alert('잘못된 시간값을 입력하셨습니다.')
						break
						case 1:
						alert('이미 예약한 시간대입니다.')
						break
						case 2:
						alert('다른 사람이 예약한 시간대입니다.\n다른 시간대를 예약해주세요.')
						break
						default:
						alert('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.')
					}
				}
				this.showTimeline
			}
			xhr.send('{"start":"'+ this.start +
							 '","end":"' + this.end +
							 '","itemId":"' + this.user[0] + // TODO: itemID에 들어갈 값
							 '","date":"' + this.focus +
							 '","people":"' + this.user[0] + // TODO: people에 들어갈 값
							 '","_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
		},
		showTimeline: function () {
			this.retTimeList
			for (item of this.retData) {

			}
		}
	},
	computed: {
		showFocus: function () { return this.focus.toJSON().slice(0, 10) },
		drawCalendar: function () {
			let prev = new Date(this.focus.getFullYear(), this.focus.getMonth(), 0)
			let first = new Date(this.focus.getFullYear(), this.focus.getMonth(), 1)
			let last = new Date(this.focus.getFullYear(), this.focus.getMonth() + 1, 0)
			let i, count = 1, offset = first.getDay()
			for (i = 0; i < offset; i++) this.calendar[0][i] = [1 + prev.getDate() - offset + i, false]
			for (i = offset; i < last.getDate() + offset; i++) this.calendar[parseInt(i / 7)][i % 7] = [i + 1 - offset, true]
			for (i = last.getDate() + offset; i < 42; i++) this.calendar[parseInt(i / 7)][i % 7] = [i - last.getDate() - offset + 1, false]
		},

	}
}
</script>

<style>

</style>
