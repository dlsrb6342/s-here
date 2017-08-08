<template>
	<div class="check">
		예약 현황<br>
		<div id="calendar">
			<center>
				<table class="table-condensed table-bordered table-striped">
					<thead>
						<tr>
							<th colspan="7">
								<center>
									<a class="btn"><i class="icon-chevron-left"></i></a>
									<a class="btn">{{ showFocus }}</a>
									<a class="btn"><i class="icon-chevron-right"></i></a>
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
			</center>
			<a class="btn" @click="showTimeline">{{ showFocus }} 일정 확인하기</a>
			<img class="btn" v-if="!showTimeTable" src="../../assets/refresh/refresh.svg" width="24" height="24" style="padding: 3px 3px 3px 3px; margin: 3px 3px 3px 3px" @click="">
			<!--
			<transition>
				<div v-if="showTimeTable">
					<center>
						<a class="btn" @click="reserve">해당 시각 예약하기</a>
					</center>
				</div>
			</transition>
			-->
		</div>
	</div>
</template>

<script>
export default {
	name: 'check',
	props: ['date'],
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
		changeFocus: function (day) {
			let res = new Date()
			res.setFullYear(this.focus.getFullYear())
			res.setMonth(this.focus.getMonth())
			if (day[1] === false) {
				if (day[0] < 15) res.setMonth(this.focus.getMonth() + 1)
				else res.setMonth(this.focus.getMonth() - 1)
			}
			res.setDate(day[0])
			this.focus = res
			this.drawCalendar
		},
		retTimeList: function () {
			let xhr = new XMLHttpRequest()
			xhr.open('GET', '/api/item/'+this.focus.toJSON().slice(0,10).replace(/-/g,""))
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function () {
				let result = JSON.parse(xhr.responseText)
				this.TimeTable = []
				if (result.hasOwnProperty('data')) {
					for (data of result['data']) {
						this.TimeTable.push(data)
					}
					this.showTimeTable = true
				}
				else {
					alert('조회에 실패하였습니다.')
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
				this.TimeTable = []
				if (result.hasOwnProperty('success')) alert('예약했습니다.')
				else alert('다른 사람의 예약과 겹쳤습니다.\n다른 시간대를 선택해 주십시오.')
				this.showTimeline
			}
			xhr.send('{"_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
		},
		showTimeline: function () {
			this.retTimeList
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

<style scoped>
.muted {
	color: #888888
}
.timetable {
	height: 3px
}
</style>