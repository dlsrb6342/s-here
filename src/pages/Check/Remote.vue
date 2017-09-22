<template>
  <div class="contaier remote view text-center">
    <v-container class="SFwide">
      <h2 class="text-center font-exo">SMART KEY</h2>
      <v-container class="">
        <v-card class="mb-2 SFhalf-W SFalign-center SFborder">
          <v-select :items="schedules" v-model="select" return-object item-text="text" item-value="value" prepend-icon="schedule" class="mt-3 SFhalf-W SFalign-center"></v-select>
          <v-card-text>{{select}}</v-card-text>
        </v-card>
        <v-layout row-sm column justify-space-around class="pt-2">
          <v-flex md3 sm4 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat :disabled="select === {}" class="SFtall" @click.native="sendSignal()">
                <v-icon class="SFbtn-lg indigo--text text--lighten-1">lock_open</v-icon>
              </v-btn>
              <div class="hidden-xs-only text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">문열림</h5>
              </div>
            </v-card>
          </v-flex>
          <v-flex md3 sm4 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat :disabled="select === {}" class="SFtall" @click.native="earlyReturn()">
                <v-icon class="SFbtn-lg indigo--text text--lighten-1">directions_run</v-icon>
              </v-btn>
              <div class="hidden-xs-only text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">조기반납</h5>
              </div>
            </v-card>
          </v-flex>
          <v-flex md3 sm4 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat :disabled="select === {}" class="SFtall" @click.native.stop="dialog = true">
                <v-icon class="SFbtn-lg indigo--text text--lighten-1">build</v-icon>
              </v-btn>
              <div class="hidden-xs-only text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">고장신고</h5>
              </div>
            </v-card>
            <v-dialog v-model="dialog" lazy absolute width="480px">
              <v-card class="pa-4">
                <v-card-title>
                  <div class="headline text-center">고장 신고</div>
                </v-card-title>
                <v-select :items="['필라멘트 부족', '오토 레벨링 실패', '노즐 막힘', '기타']" v-model="troubletype"></v-select>
                <v-text-field v-model="troubleMsg" v-show="troubletype === '기타'" multi-line></v-text-field>
                <v-btn dark primary @click.native="reportTrouble()">신고</v-btn>
                <v-btn dark primary @click.native="dialog = false, troubletype = ''">닫기</v-btn>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>

  </div>
</template>

<script>
export default {
  name: 'remote',
  data() {
    return {
      isOpen: false,
      selected: false,
      troubletype: null,
      troubleMsg: '',
      dialog: false,
      loading: false,
      schedules: [],
      search: null,
      select: {},
      retData: [],
    }
  },
  created() {
    this.retReserveList()
  },
  methods: {
    retReserveList: function() {
      let xhr = new XMLHttpRequest(), self = this
      xhr.open('GET', '/api/reserve/')
      xhr.setRequestHeader("Content-type", "application/json")
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          self.schedules = []
          if (result.hasOwnProperty('success')) {
            self.retData = result.data
            for (let item of result.data) {
              self.schedules.push({
                text: item['start'].toString().slice(6, 8) + '일: ' + parseInt(parseInt(item['start'].toString().slice(8, 10)) / 2) + '시 ' + (parseInt(item['start'].toString().slice(8, 10)) % 2 == 1 ? '반' : '') + ' ~ ' + + parseInt(parseInt(item['end'].toString().slice(8, 10)) / 2) + '시 ' + (parseInt(item['end'].toString().slice(8, 10)) % 2 == 1 ? '반' : ''),
                value: item['_id'],
              })
            }
          }
          else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요..', 'info')
        }
      }
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
    },
    sendSignal: function() {
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
    earlyReturn: function() {
      let xhr = new XMLHttpRequest(), self = this
      xhr.open('DELETE', '/api/reserve/' + this.select.value)
      xhr.setRequestHeader("Content-type", "application/json")
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('success')) self.$emit('snackbar', '조기반납이 완료되었습니다.', 'success')
          else if (result.code == 0) self.$emit('snackbar', '잘못된 예약 ID입니다.', 'error')
          else if (result.code == 1) self.$emit('snackbar', '존재하지 않는 예약입니다.', 'error')
          else if (result.code == 2) self.$emit('snackbar', '예약한 회원과 요청한 회원이 다릅니다.', 'error')
          else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
          self.select = {}
          self.retReserveList()
        }
      }
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))

    },
    reportTrouble: function() {
      let xhr = new XMLHttpRequest(), self = this
      xhr.open('POST', '/api/trouble/' + this.select.value)
      xhr.setRequestHeader("Content-type", "application/json")
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('success')) self.$emit('snackbar', '고장 신고가 접수되었습니다.<br>다른 프린터를 예약하여 사용해 주세요.', 'success')
          else if (result['code'] == 0) self.$emit('snackbar', '잘못된 예약 ID입니다.', 'error')
          else if (result['code'] == 1) self.$emit('snackbar', '존재하지 않는 예약입니다.', 'error')
          else if (result['code'] == 2) self.$emit('snackbar', '예약한 회원과 요청한 회원이 다릅니다.<br>신청한 사람이 신고해 주시기 바랍니다.', 'error')
          else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
        }
      }
      if (troubletype === '필라멘트 부족') this.troubleMsg = '[itemId:' + this.retData['item'] + '] 가 고장내역: 필라멘트 부족 으로 접수됨.'
      else if (troubletype === '오토 레벨링 실패') this.troubleMsg = '[itemId:' + this.retData['item'] + '] 가 고장내역: 오토 레벨링 실패 으로 접수됨.'
      else if (troubletype === '노즐 막힘') this.troubleMsg = '[itemId:' + this.retData['item'] + '] 가 고장내역: 노즐 막힘 으로 접수됨.'
      else this.troubleMsg = '[itemId:' + this.retData['item'] + '] 가 고장내역: 기타(' + this.troubleMsg + ') 으로 접수됨.'
      xhr.send(JSON.stringify({ content: this.troubleMsg, _csrf: document.cookie.split("_csrf=")[1] }))
    },
  }
}
</script>

<style scoped>

</style>
