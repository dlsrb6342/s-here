<template>
  <div class="contaier remote view text-center">
    <v-container class="SFwide">
      <h2 class="text-center font-exo">SMART KEY</h2>
      <v-container class="">
        <v-card class="mb-2 SFhalf-W SFalign-center SFborder">
          <v-select
            v-bind:items="schedules"
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
      msg:'',
      snackbar: false,
      timeout: 5000,
      mode: '',
			isOpen: false,
      selected: false,
      schedules: [{text: 'test', date: '2017/09/15'}]
		}
	},
	methods: {
		sendSignal: function () {
      var xhr = new XMLHttpRequest()
			xhr.open('GET', '/api/open/')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        let result = JSON.parse(xhr.responseText)
        if (result.hasOwnProperty('success')) this.$emit('snackbar', '열렸습니다.', 'success')
        else if (result['code'] == 0) this.$emit('snackbar', '예약하신 시간대가 아닙니다.', 'error')
        else if (result['code'] == 0) this.$emit('snackbar', '하드웨어와 연결이 끊어졌습니다.<br>관리자에게 문의해 주세요.', 'error')
        else this.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요..', 'info')
      }
      xhr.send('{"_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
    },
    earlyReturn: function () {
      var xhr = new XMLHttpRequest()
			//xhr.open('POST', '/api/reserve/')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        let result = JSON.parse(xhr.responseText)
        if (result.hasOwnProperty('success')) this.$emit('snackbar', '조기반납이 완료되었습니다.', 'success')
        else if (result['code'] == 0) this.$emit('snackbar', '예약하신 시간대가 아닙니다.', 'error')
        else if (result['code'] == 0) this.$emit('snackbar', '하드웨어와 연결이 끊어졌습니다.<br>관리자에게 문의해 주세요.', 'error')
        else this.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
      }
      xhr.send('{"_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
    },
    reportToAdmin: function () {
      var xhr = new XMLHttpRequest()
			//xhr.open('POST', '/api/reserve/')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        let result = JSON.parse(xhr.responseText)
        if (result.hasOwnProperty('success')) this.$emit('snackbar', '고장 신고가 접수되었습니다.<br>다른 프린터를 예약하여 사용해 주세요.', 'success')
        else if (result['code'] == 0) this.$emit('snackbar', '잘못된 입력입니다.', 'error')
        else if (result['code'] == 0) this.$emit('snackbar', '하드웨어와 연결이 끊어졌습니다.<br>관리자에게 문의해 주세요.', 'error')
        else this.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
      }
      xhr.send('{"_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
    }
	}
}
</script>

<style scoped>

</style>
