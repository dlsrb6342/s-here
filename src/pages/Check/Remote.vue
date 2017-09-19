<template>
  <div class="contaier remote view text-center">
    <v-container class="SFwide">
      <h2 class="text-center font-exo">SMART KEY</h2>
      <v-container class="">
        <v-card class="mb-2 SFhalf-W SFalign-center SFborder">
          <v-select
            :items="schedules"
            item-text="date"
            prepend-icon="schedule"
            class="mt-3 SFhalf-W SFalign-center"></v-select>
        </v-card>
        <v-layout row-sm column justify-space-around class="pt-2">
          <v-flex md3 sm4 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat :disabled="!selected" class="SFtall">
                <v-icon class="SFbtn-lg indigo--text text--lighten-1" @click.native="sendSignal">lock_open</v-icon>
              </v-btn>
              <div class="hidden-xs-only text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">문열림</h5>
              </div>
            </v-card>
          </v-flex>
          <v-flex md3 sm4 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat :disabled="!selected" class="SFtall">
                <v-icon class="SFbtn-lg indigo--text text--lighten-1" @click.native="earlyReturn">directions_run</v-icon>
              </v-btn>
              <div class="hidden-xs-only text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">조기반납</h5>
              </div>
            </v-card>
          </v-flex>
          <v-flex md3 sm4 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat :disabled="!selected" class="SFtall">
                <v-icon class="SFbtn-lg indigo--text text--lighten-1" @click.native="reportToAdmin">build</v-icon>
              </v-btn>
              <div class="hidden-xs-only text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">고장신고</h5>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
	name: 'remote',
	data () {
		return {
			isOpen: false,
      selected: false,
      loading: false,
      schedules: [],
      search: null,
      select: [],
		}
	},
  created () {
    this.retReserveList()
  },
	methods: {
    retReserveList: function () {
      let xhr = new XMLHttpRequest(), self = this
			xhr.open('GET', '/api/reserve/') 
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          console.log(xhr.responseText)
          if (result.hasOwnProperty('success')) {
            
          }
          else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요..', 'info')
        }
      }
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
    },
		sendSignal: function () {
      let xhr = new XMLHttpRequest(), self = this
			xhr.open('GET', '/api/remote/door')  
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('success')) self.$emit('snackbar', '열렸습니다.', 'success')
          else if (result.code == 0) self.$emit('snackbar', '예약하신 시간대가 아닙니다.', 'error')
          else if (result.code == 1) self.$emit('snackbar', '하드웨어와 연결이 끊어졌습니다.<br>관리자에게 문의해 주세요.', 'error')
          else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요..', 'info')
        }
      }
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
    },
    earlyReturn: function () {
      let xhr = new XMLHttpRequest(), self = this
			xhr.open('POST', '/api/reserve/') // TODO
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('success')) self.$emit('snackbar', '조기반납이 완료되었습니다.', 'success')
          else if (result.code == 0) self.$emit('snackbar', '예약하신 시간대가 아닙니다.', 'error')
          else if (result.code == 0) self.$emit('snackbar', '하드웨어와 연결이 끊어졌습니다.<br>관리자에게 문의해 주세요.', 'error')
          else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
          self.retReserveList()
        }
      }
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
      
    },
    reportToAdmin: function () {
      let xhr = new XMLHttpRequest(), self = this
			xhr.open('POST', '/api/reserve/') // TODO
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('success')) self.$emit('snackbar', '고장 신고가 접수되었습니다.<br>다른 프린터를 예약하여 사용해 주세요.', 'success')
          else if (result['code'] == 0) self.$emit('snackbar', '잘못된 입력입니다.', 'error')
          else if (result['code'] == 1) self.$emit('snackbar', '존재하지 않는 예약입니다.', 'error')
          else if (result['code'] == 2) self.$emit('snackbar', '예약한 회원과 요청한 회원이 다릅니다.<br>신청한 사람이 신고해 주시기 바랍니다.', 'error')
          else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
        }
      }
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
      // TODO: _id add
    },
	}
}
</script>

<style scoped>

</style>
