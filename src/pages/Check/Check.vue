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
			{{ showFocus }}
			<a class="btn">해당 날짜 예약하기</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'check',
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
			TimeTable: null,
		}
	},
	created () { this.drawCalendar },
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
		showTimeline: function () {

		}
	}
}
</script>

<style>

</style>